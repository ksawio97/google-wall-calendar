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
        <div className="min-h-0 h-7/12 grid grid-rows-2 grid-cols-7 gap-y-4 gap-x-3 overflow-y-auto px-4 py-2">
            {dayCardsData.map((dayCardData, i) => 
                <DayCard key={`DayCard-${i}`} {...dayCardData}></DayCard>
            )}
        </div>
    );
}

export default CalendarGrid;
