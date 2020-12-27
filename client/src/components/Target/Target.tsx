import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Book } from '../../interfaces'

import { ProgressBar } from '../ProgressBar'
import { SetTargetModal } from '../SetTargetModal'
import { calculateBooksReadThisYear } from '../../helpers'


interface TargetProps {
  target: number;
  books: Book[] | []
}

const Target: React.FC<TargetProps> = ({ target, books }) => {
  const [isOpen, setIsOpen] = useState(false)

  let booksReadThisYear: number = books ? calculateBooksReadThisYear(books) : 0;

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const changeTarget = (number: number) => {
    return number;
  }


  const content = target ? (
    <div>
      <ProgressBar completed={(booksReadThisYear / target) * 100} />
      <div>
        <p>Books read this year:</p>
        <p>{target}/{booksReadThisYear}</p>
        <button onClick={toggleModal}>edit</button>
      </div>
    </div>
  ) : (
      <div>
        <p>no goals set, why not set one?</p>
        <button onClick={toggleModal}>add goal</button>
      </div>
    )

  const modal = isOpen ? <SetTargetModal turnModalOff={toggleModal} changeTarget={changeTarget} /> : null;

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

export default connect(mapStateToProps)(Target);