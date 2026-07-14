import CalendarEventType from "./CalendarEventType";

type CalendarEvent = {
    title: string;
    description?: string;
    start: Date;
    end: Date;
    type?: CalendarEventType;
};

export default CalendarEvent;
