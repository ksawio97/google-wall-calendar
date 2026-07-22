import { createContext, useContext, useState, useMemo, useCallback, ReactNode, useEffect } from "react";
import { calendarService } from "services/CalendarService";
import Calendar from "types/Calendar";

interface CalendarContextType {
  getCalendarDataById: (calendarId: string) => Calendar | undefined;
  setCalendars: (calendars: Calendar[]) => void; 
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
        calendarService.getCalendars().then(data => setCalendars(data))
  }, []);

  // Create a dictionary/map for instant lookups
  const calendarMap = useMemo(() => {
    const map = new Map<string, Calendar>();
    calendars.forEach((cal) => map.set(cal.calendarId, cal));
    return map;
  }, [calendars]);

  // The getter function
  const getCalendarDataById = useCallback((calendarId: string): Calendar | undefined => {
    return calendarMap.get(calendarId);
  }, [calendarMap]);

  return (
    <CalendarContext.Provider value={{ getCalendarDataById, setCalendars }}>
      {children}
    </CalendarContext.Provider>
  );
};

// 3. Your refactored hook
export const useCalendars = () => {
  const context = useContext(CalendarContext);
  
  if (!context) {
    throw new Error("useCalendars must be used within a CalendarProvider");
  }
  
  return {
    getCalendarDataById: context.getCalendarDataById,
    setCalendars: context.setCalendars, // Exposed so your main App can fetch and set the data
  };
};
