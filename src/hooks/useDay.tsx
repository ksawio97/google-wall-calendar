import { useState, useEffect } from 'react';

export default function useDay() {
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
