import {Link} from 'react-router-dom'
import styles from './Button.module.css'

const Button = ({to, text}) => {
  return (
    <div className={styles.button_link}>
      <Link to={to}>{text}</Link>
    </div>
  )
}

export default Button