import React, { useState, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa6';
import styles from './TaskCard.module.css';
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
const TaskCard = ({ id, title, category, priority, date, task, handleRemove }) => {
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`, {  // Mude a rota para buscar a tarefa diretamente
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setIsCompleted(data.completed);
    })
    .catch((err) => console.log(err));
  }, [id]);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  
    fetch(`http://localhost:5000/tasks/${id}`, {  // Mude a rota para atualizar a tarefa diretamente
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, completed: !isCompleted }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Update Response:', data);
      })
      .catch((err) => console.log(err));
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
              <div  className={styles.check} onClick={handleComplete}>
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
