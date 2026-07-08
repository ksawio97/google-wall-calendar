import { useEffect, useState } from "react";
import WeatherInfo from "types/WeatherInfo";
import { getWeatherIcon, getWeatherDescription } from "utils/weatherUtils";

type RawWeatherInfo = {
    relative_humidity_2m: number;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
};

async function readStreamAsJSON(url: string): Promise<RawWeatherInfo> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.current) {
        throw new Error("Invalid data format received from Weather API");
    }

    return data.current as RawWeatherInfo;
}

function getAPIUrl() {
    const date = (new Date()).toLocaleDateString('en-CA');
    // TODO add setting latitude and longitude so its not only warsaw weather available
    return `https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto&start_date=${date}&end_date=${date}`;
}

async function fetchWeatherInfo(): Promise<WeatherInfo> {
    const rawWeatherInfo = await readStreamAsJSON(getAPIUrl());

    return {
        relative_humidity: rawWeatherInfo.relative_humidity_2m,
        temperature: rawWeatherInfo.temperature_2m,
        wind_speed: rawWeatherInfo.wind_speed_10m,
        weather_icon: getWeatherIcon(rawWeatherInfo.weather_code),
        weather_desc: getWeatherDescription(rawWeatherInfo.weather_code),
    };
} 

export default function useWeatherInfo() {
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();
    // TODO add loading and error state
    useEffect(() => {
        fetchWeatherInfo().then(info => setWeatherInfo(info));

        const intervalId = setInterval(() => {
            fetchWeatherInfo().then(info => setWeatherInfo(info));
        }, 10 * 60 * 1000); // 10 minutes
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    

    return weatherInfo;
}
