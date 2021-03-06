import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Book } from '../../interfaces'
import { getTarget, setUserTarget } from '../../actions'
import { ProgressBar } from '../ProgressBar'
import { SetTargetModal } from '../SetTargetModal'
import { calculateBooksReadThisYear } from '../../helpers'

import './Target.scss'

interface TargetProps {
  target: number;
  books: Book[] | [];
  getTarget: Function;
  setUserTarget: Function;
}

const Target: React.FC<TargetProps> = ({ target, books, getTarget, setUserTarget }) => {
  
   useEffect(() => {
    // getTarget()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const [isOpen, setIsOpen] = useState(false)

  let booksReadThisYear: number = books ? calculateBooksReadThisYear(books) : 0;

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const content = target ? (
    <div className='target-grand-wrapper'>
      <ProgressBar completed={(booksReadThisYear / target) * 100} />
      <div className='target-grand-wrapper__content-container'>
        <h3>Books read this year:</h3>
        <h3>{booksReadThisYear}/{target}</h3>
        <button 
          className='target-grand-wrapper__content-container__edit-target-btn'
          onClick={toggleModal}
        >edit</button>
      </div>
    </div>
  ) : (
      <div>
        <p>no goals set, why not set one?</p>
        <button onClick={toggleModal}>add goal</button>
      </div>
    )

  const modal = isOpen ? <SetTargetModal turnModalOff={toggleModal} changeTarget={setUserTarget} /> : null;

  return (
    <div>
      {content}
      {modal}
    </div>
  )
}


const mapStateToProps = ({ target, books }: { target: number, books: Book[] }) => {
  return {
    target,
    books
  }
} 

export default connect(mapStateToProps, {getTarget, setUserTarget})(Target);