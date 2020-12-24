import React from 'react'
import { Book } from '../../interfaces'

interface BookProps {
  book: Book;
  handleClick: Function;
}

const BookDisplay: React.FC<BookProps> = ({book, handleClick}) => {

  return (
    <div data-testid="container-book">
      <img src={book.imageUrl} alt="1984" 
        onClick={() => {
          handleClick(book)
        }}
      />
    </div>
  )
}

export default BookDisplay