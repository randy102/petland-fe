import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PetlandAppBar from './components/PetlandAppBar';
import IndexPage from './pages';
import petlandTheme from './petlandTheme';

function App() {
  return (
    <ThemeProvider theme={petlandTheme}>
      <CssBaseline />

      <PetlandAppBar />

      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
