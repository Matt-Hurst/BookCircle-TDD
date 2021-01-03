import React, { useState } from 'react'
import { Book } from '../../interfaces'
import { getQueryResults } from './getQueryResults'
import { AddBookModal } from '../../components/AddBookModal'
import { addBook } from '../../actions/bookActions'

import './BookSearch.scss'

const BookSearch = () => {
  const [searchResult, setSearchResult] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchBy, setSearchBy] = useState('title')
  const [addBookClicked, setAddBookClicked] = useState<boolean>(false)

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
      {searchResult && searchResult.map(book => {
        return (
          <div key={book.id} className='booksearch-grand-wrapper__book-result-container'>
            {book.imageUrl ? <img src={book.imageUrl} alt={`${book.title} book cover`}/> : <div className='booksearch-grand-wrapper__book-result-container__stand-in-cover'><h3>{book.title}</h3></div>}
            <div className='booksearch-grand-wrapper__book-result-container__content-and-btn'>
              <h3>{book.title}</h3>
              {book.authors ? <p>{`by ${book.authors}`}</p>: <div></div>}
              {book.genre ? <h4>{book.genre}</h4> : null}
              <button onClick={() => setAddBookClicked(true)}>add to bookcase</button>
            </div>
          </div>
        )
      })}
      {addBookClicked && (
        <AddBookModal closeModalFunc={() => setAddBookClicked(false)} addBookFunction={addBook}/>
      )}
    </div>
  )
}

export default BookSearch