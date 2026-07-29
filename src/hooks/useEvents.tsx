import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { CalendarEventChanges, calendarService } from 'services/CalendarService';
import CalendarEvent from 'types/CalendarEvent';

interface EventsContextType {
    getEventsByDay: (day: Date) => CalendarEvent[];
}

const EventsContext = createContext<EventsContextType | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<Map<string,CalendarEvent>>(new Map());
    
    useEffect(() => {
        const handleAdded = (newEvents: CalendarEvent[]) => {

            setEvents(prev => {
                const newMap = new Map(prev);
                for (const event of newEvents) {
                    if (!newMap.has(event.id)) {
                        newMap.set(event.id, event);
                    }
                }
                return newMap;
            });
        };

        const handleChanged = (changedEvents: CalendarEventChanges[]) => {

            setEvents(prev => {
                const newMap = new Map(prev);
                for (const event of changedEvents) {
                    if (newMap.has(event.id)) {
                        // Remove any keys that are undefined from the incoming event
                        const cleanedUpdates = Object.fromEntries(
                            Object.entries(event).filter(([_, value]) => value !== undefined)
                        );
                        // merge
                        newMap.set(event.id, {
                            ...newMap.get(event.id)!!,
                            ...cleanedUpdates
                        });                    
                    } else {
                        console.error(`Can't apply modifications to event: ${event.id}, because it doesn't exist`);
                    }
            }
                return newMap;
            });
        };
        const handleDeleted = (eventsToDelete: string[]) => {
            setEvents((prev) => {
                const newMap = new Map(prev);
                for (const toDeleteId of eventsToDelete) {
                    if (newMap.has(toDeleteId))
                        newMap.delete(toDeleteId);
                }

                return newMap;
            });
        };

        const handleDisconnect = () => {
            setEvents(new Map());
        };
        const unsubscribeFuncs = [
        // Attach the listeners to your service
        calendarService.subscribe(['events_added', handleAdded]),
        calendarService.subscribe(['events_changed', handleChanged]),
        calendarService.subscribe(['events_deleted', handleDeleted]),
        calendarService.subscribe(['disconnect', handleDisconnect])
        ];
        // Cleanup on unmount
        return () => {
            unsubscribeFuncs.forEach((unsubscribe) => unsubscribe());
        };
    }, []);

    // Your exact grouping logic, now computed globally
    const eventsByDate = useMemo(() => {
        const grouped = [...events.values()].reduce((dictionary, event) => {
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
