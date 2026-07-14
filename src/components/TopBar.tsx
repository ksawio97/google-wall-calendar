import Clock from "./clock/Clock";
import DateDisplay from "./date/DateDisplay";
import Weather from "./weather/Weather";

function TopBar() {
    return (
        <div className="p-4 w-full bg-slate-600 text-white h-auto flex flex-row gap-4 center place-items-center">
            <Clock></Clock> 
            <DateDisplay></DateDisplay>
            <Weather></Weather>
        </div>)
};

export default TopBar;
