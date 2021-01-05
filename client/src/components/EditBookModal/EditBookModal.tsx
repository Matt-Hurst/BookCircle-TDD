import React, { useEffect, useState } from 'react'

import { Book } from '../../interfaces'

import './EditBookModal.scss'

interface EditBookModalProps {
  book: Book;
  closeEdit: Function;
  editBook: Function;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ book, closeEdit, editBook }) => {
  const [dateRead, setDateRead] = useState<string>('')
  const [review, setReview] = useState<string | undefined>(undefined)
  const [availableToBorrow, setAvailableToBorrow] = useState<boolean>(false)
  const [genre, setGenre] = useState<string>('fiction')
  const [starRead, setStarRead] = useState<boolean>(false)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateRead(e.target.value)
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)
  const handleAvailableToBorrowChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAvailableToBorrow(!availableToBorrow)
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)
  const handleStarBookChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setStarRead(!starRead)

  useEffect(() => {
    setDateRead(book.dateRead)
  }, [])
  useEffect(() => {
    setReview(book.review)
  }, [])
  useEffect(() => {
    setAvailableToBorrow(book.availableToBorrow)
  }, [])
  useEffect(() => {
    setGenre(book.genre)
  }, [])
  useEffect(() => {
    setStarRead(book.star)
  }, [])


  return (
    <div>
      <h1>Update Book:</h1>
      <div>
        <h2>Review</h2>
        <textarea name="review" maxLength={100} value={review} onChange={(e) => handleReviewChange(e)}></textarea>
      </div>
      <div>
        <h2>Genre</h2>
        <select value={genre} onChange={(e) => handleGenreChange(e)}>
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
      </div>
      <div>
        <h2>Star read</h2>
        <div>
          <button 
            data-testid='star-yes-button'
            onClick={(e) => handleStarBookChange(e)}
            className={starRead ? 'selected' : 'notSelected'}
          >yes</button>
          <button 
            data-testid='star-no-button'
            onClick={(e) => handleStarBookChange(e)}
            className={starRead ? 'notSelected' : 'selected'}
          >no</button>
        </div>
      </div>
      <div>
        <h2>Can lend</h2>
        <div>
          <button 
            data-testid='lend-yes-button'
            onClick={(e) => handleAvailableToBorrowChange(e)} 
            className={availableToBorrow ? 'selected' : 'notSelected'}
          >yes</button>
          <button 
            data-testid='lend-no-button' 
            onClick={(e) => handleAvailableToBorrowChange(e)} 
            className={availableToBorrow ? 'notSelected' : 'selected'}
          >no</button>
        </div>
      </div>
      <div>
        <h2>Date read</h2>
        <input 
          type="date" 
          value={dateRead} 
          onChange={(e) => handleDateChange(e)}
        />
      </div>
      <div>
        <button onClick={async () => {
          await editBook({dateRead, review, availableToBorrow, genre, starRead})
          closeEdit()
        }}>save</button>
        <button onClick={() => closeEdit()}>cancel</button>
      </div>
    </div>
  )
}

export default EditBookModal