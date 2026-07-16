import CalendarEventType from "./CalendarEventType";

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    type?: CalendarEventType;
};

export default CalendarEvent;
