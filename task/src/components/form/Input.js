import React from 'react'
import styles from './Input.module.css'
const Input = ({type, text, name, handleOnChange, value}) => {
  return (
        <div className={styles.input_container}>
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