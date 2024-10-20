import React, { useState } from 'react';

function AddTask({ onAdd }) {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onAdd(taskTitle);  // Call the parent function to add the task
            setTaskTitle('');   // Reset the input field
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTask;
