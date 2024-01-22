import React, { useContext } from 'react'
import Input from '../../shared/Components/Input'
import './SignUp.css'
import Button from '../../shared/Components/Button'
import {AuthContext} from '../Components/AuthContext'
import { useState } from 'react'

const SignUp = () => { 
  const auth=useContext(AuthContext)
    const [usname,setUsname]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordCon,setPasswordCon]=useState('')
    const [touch,setTouch]=useState(true)
    const [touchName,setTouchName]=useState(true)
    const [touchEmail,setTouchEmail]=useState(true)
    const [touchPassword,setTouchedPassword]=useState(true)
    const [touchPasswordCon,setTouchedPasswordCon]=useState(true)
    const regexName=/^([A-Za-z]){12}/g
    const regexEmail=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g
    const regexPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    const submitform=async event=>{
        /*setUsname('')
        setName('')
        setEmail('')
        setPassword('')*/
       /* event.preventDefault()
        try{
          const response=await fetch('http://localhost:3000/signUp',{
            method:'POST',
            header:{
              'Content-Type':'application.json',
            },
            body:JSON.stringify({
              userName:formState.inputs.usname.value,
              name:formState.inputs.name.value,
              email:formState.inputs.email.value,
              password:formState.inputs.password.value,
            })
      })
      const resultData=await response.json();//new promise 
      console.log(resultData);
        }catch(err){
            console.log(err);
        }
      
       */
       auth.login()
       
    }
    const blurUserName=()=>{
  setTouch(false)
 }
 const blurName=()=>{
  setTouchName(false)
 }
   
 const blurEmail=()=>{
  setTouchEmail(false)
 }
 const blurPassword=()=>{
  setTouchedPassword(false)
 }
 const blurPasswordConfirm=()=>{
  setTouchedPasswordCon(false)
 }
 
    
      return (
    <div>
        <form onSubmit={submitform}>
      <Input blur={blurUserName}  element="input" class={'signUp'} label="UsesrName" value={usname} onChange={(e)=>setUsname(e.target.value)}/>
      { !touch && !regexName.test(usname)?<p className='messageName'>Enter a valid Username with atleast 12 characters</p>:""} 
      <Input element="input" blur={blurName} class={`signUp`} label="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      { !touchName &&  name.length<=0 ?<p className='messageName'>Required</p>:""} 
      <Input element="input" label="Email" blur={blurEmail} class={`signUp`} value={email} onChange={(e)=>setEmail(e.target.value)}/>
      { !touchEmail &&  !regexEmail.test(email) ?<p className='messageName'>Enter a Valid Email Address</p>:""} 
      <Input element="input" blur={blurPassword} label="Password" class={`signUp`} value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
      { !touchPassword &&  !regexPassword.test(password) ?<p>Password should have more than 8 characters<br/>0-9-Require that at least one digit<br/>a-z-Require that at least one lowercase letter<br/>A-Z-Require that at least one uppercase letter</p>:""}
      <Input element="input" blur={blurPasswordConfirm} label=" Confirm Password" class={`signUp`} value={passwordCon} onChange={(e)=>setPasswordCon(e.target.value)}/><br/>
      { !touchPasswordCon &&  passwordCon!==password  ?<p>Passowrd doesn't match</p>:""}
      <Button info="Sign Up" class={'btn-submit '} />
      </form>
    </div>
  )
}

export default SignUp
