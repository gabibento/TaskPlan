import React from 'react';
import { createRoot } from 'react-dom/client';
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

firebase.initializeApp(firebaseConfig);

createRoot(
  document.getElementById('root')
  ).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
