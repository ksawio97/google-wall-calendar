import useClock from "hooks/useClock";

export default function Clock() {
    const [hour, minute, second] = useClock();
    return (
        <h2 className="text-on-primary-container text-8xl">
            {hour}:{minute}<span className="text-on-surface text-6xl">:{second}</span>
        </h2>
    );
}
