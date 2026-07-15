import useDay from "hooks/useDay";
import useEvents from "hooks/useEvents";
import { useMemo } from "react";
import CalendarEvent from "types/CalendarEvent";
import DayCard from "./cards/DayCard"

function CalendarGrid() {
    const { getEventsByDay } = useEvents();
    const currDate = useDay();
    
    const dayCardsData: { day: Date, events: CalendarEvent[] }[] = useMemo(() => 
        // generate DayCard for next 14 days
        Array.from({ length: 14 }, (_, index) => {
            let day = new Date(currDate);
            day.setDate(day.getDate() + index);
            return {
                day: day,
                events: getEventsByDay(day),
            };
        })
    , [currDate, getEventsByDay]);

    return (
        <table className="grid grid-rows-2 grid-cols-7">
            {dayCardsData.map((dayCardData) => 
                <DayCard {...dayCardData}></DayCard>
            )}
        </table>
    );
}

export default CalendarGrid;
