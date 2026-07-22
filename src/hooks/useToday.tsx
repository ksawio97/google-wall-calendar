import { useState, useEffect } from 'react';

// TODO share data between all instances
export default function useToday() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Check the time every 60 seconds
    const intervalId = setInterval(() => {
      const now = new Date();
      
      // day changed
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [currentDate]);

  return currentDate;
}
