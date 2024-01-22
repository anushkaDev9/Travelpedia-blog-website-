import React from 'react'
import './NavHeader.css'

import NavLinks from '../Components/NavLinks'
const NavHeader = ({click}) => {
  return (
    <div className='header'>
      <button className="main-navigation__menu-btn" onClick={click}>
        <span />
        <span />
        <span />
      </button>
      <h1>Travelpedia</h1>
        <nav className='main-navigation__header-nav'>
      <NavLinks/>
      </nav>
     
    </div>
  )
}

export default NavHeader
