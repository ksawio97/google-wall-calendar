import express, { Request, Response } from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import * as path from 'path';
import { parse as yamlParse } from "yaml";
import { promises as fsp } from "fs";

type Calendar = {
    calendarId: string;
    name: string;
    background_color: string;
    text_color: string;
};

type EventsResponse = Calendar & {
    events: {
        id: string;
        title: string;
        start: Date;
        end: Date;
    }[];
};


async function readCalendars() {
    const calendarsData = await fsp.readFile("calendars.yaml", {
      encoding: "utf8",
    });

    const calendars = yamlParse(calendarsData) as { calendars: Calendar[] };
    return calendars;
}

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); 

// Point to your service-account-key.json file
const KEYFILEPATH = path.join(__dirname, 'service-account-key.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// TODO add 5 min loop to check for new events
app.get('/api/events', async (req: Request, res: Response) : Promise<void> => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    // events in 2 weeks range only
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeMin = today.toISOString();

    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14); 
    const timeMax = twoWeeksLater.toISOString();
    // read from calendars.yaml calendars we use  
    const calendarsToFetch = (await readCalendars()).calendars;
    // prepare requests to google api compatible
    const requests = calendarsToFetch.map(calendarToFetch => 
            ({
                calendarId: calendarToFetch.calendarId,
                timeMin: timeMin,
                timeMax: timeMax,
                maxResults: 21,
                singleEvents: true,
                orderBy: 'startTime',
            }));
    // send requests to google api
    const responses = await Promise.all(requests.map(request => calendar.events.list(request)));
    
    const calendarsData: EventsResponse[] = responses.map((response, i) => ({
        ...(calendarsToFetch[i]),
        events: response.data.items ? response.data.items.map(item => {
            const startString = item.start?.dateTime || item.start?.date || "";
            const endString = item.end?.dateTime || item.end?.date || "";

            return {
                id: item.id || "",
                title: item.summary || "",
                // Convert the strings into real Date objects to satisfy the type
                start: startString ? new Date(startString) : new Date(),
                end: endString ? new Date(endString) : new Date()
            };
        }) : [],
    }));
    // Send the events back to the frontend as JSON
    res.json(calendarsData || []);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ error: 'Failed to fetch events from Google Calendar' });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
