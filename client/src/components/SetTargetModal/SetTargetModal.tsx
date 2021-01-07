import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

import './SetTargetModal.scss'

interface SetTargetModalProps {
  turnModalOff: Function;
  changeTarget: Function;
}

const SetTargetModal: React.FC<SetTargetModalProps> = ({ turnModalOff, changeTarget }) => {

  const [input, setInput] = useState<string | number>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(+e.target.value)
  }

  return (
    <div className='edit-target-modal-grand-wrapper'>
      <div 
        data-testid="greyedBackgroundDiv" 
        className='edit-target-modal-grand-wrapper__greyed-background-div'
        onClick={() => turnModalOff()}>
      </div>
      <div className='edit-target-modal-grand-wrapper__pop-out-container'>
        <AiFillCloseCircle 
          data-testid="closeSVG" 
          className='edit-target-modal-grand-wrapper__pop-out-container__close-btn'
          onClick={() => turnModalOff()} 
        />
        <h1>Set new target</h1>
        <form
          action="submit"
          onSubmit={
            async (event) => {
              event.preventDefault()
              if (input === '') turnModalOff()
              else {
                await changeTarget(+input)
                turnModalOff()
              }
            }
          }>
          <input value={input} type="number" onChange={handleChange} />
          <button type="submit">submit</button>
        </form>
      </div>

      </div>
  )
}

export default SetTargetModal;