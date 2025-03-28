import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreContext } from './store.jsx'; // Adjust the path as necessary
import AddTaskPopup from './AddTaskPopup.jsx';
import '@testing-library/jest-dom';

jest.mock('./store');

describe('AddTaskPopup', () => {
  const projectId = 'project-id-1';
  const mockOnClose = jest.fn();
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the popup with the correct project ID', async () => {
    render(
      <StoreContext.Provider value={{ projects: [{ id: projectId, tasks: [] }] }}>
        <AddTaskPopup
          projectId={projectId}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      </StoreContext.Provider>
    );

    const popup = document.querySelector('.popup');
    expect(popup).toBeInTheDocument();

    const inputElement = document.querySelector('input[type="text"]');
    expect(inputElement).toHaveAttribute('value', '');

    const form = document.querySelector('form');
    expect(form).toBeVisible();
  });

  it('calls onClose when the close button is clicked', async () => {
    window.alert = () => {}; 
    render(
      <StoreContext.Provider value={{ projects: [{ id: projectId, tasks: [] }] }}>
        <AddTaskPopup
          projectId={projectId}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      </StoreContext.Provider>
    );

    const closeButton = document.querySelector('.popup-close-btn');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onAddTask when the add task button is clicked', async () => {
    window.alert = () => {}; 
    render(
      <StoreContext.Provider value={{ state: {projects: [{ id: projectId, tasks: [] }] }}}>
        <AddTaskPopup
          projectId={projectId}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      </StoreContext.Provider>
    );

    const addTaskButton = document.querySelector('.popup-add-task-btn');
    fireEvent.click(addTaskButton);

    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });

  it('validates task name and does not call onAddTask if invalid', async () => {
    render(
      <StoreContext.Provider value={{ projects: [{ id: projectId, tasks: [] }] }}>
        <AddTaskPopup
          projectId={projectId}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      </StoreContext.Provider>
    );

    const inputElement = document.querySelector('input[type="text"]');
    fireEvent.change(inputElement, { target: { value: 'invalid-task-name' } });

    await new Promise((r) => setTimeout(r, 1000));
    expect(mockOnAddTask).toHaveBeenCalledTimes(0);
  });

  it('calls onAddTask when the form is submitted with valid task name', async () => {
    window.alert = () => {}; 

    render(
      <StoreContext.Provider value={{ state: {projects: [{ id: projectId, tasks: [] }] }}}>
        <AddTaskPopup
          projectId={projectId}
          onClose={mockOnClose}
          onAddTask={mockOnAddTask}
        />
      </StoreContext.Provider>
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'valid task' } });

    const submitButton = screen.getByRole('button', {
      name: /Add Task/i,
    });
    fireEvent.click(submitButton);
    await new Promise((r) => setTimeout(r, 1000));

    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });
});
