import React,{useEffect,useState} from 'react'
import UserList from '../Components/UserList'
const Users = () => {
  
 
  const [loadedUsers,setLoadedUser]=useState();
   useEffect(()=>{
    const sendData= async()=>{ 
      try{
        const response=await fetch('http://localhost:5000');
        const responseData=await response.json();
        if(!response.ok){
          throw new Error(responseData.message)
        }
        setLoadedUser(responseData.users)
        console.log(responseData.users.userName)
      }catch(err){
           console.log(err)
      }
   
    };
    sendData();
   },[loadedUsers])
  return (
<React.Fragment>
{loadedUsers && <UserList items={loadedUsers}/>}
</React.Fragment>
  
  )
}

export default Users
