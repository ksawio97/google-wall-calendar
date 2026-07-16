export default function getDateTime(date: Date): [string, string, string] {
    // minutes and seconds have 0 before number if < 10
    return [...[date.getHours().toString()], ...([date.getMinutes(), date.getSeconds()].map(num => (num < 10 ? "0" : "") + num.toString()))] as [string, string, string];
}
