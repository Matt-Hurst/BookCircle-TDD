import { Book } from '../interfaces'
import axios from 'axios'


export const URL = 'http://localhost:3001/' 

export const retrieveTokenFromLocalStorage = (): string => {
  return localStorage.getItem('token') || ''
}

export const login = async (name: string, password: string) => {
  console.log('LOGIN FUNC: ', name, password)
  const { data } = await axios.post(`${URL}login`, {
    name,
    password
  })
  console.log('LOGIN FUNCTION IN HELPER FOLDER DATA: ', data )
  localStorage.setItem('token', data.token)
  return data;
}

export const calculateBooksReadThisYear = (books: Book[]) => {
  
  let booksReadThisYear = 0;

  books.forEach(book => {
    const date = new Date(book.dateRead)
    const currentYear = new Date().getFullYear()
    if (date.getFullYear() === currentYear) {
      booksReadThisYear++;
    }
  }
  )

  return booksReadThisYear
}