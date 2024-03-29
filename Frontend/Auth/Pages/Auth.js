import React from 'react'
import { useContext} from 'react'
import './Auth.css'
//import { useHttpClient } from '../../shared/hooks/http-hooks'
import { AuthContext } from '../Components/AuthContext'
import { useForm } from '../../shared/hooks/form-hook'
import Input from '../../shared/FormElements/Input'
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Button from '../../shared/FormElements/Button'
//import LoadingSpinner from '../../shared/Components/LoadingSpinner'
import { useState } from 'react'
import Model from '../../Places/Components/Model'
const Auth = () => { 
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
//const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState(false)
const [errorMsg,setErrorMsg]=useState("")
const clearError=()=>
{
  setError(false)
}
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();    
           if (isLoginMode){
             try{
              const response=await fetch('http://localhost:5000/login',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  email:formState.inputs.email.value,
                  password:formState.inputs.password.value
                })
              });
           
              const responseData=await response.json();
         console.log(responseData)
              if(!response.ok){
                setError(true)
                setErrorMsg(responseData.message)
                console.log(response.message)
                
                throw new Error(responseData.message)
              }
              auth.login(responseData.users.userName)
              
             }catch(err){
              console.log(err)
             }
           }else{
            try{
              const response=await fetch('http://localhost:5000/signUp',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  userName:formState.inputs.userName.value,
                  name:formState.inputs.name.value,
                  email:formState.inputs.email.value,
                  password:formState.inputs.password.value
                })
              });
            
              const responseData= await response.json();
            
              if(!response.ok){
                setError(true)
                setErrorMsg(responseData.message)
                console.log(responseData.message)
                throw new Error(responseData.message)
              }
              auth.login(responseData.userName)
             }catch(err){
              console.log(err)
             }
           }
      }
  
   
     
   

  return (
  <div>
    
    { error && <Model closeModel={clearError}>
    {errorMsg}
    </Model>}
    {/*{isLoading && <LoadingSpinner asOverLay="true"/>}*/}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
          <Input
            element="input"
            id="userName"
            type="text"
            label="UserName"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter username."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
      </div>
  )
};

export default Auth