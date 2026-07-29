import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CalendarProvider } from 'hooks/useCalendars';
import { EventsProvider } from 'hooks/useEvents';
import { TodayProvider } from 'hooks/useToday';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <TodayProvider>
          <EventsProvider>
              <CalendarProvider>
                  <App/>
              </CalendarProvider>
          </EventsProvider>
      </TodayProvider>
  </React.StrictMode>
);
