import React from 'react'

const Select = ({text, name, options, handleOnChange, value}) => {
  return (
    <div>
            <select required name={name} id={name} onChange={handleOnChange} value={value}>
                <option value={""}>{text}</option>
                {options.map((option) => (
                    <option required value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
    </div>
  )
}

export default Select