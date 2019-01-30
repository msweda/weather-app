import { RootRoute } from '@/common/enums'
import Forecast from '@/forecast/index'
import Weather from '@/weather/index'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Content from '../Content'

describe('<Content />', () => {
  it('should match snapshot', () => {
    const shallow = createShallow({ untilSelector: 'Content' })
    const wrapper = shallow(<Content />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('routing', () => {
    let mount

    beforeEach(() => {
      mount = createMount()
    })

    afterEach(() => {
      mount.cleanUp()
    })

    it('should render <Weather /> for the appropriate url', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[RootRoute.Weather]}>
          <Content />
        </MemoryRouter>
      )
      expect(wrapper.find(Weather).exists()).toBeTruthy()
      expect(wrapper.find(Forecast).exists()).toBeFalsy()
    })

    it('should render the <Forecast /> component for the appropriate url', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[RootRoute.Forecast]}>
          <Content />
        </MemoryRouter>
      )
      expect(wrapper.find(Weather).exists()).toBeFalsy()
      expect(wrapper.find(Forecast).exists()).toBeTruthy()
    })

    it('should render the <Weather /> component when the url matches no known route', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/some-other-route']}>
          <Content />
        </MemoryRouter>
      )
      expect(wrapper.find(Weather).exists()).toBeTruthy()
      expect(wrapper.find(Forecast).exists()).toBeFalsy()
    })
  })
})
