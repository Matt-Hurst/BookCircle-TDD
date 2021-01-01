import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import './LoginForm.scss'

interface LoginFormProps {
  loginFunc: Function;
}

const LoginForm: React.FC<LoginFormProps> = ({loginFunc}) => {
  const [formValues, setFormValues] = useState({name: '', password: ''})
  const history = useHistory();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginFunc(formValues.name, formValues.password)
    await setFormValues({name: '', password: ''})
    history.go(0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="LoginFormContainer">
      <form onSubmit={(e) => handleSubmit(e) } className="LoginForm">
        <input type="text" placeholder="Username:" name="name" onChange={handleChange} value={formValues.name}/>
        <input data-testid='password-input' type="password" placeholder="Password:" name="password" onChange={handleChange} value={formValues.password}/>
        <button type='submit' className="loginBTN">Log In</button>
        <button onClick={() => history.push('/signup')} className="signupBTN">Sign Up</button>
      </form>
    </div>
  )
}

export default LoginForm