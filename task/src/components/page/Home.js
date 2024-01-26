import React, { useState, useEffect } from 'react';
import Button from '../layout/Button';
import TaskCard from '../layout/TaskCard';
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Home = () => {
  
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All")

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

  


  return (
    <div>
      <h1>Tasks</h1>
      <div>
        {tasks.filter((task) => 
        CategoryFilter == "All" ? true : categoryFilter === "Work" ? task.category : categoryFilter
        )}
      </div>
      <div>
        {tasks.length > 0 ? (

                <>
            <Link to="/newtask"><AiFillPlusCircle/></Link>
            {tasks.map((task) => (
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
          <div>
            <h2>Clique aqui para criar sua primeira tarefa!</h2>
            <Button to='/newtask' text="Criar tarefa" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
