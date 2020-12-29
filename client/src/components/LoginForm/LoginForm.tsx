import React, { useState } from 'react'
import { FaForumbee } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

import './LoginForm.scss'

interface LoginFormProps {
  handleSubmit: Function;
}

const LoginForm: React.FC<LoginFormProps> = ({handleSubmit}) => {
  const [formValues, setFormValues] = useState({name: '', password: ''})
  const history = useHistory();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="LoginFormContainer">
      <form onSubmit={() => { 
         handleSubmit(formValues.name, formValues.password)
        setFormValues({name: '', password: ''})
      }} className="LoginForm">
        <input type="text" placeholder="Username:" name="name" onChange={handleChange} value={formValues.name}/>
        <input data-testid='password-input' type="password" placeholder="Password:" name="password" onChange={handleChange} value={formValues.password}/>
        <button onClick={() => () => { 
          handleSubmit(formValues.name, formValues.password)
          setFormValues({name: '', password: ''})
        }} type="submit" className="loginBTN">Log In</button>
        <button onClick={() => history.push('/signup')} className="signupBTN">Sign Up</button>
      </form>
    </div>
  )
}

export default LoginForm