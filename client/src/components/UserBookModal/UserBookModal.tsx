import React, { useState } from 'react'
import { AiFillStar, AiFillCloseCircle } from 'react-icons/ai';
import { Book } from '../../interfaces'
import { EditBookModal } from '../EditBookModal';

import './UserBookModal.scss'

interface UserBookModalProps {
  book: Book;
  closeModal: Function;
  editBook: Function;
}

const UserBookModal: React.FC<UserBookModalProps> = ({book, closeModal, editBook}) => {

  const [editBookClicked, setEditBookClicked] = useState(false)

  const handleClick = () => {
    setEditBookClicked(true)
  }
    return (
      <div data-testid='user-book-modal' className='user-book-modal-grand-wrapper'>
        <div 
          data-testid="greyed-background-div" 
          className='user-book-modal-grand-wrapper__greyed-background-div'
          onClick={() => closeModal()}
        >
        </div>
        {!editBookClicked ? 
          <div className='user-book-modal-grand-wrapper__pop-out-container'>
            <AiFillCloseCircle 
              data-testid='close-button' 
              className='user-book-modal-grand-wrapper__pop-out-container__close-btn'
              onClick={() => closeModal()}
            />
            <div className='user-book-modal-grand-wrapper__pop-out-container__top-content-div'>
              <div className='user-book-modal-grand-wrapper__pop-out-container__top-content-div__image-container'>
                <img src={book.imageUrl} alt={book.title}/> 
                {book.star && <AiFillStar 
                  className='user-book-modal-grand-wrapper__pop-out-container__top-content-div__image-container__star'/>}
              </div>
              <div className='user-book-modal-grand-wrapper__pop-out-container__top-content-div__text-container'>
                <h3>{book.title}</h3>
                <h4>{book.genre}</h4>
                {book.dateRead && <h4>read {book.dateRead}</h4>}
                {book.availableToBorrow && <h4>available to borrow</h4>}
              </div>
            </div>
            <p className='user-book-modal-grand-wrapper__pop-out-container__review'><span>Review:</span> {book.review}</p>
            <button 
              className='user-book-modal-grand-wrapper__pop-out-container__edit-button'
              onClick={() => handleClick()}>edit book</button>
          </div>
          : <EditBookModal book={book} closeEdit={() => setEditBookClicked(false)} editBook={editBook}/>
          }
      </div>
    )
}


export default UserBookModal