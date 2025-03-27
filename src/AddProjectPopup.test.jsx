import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StoreContext } from './store'; // Adjust the path as necessary
import AddProjectPopup from './AddProjectPopup.jsx';
import '@testing-library/jest-dom'

jest.mock('./store');

describe('AddProjectPopup', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <StoreContext.Provider value={{ projects: [] }}>
        <AddProjectPopup onAddProject={() => {}} onClose={() => {}} />
      </StoreContext.Provider>
    );

    expect(getByPlaceholderText('New Project Name')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('calls onAddProject when form is submitted', () => {
    const handleAdd = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <StoreContext.Provider value={{ projects: [] }}>
        <AddProjectPopup
          onAddProject={handleAdd}
          onClose={() => {}}
        />
      </StoreContext.Provider>
    );

    const input = getByPlaceholderText('New Project Name');
    fireEvent.change(input, { target: { value: 'Test Project' } });
    const form = getByText('Add Project');
    fireEvent.click(form);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(expect.anything(), 'Test Project', expect.any(Function));
  });

  it('calls onAddProject with correct arguments when project is added successfully', () => {
    const handleAdd = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <StoreContext.Provider value={{ projects: [] }}>
        <AddProjectPopup
          onAddProject={handleAdd}
          onClose={() => {}}
        />
      </StoreContext.Provider>
    );

    const input = getByPlaceholderText('New Project Name');
    fireEvent.change(input, { target: { value: 'Test Project' } });
    const form = getByText('Add Project');
    fireEvent.click(form);

    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Close button is clicked', () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <StoreContext.Provider value={{ projects: [] }}>
        <AddProjectPopup
          onAddProject={() => {}}
          onClose={handleClose}
        />
      </StoreContext.Provider>
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <StoreContext.Provider value={{ projects: [] }}>
        <AddProjectPopup
          onAddProject={() => {}}
          onClose={handleClose}
        />
      </StoreContext.Provider>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
