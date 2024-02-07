import logo from './logo.svg';
import './App.css';
import Home from './components/page/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewTask from './components/form/NewTask';
import UpdateTask from './components/form/UpdateTask';

function App() {
  return (
    <div>
      <h1>teste</h1>
      <Home></Home>
     
    </div>
  );
}

export default App;
