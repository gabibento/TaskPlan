import React from 'react'
import styles from './Search.module.css'
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Search = ({search, setSearch}) => {

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
  return (
    <div className={styles.search_container}>
      
      <div className={styles.search_input}>
        <input type="text" value={search} onChange={handleChange}/>
      </div>
      <div>
      <Link to="/newtask"><AiFillPlusCircle/></Link>
      </div>
    </div>
    
  )
}

export default Search