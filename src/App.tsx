import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'src/components/AppBar';
import LoginAndRegisterModal from './components/LoginAndRegisterModal';
import IndexPage from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar />

      <LoginAndRegisterModal />

      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
