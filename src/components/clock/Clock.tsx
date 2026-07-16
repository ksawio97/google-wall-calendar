import useClock from "hooks/useClock";

export default function Clock() {
    const [hour, minute, second] = useClock();
    return (
        <h2 className="text-5xl">
            {hour}:{minute}:{second}
        </h2>
    );
}
