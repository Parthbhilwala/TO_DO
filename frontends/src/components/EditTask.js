import React, { useState } from 'react';

function EditTask({ task, onEdit, onCancel }) {
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = () => {
        onEdit(task._id, { title: newTitle });
        onCancel();  // Close the edit form after saving
    };

    return (
        <div>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Edit task"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default EditTask;
