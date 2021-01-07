import axios from 'axios'
import { URL } from '../helpers'

export const retrieveTokenFromLocalStorage = (): string => {
  return localStorage.getItem('token') || ''
}

export const login = async (name: string, password: string) => {
  const { data } = await axios.post(`${URL}login`, {
    name,
    password
  })
  localStorage.setItem('token', data.token)
  return data;
}