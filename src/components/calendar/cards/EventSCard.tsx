import { useCalendars } from "hooks/useCalendars"
import { useMemo } from "react";
import CalendarEvent from "types/CalendarEvent"

type Props = { event: CalendarEvent }

export default function EventSCard({ event }: Props) {
    const { getCalendarDataById } = useCalendars();

    const { text_color, background_color } = useMemo(() => {
        return getCalendarDataById(event.calendarId) || { name: "", text_color: "text-slate-700", background_color: "" };
    }, [event.calendarId, getCalendarDataById]);

    return (
    <li 
        className={`${background_color} ${text_color}
            p-2 rounded-md
            overflow-hidden overflow-ellipsis`}>
        {event.title}
    </li>
  )
}
