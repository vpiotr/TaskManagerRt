import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTaskPopup from "./AddTaskPopup";
import { StoreContext, ADD_TASK, REMOVE_PROJECT, REMOVE_TASK } from "./store"; // Import necessary actions

const ProjectList = ({ toggleProjectCollapse, collapsedProjects }) => {
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { state, dispatch } = useContext(StoreContext); // Use useContext to access the store

  const handleAddTaskClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowAddTaskPopup(true);
  };

  const handleAddTask = (projectId, taskName) => {
    // Dispatch action to add task here
    dispatch({ type: ADD_TASK, payload: { projectId, taskName } });
    return true;
  };

  const removeProject = (projectId) => {
    dispatch({ type: REMOVE_PROJECT, payload: projectId });
  };

  const removeTask = (projectId, taskId) => {
    dispatch({ type: REMOVE_TASK, payload: { projectId, taskId } });
  };

  // useEffect hook to perform actions when collapsedProjects changes
  useEffect(() => {}, [collapsedProjects]); // Dependency array, re-run the effect when collapsedProjects changes

  return (
    <div className="project-list">
      {state.projects.map((project) => (
        <div key={project.id}>
          <div onClick={() => toggleProjectCollapse(project.id)}>
            {collapsedProjects.includes(project.id) ? "▼" : "▶"} {project.id}:{" "}
            {project.name}
          </div>
          {!collapsedProjects.includes(project.id) && (
            <div>
              <button
                onClick={() => removeProject(project.id)}
                className="remove-project"
              >
                Remove Project
              </button>
              <button
              onClick={() => handleAddTaskClick(project.id)}
              className="add-task"
            >
              Add Task
            </button>              
              <TaskList
                tasks={project.tasks}
                projectId={project.id}
                onRemoveTask={(aProjectId, taskId) =>
                  removeTask(aProjectId, taskId)
                }
              />
            </div>
          )}
        </div>
      ))}
      {showAddTaskPopup && (
        <AddTaskPopup
          projectId={selectedProjectId}
          onClose={() => setShowAddTaskPopup(false)}
          onAddTask={handleAddTask}
        />
      )}      
    </div>
  );
};

export default ProjectList;
