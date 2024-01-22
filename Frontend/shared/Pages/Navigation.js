import React from 'react'
import NavHeader from '../Components/NavHeader'
import './Navigation.css'
import SideDrawer from '../Components/SideDrawer'
import NavLinks from '../Components/NavLinks'
import { useState } from 'react'
import BackDrop from '../Components/BackDrop'
const Navigation = () => {
  const[drawerOpen,setDrawerClose]=useState(false)
  const openDrawer=()=>{
    setDrawerClose(true)
  }
  const closeDrawer=()=>{
    setDrawerClose(false)
  }
  const closeSide=()=>{
    setDrawerClose(false)
  }
  return (
    <div className='div-nav'>
      <NavHeader click={openDrawer}/>
      {drawerOpen &&<BackDrop closeDrawer={closeDrawer}/>}
      {drawerOpen ?<SideDrawer onClick={closeSide}>
      <nav className='main-navigation__drawer-nav'>
      <NavLinks/>
      </nav>
        </SideDrawer>:null}
        
    </div>
  )
}

export default Navigation
