import React from 'react'
import { useHistory } from "react-router-dom";
import { login } from '../../helpers'
import { LoginForm } from '../../components/LoginForm'

import './Login.scss'

const Login: React.FC = () => {
  const history = useHistory();

  async function handleSubmit (name: string, password: string, e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    await login(name, password);
    history.go(0)
  }

  return (
    <div className="LoginPage">
    <div className="LoginPageHeaderDiv">
      <h1 className="LoginPageH1">the Book Circle</h1>
      <span className="LoginPageSpan"></span>
      <h2 className="LoginPageH2">Welcome</h2>
    </div>
    <LoginForm handleSubmit={handleSubmit}/>
  </div>
  )
}

export default Login