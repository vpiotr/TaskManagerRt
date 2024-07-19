import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Action Types
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

// Assuming initialProjects is defined elsewhere and imported
const initialProjects = [
  {
    id: 1,
    name: "Project 1",
    tasks: [
      { id: 1, name: "Task 1.1" },
      { id: 2, name: "Task 1.2" },
    ],
  },
  { id: 2, name: "Project 2", tasks: [{ id: 3, name: "Task 2.1" }] },
];

// Helper function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('projects');
    if (serializedState === null) {
      return initialProjects; // Use initialProjects if no data in local storage
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialProjects; // Fallback to initialProjects in case of any errors
  }
};

const initialState = {
  projects: loadState(),
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case REMOVE_PROJECT:
        return {
            ...state,
            projects: state.projects.filter((project) => project.id !== action.payload),
        };
    case ADD_TASK:
        const project = state.projects.find(p => p.id === action.payload.projectId);
        let newTaskId = 1; // Default starting ID
    
        if (project && project.tasks.length > 0) {
            // If the project has tasks, find the maximum task ID and add 1
            newTaskId = Math.max(...project.tasks.map(task => task.id)) + 1;
        }
            
        return {
            ...state,
            projects: state.projects.map((project) =>
            project.id === action.payload.projectId
                ? {
                    ...project,
                    tasks: [
                    ...project.tasks,
                    { id: newTaskId, name: action.payload.taskName },
                    ],
                }
                : project
            ),
        };
    case REMOVE_TASK:
        return {
            ...state,
            projects: state.projects.map((project) =>
            project.id === action.payload.projectId
                ? {
                    ...project,
                    tasks: project.tasks.filter((task) => task.id !== action.payload.taskId),
                }
                : project
            ),
        };
    default:
      return state;
  }
}

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state changes to local storage
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state.projects);
      localStorage.setItem('projects', serializedState);
    } catch {
      // Ignore write errors or implement more sophisticated error handling
    }
  }, [state.projects]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

