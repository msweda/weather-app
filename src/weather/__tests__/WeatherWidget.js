import { UnitSelect, Weather } from '@/common/open-weather/components'
import OpenWeatherStore from '@/common/open-weather/store'
import { noGeolocation, weatherFailed } from '@/common/open-weather/strings'
import { isGeolocationAvailable } from '@/common/utils'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { shallow } from 'enzyme'
import * as React from 'react'
import WeatherWidget from '../WeatherWidget'

jest.mock('@/common/open-weather/store')
jest.mock('@/common/utils')

describe('<WeatherWidget />', () => {
  let openWeatherStore
  let wrapper

  function createWrapper() {
    return shallow(
      <WeatherWidget.wrappedComponent
        openWeatherStore={openWeatherStore}
        classes={{}}
      />
    )
  }

  beforeEach(() => {
    openWeatherStore = new OpenWeatherStore()
    wrapper = createWrapper()
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('displays a disclaimer when geolocation is not available', () => {
    isGeolocationAvailable.mockImplementationOnce(() => false)
    wrapper = createWrapper()
    const typography = wrapper.find(Typography)
    expect(typography.exists()).toBeTruthy()
    expect(typography.children().text()).toEqual(noGeolocation)
  })

  describe('navigator.geolocation is defined', () => {
    beforeEach(() => {
      isGeolocationAvailable.mockImplementationOnce(() => true)
    })

    it('renders a <UnitSelect />', () => {
      wrapper = createWrapper()
      const unitSelect = wrapper.find(UnitSelect)
      expect(unitSelect.exists()).toBeTruthy()
    })

    describe('renderGetWeatherButton', () => {
      it('renders a <CircularProgress /> when weather is in progress', () => {
        openWeatherStore.weatherInProgress = true
        wrapper = createWrapper()
        const circularProgress = wrapper.find(CircularProgress)
        expect(circularProgress.exists()).toBeTruthy()
      })

      it('renders a get weather <Button /> when weather is not in progress', () => {
        openWeatherStore.weatherInProgress = false
        wrapper = createWrapper()
        const button = wrapper.find(Button)
        expect(button.exists()).toBeTruthy()
        expect(button.children().text()).toEqual('Get Weather')
      })
    })

    describe('renderWeatherBlock', () => {
      it('renders <Typography /> for temperature and <Weather /> when weather succeeded and is defined', () => {
        openWeatherStore.weatherInProgress = false
        openWeatherStore.weatherSucceeded = true
        openWeatherStore.weatherData = mockWeatherData
        wrapper = createWrapper()
        const typography = wrapper.find(Typography)
        expect(typography).toHaveLength(3)
        expect(
          typography
            .at(0)
            .children()
            .text()
        ).toEqual('The current temperature in your area is:')
        expect(
          typography
            .at(2)
            .children()
            .text()
        ).toEqual('Conditions:')
        const weather = wrapper.find(Weather)
        expect(weather.exists()).toBeTruthy()
        expect(weather.props().weather).toEqual(mockWeatherData.weather)
      })

      it('renders a disclaimer when weather fails', () => {
        openWeatherStore.weatherInProgress = false
        openWeatherStore.weatherFailed = true
        wrapper = createWrapper()
        const typography = wrapper.find(Typography)
        expect(typography.exists()).toBeTruthy()
        expect(typography.children().text()).toEqual(weatherFailed)
      })

      it('renders null when weather neither succeeded nor failed', () => {
        expect(wrapper.instance().renderWeatherBlock()).toBeNull()
      })
    })
  })
})

const mockWeatherData = {
  coord: {
    lon: -83.4,
    lat: 42.33,
  },
  weather: [
    {
      id: 602,
      main: 'Snow',
      description: 'heavy snow',
      icon: '13n',
    },
    {
      id: 721,
      main: 'Haze',
      description: 'haze',
      icon: '50n',
    },
    {
      id: 701,
      main: 'Mist',
      description: 'mist',
      icon: '50n',
    },
  ],
  base: 'stations',
  main: {
    temp: 37.38,
    pressure: 1017,
    humidity: 75,
    temp_min: 35.6,
    temp_max: 41.36,
  },
  visibility: 9656,
  wind: {
    speed: 12.75,
    deg: 210,
  },
  snow: {
    '1h': 76,
  },
  clouds: {
    all: 75,
  },
  dt: 1549151760,
  sys: {
    type: 1,
    id: 3869,
    message: 0.0047,
    country: 'US',
    sunrise: 1549197911,
    sunset: 1549234209,
  },
  id: 5014681,
  name: 'Westland',
  cod: 200,
}
