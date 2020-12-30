import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Header } from './components/AuthHeader'
import { Dashboard } from './pages/Dashboard';


function AuthenticatedApp() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
