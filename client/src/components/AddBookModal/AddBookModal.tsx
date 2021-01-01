import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

interface AddBookModalProps {
  closeModalFunc: Function;
  addBookFunction: Function;
}

interface UserInputAddBook {
  date: string;
  review: string | undefined;
  availableToBorrow: boolean;
  genre: string;
  starRead: boolean;
}

const AddBookModal: React.FC<AddBookModalProps> = ({closeModalFunc, addBookFunction}) => {
  const [userInput, setUserInput] = useState<UserInputAddBook>({
    date: '1',
    review: '',
    availableToBorrow: false,
    genre: 'fiction',
    starRead: false
  })
  const [modalContent, setModalContent] = useState(1)

  // TODO: DECIDE WHEN TO SET UNENTERED DATE AS TODAY'S DATE
  // useEffect(() => {
  //   const dateObj = new Date()
  //   const month = dateObj.getUTCMonth() + 1
  //   const day = dateObj.getUTCDate();
  //   const year = dateObj.getUTCFullYear();
  //   setUserInput(prevState => {
  //     return {
  //       ...prevState,
  //       date: `${year}-${month}-${day}`
  //     }
  //   })
  // }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if(e.target.name === 'availableToBorrow') setUserInput({...userInput, availableToBorrow: !userInput.availableToBorrow })
    if(e.target.name === 'starRead') setUserInput({...userInput, starRead: !userInput.availableToBorrow })
    setUserInput(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  let content; 

  if(modalContent === 1) {
    content = 
      ( <div>
        <p>When did you read this book?</p>
        <input 
          data-testid='date-input'
          name='date' 
          type="date" 
          value={userInput.date} 
          onChange={(e) => handleChange(e)}
        />
      </div>)
  } else if(modalContent === 2) {
    content = 
      <div>
        <p>What did you think?</p>
        <textarea 
          name='review'
          data-testid='review-textarea'
          maxLength={100} 
          value={userInput.review} 
          onChange={(e) => handleChange(e)}
        />
      </div>
  } else if(modalContent === 3) {
    content = 
      <div>
        <p>Can you lend this book?</p>
        <div className="checkboxDiv">
          <input type="checkbox" value='yes' name='availableToBorrow' onChange={(e) => handleChange(e)} checked={userInput.availableToBorrow ? true: false}/>
          <label htmlFor="yes">I'm happy to lend this book</label>
        </div>
      </div>
  } else if(modalContent === 4) {
    content = 
      <div>
        <p>What genre is this book?</p>
        <select name='genre' onChange={(e) => handleChange(e)}>
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
  } else if(modalContent === 5) {
    content = 
      <div>
        <p>Is this book a must read?</p>
          <div>
            <input type="checkbox" value='yes' name='starRead' onChange={(e) => handleChange(e)} checked={userInput.starRead ? true: false}/>
            <label htmlFor="yes">star read</label>
          </div>
      </div>
  }

  return (
    <div data-testid='add-book-modal'>
      <AiFillCloseCircle  data-testid="close-modal-icon" onClick={() => closeModalFunc()}/>
      {content}
      <div>
        {modalContent !== 1 && <button onClick={() => {setModalContent(modalContent - 1)}}>back</button>}
        {modalContent !== 5 ?  <button onClick={() => {
          // if(modalContent === 2 && !userInput.review)  return
          setModalContent(modalContent + 1)
        }
        }
        >next</button> : <button onClick={() => addBookFunction(userInput)}>add book</button>}
      </div>
    </div>
  )
}

export default AddBookModal