import React, { useState, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa6';
import styles from './TaskCard.module.css';
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const TaskCard = ({ id, title, category, priority, date, task, handleRemove }) => {
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const db = firebase.firestore();
      const taskRef = db.collection('tasks').doc(id);
      const doc = await taskRef.get();
      if (doc.exists) {
        setIsCompleted(doc.data().completed);
      }
    };

    fetchTask();
  }, [id]);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  
    const db = firebase.firestore();
    const taskRef = db.collection('tasks').doc(id);
    taskRef.update({
      completed: !isCompleted
    }).then(() => {

    }).catch((error) => {
      console.error('Error updating task:', error);
    });
  };

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.content_container}>
        <div className={styles.center_container}>
          <div className={styles.title_check}>
            <div className={styles.check} onClick={handleComplete}>
              {!isCompleted ? <MdOutlineRadioButtonUnchecked /> : <MdRadioButtonChecked />}
            </div>
            <div style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
              <h4 className={styles.card_title}>{title}</h4>
            </div>
          </div>
          <div className={styles.flags}>
            {priority === 'Urgent' && (
              <div className={styles.red_flag}>
                <FaFlag></FaFlag>
              </div>
            )}
            {priority === 'Important' && (
              <div className={styles.orange_flag}>
                <FaFlag></FaFlag>
              </div>
            )}
            {priority === 'Upcoming' && (
              <div className={styles.yellow_flag}>
                <FaFlag></FaFlag>
              </div>
            )}
          </div>
        </div>
        <div className={styles.subcontent}>
          <div className={styles.info}>
            <p>{date}</p>
             {category === 'Work' && (
                  <p className={(styles.p_category, styles.work_category)}><TbPointFilled /> {category}</p>
                )}
                {category === 'Study' && (
                  <p className={(styles.p_category, styles.study_category)}><TbPointFilled /> {category}</p>
                )}
                {category === 'Personal' && (
                  <p className={(styles.p_category, styles.personal_category)}><TbPointFilled /> {category}</p>
                )}
          </div>
          <div className={styles.buttons}>
            <Link className={styles.update} to={`/updatetask/${id}`}>
              <FiEdit />
            </Link>
            <div className={styles.remove} onClick={remove}>
              <FaTrash></FaTrash>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
