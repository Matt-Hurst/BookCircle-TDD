import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Book } from '../../interfaces'
import { getQueryResults } from './getQueryResults'
import { AddBookModal } from '../../components/AddBookModal'
import { addBook } from '../../actions/bookActions'

import './BookSearch.scss'

interface BookSearchProps {
  addBook: Function;
}

const BookSearch: React.FC<BookSearchProps> = ({addBook}) => {
  const [searchResult, setSearchResult] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchBy, setSearchBy] = useState('title')
  const [addBookClicked, setAddBookClicked] = useState<Book | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleClick = async () => {
    const results = await getQueryResults(searchQuery, searchBy)
    await setSearchResult(results)
    await setSearchQuery('')
  }

  return (
    <div data-testid='book-search-page' className='booksearch-grand-wrapper'>
      <h1>Search:</h1>
      <div className='booksearch-grand-wrapper__search-container'>
        <input 
          data-testid='search-input' 
          className='booksearch-grand-wrapper__search-container__input'
          type="text" 
          onChange={handleChange} 
          value={searchQuery} 
          placeholder={searchBy}/>
        <button 
          data-testid='search-button'
          className='booksearch-grand-wrapper__search-container__btn' 
          onClick={handleClick}
        >search</button>
      </div>
      <div className='booksearch-grand-wrapper__search-by-btn-container'>
        <button 
          data-testid='search-by-title-button' 
          className={searchBy === 'title' ? "selectedSearchMethod" : "otherSearchMethod"}
          onClick={() => setSearchBy('title')}
        >title</button>
        <button 
          data-testid='search-by-author-button' 
          className={searchBy === 'author' ? "selectedSearchMethod" : "otherSearchMethod"}
          onClick={() => setSearchBy('author')}
        >author</button>
      </div>
      <div>
      {searchResult && searchResult.map((book, i) => {
        return (
          <div key={i} className='booksearch-grand-wrapper__book-result-container'>
            {book.imageUrl ? <img src={book.imageUrl} alt={`${book.title} book cover`}/> : <div className='booksearch-grand-wrapper__book-result-container__stand-in-cover'><h3>{book.title}</h3></div>}
            <div className='booksearch-grand-wrapper__book-result-container__content-and-btn'>
              <h3>{book.title}</h3>
              {book.authors ? <p>{`by ${book.authors}`}</p>: <div></div>}
              {book.genre ? <h4>{book.genre}</h4> : null}
              <button onClick={() => setAddBookClicked(book)}>add to bookcase</button>
            </div>
          </div>
        )
      })}
      </div>
      {addBookClicked && (
        <AddBookModal closeModalFunc={() => setAddBookClicked(null)} addBookFunction={addBook} book={addBookClicked}/>
      )}
    </div>
  )
}

const mapStateToProps = ({books}: {books: Book[]}) => {
  return {
    books
  }
}

export default connect(mapStateToProps, {addBook})(BookSearch)