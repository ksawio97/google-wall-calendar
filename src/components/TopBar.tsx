import Clock from "./clock/Clock";
import Date from "./date/Date";

function TopBar() {
    return (
        <div className="p-4 w-full bg-red-700 h-auto flex flex-row gap-4 center place-items-center">
            <Clock></Clock> 
            <Date></Date>
        </div>)
};

export default TopBar;
