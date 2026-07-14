import CalendarEvent from "types/CalendarEvent";
import CalendarEventType from "types/CalendarEventType";

// mock data by ai
export default function mockEvents() {

    const today = new Date();

    // Helper function to easily shift days and set specific times
    const createDate = (dayOffset: number, hours: number, minutes: number = 0) => {
        const date = new Date(today);
        date.setDate(today.getDate() + dayOffset);
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    // Define some reusable event types
    const workType: CalendarEventType = { name: "Work", color: "text-blue-500" };
    const personalType: CalendarEventType = { name: "Personal", color: "text-emerald-500" };
    const urgentType: CalendarEventType = { name: "Urgent", color: "text-red-500" };

    const mockData: CalendarEvent[] = [
        {
            title: "Yesterday's Sync",
            description: "Reviewing last week's tickets.",
            // -1 day offset = Yesterday
            start: createDate(-1, 10, 0), // 10:00 AM
            end: createDate(-1, 11, 30),  // 11:30 AM
            type: workType,
        },
        {
            title: "Doctor Appointment",
            // 0 day offset = Today
            start: createDate(0, 14, 0), // 2:00 PM
            end: createDate(0, 15, 0),   // 3:00 PM
            type: personalType,
        },
        {
            title: "Team Offsite / Conference",
            description: "Multi-day event spanning over the weekend.",
            // 2 days from now until 4 days from now
            start: createDate(2, 9, 0),  // 9:00 AM
            end: createDate(4, 17, 0),   // 5:00 PM
            type: workType,
        },
        {
            title: "Car Service",
            // 1 week from now
            start: createDate(7, 8, 30), // 8:30 AM
            end: createDate(7, 12, 0),   // 12:00 PM
            type: personalType,
        },
        {
            title: "Q3 Planning Final Review",
            // 16 days offset = 2 weeks + 2 days
            start: createDate(16, 13, 0), // 1:00 PM
            end: createDate(16, 14, 30),  // 2:30 PM
            type: urgentType,
        }
    ];
    return mockData;
}
