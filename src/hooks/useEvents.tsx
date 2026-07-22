import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { CalendarEventChanges, calendarService } from 'services/CalendarService';
import CalendarEvent from 'types/CalendarEvent';

interface EventsContextType {
    getEventsByDay: (day: Date) => CalendarEvent[];
}

const EventsContext = createContext<EventsContextType | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    
    useEffect(() => {
        // Handling your TODO: Added, Changed, and Deleted
        const handleAdded = (newEvents: CalendarEvent[]) => {
            setEvents(prev => {
                return [...prev, ...newEvents];
            });
        };

        const handleChanged = (changeEvents: CalendarEventChanges[]) => {
        };
        const handleDeleted = (eventsToDelete: string[]) => {
        };
        const unsubscribeFuncs = [
        // Attach the listeners to your service
        calendarService.subscribe(['events_added', handleAdded]),
        calendarService.subscribe(['events_changed', handleChanged]),
        calendarService.subscribe(['events_deleted', handleDeleted])
        ];
        // Cleanup on unmount
        return () => {
            unsubscribeFuncs.forEach((unsubscribe) => unsubscribe());
        };
    }, []);

    // Your exact grouping logic, now computed globally
    const eventsByDate = useMemo(() => {
        const grouped = events.reduce((dictionary, event) => {
            const currDate = new Date(event.start);
            currDate.setHours(0, 0, 0, 0);
            const endDate = new Date(event.end);
            endDate.setHours(0, 0, 0, 0);

            for (let d = new Date(currDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dayKey = d.toLocaleDateString('en-CA');
                if (!dictionary[dayKey]) {
                    dictionary[dayKey] = [];
                }
                dictionary[dayKey].push(event);
            }

            return dictionary;
        }, {} as Record<string, CalendarEvent[]>);

        for (const dateKey in grouped) {
            grouped[dateKey].sort((a, b) => a.start.getTime() - b.start.getTime());
        }
        
        return grouped;
    }, [events]);

    const getEventsByDay = useCallback((day: Date) => {
        const dayKey = day.toLocaleDateString('en-CA');
        return eventsByDate[dayKey] || [];
    }, [eventsByDate]);

    return (
        <EventsContext.Provider value={{ getEventsByDay }}>
            {children}
        </EventsContext.Provider>
    );
};

export default function useEvents() {
    const context = useContext(EventsContext);
    
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    
    return context;
}
