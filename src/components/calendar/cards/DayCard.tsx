import CalendarEvent from "types/CalendarEvent";
import EventSCard from "./EventSCard";

export type DayCardProps = {
    day: Date, events: CalendarEvent[] 

};

function DayCard({ day, events }: DayCardProps) {
    return (
        <div className="bg-gray-500 flex flex-col text-left rounded-md m-1 divide-y-4 divide-opacity-90 gap-2 divide-slate-700">
            <th className="flex flex-col p-4 gap-1">
                <tr className="text-slate-900 text-lg">{day.toLocaleDateString('en-US', { weekday: 'short' })}</tr>
                <tr className="font-bold text-white text-3xl">{day.getDate()}</tr>
            </th>
            { events.length > 0 ?
            <ul className="list-disc list-inside p-1 flex flex-col gap-1">
                {events.slice(0, 3).map((event) => 
                    <EventSCard event={event}></EventSCard>
                )}
                { events.length > 3 && <p className="text-white px-2">+ {events.length - 3} more</p>}
            </ul> : <p className="text-white p-2">Free day</p>}

        </div> 
    );
}

export default DayCard;
