import React from 'react'
import UserItem from './UserItem'
import './UserList.css'
const UserList = ({items}) => {
 if(items.length===0){
    return <h2>No users Found</h2>
 }
 return <ul>
    {items.map(item=>{
        return <UserItem key={item.id}
        id={item.id}
        name={item.name}
        img={item.image}
        places={item.places.length}
        />
    })}
 </ul>

}

export default UserList
