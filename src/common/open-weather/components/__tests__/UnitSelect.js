import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { shallow } from 'enzyme'
import * as React from 'react'
import { UnitType } from '../../enums'
import OpenWeatherStore from '../../store'
import UnitSelect from '../UnitSelect'

jest.mock('../../store')

const openWeatherStore = new OpenWeatherStore()

describe('<UnitSelect />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <UnitSelect.wrappedComponent
        openWeatherStore={openWeatherStore}
        classes={{}}
      />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('provides an option for Kelvin', () => {
    const menuItem = wrapper.find(MenuItem).at(0)
    expect(menuItem.children().text()).toEqual('Kelvin')
  })

  it('provides an option for Celsius', () => {
    const menuItem = wrapper.find(MenuItem).at(1)
    expect(menuItem.children().text()).toEqual('Celsius')
  })

  it('provides an option for Fahrenheit', () => {
    const menuItem = wrapper.find(MenuItem).at(2)
    expect(menuItem.children().text()).toEqual('Fahrenheit')
  })

  it('informs the store to update its unit type on changes', () => {
    wrapper
      .find(Select)
      .simulate('change', { target: { value: UnitType.Metric } })
    expect(openWeatherStore.setUnitType).toHaveBeenCalledWith(UnitType.Metric)
    wrapper
      .find(Select)
      .simulate('change', { target: { value: UnitType.Imperial } })
    expect(openWeatherStore.setUnitType).toHaveBeenCalledWith(UnitType.Imperial)
    wrapper
      .find(Select)
      .simulate('change', { target: { value: UnitType.Scientific } })
    expect(openWeatherStore.setUnitType).toHaveBeenCalledWith(
      UnitType.Scientific
    )
  })

  it('informs the store to clear its weather and forecast data on change', () => {
    wrapper
      .find(Select)
      .simulate('change', { target: { value: UnitType.Metric } })
    expect(openWeatherStore.clearWeather).toHaveBeenCalled()
    expect(openWeatherStore.clearForecast).toHaveBeenCalled()
  })
})
