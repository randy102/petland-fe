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

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top'
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
      </BrowserRouter>
    </Provider>
  )
}

export default App
