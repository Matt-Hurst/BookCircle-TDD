import React from 'react'
import { connect } from 'react-redux'
import { MessageComponent } from '../../components/Message'
import { Book, Message, Target } from '../../interfaces'

interface DashboardProps {
  books: Book[];
  target: Target;
  messages: Message[];
}

const Dashboard: React.FC<DashboardProps> = ({books, target, messages}) => {

  return (
    <div>
      <h2>Recent activity:</h2>
    </div>
  )
}

const mapStateToProps = ({books, target, messages}:{books: Book[], target: Target, messages: Message[]}) => {
  return { 
    books,
    target,
    messages
  }
}

export default connect(mapStateToProps, /* action creators*/)(Dashboard)