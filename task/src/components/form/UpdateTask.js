import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';
import styles from './NewTask.module.css'
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASK':
      return action.payload;
    default:
      return state;
  }
};

const UpdateTask = () => {
  const [task, dispatchTask] = useReducer(taskReducer, null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data) {
          dispatchTask({ type: 'SET_TASK', payload: data });
        }
       
      })
      .catch((err) => console.log(err));
  }, [id]);

  const update = (task) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    };



    fetch(`http://localhost:5000/tasks/${id}`, requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        dispatchTask({ type: 'SET_TASK', payload: data });
        navigate('/', { state: { message: 'Projeto atualizado com sucesso!' } });
      })
      .catch((err) => console.log('Update Error:', err));
  };

  return (
    <div>
      <div className={styles.top_container}>
        <Link to={"/"}><FaArrowLeft /></Link>
        <h1>Update Task</h1>
        </div>
      
      {task && (
        <TaskForm btnText={"Update"} taskData={task} handleSubmit={update}></TaskForm>
      )}
    </div>
  );
};

export default UpdateTask;
