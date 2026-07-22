import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CalendarProvider } from 'hooks/useCalendars';
import { EventsProvider } from 'hooks/useEvents';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <EventsProvider>
          <CalendarProvider>
              <App/>
          </CalendarProvider>
      </EventsProvider>
  </React.StrictMode>
);
