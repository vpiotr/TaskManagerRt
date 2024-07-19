// Import necessary hooks and other dependencies
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the AddProjectForm component
function AddProjectForm({ addProject, closePopup }) {
  // State for the new project name
  const [newProjectName, setNewProjectName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Step 3: Set focus on the input element when the component mounts
    inputRef.current.focus();
  }, []);


  const handleEnter = (e) => {
    const projectName = inputRef.current.value;
    setNewProjectName(projectName);

    e.preventDefault(); // Prevent form submission
    if (!projectName.trim()) {
      inputRef.current.setCustomValidity('Project name is required.'); // Set custom validation message
      inputRef.current.reportValidity(); // Show the validation message
      inputRef.current.setCustomValidity(''); // Reset the custom validity message to ensure form can be submitted later
    } else {
      if (addProject(e, projectName, setNewProjectName)) {
        closePopup(); // Close the popup after adding the project
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (addProject(e, newProjectName, setNewProjectName)) {
        closePopup(); // Close the popup after adding the project
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Prevent default action if necessary, e.g., form submission
        e.preventDefault();
        // Trigger the same action as your handleEnter function
        handleEnter(e);
      } else if (e.key === 'Escape') {
        // Prevent default action if necessary
        e.preventDefault();
        closePopup();
      }
    };

    // Attach the event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [addProject, closePopup]); // Add dependencies here if they are used inside handleKeyDown

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
            <button onClick={closePopup} className="popup-close-btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// Export the component
export default AddProjectForm;