import { io, Socket } from "socket.io-client";
import Calendar from "types/Calendar";
import CalendarEvent from "types/CalendarEvent";


export type EventAction = "events_added" | "events_changed" | "events_deleted";
export type CalendarEventChanges = Pick<CalendarEvent, 'id'> & Partial<Omit<CalendarEvent, 'id'>>
export type EventSubscribe =  
["events_added", (events: CalendarEvent[]) => void]
| ["events_changed", (eventsChanges: CalendarEventChanges[]) => void]
| ["events_deleted", (eventsIds: string[]) => void]


class CalendarService {
    private socket: Socket | null = null;
    private readonly SERVER_URL = 'http://localhost:3001';
    
    public constructor() {
        this.socket = io(this.SERVER_URL);

        this.socket.on('connect', () => {
            console.log('✅ Frontend connected to WebSocket');
        });
    }
    public subscribe(data: EventSubscribe): () => void {
        const action = (rawData: any[]) => {
            let params;
            // parse depending on action type
            switch (data[0]) {
                case "events_added":
                    params = rawData.map(data => ({
                        ...data,
                        start: new Date(data.start),
                        end: new Date(data.end),
                    }));
                    break;
                case "events_changed":
                    params = rawData.map(data => ({
                        ...data,
                        start: data.start ? new Date(data.start) : undefined,
                        end: data.end ? new Date(data.end) : undefined,
                    }));
                    break;
                case "events_deleted":
                    params = rawData as string[];                    
                    break;
            }

            if (params)
                data[1](params);
        };

        this.socket?.on(data[0], action);


        return () => {
            this.socket?.off(data[0], action);
        }
    }


    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public async getCalendars(): Promise<Calendar[]> {
        const rawData = await fetch(this.SERVER_URL + "/api/calendars"); 
        if (rawData.ok)
            return rawData.json();
        return [];
        
    }
}

export const calendarService = new CalendarService();
