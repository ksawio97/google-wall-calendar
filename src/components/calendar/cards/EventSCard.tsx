import CalendarEvent from "types/CalendarEvent"

type Props = { event: CalendarEvent }

export default function EventSCard({ event }: Props) {
  return (
    <li 
        className={`${event.type?.bgcolor || "bg-slate-600"} ${event.type?.txtcolor || "text-slate-200"}
            p-2 rounded-md
            overflow-hidden overflow-ellipsis`}>
        {event.title}
    </li>
  )
}
