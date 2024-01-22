import React from 'react'

const EditPlace = props => {
  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={props.closeModel}>&times;</span>
      {props.children}
     
    
    </div>
    
    </div>
  )
}

export default EditPlace
