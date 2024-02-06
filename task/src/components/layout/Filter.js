import React from 'react'
import styles from './Filter.module.css'

const Filter = ({categoryFilter, setCategoryFilter, priorityFilter, setPriorityFilter, completedFilter, setCompletedFilter}) => {

  const change = (e) => {
    setCategoryFilter(e.target.value)
  }
  const changePriority = (e) => {
    setPriorityFilter(e.target.value)
    console.log("Prioridade selecionada:", e.target.value);
    console.log(`priority: ${priorityFilter}`)
  }
  const changeCompleted = (e) => {
    setCompletedFilter(e.target.value)
    console.log("Completed selecionada:", e.target.value);
    console.log(`completed filter: ${completedFilter}`)
  }
  return (
    <div className={styles.select_container}>
      <div className={styles.select}>
        <select value={categoryFilter} onChange={change}>
            <option value="All">Category</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
        </select>
        </div>
        <div className={styles.select}>
          <select value={priorityFilter} onChange={changePriority}>
            <option value="All">Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <div className={styles.select}>
          <select value={completedFilter} onChange={changeCompleted}>
            <option value="All">Progress</option>
            <option value="true">Completed</option>
            <option value="false">Incompleted</option>
          </select>
        </div>

    </div>
  )
}

export default Filter