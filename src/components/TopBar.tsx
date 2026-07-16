import useToday from "hooks/useToday";
import Clock from "./clock/Clock";
import DateDisplay from "./date/DateDisplay";
import Weather from "./weather/Weather";

function TopBar() {
    const today = useToday();

    return (
        <div className="text-xl p-6 w-full bg-slate-600 text-white h-auto flex flex-row gap-4 center place-items-center">
            <Clock></Clock> 
            { today && <DateDisplay day={today}></DateDisplay> }
            <Weather></Weather>
        </div>)
};

export default TopBar;
