import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyBlVTWAw_uclhBEJ7Ej7Z778n4XcKbDadc",
  authDomain: "task-ffee3.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "task-ffee3",
  storageBucket: "task-ffee3.appspot.com",
  messagingSenderId: "498647412613",
  appId: "1:498647412613:web:b74de9e2007cc62f629eec"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
