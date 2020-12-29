import React from 'react'
import { Book } from '../../interfaces'
import BookDisplay from '../Book/Book'

interface BookShelfProps {
  books?: Book[];
  handleClick: Function;
}

const BookShelf: React.FC<BookShelfProps> = ({books, handleClick}) => {

  const content = books && books.length > 0 ? 
  (
    <div>
      {books.map(book => {
        return <BookDisplay key={book.id} book={book} handleClick={handleClick} />
      })}
    </div>
  )
  :
  <p>no books on the shelf</p>

  return (
    <div>
      {content}
    </div>
  )
}

export default BookShelf