import logo from './logo.svg';
import './App.css';
import Home from './components/page/Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NewTask from './components/form/NewTask';
import UpdateTask from './components/form/UpdateTask';

import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('suaColecao').get();
      data.forEach(doc => {
        console.log('Dados:', doc.data());
      });
    };

    fetchData();
  }, []);
  return (
    <div>
      
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newtask" element={<NewTask/>}/>
        <Route path='/updatetask/:id' element={<UpdateTask/>}/>
    
      </Routes>
    </Router>
    </div>
  );
}

export default App;
