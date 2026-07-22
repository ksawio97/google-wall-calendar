import { useCalendars } from "hooks/useCalendars";
import { useMemo } from "react"
import CalendarEvent from "types/CalendarEvent"
import getDateTime from "utils/getDateTime";

type Props = {
    event: CalendarEvent,
}

export default function EventDetailsCard({ event }: Props) {
    const { getCalendarDataById } = useCalendars();

    const [hour, minute, _] = useMemo(() => 
        getDateTime(event.start)
    ,[event]); 

    const { name, text_color, background_color } = useMemo(() => {
        return getCalendarDataById(event.calendarId) || { name: "", text_color: "text-slate-700", background_color: "" };
    }, [event.calendarId, getCalendarDataById]);

    return (
        <div className="flex flex-row h-3/5 rounded-md overflow-hidden">
            <div className={`w-2 bg-current ${text_color}`} />
            <div className={`flex flex-col px-4 pt-3 min-w-48 ${background_color}`}>
                <p className="text-gray-400 py-1">{hour}:{minute}</p>
                <h3 className="text-white font-bold">{event.title}</h3>
                { name && <p className={`${text_color}`}>{name}</p> }
            </div>
        </div>
    )
}
