export default function getWeeksDays(currDate: Date) {
    const firstMonday = new Date(currDate);
    const days = (currDate.getDay() + 6) % 7;
        
    firstMonday.setTime(currDate.getTime() - days * 24 * 60 * 60 * 1000);
    
    return Array.from({ length: 14 }, (_, index) => {
        const day = new Date(firstMonday);
        day.setDate(firstMonday.getDate() + index);
        return day;
    });
}
