import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppBar from 'src/components/shared/AppBar'
import LoginDialog from './components/shared/LoginDialog'
import RegisterDialog from './components/shared/RegisterDialog'
import store from './redux/store'
import Routes from './Routes'
import theme from './theme'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'

// Base URL for all requests
axios.defaults.baseURL = 'https://petland-cnpm.herokuapp.com/api'

// Add token to each request before firing
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
})

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              autoHideDuration={3000}
              maxSnack={3}
              resumeHideDuration={0}
              TransitionComponent={Grow as React.ComponentType<TransitionProps>}
            >
              <CssBaseline />

              <AppBar />

              <LoginDialog />

              <RegisterDialog />

              <Container maxWidth="lg">
                <Box py={2}>
                  <Routes />
                </Box>
              </Container>
            </SnackbarProvider>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
