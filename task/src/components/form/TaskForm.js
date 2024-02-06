import React, { useState, useEffect } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Select from './Select';
import { Calendar } from 'primereact/calendar';
import styles from './TaskForm.module.css'

const TaskForm = ({ taskData, handleSubmit, btnText }) => {
  const [task, setTask] = useState(taskData || {});
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [formData, setFormData] = useState({ date: null });

  


  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/priorities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPriorities(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/date', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  

  
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(task);
    console.log(task);
  };

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setTask({
      ...task,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  function handlePriority(e) {
    setTask({
      ...task,
      priority: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  const handleDateChange = (e) => {
    // Convert the date to a string
    const dateString = e.value ? e.value.toISOString() : null;

    // Update the state with the new date selected
    setTask({ ...task, date: dateString });
  };

  


  return (
    <div>
      <form onSubmit={submit}>
        <Input
          type={"text"}
          text={"Title"}
          name={"title"}
          handleOnChange={handleChange}
          value={task.title ? task.title : ''}
        />
        <div className={styles.date_container}>
         <label htmlFor="date">Date</label>
          <Calendar
          inputId="date"
          value={task.date ? new Date(task.date) : null}
          onChange={handleDateChange}
          dateFormat="dd/mm/yy"
          inputClassName={styles.input_calendar}
          className={styles.react_calendar}
          
        />
        </div>
        <div className={styles.select_container}>
        <Select
          labelText={"Category"}
          name={"category_id"}
          options={categories}
          handleOnChange={handleCategory}
          value={task.category ? task.category.id : ''}
        />
        <Select
          labelText={"Priority"}
          name={"priority_id"}
          options={priorities}
          handleOnChange={handlePriority}
          value={task.priority ? task.priority.id : ''}
        />  
        </div>     
        <SubmitButton text={btnText}></SubmitButton>
      </form>
    </div>
  );
};

export default TaskForm;
