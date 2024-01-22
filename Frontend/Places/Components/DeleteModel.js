import React from 'react'
import './DeleteModel.css'
const DeleteModel = props => {
  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={props.closeModel}>&times;</span>
      {props.children}
     
    
    </div>
    
    </div>
  )
}

export default DeleteModel
