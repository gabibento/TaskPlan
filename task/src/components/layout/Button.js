import {Link} from 'react-router-dom'

const Button = ({to, text}) => {
  return (
    <Link to={to}>{text}</Link>
  )
}

export default Button