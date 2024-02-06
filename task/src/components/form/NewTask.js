import React from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'
import { useState } from 'react'
import styles from './NewTask.module.css'
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const NewTask = () => {

    const navigate = useNavigate()
    const [completed, setCompleted] = useState(true)

   

    function createPost(task){
  

        fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({...task, completed: !completed}),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            navigate('/', { state: { message: 'Projeto criado com sucesso!' } });
        })
        .catch(err => console.log(err))
    }

  return (
    <div className={styles.newTask_container}>
        <div className={styles.top_container}>
        <Link to={"/"}><FaArrowLeft /></Link>
        <h1>Create Task</h1>
        </div>
        <TaskForm handleSubmit={createPost} btnText='Create'></TaskForm>
    </div>
  )
}

export default NewTask