import React from 'react'

const Input = ({type, text, name, handleOnChange, value}) => {
  return (
        <div>
            <label htmlFor={name}>{text}:</label>
            <input 
            required
            type={type} 
            name={name} 
            id={name} 
            onChange={handleOnChange}
            value={value}
            />
        </div>
  )
}

export default Input