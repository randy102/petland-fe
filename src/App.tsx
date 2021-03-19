import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Default from './default';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Switch>
        <Route path="/">
          <Default />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
