import { useMemo } from "react"
import CalendarEvent from "types/CalendarEvent"
import getDateTime from "utils/getDateTime";

type Props = {
    event: CalendarEvent,
}

export default function EventDetailsCard({ event }: Props) {
    const [hour, minute, _] = useMemo(() => 
        getDateTime(event.start)
    ,[event]); 
    return (
        <div className="flex flex-row h-3/5 rounded-md overflow-hidden">
            <div className={`w-2 bg-current ${event.type?.txtcolor || "text-slate-700"}`} />
            <div className={`flex flex-col px-4 pt-3 ${event.type?.bgcolor}`}>
                <p className="text-gray-400 py-1">{hour}:{minute}</p>
                <h3 className="text-white font-bold">{event.title}</h3>
                { event.type && <p className={`${event.type?.txtcolor}`}>{event.type?.name}</p> }
            </div>
        </div>
    )
}
