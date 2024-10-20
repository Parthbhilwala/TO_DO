import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  // Toggle task completion
  const toggleComplete = () => {
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      ...task,
      completed: !task.completed
    }).then(response => setTasks(tasks => tasks.map(t => t._id === task._id ? response.data : t)));
  };

  // Edit task (title and due date)
  const saveEdit = () => {
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      ...task,
      title: editedTitle,
      dueDate: editedDueDate
    }).then(response => {
      setTasks(tasks => tasks.map(t => t._id === task._id ? response.data : t));
      setIsEditing(false);
    });
  };

  // Delete task
  const deleteTask = () => {
    axios.delete(`http://localhost:5000/api/tasks/${task._id}`)
      .then(() => setTasks(tasks => tasks.filter(t => t._id !== task._id)));
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="edit-container">
          <input 
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="edit-date"
          />
          <button className="save-btn" onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <>
          <span className={task.completed ? 'completed' : ''}>
            {task.title} [<span className="priority">{task.priority}</span>] Due: {new Date(task.dueDate).toISOString().split('T')[0]}
          </span>
          <div className="task-actions">
            <button className={`complete-btn ${task.completed ? 'uncomplete' : 'complete'}`} onClick={toggleComplete}>
              {task.completed ? 'Unmark' : 'Complete'}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={deleteTask}>X</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
