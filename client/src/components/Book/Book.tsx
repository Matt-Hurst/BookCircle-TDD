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
    <div data-testid="container-book" className='book-grand-wrapper'>
      <img src={book.imageUrl} alt="1984" 
        onClick={() => {
          handleClick(book)
        }}
      />
      {book.star && <AiFillStar className="book-grand-wrapper__star" />}
    </div>
  )
}

export default BookDisplay