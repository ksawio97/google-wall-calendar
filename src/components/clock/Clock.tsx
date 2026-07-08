import useClock from "hooks/useClock";

export default function Clock() {
    const [hour, minute, second] = useClock();
    return (
        <div>
            {hour} : {minute} : {second}
        </div>
    );
}
