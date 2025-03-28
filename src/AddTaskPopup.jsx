import React, { useState, useRef, useEffect, useContext } from "react";

import { StoreContext } from "./store"; // Adjust the path as necessary
import PropTypes from 'prop-types';

function AddTaskPopup({ projectId, onClose, onAddTask }) {
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = useRef(null);
  const { state } = useContext(StoreContext);

  useEffect(() => {
    // Check if the input element is available and then set focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    inputRef.current.focus();

    // Define the function to handle the Escape key press
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Call the onClose function to close the popup
      }
    };

    // Attach the event listener to the window object
    window.addEventListener('keydown', handleEscape);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]); // Include onClose in the dependency array if it could change

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const stateProjectsExists = (state !== undefined) && (state['projects'] !== undefined);

    // Find the project by its ID
    const project = !stateProjectsExists ? undefined : state.projects.find(
      (project) => project.id === projectId
    );

    if (!project) {
      alert("Project not found.");
      return false; // Stop the function if the project is not found
    }

    // Check if the task name already exists in the project
    const isTaskNameExist = (projectId, taskName) => {
      // Find the project first
      const project = state.projects.find((p) => p.id === projectId);
      // Check within the found project if any task has the same name
      return project && project.tasks.some((task) => task.name === taskName);
    };

    if (stateProjectsExists && isTaskNameExist(projectId, newTaskName)) {
      alert(
        "Task name already exists in this project. Please choose a different name."
      );
      return false; // Stop the function if the task name already exists
    }

    if (!onAddTask(projectId, newTaskName)) {
      return false;
    }

    setNewTaskName("");
    onClose();
    return true;
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="New Task Name"
            required
          />
          <button type="submit" className="popup-add-task-btn">
            Add Task
          </button>
          <button onClick={onClose} className="popup-close-btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

AddTaskPopup.propTypes = {
  projectId: PropTypes.string, 
  onClose: PropTypes.func, 
  onAddTask: PropTypes.func
};

export default AddTaskPopup;
