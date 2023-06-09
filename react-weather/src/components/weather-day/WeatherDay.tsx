import styles from './style.module.css'

interface IWeatherDay {
  date: string
  maxTemp: number
  minTemp: number
  description: string
}

export const WeatherDay = ({date, maxTemp, minTemp, description}:IWeatherDay) => {
  return <div className={styles.container}>
    <div>{date}</div>
    <div>{description}</div>
    <div>максимальная температура : {maxTemp}</div>
    <div>минимальная температура : {minTemp}</div>
  </div>
}