import CalendarGrid from 'components/calendar/CalendarGrid';
import DayEventsDetailsGrid from 'components/calendar/DayEventsDetailsGrid';
import useToday from 'hooks/useToday';
import TopBar from './components/TopBar';
import './index.css';

function App() {
    const today = useToday();
    return (
        <div className="w-screen h-screen flex flex-col">
            <TopBar></TopBar> 
            <CalendarGrid></CalendarGrid>
            { today && <DayEventsDetailsGrid day={/* TODO pass closest day with any event */today}></DayEventsDetailsGrid>}
        </div>
    );
}

export default App;
