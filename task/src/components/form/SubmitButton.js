import React from 'react'
import styles from './SubmitButton.module.css'
const SubmitButton = ({text}) => {
  return (
    <div className={styles.submit}>
        <button>{text}</button>
    </div>
  )
}

export default SubmitButton