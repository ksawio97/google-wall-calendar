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
    const workType: CalendarEventType = { name: "Work", txtcolor: "text-blue-300", bgcolor: "bg-blue-900" };
    const personalType: CalendarEventType = { name: "Personal", txtcolor: "text-emerald-300", bgcolor: "bg-emerald-900" };
    const urgentType: CalendarEventType = { name: "Urgent", txtcolor: "text-red-300", bgcolor: "bg-red-900" };

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
            end: createDate(7, 12, 0),   // 12:00 AM
            type: personalType,
        },

        {
            title: "Doctor visit",
            // 1 week from now
            start: createDate(7, 13, 30), // 13:30 AM
            end: createDate(7, 15, 0),   // 3:00 PM
            type: personalType,
        },
        {
            title: "Job interview",
            // 1 week from now
            start: createDate(7, 16, 0), // 4:00 AM
            end: createDate(7, 18, 0),   // 6:00 PM
            type: workType,
        },
        {
            title: "Friends meeting",
            // 1 week from now
            start: createDate(7, 19, 0), // 7:00 AM
            end: createDate(7, 23, 0),   // 11:00 PM
            type: personalType,
        },
        {
            title: "Q3 Planning Final Review",
            // 3 days from now
            start: createDate(3, 13, 0), // 1:00 PM
            end: createDate(3, 14, 30),  // 2:30 PM
            type: urgentType,
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
