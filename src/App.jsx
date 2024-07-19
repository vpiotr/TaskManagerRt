// src/App.jsx
import React, { useState, useContext } from "react";
import AddProjectPopup from "./AddProjectPopup";
import ProjectList from "./ProjectList";

import {
  StoreContext,
  ADD_PROJECT
} from "./store"; // Adjust the path as necessary

function App() {
  const { state, dispatch } = useContext(StoreContext);

  const [collapsedProjects, setCollapsedProjects] = useState(
    state.projects.map((project) => project.id)
  );

  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);

  // Function to toggle the AddProjectPopup popup
  const toggleAddProjectPopup = () => {
    setShowAddProjectPopup(!showAddProjectPopup);
  };

  const addProject = (e, newProjectName, setNewProjectName) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    // Check if the project name already exists
    const isNameExist = state.projects.some(
      (project) => project.name === newProjectName
    );

    if (isNameExist) {
      alert("Project name already exists. Please choose a different name.");
      return false; // Stop the function if the name already exists
    }

    let newId = 1;
    
    if (state.projects && state.projects.length > 0) {
        newId = Math.max(...state.projects.map(project => project.id)) + 1;
    }

    const newProject = {
      id: newId, 
      name: newProjectName,
      tasks: [], // New projects start with no tasks
    };

    dispatch({ type: ADD_PROJECT, payload: newProject });
    setNewProjectName(""); // Reset the input field after adding
    return true;
  };

  const toggleProjectCollapse = (projectId) => {
    setCollapsedProjects((currentCollapsedProjects) =>
      currentCollapsedProjects.includes(projectId)
        ? currentCollapsedProjects.filter((id) => id !== projectId)
        : [...currentCollapsedProjects, projectId]
    );
  };

  const expandProject = (projectId) => {
    setCollapsedProjects((currentCollapsedProjects) =>
      currentCollapsedProjects.includes(projectId)
        ? currentCollapsedProjects.filter((id) => id !== projectId)
        : currentCollapsedProjects
    );
  }

  const SummaryFooter = ({ projectCount, taskCount }) => (
    <footer>
      <span>Total Projects: {projectCount}</span>
      &nbsp;|&nbsp;
      <span>Total Tasks: {taskCount}</span>
    </footer>
  );

  const projectCount = state.projects.length;
  const taskCount = state.projects.reduce((total, project) => total + project.tasks.length, 0);
    
  return (
    <div>
      <h1 className="header">Task Manager (React exercise)</h1>
      <button onClick={toggleAddProjectPopup}>Add New Project</button>
      {showAddProjectPopup && (
        <AddProjectPopup
          addProject={addProject}
          closePopup={toggleAddProjectPopup}
        />
      )}
      <ProjectList
        toggleProjectCollapse={toggleProjectCollapse}
        collapsedProjects={collapsedProjects}
      />
      <SummaryFooter projectCount={projectCount} taskCount={taskCount} />
    </div>
  );
}

export default App;
