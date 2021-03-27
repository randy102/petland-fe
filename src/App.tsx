import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'src/components/AppBar';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import IndexPage from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar />

      <LoginModal />

      <RegisterModal />

      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
