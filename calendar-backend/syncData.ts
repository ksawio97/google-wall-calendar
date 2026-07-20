import { google } from 'googleapis';
import * as path from 'path';
import { parse as yamlParse } from "yaml";
import { promises as fsp } from "fs";

type EventId = string;

type Calendar = {
    calendarId: string;
    name: string;
    background_color: string;
    text_color: string;
};

type Event = {
    id: EventId;
    title: string;
    start: Date;
    end: Date;
}


async function readCalendars() {
    const calendarsData = await fsp.readFile("calendars.yaml", {
        encoding: "utf8",
    });

    const calendars = yamlParse(calendarsData) as { calendars: Calendar[] };
    return calendars;
}

// Point to your service-account-key.json file
const KEYFILEPATH = path.join(__dirname, 'service-account-key.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

    const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

export const getCalendars = (() => {
    let calendars: Calendar[] | null = null;
    
    return async () => {
        if (!calendars) 
           calendars = (await readCalendars()).calendars;
        return calendars;
    };
})();

const calendar = google.calendar({ version: 'v3', auth });
async function getEventsData() {
    try {

        // events in 2 weeks range only
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const timeMin = today.toISOString();

        const twoWeeksLater = new Date(today);
        twoWeeksLater.setDate(today.getDate() + 14); 
        const timeMax = twoWeeksLater.toISOString();
        // read from calendars.yaml calendars we use
        const calendars = await getCalendars();
        // prepare requests to google api compatible
        const requests = calendars.map(calendarToFetch => 
              ({
                  calendarId: calendarToFetch.calendarId,
                  timeMin: timeMin,
                  timeMax: timeMax,
                  maxResults: 21,
                  orderBy: 'startTime',
                  // TODO handle also reccuring events
                  singleEvents: true,
              }));

        // send requests to google api
        const responses = await Promise.all(requests.map(request => calendar.events.list(request)));

        const events: EventConn[] = responses.flatMap((res, i) => {
            return !res.data.items ? [] : res.data.items.map<EventConn>(item => {
                const startString = item.start?.dateTime || item.start?.date || "";
                const endString = item.end?.dateTime || item.end?.date || "";

                return {
                    calendarId: calendars[i].calendarId,
                    id: item.id || "",
                    title: item.summary || "",
                    // Convert the strings into real Date objects to satisfy the type
                    start: startString ? new Date(startString) : new Date(),
                    end: endString ? new Date(endString) : new Date()
                };
            }); 
        });

        return events || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

type EventChanges = {
    id: EventId;
    calendarId?: string;
    title?: string;
    start?: Date;
    end?: Date;
}

type EventConn = Event & {
    // to which calendar its added
    calendarId: string;
}

type EventsDataChanges = {
    changed: EventChanges[];
    deleted: EventId[];
    added: EventConn[];
} 

function getEventChanges(ogEvent: EventConn, freshEvent: EventConn) {
    const changes: EventChanges = {
        // we assume that ogEvent.id === freshEvent.id
        id: ogEvent.id,
        calendarId: ogEvent.calendarId === freshEvent.calendarId ? undefined : freshEvent.calendarId,
        title: ogEvent.title === freshEvent.title ? undefined : freshEvent.title,
        start: ogEvent.start.getTime() === freshEvent.start.getTime() ? undefined : freshEvent.start, 
        end: ogEvent.end.getTime() === freshEvent.end.getTime() ? undefined : freshEvent.end,
    };

    return changes.calendarId || changes.title || changes.start || changes.end ? changes : undefined;
}

function lookForDifferences(events: Map<EventId, EventConn>, freshEvents: EventConn[]): EventsDataChanges {
    const eventsDataChanges: EventsDataChanges = {
        changed: [],
        deleted: [],
        added: [],
    }; 
    // keep track if all events are still in calendar
    const deletedIds = new Set<EventId>(events.keys()); 
    
    for (const event of freshEvents) {
        // new event
        if (!events.has(event.id)) {
            eventsDataChanges.added.push(event); 
            events.set(event.id, event);
            continue;
        }
        // event wasn't deleted
        deletedIds.delete(event.id);
        
        const orginalEventData = events.get(event.id)!;
        const eventChanges = getEventChanges(orginalEventData, event);
        // something changed
        if (eventChanges) {
            eventsDataChanges.changed.push(eventChanges);
            events.set(event.id, event);
        }
    }
    
    eventsDataChanges.deleted.push(...deletedIds);
    // delete from memorized events
    deletedIds.forEach(deletedId => events.delete(deletedId));

    return eventsDataChanges;
}

export async function initEventsListener() {
    const events = new Map<EventId, EventConn>((await getEventsData()).map<[EventId, EventConn]>(event => [event.id, event]));

    return {
        getEvents: () => [...events.values()],
        checkChanges: async (): Promise<EventsDataChanges> => {
            const freshEvents = await getEventsData();
            return lookForDifferences(events, freshEvents);
        },
    }; 
}
