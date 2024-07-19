// Import necessary hooks and other dependencies
import React, { useState, useEffect, useRef } from 'react';

// Define the AddProjectForm component
function AddProjectForm({ addProject, closePopup }) {
  // State for the new project name
  const [newProjectName, setNewProjectName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Step 3: Set focus on the input element when the component mounts
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (addProject(e, newProjectName, setNewProjectName)) {
        closePopup(); // Close the popup after adding the project
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
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New Project Name"
            required
          />
          <div className="buttons-container">
            <button onClick={closePopup} className="close-btn">Close</button>
            <button type="submit" className="add-project">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// Export the component
export default AddProjectForm;