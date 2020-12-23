import { Book } from '../interfaces'

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