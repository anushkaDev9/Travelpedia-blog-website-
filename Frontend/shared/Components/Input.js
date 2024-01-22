import React from 'react'
import { useReducer } from 'react'
import './Input.css'
const inputReducer=(state,action)=>{
switch(action.type){
  case 'ADD':
    return {
       ...state,
       value:action.value,
       isValid:true
    }
    default:
      return state;
}
}
const Input = props => {
 const [inputState,dispatchAction]=useReducer(inputReducer,{value:'',isValid:false});
 const changeHandler=event=>{
  dispatchAction({
    type:'ADD',
    val:event.taget.value,
  });

}
    const element=
    props.element==='input'?<input  id={props.id} name={props.name} type={props.type} className={props.class} value={inputState.value} 
    onClick={props.onClick}  onBlur={props.blur}focused={props.focused} onChange={changeHandler}></input>
    :<textarea id={props.id} rows={props.row||20} value={inputState.value} onChange={changeHandler}></textarea>
   
      return (
        <div className={`${!inputReducer.isValid && 'form-control-validators'}`}>
            <label htmlFor={props.label}>{props.label}</label><br/>
            {element}
            {!inputState.isValid && <p>{props.errror.text}</p>}
        </div>
      )
}

export default Input
