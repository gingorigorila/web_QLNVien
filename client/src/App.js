import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Users from './pages';
import Adduser from './pages/users/add/index';
import Edituser from './pages/users/id/edit/index';
import Register from './pages/register';
import Login from './pages/login/index';
import Viewuser from './pages/users/id/view/index'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
 
axios.defaults.withCredentials = true;


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Users/>}/>
          <Route path="/add-user" element={<Adduser/>} />
          <Route path ="/login" element={<Login/>}/>
          <Route path ="/register" element={<Register/>}/>
          <Route path="/edit-user/:id" element={<Edituser/>} />
          <Route path="/user/:id" element={<Viewuser/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
