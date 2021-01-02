import React, { useState } from 'react'
import { AiFillStar, AiFillCloseCircle } from 'react-icons/ai';
import { Book } from '../../interfaces'

import './FriendBookModal.scss'

interface FriendBookModalProps {
  book?: Book;
  closeModal: Function;
  requestBook: Function;
}

const FriendBookModal: React.FC<FriendBookModalProps> = ({book, closeModal, requestBook}) => {

  const [bookRequested, setBookRequested] = useState<boolean>(false)

  if (book) {
    return (
      <div className='friend-book-modal-grand-wrapper'>
        <div 
          data-testid="greyedBackgroundDiv" 
          className='friend-book-modal-grand-wrapper__greyed-background-div'
          onClick={() => closeModal()}>
        </div>
        <div className='friend-book-modal-grand-wrapper__pop-out-container'>
          <AiFillCloseCircle 
            data-testid="closeSVG" 
            className='friend-book-modal-grand-wrapper__pop-out-container__close-btn'
            onClick={() => closeModal()} 
          />
         
          <div className='friend-book-modal-grand-wrapper__pop-out-container__content-div'>
            <h3>Owner: {book.friendName}</h3>
            <h3>{book.title}</h3>
            <h3>{book.friendName}'s Review:</h3>
            <p>{book.review}</p>
            <h3>{book.genre}</h3>
            {book.availableToBorrow && !bookRequested &&
            !bookRequested && <button
              className='friend-book-modal-grand-wrapper__pop-out-container__content-div__request-btn' 
              onClick={async () => {
                setBookRequested(true)
                await requestBook(book)
              }
            }>request book</button>}
            {bookRequested && <button
              className='friend-book-modal-grand-wrapper__pop-out-container__content-div__requested-btn' 
            >book requested</button>}
          </div>
          <div className="friend-book-modal-grand-wrapper__pop-out-container__display" >
            <img src={book.imageUrl} alt={book.title}
              className="friend-book-modal-grand-wrapper__pop-out-container__display__image"
            />
            {book.star && <AiFillStar className="friend-book-modal-grand-wrapper__pop-out-container__display__star" />}
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default FriendBookModal