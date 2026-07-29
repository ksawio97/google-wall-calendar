type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    calendarId: string;
    isAllDay: boolean;
};

export default CalendarEvent;
