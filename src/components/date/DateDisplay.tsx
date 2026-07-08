import useDay from "hooks/useDay"

export default function DateDisplay() {
    const day = useDay();

    return (<div className="flex flex-col">
                <div>{day.toLocaleDateString('en-US', { weekday: "long"})}</div>       
                <div>{day.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}</div>

            </div>)
}
