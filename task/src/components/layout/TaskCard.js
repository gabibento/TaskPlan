import React, { useState, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa6';
import styles from './TaskCard.module.css';
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

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
    <div>
      <div onClick={handleComplete}>
        {!isCompleted ? <MdOutlineRadioButtonUnchecked /> : <MdRadioButtonChecked />}
      </div>
      <Link to={`/updatetask/${id}`}>
        <div>
          <div style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
            <h4>{title}</h4>
          </div>
          <p>{date}</p>
        </div>
        <div>
          <p>{category}</p>
        </div>
        <div>
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
      </Link>
      <div onClick={remove}>
        <FaTrash></FaTrash>
      </div>
    </div>
  );
};

export default TaskCard;
