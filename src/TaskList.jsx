// src/TaskList.jsx
import React from 'react';

const TaskList = ({ tasks, projectId, onRemoveTask }) => {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={`${projectId}-${task.id}`}>
            {task.id}: {task.name}
            <button onClick={() => onRemoveTask(projectId, task.id)} className="remove-task">Remove</button>
          </li>
        ))}
      </ul>
    );
  };

export default TaskList;