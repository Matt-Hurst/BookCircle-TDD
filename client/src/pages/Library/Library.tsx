import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BookShelf } from '../../components/BookShelf'
import { Book } from '../../interfaces'

import './Library.scss'

interface LibraryProps {
  books: Book[];
}

const Library: React.FC<LibraryProps> = ({books}) => {
  const [bookList, setBookList] = useState<Book[]>(books)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'all':
        setBookList(books)
        break;
      case 'starReads':
        setBookList(books.filter(book => book.star))
        break;
      case 'availableToBorrow':
        setBookList(books.filter(book => book.availableToBorrow))
        break;
      default:
        setBookList(books.filter(book => book.genre ===e.target.value))
    }
  }

  return (
    <div>
      <h1>Your Library:</h1>
      <select name="genre" id="genre" onChange={handleChange}>
        <option value="all">All Books</option>
        <option value="starReads">Star Reads</option>
        <option value="availableToBorrow">Available to Borrow</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="crime">Crime & Thriller</option>
        <option value="science fiction">Science Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="action & adventure">Action & Adventure</option>
        <option value="politics & history">Politics & History</option>
        <option value="romance">Romance</option>
        <option value="comedy">Comedy</option>
        <option value="science & technology">Science & Technology</option>
        <option value="biography">Biography</option>
        <option value="arts & culture">Arts & Culture</option>
        <option value="self-improvement">Self-Improvement</option>
      </select>
      <BookShelf books={bookList} handleClick={() => console.log('book clicked')}/>
    </div>
  )
}

const mapStateToProps = ({books}: {books: Book[]}) => {
  return { books }
}

export default connect(mapStateToProps)(Library)