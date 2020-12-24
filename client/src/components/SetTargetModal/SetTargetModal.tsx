import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

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
    <div>
      <div data-testid="greyedBackgroundDiv" onClick={() => turnModalOff()}></div>
      <AiFillCloseCircle onClick={() => turnModalOff()} data-testid="closeSVG" />
      <h2>Set new target</h2>
      <form
        action="submit"
        onSubmit={
          async (event) => {
            event.preventDefault()
            if (input === '') turnModalOff()
            else {
              await changeTarget(input)
              turnModalOff()
            }
          }
        }>
        <input value={input} type="number" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default SetTargetModal;