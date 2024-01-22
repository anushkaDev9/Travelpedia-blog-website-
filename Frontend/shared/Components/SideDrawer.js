import React from 'react'
import './SideDrawer.css'
import NavLinks from './NavLinks'
const SideDrawer = props => {
 
    return(
        <div className='div-side' onClick={props.onClick}><NavLinks/></div>
    )
  
}

export default SideDrawer
