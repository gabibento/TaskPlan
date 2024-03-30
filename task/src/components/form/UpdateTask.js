import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';
import styles from './NewTask.module.css';
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const db = firebase.firestore();
      const taskDoc = await db.collection('tasks').doc(id).get();
      if (taskDoc.exists) {
        dispatchTask({ type: 'SET_TASK', payload: { id: taskDoc.id, ...taskDoc.data() } });
      } else {
        console.log('Task not found');
      }
    };

    fetchTask();
  }, [id]);

  const update = (taskData) => {
    const db = firebase.firestore();
    db.collection('tasks').doc(id).set(taskData)
      .then(() => {
        console.log('Task updated successfully!');
        navigate('/', { state: { message: 'Task updated successfully!' } });
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div>
      <div className={styles.top_container}>
          <Link to={"/"}><FaArrowLeft /></Link>
      </div>
      
      <div className={styles.newTask_container}>
        <h1>Update Task</h1>
        {task && (
          <TaskForm btnText={"Update"} taskData={task} handleSubmit={update}></TaskForm>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
