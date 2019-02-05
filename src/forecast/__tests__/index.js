import { BasicPage } from '@/common/components'
import { createShallow } from '@material-ui/core/test-utils'
import * as React from 'react'
import ForecastWidget from '../ForecastWidget'
import Forecast from '../index'

describe('<Forecast />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Forecast })
    wrapper = shallow(<Forecast />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a <BasicPage> that contains a <ForecastWidget>', () => {
    const basicPage = wrapper.find(BasicPage)
    expect(basicPage.exists()).toBeTruthy()
    expect(basicPage.contains(<ForecastWidget />)).toBeTruthy()
  })
})
