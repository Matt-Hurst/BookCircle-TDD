import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

import './AddBookModal.scss'

interface AddBookModalProps {
  closeModalFunc: Function;
  addBookFunction: Function;
}

const AddBookModal: React.FC<AddBookModalProps> = ({closeModalFunc, addBookFunction}) => {
  const [dateRead, setDateRead] = useState<string>('')
  const [review, setReview] = useState<string | undefined>(undefined)
  const [availableToBorrow, setAvailableToBorrow] = useState<boolean>(false)
  const [genre, setGenre] = useState<string>('fiction')
  const [starRead, setStarRead] = useState<boolean>(false)
  const [modalStep, setModalStep] = useState('whenDidYouRead')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateRead(e.target.value)
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)
  const handleAvailableToBorrowChange = (e: React.ChangeEvent<HTMLInputElement>) => setAvailableToBorrow(!availableToBorrow)
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)
  const handleStarBookChange = (e: React.ChangeEvent<HTMLInputElement>) => setStarRead(!starRead)

  const backStepLookup: any = {
    whatDidYouThink: 'whenDidYouRead',
    canYouLend: 'whatDidYouThink',
    whatGenre: 'canYouLend',
    isStarRead: 'whatGenre',
  }
  const handleBack = (step: string) => setModalStep(backStepLookup[step])

  const forwardStepLookup: any = {
    whenDidYouRead: 'whatDidYouThink',
    whatDidYouThink: 'canYouLend',
    canYouLend: 'whatGenre',
    whatGenre: 'isStarRead',
  }
  const handleForward = (step: string) => setModalStep(forwardStepLookup[step])

  const handleAddBook = async () => {
    await addBookFunction({ dateRead, review, availableToBorrow, genre, starRead })
    setDateRead('')
    setReview(undefined)
    setAvailableToBorrow(false)
    setGenre('fiction')
    setStarRead(false)
    setModalStep('whenDidYouRead')
  }

  return (
    <div data-testid='add-book-modal' className='addbook-modal-grand-wrapper'>
      <div 
        className='addbook-modal-grand-wrapper__greyed-background-div'
        onClick={() => closeModalFunc()}
      ></div>
      <div className='addbook-modal-grand-wrapper__pop-out-container'>
        <AiFillCloseCircle  
          data-testid="close-modal-icon" 
          className='addbook-modal-grand-wrapper__close-btn'
          onClick={() => closeModalFunc()}
        />
        { modalStep === 'whenDidYouRead' &&
          <div>
            <h2>When did you read this book?</h2>
            <input 
              data-testid='date-input'
              type="date" 
              value={dateRead} 
              onChange={(e) => handleDateChange(e)}
            />
          </div>
        }
        { modalStep === 'whatDidYouThink' && <div key={'whatDidYouThink'}>
          <h2>What did you think?</h2>
          <textarea 
            data-testid='review-textarea'
            maxLength={100} 
            value={review}
            onChange={(e) => handleReviewChange(e)}
          />
        </div> }
        { modalStep === 'canYouLend' && 
          <div>
            <h2>Can you lend this book?</h2>
            <div className='addbook-modal-grand-wrapper__pop-out-container__checkbox-div'>
              <input 
                type="checkbox"
                checked={availableToBorrow}
                onChange={(e) => handleAvailableToBorrowChange(e)} 
              />
              <label htmlFor="yes">I'm happy to lend this book</label>
            </div>
          </div>
        }
        { modalStep === 'whatGenre' && 
          <div>
            <h2>What genre is this book?</h2>
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
        }
        { modalStep === 'isStarRead' && 
          <div>
            <h2>Is this book a must read?</h2>
              <div className='addbook-modal-grand-wrapper__pop-out-container__checkbox-div'>
                <input type="checkbox" value='yes' onChange={(e) => handleStarBookChange(e)} checked={starRead ? true: false}/>
                <label htmlFor="yes">star read</label>
              </div>
          </div> 
        }
       {/* { getContent() } */}
        <div className='addbook-modal-grand-wrapper__pop-out-container__button-div'>
          {modalStep !== 'whenDidYouRead' && <button onClick={() => {handleBack(modalStep)}}>back</button>}
          {modalStep !== 'isStarRead' ?  <button onClick={() => {
            handleForward(modalStep)
          }
          }
          >next</button> : 
          <button 
            id='add-book-btn' 
            onClick={ () => {
              handleAddBook()
              closeModalFunc()  
            }
            }>add book</button>}
        </div>
      </div>
    </div>
  )
}

export default AddBookModal