import { useEffect, useState } from "react";

function getClockTime(): [string, string, string] {
    const time = new Date();
    // minutes and seconds have 0 before number if < 10
    return [...[time.getHours().toString()], ...([time.getMinutes(), time.getSeconds()].map(num => (num < 10 ? "0" : "") + num.toString()))] as [string, string, string];

}
export default function useClock() {
    const [[hour, minute, second], setClock] = useState(["", "", ""]);

    useEffect(() => {
        // set base clock time
        setClock(getClockTime());

        // update time every second
        const clockInterval = setInterval(() => {
            setClock(getClockTime());
        }, 1000);

        return () => {
            clearInterval(clockInterval);
        };
    }, []);


    return [hour, minute, second];
}
