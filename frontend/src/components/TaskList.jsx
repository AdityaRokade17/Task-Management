import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, deleteTask, fetchTasks }) => {
  const navigate = useNavigate();

  const editTask = (id) => {
    navigate(`/edit-task/${id}`);
  }
  useEffect(() => {
    fetchTasks();
  }, [])
  return (
    <div>
      <div className='justify-between flex'>
        <h2 className="text-xl font-bold mb-2">Tasks List</h2>
        <Link to="/add-product" className="bg-blue-500 text-white px-2 py-1 rounded">
          Add Task
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 border  py-2">taskTitle</th>
            <th className="px-4 border  py-2">taskDetails</th>
            <th className="px-4 border  py-2">startDate</th>
            <th className="px-4 border  py-2">endDate</th>
            <th className="px-4 border  py-2">status</th>
          </tr>
        </thead>
      
        <tbody>
          {tasks?.length ?
            tasks.map((task) => (
              <tr key={task._id}>
                <td className="border px-4 py-2 text-center">{task.name}</td>
                <td className="border px-4 py-2 text-center">{task.description}</td>
                <td className="border px-4 py-2 text-center">${task.price}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => editTask(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 ms-2 py-1 rounded"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>No Data Found</td>


          }
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;