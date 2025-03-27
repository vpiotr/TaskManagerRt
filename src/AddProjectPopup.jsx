import React, { useState, useContext, useEffect, useRef } from 'react';
import { StoreContext } from "./store"; 
import PropTypes from 'prop-types';

function AddProjectPopup(props) {
  const { onAddProject, onClose } = props;
  // State for the new project name
  const [newProjectName, setNewProjectName] = useState('');
  const inputRef = useRef(null);
  const { state } = useContext(StoreContext);

  useEffect(() => {
    // Step 3: Set focus on the input element when the component mounts
    inputRef.current.focus();
  }, []);

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
  }, [onClose]); 

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the project name already exists
    const isNameExist = (state !== undefined) && (state['projects'] !== undefined) && state.projects.some(
      (project) => project.name === newProjectName
    );

    if (isNameExist) {
      alert("Project name already exists. Please choose a different name.");
      return false; // Stop the function if the name already exists
    }

    if (onAddProject(e, newProjectName, setNewProjectName)) {
        onClose(); // Close the popup after adding the project
    }
  };

  // Render the form
  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef} // Attach the ref to the input element
            type="text"
            value={newProjectName}
            onChange={(e) => {setNewProjectName(e.target.value)}}
            placeholder="New Project Name"
            required
          />
          <div className="buttons-container">
            <button type="submit" className="add-project">
              Add Project
            </button>
            <button onClick={onClose} className="popup-close-btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddProjectPopup.propTypes = {
  onAddProject: PropTypes.func,
  onClose: PropTypes.func,
};

// Export the component
export default AddProjectPopup;