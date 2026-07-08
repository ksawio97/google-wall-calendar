import useWeatherInfo from "hooks/useWeatherInfo";

export default function Weather() {
    const weather_info = useWeatherInfo();
    return (<div className="grid grid-cols-2">
                <div className="flex flex-row">
                    <span className="text-4xl">{weather_info?.weather_icon}</span>
                    <div className="flex flex-col col-1">
                        <p>{weather_info?.temperature}°C</p>
                        <p>{weather_info?.weather_desc}</p>
                    </div>
                </div>
                <div className="col-1 flex flex-col">
                    <p>💧{weather_info?.relative_humidity}% humidity</p>
                    <p>༄{weather_info?.wind_speed} km/h Warsaw</p>
                </div>
            </div>);

}
