import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('https://to-do-8rnh.onrender.com/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    axios.post('https://to-do-8rnh.onrender.com/api/tasks', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
