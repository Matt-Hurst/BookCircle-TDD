import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Book } from '../../interfaces'
import { requestBook, getFriendBooks } from '../../actions'
import './FriendsLibrary.scss'
import { BookShelf } from '../../components/BookShelf'
import { FriendBookModal } from '../../components/FriendBookModal'

interface matchInterface {
  friendName: string;
}

interface FriendsLibraryProps extends RouteComponentProps<matchInterface> {
  friendBooks: Book[];
  requestBook: Function;
  getFriendBooks: Function;
  availableBooks: Book[];
}

const FriendsLibrary: React.FC<FriendsLibraryProps> = ({match, friendBooks, requestBook, getFriendBooks, availableBooks}) => {
  const [bookList, setBookList] = useState<Book[]>(friendBooks)
  const [clickedBook, setClickedBook] = useState<Book>()
  const [friendsBookClicked, setFriendsBookClicked] = useState(false)
  const { friendName } = match.params

  useEffect(() => {
    getFriendBooks('Matt')
  },[])// eslint-disable-line

  useEffect(() => {
    setBookList(friendBooks)
  }, [friendBooks, availableBooks])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'all':
        setBookList(friendBooks)
        break;
      case 'starReads':
        setBookList(friendBooks.filter(book => book.star))
        break;
      case 'availableToBorrow':
        setBookList(friendBooks.filter(book => book.availableToBorrow))
        break;
      default:
        setBookList(friendBooks.filter(book => book.genre === e.target.value))
    }
  }

  return (
    <div>
      <h1>{friendName} Library</h1>
      <select name="genre" className='library-grand-wrapper__select-element' onChange={handleChange}>
        <option value="all">All Books</option>
        <option value="starReads">Star Reads</option>
        <option value="availableToBorrow">Available to Borrow</option>
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
      <BookShelf books={bookList} handleClick={(book: Book) => {
        setClickedBook(book)
        setFriendsBookClicked(true)

      }
      }/>
      {friendsBookClicked && <FriendBookModal friendName={friendName} closeModal={() => setFriendsBookClicked(false)} requestBook={requestBook} book={clickedBook}/>}
    </div>
  )
}

const mapStateToProps = ({friendBooks, availableBooks}: {friendBooks: Book[], availableBooks: Book[]}) => {
  return {
    friendBooks,
    availableBooks
  }
}

export default connect(mapStateToProps, { requestBook, getFriendBooks })(FriendsLibrary);