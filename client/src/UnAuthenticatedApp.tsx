import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Header } from './components/AuthHeader'
import { Login } from './pages/Login';


const UnAuthenticatedApp = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export { UnAuthenticatedApp };
