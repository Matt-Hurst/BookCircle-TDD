import React from 'react'
import { connect } from 'react-redux'
import { Book } from '../../interfaces'

import { ProgressBar } from '../ProgressBar' 

interface TargetProps {
  target: number;
  books: Book[] | []
}

const Target: React.FC<TargetProps> = ({target, books}) => {
  
  let booksReadThisYear = 0;

  if (books.length > 0) {
    books.forEach(book => {
      if( book.dateRead) {
        const date = new Date(book.dateRead)
        const currentYear = new Date().getFullYear()
        if (date.getFullYear() === currentYear) {
          booksReadThisYear++;
        }
      }
    }
    )
  }

  const content = target ? 
  ( <div>
        <ProgressBar completed={(booksReadThisYear / target) * 100} />
        <div>
          <p>Books read this year:</p>
          <p>{target}/{books.length}</p>
          <button>edit</button>
        </div>
    </div>)
  :
  (
    <div>
      <p>no goals set, why not set one?</p>
      <button>add goal</button>
    </div>
  )
  
  return (
    <div>
      {content}
    </div>
  )
}

const mapStateToProps = ({target, books}: {target: number, books: Book[]}) => {
  return {
    target,
    books
  }
}

export default connect(mapStateToProps)(Target);