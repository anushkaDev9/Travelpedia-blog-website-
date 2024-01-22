import React, { useContext } from 'react'
import Button from '../../shared/Components/Button'
import Input from '../../shared/Components/Input'
import { useState } from 'react'
import {AuthContext} from '../Components/AuthContext'
const Login = () => {
  const auth=useContext(AuthContext)
  const [password,setPassword]=useState('')
  
  const [name,setName]=useState('')
  const [touch,setTouched]=useState(true)
  const [touchPassword,setTouchedPassword]=useState(true)
  const messgaeName="required"

  const onsubmit= event=>{
   

    event.preventDefault()
    setTouched(true)
    setTouchedPassword(true)
    setName('')
    setPassword('')
    auth.login();
    
  }
  const blurname=()=>{
    setTouched(false)
    
     }
     const blurPassword=()=>{
      setTouchedPassword(false)
    }
  return (
    <div>
      <form className='form' onSubmit={onsubmit}>
      <Input element="input" blur={blurname} class={`${!touch && name.length===0 ? 'loginError':'loginInput'}`} label="UsesrName" value={name} onChange={(e)=>setName(e.target.value)}/>
      {!touch && name.length===0 ? <p className='messageLogin'>{messgaeName}</p>:""}
      <Input element="input" value={password} onChange={(e)=>setPassword(e.target.value)} class={`${!touchPassword && password.length===0 ? 'loginError':'loginInput'}`} blur={blurPassword} label="Password"/><br/>
      {!touchPassword && password.length===0 ? <p className='message'>{messgaeName}</p>:""}
      <Button info="Login In" class={`btn-submit ${name.length>0 && password.length>0 ?'btn-submit-correct':'btn-submit'}`}></Button>
      </form>
       </div>
  )
}

export default Login
