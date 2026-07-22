import Calendar from "types/Calendar"

type Props = {
    calendar: Calendar 
}

export default function EventTypeCard({ calendar }: Props) {
  return (
    <p className={`p-2 h-min rounded-md ${calendar.background_color} ${calendar.text_color}`}>
        {calendar.name}
    </p>
  )
}
