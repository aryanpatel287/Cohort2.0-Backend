import React from 'react'
import '../styles/form-group.scss'

const FormGroup = ({ label, id, placeholder, type, value, onChange }) => {
  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        className='form-input'
        type={type}
        id={id}
        placeholder={placeholder} />
    </div>
  )
}

export default FormGroup