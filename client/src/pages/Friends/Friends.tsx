import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BsFillPersonFill } from "react-icons/bs";
import { getFriendName } from './getFriendName'
import { useHistory } from 'react-router-dom';

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
      <h1>Friends:</h1>
      {names.length && names.map((friend, i) => {
        return (
          <div key={i} className='friends-grand-wrapper__friend-container'>
            <BsFillPersonFill />
            <p>{friend.name}</p>            
            <button 
              onClick={() => history.push(`/${friend.name}/library`)}
              >view books
              </button>
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