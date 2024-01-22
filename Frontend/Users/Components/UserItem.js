import React from 'react'
import './UserList.css'
import { Link } from 'react-router-dom'
const UserItem = props => {
  return (
    <Link to={`/places/user/${props.userName}`}>
    <div className='div-userlist'>

      <img src={props.img} alt={props.name}/>
     <h3>Name:-{props.name}</h3>
     <h4>Place Count:-{props.places}</h4>
    </div>
    </Link>
  )
}

export default UserItem
