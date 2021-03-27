import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'src/components/AppBar';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import IndexPage from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar />

      <LoginDialog />

      <RegisterDialog />

      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
