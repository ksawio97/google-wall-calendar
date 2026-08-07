import useWeatherInfo from "hooks/useWeatherInfo";

export default function Weather() {
    const weather_info = useWeatherInfo();
    return (<div className="flex flex-row gap-4 rounded-md p-2 text-outline text-xl place-items-center">
                <div className="flex flex-row gap-2 place-items-center">
                    <span className="text-5xl">{weather_info?.weather_icon}</span>
                    <div className="flex flex-col col-1">
                        <p className="text-on-surface text-2xl">{weather_info?.temperature}°C</p>
                        <p className="text-lg">{weather_info?.weather_desc}</p>
                    </div>
                </div>
                <div className="col-1 flex flex-col">
                    <p>💧{weather_info?.relative_humidity}% <span className="text-lg">humidity</span></p>
                    <p>༄ {weather_info?.wind_speed} <span className="text-lg">km/h Warsaw</span></p>
                </div>
            </div>);

}
