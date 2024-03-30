import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import styles from './NewTask.module.css';
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const NewTask = () => {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(true);

    const createTask = (task) => {
        const db = firebase.firestore();
        db.collection('tasks').add({ ...task, completed: !completed })
            .then(() => {
                navigate('/', { state: { message: 'Task created successfully!' } });
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
    };

    return (
        <div className={styles.newTask_container}>
            <div className={styles.top_container}>
                <Link to={"/"}><FaArrowLeft /></Link>
                <h1>Create Task</h1>
            </div>
            <div className={styles.taskForm}>
            <TaskForm handleSubmit={createTask} btnText='Create'></TaskForm>
            </div>
        </div>
    );
};

export default NewTask;
