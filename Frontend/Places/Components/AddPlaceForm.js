import React from 'react'
import Input from '../../shared/Components/Input'
import Button from '../../shared/Components/Button'
import './Form.css'

const AddPlaceForm = props => {
  return (
    <div>
      <form >
           <Input element='input' label="Add new Placename" errorText="Please enetere a valid title"/>
      </form>
    </div>
  )
}

export default AddPlaceForm;
