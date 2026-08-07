import VerticalDivider from "components/VerticalDivider";
import CalendarEvent from "types/CalendarEvent";
import EventSCard from "./EventSCard";

export type DayCardProps = {
    day: Date, events: CalendarEvent[] 

};
const MAX_EVENTS_VISIBLE = 2;
function DayCard({ day, events }: DayCardProps) {
    return (
        <div className="bg-surface-container text-on-surface-container flex flex-col text-left rounded-md gap-1 px-2">
            <div className="flex flex-col p-4 gap-1">
                <p className="text-on-surface-variant text-lg">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="font-bold text-on-surface-variant text-3xl">{day.getDate()}</p>
            </div>
            <VerticalDivider className="bg-surface-container-high"/>
            { events.length > 0 ?
            <ul className="list-disc list-inside px-1 py-4 flex flex-col gap-2">
                {events.slice(0, MAX_EVENTS_VISIBLE).map((event, i) => 
                    <EventSCard key={`EventSCard-${i}`} event={event}></EventSCard>
                )}
                { events.length > MAX_EVENTS_VISIBLE && <p className="text-on-surface-variant px-2">+ {events.length - MAX_EVENTS_VISIBLE} more</p>}
            </ul> : <p className="text-white p-2 min-h-28 text-on-surface-variant">Free day</p>}
        </div> 
    );
}

export default DayCard;
