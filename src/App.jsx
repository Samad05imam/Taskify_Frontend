import './App.css';
import { Routes, Route } from 'react-router-dom';
import Content from './components/pages/Content';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import TaskCard from './components/pages/TaskCard';
import Tasks from './components/pages/Tasks';
import EditTask from './components/pages/EditTask';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getall" element={<Tasks />} />
        <Route path="/getsingle/:id" element={<TaskCard />} />
        <Route path="/update/:id" element={<EditTask />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
}

export default App;
