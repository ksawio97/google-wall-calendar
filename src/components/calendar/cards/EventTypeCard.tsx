import CalendarEventType from "types/CalendarEventType"

type Props = {
    eventType: CalendarEventType
}

export default function EventTypeCard({ eventType }: Props) {
  return (
    <p className={`p-2 h-min rounded-md ${eventType.bgcolor} ${eventType.txtcolor}`}>
        {eventType.name}
    </p>
  )
}
