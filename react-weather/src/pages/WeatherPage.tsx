import {useParams, useSearchParams} from "react-router-dom";
import styles from "./style.module.css";
import {useEffect, useState} from "react";
import {getWeather, ResponseWeather} from "../api/getWeather";
import {WeatherDay} from "../components/weather-day/WeatherDay";

export const WeatherPage = () => {
  const [weather, setWeather] = useState<ResponseWeather | null>(null);

  const {city} = useParams();
  const [searchParams] = useSearchParams();
  const coords = searchParams.get("coords");

  useEffect(() => {
    if (coords) {
      getWeather(coords).then((weather) => {
        setWeather(weather);
      });
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h3>Прогноз в городе {city} на 3 дня.</h3>
      {weather &&
        weather.forecast.forecastday.map((item) => (
          <WeatherDay
            key={item.date}
            date={item.date}
            maxTemp={item.day.maxtemp_c}
            minTemp={item.day.mintemp_c}
            description={item.day.condition.text}
          />
        ))}
    </div>
  );
};