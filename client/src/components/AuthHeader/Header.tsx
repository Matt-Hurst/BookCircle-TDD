import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../../images/Logocircle1.png'
import { FaUserFriends } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { VscSearch } from "react-icons/vsc";

const Header = () => {

  return (
    <div>
      <Link to='/'>
        <img className='logo' src={Logo} alt="Book Circle logo"/>
      </Link>
      <div className="iconsDiv">
        <Link to='/yourLibrary'>
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