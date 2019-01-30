// create palette here: https://material.io/color/

import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#2d4671',
    },
    secondary: {
      main: '#6ba099',
    },
    background: {
      default: '#2d4671',
      paper: '#eee',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          display: 'flex',
          minHeight: '100vh',
        },
        '#app': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
})
