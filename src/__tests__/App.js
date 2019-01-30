import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { shallow } from 'enzyme'
import { Provider as MobxProvider } from 'mobx-react'
import * as React from 'react'
import { Router } from 'react-router-dom'
import { App, default as AppWithProviders } from '../App'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render <Header />', () => {
    expect(wrapper.find(Header).exists()).toBeTruthy()
  })

  it('should render <Content />', () => {
    expect(wrapper.find(Content).exists()).toBeTruthy()
  })

  it('should render <Footer />', () => {
    expect(wrapper.find(Footer).exists()).toBeTruthy()
  })
})

describe('<AppWithProviders />', () => {
  const wrapper = shallow(<AppWithProviders />)

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should provide mobx', () => {
    expect(wrapper.find(MobxProvider).exists()).toBeTruthy()
  })

  it('should provide routing', () => {
    expect(wrapper.find(Router).exists()).toBeTruthy()
  })

  it('should provide a theme', () => {
    expect(wrapper.find(MuiThemeProvider).exists()).toBeTruthy()
  })

  it('should provide a clean css styling', () => {
    expect(wrapper.find(CssBaseline).exists()).toBeTruthy()
  })
})
