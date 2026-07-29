import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

const TodayContext = createContext<Date | null>(null);
export const TodayProvider = ({ children }: { children: ReactNode }) => {
    
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

    return (
        <TodayContext.Provider value={currentDate}>
            {children}
        </TodayContext.Provider>
    );

}

export default function useToday() {
    const context = useContext(TodayContext);
    
    if (!context) {
        throw new Error('useToday must be used within an TodayContextProvider');
    }
    
    return context;
}
