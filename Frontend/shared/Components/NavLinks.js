import React from 'react';
import { AuthContext } from '../../Auth/Components/AuthContext';
import './NavLinks.css'
import { NavLink} from 'react-router-dom';
import { useContext } from 'react';
import Button from '../../shared/Components/Button'
const NavLinks = ()=> {
  const auth=useContext(AuthContext)
  const userName=auth.userName
  return <ul className="nav-links"> 
    <li>
  <NavLink to="/">Users</NavLink>
    </li>
    {auth.isLoggedIn &&(
    <li>
      
  <NavLink to={`/places/user/${userName}`}> My Places</NavLink>
      
  </li>
)}
{auth.isLoggedIn &&(
    <li>
      
  <NavLink to="/add/places">Add Places</NavLink>
    
  </li>
  )}
   {!auth.isLoggedIn &&(
    <li>
   
  <NavLink to="/auth">Authenicate</NavLink>
      
      
    </li>
   )}
   {auth.isLoggedIn &&(
    <li>
   
  
      <Button class="logout" openModel={auth.logout} info="Logout"/>
      
    </li>
   )}
   
  </ul>
};

export default NavLinks;