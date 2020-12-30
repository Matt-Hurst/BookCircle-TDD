import React, { useState } from 'react'
import { Book } from '../../interfaces'
import { getQueryResults } from './getQueryResults'


const BookSearch = () => {
  const [searchResult, setSearchResult] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchBy, setSearchBy] = useState('title')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleClick = async () => {
    const results = await getQueryResults(searchQuery, searchBy)
    setSearchResult(results)
  }

  return (
    <div data-testid='book-search-page'>
      <input data-testid='search-input' type="text" onChange={handleChange} value={searchQuery} placeholder={searchBy}/>
      <button data-testid='search-button' onClick={handleClick}>search</button>
      <button data-testid='search-by-title-button' onClick={() => setSearchBy('title')}>title</button>
      <button data-testid='search-by-author-button' onClick={() => setSearchBy('author')}>author</button>
      {searchResult && <p>{searchResult}</p>}
    </div>
  )
}

export default BookSearch