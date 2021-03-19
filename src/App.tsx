import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Default from './default';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Default />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
