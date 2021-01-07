import React from 'react'
import { AiFillStar } from "react-icons/ai";
import { Book } from '../../interfaces'

import './Book.scss'

interface BookProps {
  book: Book;
  handleClick: Function;
}

const BookDisplay: React.FC<BookProps> = ({book, handleClick}) => {

  return (
    <div data-testid="container-book" className='book-grand-wrapper' 
      onClick={() => {
        handleClick(book)
      }}
      >
      { book.imageUrl ? <img src={book.imageUrl} alt={`${book.title} book cover`} />
      : 
      <div className='book-grand-wrapper__stand-in-book-cover'><h3>{book.title}</h3></div>
      }
      {book.star && <AiFillStar className="book-grand-wrapper__star" />}
    </div>
  )
}

export default BookDisplay