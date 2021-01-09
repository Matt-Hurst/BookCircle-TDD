import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BsFillPersonFill, BsPersonPlusFill } from "react-icons/bs";
import { getFriendName } from './getFriendName'
import { Link, useHistory } from 'react-router-dom';

import './Friends.scss'

interface FriendsProps {
  friends: string[];
}

interface Names {
  _id: string;
  name: string;
}

const Friends: React.FC<FriendsProps> = ({friends}) => {
  const [names, setNames] = useState<Names[]>([]);

  let history = useHistory()
  
  const getAllFriendsNames = async (friends: string[]) => {
    let result:Names[] = []
    for ( let i=0; i<friends.length; i++ ) {
      result.push(await getFriendName(friends[i]))
    }
    setNames(result)
  }
  
  useEffect(()=> {
    getAllFriendsNames(friends)
  },[])
  
  
  return (
    <div data-testid="friends-component" className='friends-grand-wrapper'>
      <div className='friends-grand-wrapper__heading'>
        <h1>Friends:</h1>
        <Link to='/friend-search'>
          <BsPersonPlusFill />
        </Link>
      </div>
      {names.length && names.map((friend, i) => {
        return (
          <div key={i} className='friends-grand-wrapper__friend-container'>
            <BsFillPersonFill />
            <p>{friend.name}</p>            
            <Link to={`/${friend.name}/library`}>      
                <button>view books</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({friends}: {friends: string[]}) => {
  return {
    friends
  }
}

export default connect(mapStateToProps)(Friends);