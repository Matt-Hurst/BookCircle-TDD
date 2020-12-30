import React from 'react'
import { login } from '../../helpers'
import { LoginForm } from '../../components/LoginForm'

import './Login.scss'

const Login: React.FC = () => {

  async function handleSubmit (name: string, password: string) {
    await login(name, password);
  }

  return (
    <div className="LoginPage">
    <div className="LoginPageHeaderDiv">
      <h1 className="LoginPageH1">the Book Circle</h1>
      <span className="LoginPageSpan"></span>
      <h2 className="LoginPageH2">Welcome</h2>
    </div>
    <LoginForm loginFunc={handleSubmit}/>
  </div>
  )
}

export default Login