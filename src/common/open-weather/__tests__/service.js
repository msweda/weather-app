import axios from 'axios'
import { UnitType } from '../enums'
import OpenWeatherService, { testable } from '../service'

jest.mock('axios')

const mockOpenWeatherApiKey = 'abc123'
const mockCoords = {
  latitude: 10,
  longitude: 10,
}

describe('OpenWeatherService', () => {
  let _openWeatherApiKey

  beforeEach(() => {
    _openWeatherApiKey = global.process.env.OPEN_WEATHER_API_KEY
    global.process.env.OPEN_WEATHER_API_KEY = mockOpenWeatherApiKey
  })

  afterEach(() => {
    global.process.env.OPEN_WEATHER_API_KEY = _openWeatherApiKey
  })

  describe('getWeather', () => {
    it('hits the correct url with querystring params appId and coords', () => {
      OpenWeatherService.getWeather(mockCoords)
      const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and scientific unit type', () => {
      OpenWeatherService.getWeather(mockCoords, {
        unitType: UnitType.Scientific,
      })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and metric unit type', () => {
      OpenWeatherService.getWeather(mockCoords, { unitType: UnitType.Metric })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}&units=metric`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and imperial unit type', () => {
      OpenWeatherService.getWeather(mockCoords, { unitType: UnitType.Imperial })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}&units=imperial`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })
  })

  describe('getForecast', () => {
    it('hits the correct url with querystring params appId and coords', () => {
      OpenWeatherService.getForecast(mockCoords)
      const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and scientific unit type', () => {
      OpenWeatherService.getForecast(mockCoords, {
        unitType: UnitType.Scientific,
      })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and metric unit type', () => {
      OpenWeatherService.getForecast(mockCoords, { unitType: UnitType.Metric })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}&units=metric`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })

    it('hits the correct url with querystring params appId, coords, and imperial unit type', () => {
      OpenWeatherService.getForecast(mockCoords, {
        unitType: UnitType.Imperial,
      })
      const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=${mockOpenWeatherApiKey}&lat=${
        mockCoords.latitude
      }&lon=${mockCoords.longitude}&units=imperial`
      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
      axios.get.mockReset()
    })
  })
})

describe('OpenWeatherService helpers', () => {
  describe('withAppId', () => {
    it('adds the start of a querystring with an APPID parameter', () => {
      const _openWeatherApiKey = global.process.env.OPEN_WEATHER_API_KEY
      global.process.env.OPEN_WEATHER_API_KEY = mockOpenWeatherApiKey
      const baseUrl = 'www.example.com/api/endpoint'
      expect(testable.withAppId(baseUrl)).toEqual(
        `${baseUrl}?APPID=${mockOpenWeatherApiKey}`
      )
      global.process.env.OPEN_WEATHER_API_KEY = _openWeatherApiKey
    })
  })

  describe('withCoords', () => {
    it('adds lat and lon querystring parameters', () => {
      const url = `www.example.com/api/endpoint?APPID=${mockOpenWeatherApiKey}`
      expect(testable.withCoords(url, mockCoords)).toEqual(
        `${url}&lat=${mockCoords.latitude}&lon=${mockCoords.longitude}`
      )
    })
  })

  describe('withOptions', () => {
    describe('unitType option', () => {
      it('scientific unit type adds no querystring parameter', () => {
        const url = `www.example.com/api/endpoint?APPID=${mockOpenWeatherApiKey}&lat=${
          mockCoords.latitude
        }&lon=${mockCoords.longitude}`
        expect(
          testable.withOptions(url, {
            unitType: UnitType.Scientific,
          })
        ).toEqual(url)
      })

      it('metric unit type adds units querystring parameter', () => {
        const url = `www.example.com/api/endpoint?APPID=${mockOpenWeatherApiKey}&lat=${
          mockCoords.latitude
        }&lon=${mockCoords.longitude}`
        expect(
          testable.withOptions(url, {
            unitType: UnitType.Metric,
          })
        ).toEqual(`${url}&units=metric`)
      })

      it('imperial unit type adds units querystring parameter', () => {
        const url = `www.example.com/api/endpoint?APPID=${mockOpenWeatherApiKey}&lat=${
          mockCoords.latitude
        }&lon=${mockCoords.longitude}`
        expect(
          testable.withOptions(url, {
            unitType: UnitType.Imperial,
          })
        ).toEqual(`${url}&units=imperial`)
      })
    })
  })
})
