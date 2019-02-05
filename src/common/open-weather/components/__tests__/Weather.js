import { createShallow } from '@material-ui/core/test-utils'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { weatherIconUrl } from '../../strings'
import Weather from '../Weather'

describe('<Weather />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Weather })
    wrapper = shallow(<Weather weather={mockWeather} />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an icon and text for each weather array element', () => {
    const weather = wrapper.instance().props.weather
    for (let i = 0; i < weather.length; i++) {
      const img = wrapper.find('img').at(i)
      expect(img.exists()).toBeTruthy()
      expect(img.props().src).toEqual(weatherIconUrl(weather[i].icon))
      const typography = wrapper.find(Typography).at(i)
      expect(typography.exists()).toBeTruthy()
      expect(typography.children().text()).toEqual(weather[i].main)
    }
  })
})

const mockWeather = [
  {
    id: 521,
    main: 'Rain',
    description: 'shower rain',
    icon: '09n',
  },
  {
    id: 701,
    main: 'Mist',
    description: 'mist',
    icon: '50n',
  },
]
