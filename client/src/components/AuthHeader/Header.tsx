import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../../images/Logocircle1.png'
import { FaUserFriends } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { VscSearch } from "react-icons/vsc";

import './Header.scss'

const Header = () => {

  return (
    <div className='header-grand-wrapper'>
      <Link to='/'>
        <img className='__logo' src={Logo} alt="Book Circle logo"/>
      </Link>
      <div className="__icons-wrapper">
        <Link to='/your-library'>
          <ImBooks className="icon"/>
        </Link>
        <Link to='/friends'>
          <FaUserFriends className="icon"/>
        </Link>
        <Link to='/search'>
          <VscSearch className="icon searchIcon"/>
        </Link>
      </div>
    </div>
  )
}

export default Header