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
