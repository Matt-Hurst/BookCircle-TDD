import React, { useState } from 'react'
import { AiFillStar, AiFillCloseCircle } from 'react-icons/ai';
import { Book } from '../../interfaces'

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
      <div data-testid='user-book-modal'>
        <div 
          data-testid="greyed-background-div" 
          className='friend-book-modal-grand-wrapper__greyed-background-div'
          onClick={() => closeModal()}
        >
        </div>
        {!editBookClicked ? 
          <div>
            <AiFillCloseCircle data-testid='close-button' onClick={() => closeModal()}/>
            <div>
              <img src={book.imageUrl} alt={book.title}/> 
              {book.star && <AiFillStar />}
              <div>
                <h3>{book.title}</h3>
                <h4>{book.genre}</h4>
                {book.dateRead && <h4>{book.dateRead}</h4>}
                {book.availableToBorrow && <h4>Available to borrow</h4>}
              </div>
            </div>
            <p>Review: {book.review}</p>
            <button onClick={() => handleClick()}>edit book</button>
          </div>
          : <div>
            <p>Edit Book Modal</p>
          </div>
          }
      </div>
    )
}


export default UserBookModal