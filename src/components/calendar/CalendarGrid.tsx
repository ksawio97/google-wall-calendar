import useToday from "hooks/useToday";
import useEvents from "hooks/useEvents";
import { useMemo } from "react";
import CalendarEvent from "types/CalendarEvent";
import DayCard from "./cards/DayCard"
import getWeeksDays from "utils/getWeeksDays";

function CalendarGrid() {
    const { getEventsByDay } = useEvents();
    const currDate = useToday();
    
    const dayCardsData: { day: Date, events: CalendarEvent[] }[] = useMemo(() => 
        getWeeksDays(currDate).map(day => ({ day: day, events: getEventsByDay(day) }))
    , [currDate, getEventsByDay]);

    return (
        <div className="grid grid-rows-2 grid-cols-7">
            {dayCardsData.map((dayCardData, i) => 
                <DayCard key={`DayCard-${i}`} {...dayCardData}></DayCard>
            )}
        </div>
    );
}

export default CalendarGrid;
