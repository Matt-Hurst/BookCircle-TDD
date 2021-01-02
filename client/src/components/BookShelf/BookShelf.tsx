import React from 'react'
import { Book } from '../../interfaces'
import BookDisplay from '../Book/Book'

import './BookShelf.scss'

interface BookShelfProps {
  books?: Book[];
  handleClick: Function;
}

const BookShelf: React.FC<BookShelfProps> = ({books, handleClick}) => {

  const content = books && books.length > 0 ? 
  (
    <div className='bookshelf-grand-wrapper'>
      {books.map(book => {
        return <BookDisplay key={book.id} book={book} handleClick={handleClick} />
      })}
    </div>
  )
  :
  <p>no books on the shelf</p>

  return (
    <>
      {content}
    </>
  )
}

export default BookShelf