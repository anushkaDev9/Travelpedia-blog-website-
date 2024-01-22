import React, { useEffect, useState } from 'react'
import PlaceList from '../Components/PlaceList'
import { useParams } from 'react-router-dom'

const Places = () => {
  const userId=useParams().userName;
 
  const [loadedPlaces,setLoadedPlaces]=useState([

  ]);
  useEffect(()=>{
    const sendData= async()=>{ 
      try{
        const response=await fetch(`http://localhost:5000/api/places/user/${userId}`);
        const responseData=await response.json();       
             if(!response.ok){
               console.log(response.message)
               
               throw new Error(responseData.message)
             }
             
             setLoadedPlaces(responseData.places)
             console.log(responseData.places.id)
            
             console.log(loadedPlaces)
      }catch(err){
           console.log(err)
      }
   
    };
    sendData();
   },[loadedPlaces, userId])

   
  return(
<React.Fragment>
  {loadedPlaces && <PlaceList items={loadedPlaces}/>}
</React.Fragment>
  )
  
  
}

export default Places
