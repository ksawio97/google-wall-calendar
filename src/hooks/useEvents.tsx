import { useState, useEffect, useCallback, useMemo } from 'react';
import CalendarEvent from 'types/CalendarEvent';
import mockEvents from 'utils/mockEvents';

export default function useEvents() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        // mock events
        setEvents(mockEvents());
    }, []);


    const eventsByDate = useMemo(() => {
        // Group the events into a dictionary by date (YYYY-MM-DD)
        const grouped = events.reduce((dictionary, event) => {
            // so we include all days in CalendarEvent range 
            const currDate = new Date(event.start);
            currDate.setHours(0,0,0,0);
            const endDate = new Date(event.end);
            endDate.setHours(0,0,0,0);

            for (currDate; currDate <= endDate; currDate.setDate(currDate.getDate() + 1)) {
                // YYYY-MM-DD  
                const dayKey = currDate.toLocaleDateString('en-CA');
                if (!dictionary[dayKey]) {
                    dictionary[dayKey] = [];
                }
                dictionary[dayKey].push(event);
            }

            return dictionary;
        }, {} as Record<string, CalendarEvent[]>);

        // Sort the arrays inside the dictionary by CalendarEvent start time
        for (const dateKey in grouped) {
            grouped[dateKey].sort((a, b) => {
                return a.start.getTime() - b.start.getTime(); 
            });
        }
        return grouped;
    }, [events]);

    const getEventsByDay = useCallback((day: Date) => {
        const dayKey = day.toLocaleDateString('en-CA');
        return eventsByDate[dayKey] || [];
    }, [eventsByDate]);

    return { getEventsByDay };
}
