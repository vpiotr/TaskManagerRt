// src/TaskList.jsx
import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

const TaskList = ({ tasks, projectId, onRemoveTask }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteTask = (onRemoveTask, projectId, taskId) => {
    // Logic to delete the task
    onRemoveTask(projectId, taskId);
    setShowConfirmPopup(false); // Close the confirmation popup
  };

  return (
    <ul>
      // In the render or return section, where you list tasks
      <ConfirmationPopup
        isOpen={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        onConfirm={() =>
          handleDeleteTask(onRemoveTask, projectId, taskToDelete)
        }
        message="Are you sure you want to delete this task?"
      />
      {tasks.map((task) => (
        <li key={`${projectId}-${task.id}`}>
          {task.id}: {task.name}
          <button
            onClick={() => {
              setTaskToDelete(task.id);
              setShowConfirmPopup(true);
            }}
            className="remove-task"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
