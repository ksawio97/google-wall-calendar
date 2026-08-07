import DateDisplay from "components/date/DateDisplay"
import HorizontalDivider from "components/HorizontalDivider";
import { useCalendars } from "hooks/useCalendars";
import useEvents from "hooks/useEvents"
import { useMemo } from "react";
import CalendarEvent from "types/CalendarEvent";
import EventDetailsCard from "./cards/EventDetailsCard";
import EventTypeCard from "./cards/EventTypeCard";

type Props = {
    day: Date
}

function getCalendarIds(events: CalendarEvent[]) {
    return Array.from(new Set(events.map(e => e.calendarId)));

}

export default function DayEventsDetailsGrid({ day }: Props) {
    const { getEventsByDay } = useEvents();

    const [events, calendarIds] = useMemo(() => { 
        const events = getEventsByDay(day);
        return [events, getCalendarIds(events)];
    } , [day, getEventsByDay]);


    const { getCalendarDataById } = useCalendars();

    return events.length === 0 ? (<></>) : 
        (<div className="min-h-0 h-1/4 overflow-y-auto bg-surface-container p-4 rounded-md text-gray-900 mx-2 gap-3 flex flex-col">
            <div className="flex flex-row text-lg text-white gap-2">
                <DateDisplay day={day}></DateDisplay>
                <HorizontalDivider/>
                <div className="overflow-hidden flex flex-row items-center gap-4 text-on-surface-variant">
                    <p>{events.length} {events.length == 1 ? "event" : "events"} scheduled</p>
                    {calendarIds.map((calendarId, i) => { 
                        const calendar = getCalendarDataById(calendarId);

                        return ( calendar ? <EventTypeCard key={`EventTypeCard-${i}`} calendar={calendar}></EventTypeCard> : <></>);
                    })}
                </div>
            </div>
            <div className="flex flex-row gap-2 flex-1 place-items-center">
                {events.map((event, i) => 
                    <EventDetailsCard key={`EventDetailsCard-${i}`} event={event}></EventDetailsCard>
                )}
            </div>
        </div>);
    
}
