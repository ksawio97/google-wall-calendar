import { useEffect, useState } from "react";
import getDateTime from "utils/getDateTime";

export default function useClock() {
    const [[hour, minute, second], setClock] = useState(["", "", ""]);

    useEffect(() => {
        // set base clock time
        setClock(getDateTime(new Date()));

        // update time every second
        const clockInterval = setInterval(() => {
            setClock(getDateTime(new Date()));
        }, 1000);

        return () => {
            clearInterval(clockInterval);
        };
    }, []);


    return [hour, minute, second];
}
