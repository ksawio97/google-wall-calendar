export default function DateDisplay({ day }: { day: Date }) {
    return (<div className="flex flex-col text-on-surface">
                <div className="text-outline">{day.toLocaleDateString('en-US', { weekday: "long"})}</div>       
                <div>{day.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}</div>

            </div>)
}
