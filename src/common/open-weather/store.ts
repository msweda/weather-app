import { AsyncStatus } from '@/common/enums'
import { getCurrentPosition } from '@/common/utils'
import { action, computed, flow, observable } from 'mobx'
import { UnitType } from './enums'
import { ForecastData, WeatherData } from './interfaces'
import OpenWeatherService from './service'

class OpenWeatherStore {
  @observable unitType: UnitType
  @observable weatherData?: WeatherData
  @observable weatherStatus: AsyncStatus
  @observable forecastData?: ForecastData
  @observable forecastStatus: AsyncStatus

  constructor() {
    this.unitType = UnitType.Scientific
    this.weatherStatus = AsyncStatus.Idle
    this.forecastStatus = AsyncStatus.Idle
  }

  @computed get weatherInProgress(): boolean {
    return this.weatherStatus === AsyncStatus.InProgress
  }

  @computed get weatherSucceeded(): boolean {
    return this.weatherStatus === AsyncStatus.Succeeded
  }

  @computed get weatherFailed(): boolean {
    return this.weatherStatus === AsyncStatus.Failed
  }

  @computed get forecastInProgress(): boolean {
    return this.forecastStatus === AsyncStatus.InProgress
  }

  @computed get forecastSucceeded(): boolean {
    return this.forecastStatus === AsyncStatus.Succeeded
  }

  @computed get forecastFailed(): boolean {
    return this.forecastStatus === AsyncStatus.Failed
  }

  @action
  setUnitType(unitType: UnitType) {
    this.unitType = unitType
  }

  getWeatherGenerator = function*(this: OpenWeatherStore) {
    this.weatherStatus = AsyncStatus.InProgress
    try {
      const position: Position = yield getCurrentPosition()
      const response = yield OpenWeatherService.getWeather(position.coords, {
        unitType: this.unitType,
      })
      this.weatherData = response.data
      this.weatherStatus = AsyncStatus.Succeeded
    } catch (error) {
      this.weatherData = undefined
      this.weatherStatus = AsyncStatus.Failed
    }
  }
  getWeather = flow(this.getWeatherGenerator)

  @action
  clearWeather() {
    this.weatherData = undefined
    this.weatherStatus = AsyncStatus.Idle
  }

  getForecastGenerator = function*(this: OpenWeatherStore) {
    this.forecastStatus = AsyncStatus.InProgress
    try {
      const position = yield getCurrentPosition()
      const response = yield OpenWeatherService.getForecast(position.coords, {
        unitType: this.unitType,
      })
      this.forecastData = response.data
      this.forecastStatus = AsyncStatus.Succeeded
    } catch (error) {
      this.forecastData = undefined
      this.forecastStatus = AsyncStatus.Failed
    }
  }
  getForecast = flow(this.getForecastGenerator)

  @action
  clearForecast() {
    this.forecastData = undefined
    this.forecastStatus = AsyncStatus.Idle
  }
}

export default OpenWeatherStore
