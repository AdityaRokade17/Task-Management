
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import TaskList from './components/TaskList';
import AddEditTask from './components/AddEditTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  axios.defaults.baseURL = `http://localhost:5000`;

  useEffect(() => {
    fetchTasks();
  }, []);

  // fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks(); // Fetch products after deleting a product
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  return (
    <div className="mx-auto app h-[100vh]">
      <div className='flex flex-row bg-black py-4 px-4 justify-between align-middle items-center'>
        <h1 className="text-3xl font-bold text-white">Tasks Managment</h1>
        <div className="flex">
          <div className="mr-4">
            <Link to="/" className="bg-gray-500 text-white px-2 py-1 rounded">
              Home
            </Link>
          </div>
          <div>
            <Link to="/tasks" className="bg-blue-500 text-white px-2 py-1 rounded">
              Tasks
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto w-1/2 place-self-center mt-20 place-content-center self-center place-items-center">
        <Routes>
          <Route path="/" element={'Please Navigate Around'} />
          <Route path="/tasks" element={<TaskList tasks={tasks} fetchTasks={fetchTasks} deleteTask={deleteTask} />} />
          <Route path="/add-task" element={<AddEditTask fetchTasks={fetchTasks} />} />
          <Route path="/edit-task/:id" element={<AddEditTask fetchTasks={fetchTasks} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
