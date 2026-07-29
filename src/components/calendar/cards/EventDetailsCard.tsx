import { useCalendars } from "hooks/useCalendars";
import { useMemo } from "react"
import CalendarEvent from "types/CalendarEvent"
import getDateTime from "utils/getDateTime";

type Props = {
    event: CalendarEvent,
}

export default function EventDetailsCard({ event }: Props) {
    const { getCalendarDataById } = useCalendars();

    const timeText = useMemo(() => { 
        const [s_hour, s_minute] = getDateTime(event.start).slice(0, 2);
        const [e_hour, e_minute] = getDateTime(event.end).slice(0, 2);

        return `${s_hour}:${s_minute} - ${e_hour}:${e_minute}`;
    },[event.start, event.end]); 

    const { name, text_color, background_color } = useMemo(() => {
        return getCalendarDataById(event.calendarId) || { name: "", text_color: "text-slate-700", background_color: "" };
    }, [event.calendarId, getCalendarDataById]);

    return (
        <div className="flex flex-row max-h-3/5 rounded-md overflow-hidden h-auto">
            <div className={`w-2 bg-current ${text_color}`} />
            <div className={`flex flex-col px-4 pt-3 min-w-48 ${background_color} pb-6`}>
                <p className="text-gray-400 py-1">{event.isAllDay ? 'Full day': timeText}</p>
                <h3 className="text-white font-bold">{event.title}</h3>
                { name && <p className={`${text_color}`}>{name}</p> }
            </div>
        </div>
    )
}
