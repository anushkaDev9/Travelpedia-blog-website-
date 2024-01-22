import React,{useContext} from 'react'
/*import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';*/
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Input from '../../shared/FormElements/Input'
import Button from '../../shared/FormElements/Button'
import {useForm} from '../../shared/hooks/form-hook'
import {VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import './AddPlace.css'
import { AuthContext } from '../../Auth/Components/AuthContext'
const AddPlace = () => {
  const auth=useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );
const history=useHistory();
  const placeSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
       try{
         const response=await fetch('http://localhost:5000/api/places',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            userName:auth.userName,
            name:formState.inputs.name.value,
            infor:formState.inputs.infor.value,
            location:formState.inputs.location.value,
            creater:auth.userId
         
          })
         })
         const responseData=response.json();
         if(!response.ok){
  
          throw new Error(responseData.message)
         }
       history.push('/')
       }catch(err){
            console.log(err)
       }
       
  };

  return (
    <form className="div-addPlace" onSubmit={placeSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Name."
        onInput={inputHandler}
      />
      <Input
        id="infor"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="location"
        element="input"
        label="Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Location."
        onInput={inputHandler}
      />
      <Button type="submit">
        ADD PLACE
      </Button>
    </form>
  );
}

export default AddPlace
