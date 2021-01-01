import React, { useState } from 'react'
import { Book } from '../../interfaces'
import { getQueryResults } from './getQueryResults'
import { AddBookModal } from '../../components/AddBookModal'

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
    <div data-testid='book-search-page'>
      <input data-testid='search-input' type="text" onChange={handleChange} value={searchQuery} placeholder={searchBy}/>
      <button data-testid='search-button' onClick={handleClick}>search</button>
      <button data-testid='search-by-title-button' onClick={() => setSearchBy('title')}>title</button>
      <button data-testid='search-by-author-button' onClick={() => setSearchBy('author')}>author</button>
      {searchResult && searchResult.map(book => {
        return (
          <div key={book.id}>
            {book.imageUrl ? <img src={book.imageUrl} alt={`${book.title} book cover`}/> : <div></div>}
            <div>
              <h3>{book.title}</h3>
              {book.authors ? <p>{`by ${book.authors}`}</p>: <div></div>}
              {book.genre ? <h4>{book.genre}</h4> : <div></div>}
              <button onClick={() => setAddBookClicked(true)}>add to bookcase</button>
            </div>
          </div>
        )
      })}
      {addBookClicked && (
        <AddBookModal closeModalFunc={() => setAddBookClicked(false)}/>
      )}
    </div>
  )
}

export default BookSearch