import React from 'react'
import styles from './Select.module.css'
const Select = ({labelText, name, options, handleOnChange, value}) => {
  return (
    <div className={styles.label_select}>
      <label>{labelText}</label>
      {name === "category_id" && (
        <select className={styles.category} required name={name} id={name} onChange={handleOnChange} value={value}>
        <option value={""}></option>
        {options.map((option) => (
            <option required value={option.id} key={option.id}>{option.name}</option>
        ))}
    </select>
      )}
       {name === "priority_id" && (
        <select className={styles.priority} required name={name} id={name} onChange={handleOnChange} value={value}>
        <option value={""}></option>
        {options.map((option) => (
            <option required value={option.id} key={option.id}>{option.name}</option>
        ))}
    </select>
      )}
            
    </div>
  )
}

export default Select