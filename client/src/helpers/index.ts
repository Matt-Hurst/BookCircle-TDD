import { Book } from '../interfaces'
import axios from 'axios'

export const login = async (name: string, password: string): Promise<string> => {
  const { data } = await axios.post(`${URL}availableBooks`, {
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