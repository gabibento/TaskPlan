import React, { useState, useEffect } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import Select from './Select';
import { Calendar } from 'primereact/calendar';
import styles from './TaskForm.module.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const TaskForm = ({ taskData, handleSubmit, btnText }) => {
  const [task, setTask] = useState(taskData || {});
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      const db = firebase.firestore(); //instância do firestore (banco de dados NoSQL) fornecido pelo firebase

      const categoriesCollection = db.collection('categories'); //acessa a coleção 'categories'

      const snapshot = await categoriesCollection.get(); //consulta assíncrona à coleção

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //acessa os documentos da consulta e os mapeia
      setCategories(data); //seta as categorias com os dados obtidos
    };

    fetchCategories();
  }, []);

  useEffect(() => {

    const fetchPriorities = async () => {

      const db = firebase.firestore();

      const prioritiesCollection = db.collection('priorities');

      const snapshot = await prioritiesCollection.get();

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPriorities(data);
    };

    fetchPriorities();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(task);
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
    const dateString = e.value ? e.value.toISOString() : null;
    setTask({ ...task, date: dateString });
  };

  return (
    <div className={styles.container}>
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
            required
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
