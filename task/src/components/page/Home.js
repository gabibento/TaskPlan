import React, { useState, useEffect } from 'react';
import Button from '../layout/Button';
import TaskCard from '../layout/TaskCard';
import Filter from '../layout/Filter'
import Search from '../layout/Search'
import styles from './Home.module.css'

const Home = () => {
  
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [completedFilter, setCompletedFilter] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('http://localhost:5000/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
            }).then((resp) => resp.json())
            .then(() => {
                setTasks(tasks.filter((task) => task.id !== id))
            })
            .catch(err => console.log(err))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;  // Os meses começam do zero, então adicionamos 1
    const year = date.getUTCFullYear();

    // Adiciona zeros à esquerda para manter o formato dd/mm/yy
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(2)}`;
  };

 
 const filteredTasks = tasks.filter((task) => {

   
  console.log(`task completed ${task.completed}`)
  console.log(`completed filter ${completedFilter}`)


  // Filtrar por categoria e prioridade
  return (categoryFilter === "All" || task.category.name === categoryFilter) && 
  (priorityFilter === "All" || task.priority.name === priorityFilter) && 
  (completedFilter === "All" || task.completed.toString() === completedFilter) &&
  (task.title.toLowerCase().startsWith(search.toLowerCase()));
});


  


  return (
    <div>
      <div>
        <Search search={search} setSearch={setSearch}></Search>
      </div>
      <h1 className={styles.home_title}>Tasks</h1>
      <div>
        <Filter setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} 
        priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
        completedFilter={completedFilter} setCompletedFilter={setCompletedFilter}></Filter>
      </div>
      <div>
        {filteredTasks.length > 0 ? (
          <>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                category={task.category.name}
                priority={task.priority.name}
                date={formatDate(task.date)}
                task={task}
                handleRemove={removeTask}
              />
            ))}
          </>
        ) : (
          <div className={styles.container}>
            <p>You have no tasks. Create one!</p>
           <div className={styles.button}>
            <Button text={"Create Task"} to={"/newtask"}></Button>
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
