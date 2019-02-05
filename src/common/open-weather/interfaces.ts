export interface WeatherData {
  weather: Weather
  main: Main
}

export type Weather = WeatherArrayElement[]

export interface WeatherArrayElement {
  main: string
  icon: string
}

export interface Main {
  temp: number
}

export interface ForecastData {
  list: ForecastWeatherData[]
}

export interface ForecastWeatherData extends WeatherData {
  dt: number
}
