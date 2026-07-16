import DateDisplay from "components/date/DateDisplay"
import useEvents from "hooks/useEvents"
import { useEffect, useMemo } from "react";
import EventDetailsCard from "./cards/EventDetailsCard";
import EventTypeCard from "./cards/EventTypeCard";

type Props = {
    day: Date
}

export default function DayEventsDetailsGrid({ day }: Props) {
    const { getEventsByDay } = useEvents();

    const events = useMemo(() => 
        getEventsByDay(day)
    , [day, getEventsByDay]);


    return events.length === 0 ? (<></>) : 
        (<div className="flex-1 h-full overflow-y-auto flex flex-col bg-gray-700 rounded-md text-gray-900 m-2 p-4 gap-4">
            <div className="flex flex-row text-lg text-white gap-2">
                <DateDisplay day={day}></DateDisplay>
                <div className="w-0.5 bg-white h-auto"></div>
                <div className="overflow-hidden flex flex-row items-center gap-4">
                    <p>{events.length} {events.length == 1 ? "event" : "events"} scheduled</p>
                    {events.map((event, i) => 
                        event.type && <EventTypeCard key={`EventTypeCard-${i}`} eventType={event.type}></EventTypeCard>
                    )}
                </div>
            </div>
            <div className="w-auto bg-white h-0.5"></div>
            <div className="flex flex-row gap-2 h-full items-center">
                {events.map((event, i) => 
                    <EventDetailsCard key={`EventDetailsCard-${i}`} event={event}></EventDetailsCard>
                )}
            </div>
        </div>);
    
}
