import CalendarGrid from 'components/calendar/CalendarGrid';
import DayEventsDetailsGrid from 'components/calendar/DayEventsDetailsGrid';
import useEvents from 'hooks/useEvents';
import TopBar from './components/TopBar';
import './index.css';

function App() {
    const { closestEventDayDateKey } = useEvents()

    return (
        <div className="w-screen h-screen flex flex-col bg-surface gap-4 p-4">
            <TopBar></TopBar> 
            <CalendarGrid></CalendarGrid>
            { closestEventDayDateKey && <DayEventsDetailsGrid day={new Date(closestEventDayDateKey)}></DayEventsDetailsGrid>}
        </div>
    );
}

export default App;
