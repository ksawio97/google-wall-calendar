import useToday from "hooks/useToday";
import Clock from "./clock/Clock";
import DateDisplay from "./date/DateDisplay";
import HorizontalDivider from "./HorizontalDivider";
import Weather from "./weather/Weather";

function TopBar() {
    const today = useToday();

    return (
        <div className="min-h-0 text-2xl px-4 w-full h-1/8 overflow-y-auto flex flex-row gap-6 center place-items-center">
            <Clock></Clock> 
            <HorizontalDivider className="h-1/2 bg-surface-container-highest w-1"/>
            { today && <DateDisplay day={today}></DateDisplay> }
            <div className="ml-auto">
                <Weather></Weather>
            </div>
        </div>)
};

export default TopBar;
