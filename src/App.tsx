import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppBar from 'src/components/AppBar'
import LoginDialog from './components/LoginDialog'
import RegisterDialog from './components/RegisterDialog'
import IndexPage from './pages'
import store from './redux/store'
import theme from './theme'

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

            <Switch>
              <Route path="/">
                <IndexPage />
              </Route>
            </Switch>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
