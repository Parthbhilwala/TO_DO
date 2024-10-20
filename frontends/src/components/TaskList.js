import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div>
      <h2>Pending tasks: ({pendingTasks.length})</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} setTasks={setTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
