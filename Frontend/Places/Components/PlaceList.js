import React from 'react'
import PlaceItem from './PlaceItem'
const PlaceList = (props) => {

 

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.name}
          description={place.infor}
          address={place.location}
          creatorId={place.userName}
        />
      ))}
    </ul>
  );
}


export default PlaceList
