import useDay from "hooks/useDay";
import useEvents from "hooks/useEvents";

function CalendarGrid() {
    const { getEventsByDay } = useEvents();
    const currDate = useDay();

    return (
        <table className="grid grid-rows-2 grid-cols-7">


        </table>
    );
}

export default CalendarGrid;
