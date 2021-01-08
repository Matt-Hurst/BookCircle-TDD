import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { editBook } from '../../actions/'
import { BookShelf } from '../../components/BookShelf'
import { UserBookModal } from '../../components/UserBookModal'
import { WordCloud } from '../../components/WordCloud'
import { Book } from '../../interfaces'

import './Library.scss'

interface LibraryProps {
  books: Book[];
  editBook: Function;
}

const Library: React.FC<LibraryProps> = ({books, editBook}) => {
  const [bookList, setBookList] = useState<Book[]>(books)
  const [clickedBook, setClickedBook] = useState<Book | null>(null)

  useEffect(() => {
    setBookList(books)
    setClickedBook(null)
  }, [books])

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
    <div className='library-grand-wrapper'>
      <h1>Your Library:</h1>
      <select name="genre" className='library-grand-wrapper__select-element' onChange={handleChange}>
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
      <BookShelf books={bookList} handleClick={async (book: Book) => {
        await setClickedBook(book)
        }
        }/>
      <WordCloud books={books}/>
      {clickedBook && <UserBookModal book={clickedBook} closeModal={() => setClickedBook(null)} editBook={editBook}/>}
    </div>
  )
}

const mapStateToProps = ({books}: {books: Book[]}) => {
  return { books }
}

export default connect(mapStateToProps, { editBook })(Library)