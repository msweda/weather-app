import axios from 'axios'
import { UnitType } from './enums'

class OpenWeatherService {
  static getWeather(coords: Coordinates, options?: Options) {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather`
    let url = withAppId(baseUrl)
    url = withCoords(url, coords)
    if (options !== undefined) {
      url = withOptions(url, options)
    }
    return axios.get(url)
  }

  static getForecast(coords: Coordinates, options?: Options) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'
    let url = withAppId(baseUrl)
    url = withCoords(url, coords)
    if (options !== undefined) {
      url = withOptions(url, options)
    }
    return axios.get(url)
  }
}

function withAppId(baseUrl: string): string {
  return `${baseUrl}?APPID=${process.env.OPEN_WEATHER_API_KEY}`
}

function withCoords(urlWithAppId: string, coords: Coordinates): string {
  return `${urlWithAppId}&lat=${coords.latitude}&lon=${coords.longitude}`
}

function withOptions(urlWithAppId: string, options: Options): string {
  let url = urlWithAppId
  if (options.unitType !== undefined) {
    if (options.unitType !== UnitType.Scientific) {
      url = `${url}&units=${options.unitType}`
    }
  }
  return url
}

interface Options {
  unitType?: UnitType
}

export const testable = {
  withAppId,
  withCoords,
  withOptions,
}

export default OpenWeatherService
