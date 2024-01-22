import React from 'react'
import './Model.css'
const Model = props => {
  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={props.closeModel}>&times;</span>
      {props.children}
     
    
    </div>
    
    </div>
  )
}

export default Model
