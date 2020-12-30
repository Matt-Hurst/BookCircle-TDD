import React, { useEffect, useState } from 'react';
import AuthenticatedApp from './AuthenticatedApp';
import './App.scss';
import { retrieveTokenFromLocalStorage } from './helpers';
import { UnAuthenticatedApp } from './UnAuthenticatedApp';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState< null | string >(null)

  const checkIfUserLoggedIn = async () => {
    const user = await retrieveTokenFromLocalStorage()
    setUserLoggedIn(user)
  }

  useEffect(() => {
    checkIfUserLoggedIn()
  },[]) 

  return (
    <div className="App">
      {userLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
