import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Book } from '../../interfaces'

interface FriendBookModalProps {
  book: Book;
  closeModal: Function;
  requestBook: Function;
}

const FriendBookModal: React.FC<FriendBookModalProps> = ({book, closeModal, requestBook}) => {

  return (
    <div>
      <div data-testid="greyedBackgroundDiv" onClick={() => closeModal()}></div>
      <div>
        <AiFillCloseCircle onClick={() => closeModal()} data-testid="closeSVG" />
        <img src={book.imageUrl} alt={book.title}/>
        <div>
          <h3>Owner: {book.friendName}</h3>
          <h3>{book.title}</h3>
          <h3>{book.friendName}'s Review:</h3>
          <p>{book.review}</p>
          <h3>{book.genre}</h3>
          {book.availableToBorrow && 
          <button 
            onClick={async () => {
              await requestBook(book)
              closeModal()
            }
          }>request book</button>}
        </div>
      </div>
    </div>
  )
}

export default FriendBookModal