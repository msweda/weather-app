import { BasicPage } from '@/common/components'
import { createShallow } from '@material-ui/core/test-utils'
import * as React from 'react'
import Weather from '../index'
import WeatherWidget from '../WeatherWidget'

describe('<Weather />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Weather })
    wrapper = shallow(<Weather />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a <BasicPage> that contains a <WeatherWidget>', () => {
    const basicPage = wrapper.find(BasicPage)
    expect(basicPage.exists()).toBeTruthy()
    expect(basicPage.contains(<WeatherWidget />)).toBeTruthy()
  })
})
