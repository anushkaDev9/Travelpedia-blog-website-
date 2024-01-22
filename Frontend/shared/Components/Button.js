import React from 'react'
import './Button.css'
const Button = props => {
  return (
    <button className={props.class} onClick={props.openModel}>{props.info}</button>
  )
}

export default Button
