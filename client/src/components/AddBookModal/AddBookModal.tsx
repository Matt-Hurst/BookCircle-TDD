import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

interface AddBookModalProps {
  closeModalFunc: Function;
}

const AddBookModal: React.FC<AddBookModalProps> = ({closeModalFunc}) => {
  const [userInput, setUserInput] = useState({
    date: '1'
  })

  return (
    <div data-testid='add-book-modal'>
      <AiFillCloseCircle  data-testid="close-modal-icon" onClick={() => closeModalFunc()}/>
      <p>When did you read this book?</p>
      <input 
        data-testid='date-input' 
        type="date" 
        value={userInput.date} 
        onChange={(e) => setUserInput( (currentState) => {
          return {
            ...currentState,
            date: e.target.value
          }
      })}/>
      <div>
        <button>next</button>
      </div>
    </div>
  )
}

export default AddBookModal

