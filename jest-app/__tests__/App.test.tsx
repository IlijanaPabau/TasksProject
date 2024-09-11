
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app/App';
import { Task } from '../app/types';

const mockTask: Task = {
  id: '1',
  description: 'Test Task',
  isCompleted: false,
};

test('initial state is empty', () => {
  render(<App />);
  expect(screen.queryByText('Test Task')).toBeNull();
});

test('add task', () => {
  render(<App />);
  
  const descriptionInput = screen.getByPlaceholderText('Task description');
  const submitButton = screen.getByText('Add Task');

  fireEvent.change(descriptionInput, { target: { value: 'New Task' } });
  fireEvent.click(submitButton);
  
  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('edit task', () => {
  render(<App />);

  const descriptionInput = screen.getByPlaceholderText('Task description');
  const submitButton = screen.getByText('Add Task');
  fireEvent.change(descriptionInput, { target: { value: 'Initial Task' } });
  fireEvent.click(submitButton);

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);

  const editInput = screen.getByPlaceholderText('Edit description');
  const saveButton = screen.getByText('Save');
  
  fireEvent.change(editInput, { target: { value: 'Updated Task' } });
  fireEvent.click(saveButton);
  
  expect(screen.getByText('Updated Task')).toBeInTheDocument();
  expect(screen.queryByText('Initial Task')).toBeNull();
});

test('toggle task', () => {
  render(<App />);

  const descriptionInput = screen.getByPlaceholderText('Task description');
  const submitButton = screen.getByText('Add Task');
  fireEvent.change(descriptionInput, { target: { value: 'Task to Toggle' } });
  fireEvent.click(submitButton);
  
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  expect(checkbox).toBeChecked();
});

test('delete task', () => {
  render(<App />);

  const descriptionInput = screen.getByPlaceholderText('Task description');
  const submitButton = screen.getByText('Add Task');
  fireEvent.change(descriptionInput, { target: { value: 'Task to Delete' } });
  fireEvent.click(submitButton);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  
  expect(screen.queryByText('Task to Delete')).toBeNull();
});
