import CalendarGrid from 'components/calendar/CalendarGrid';
import React from 'react';
import TopBar from './components/TopBar';
import './index.css';

function App() {
  return (
    <div className="w-screen h-screen">
        <TopBar></TopBar> 
        <CalendarGrid></CalendarGrid>
    </div>
  );
}

export default App;
