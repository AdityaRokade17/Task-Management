import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useSearchParams, useParams } from 'react-router-dom';

const AddEditTask = ({ fetchTasks }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [taskdetails, setTaskDetails] = useState('');
  const [statuss, setStatuss] = useState('');

  useEffect(() => {
    if (id) {
      console.log('here');
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/tasks/${id}`);
      setTitle(response.data.data[0].title);
      setTaskDetails(response.data.data[0].taskdetails);
      setStatuss(response.data.data[0].statuss);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, taskdetails, statuss };

    if (id) {
      try {
        await axios.put(`/api/tasks/${id}`, newTask);
        navigate('/tasks');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      try {
        await axios.post('/api/tasks', newTask);
        fetchTask(); // Fetch users after adding a new user
        navigate('/tasks');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2"> {id ? 'Edit' : 'Add'} Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            TaskTitle
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Task Details
          </label>
          <input
            type="text"
            id="taskdetails"
            name="taskdetails"
            value={taskdetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Status
          </label>
          <input
            type="text"
            id="statuss"
            name="statuss"
            value={statuss}
            onChange={(e) => setStatuss(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTask;