import theme from '@/common/theme'
import { browserHistory } from '@/common/utils'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { Provider as MobxProvider } from 'mobx-react'
import * as React from 'react'
import { Router } from 'react-router-dom'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import stores from './stores'

export const App: React.FC<any> = () => (
  <React.Fragment>
    <Header />
    <Content />
    <Footer />
  </React.Fragment>
)

const AppWithProviders: React.FC<any> = () => {
  return (
    <MobxProvider {...stores}>
      <Router history={browserHistory}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </MuiThemeProvider>
      </Router>
    </MobxProvider>
  )
}

export default AppWithProviders
