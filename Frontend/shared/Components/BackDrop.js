import React from 'react'
import './BackDrop.css'
const BackDrop = ({closeDrawer}) => {
  return (
   
      <div className='div-BackDrop' onClick={closeDrawer}></div>
   
  )
}

export default BackDrop
