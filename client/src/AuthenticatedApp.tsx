import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Header } from './components/AuthHeader'
import { BookSearch } from './pages/BookSearch';
import { Dashboard } from './pages/Dashboard';


function AuthenticatedApp() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/search" exact>
          <BookSearch />
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
