import React, { useState } from 'react'
import { getQueryResults } from './getQueryResults'


const BookSearch = () => {
  const [searchResult, setSearchResult] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleClick = () => {
    const results = getQueryResults(searchQuery)
    setSearchResult(results)
  }

  return (
    <div data-testid='book-search-page'>
      <input data-testid='search-input' type="text" onChange={handleChange} value={searchQuery}/>
      <button data-testid='search-button' onClick={handleClick}>search</button>
      {searchResult && <p>{searchResult}</p>}
    </div>
  )
}

export default BookSearch