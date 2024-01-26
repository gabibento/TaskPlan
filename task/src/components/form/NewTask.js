import React from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'

const NewTask = () => {

    const navigate = useNavigate()

    function createPost(task){
        //initialize cost and services

        fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
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
    <div>
        <TaskForm handleSubmit={createPost} btnText='Create'></TaskForm>
    </div>
  )
}

export default NewTask