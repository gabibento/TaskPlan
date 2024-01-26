import React from 'react'

const Filter = (categoryFilter, setCategoryFilter) => {
  return (
    <div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
        </select>
    </div>
  )
}

export default Filter