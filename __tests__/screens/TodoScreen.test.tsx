import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TodoScreen from '../../src/screens/TodoScreen';

jest.mock('../../src/utils/utils', () => {
  const originalModule = jest.requireActual('../../src/utils/utils');
  return {
    ...originalModule,
    generateId: jest.fn(() => '1'),
  };
});

describe('TodoScreen - Add Task', () => {
  it('should adds a new task to the list when the Add button is pressed correctly', () => {
    const {getByTestId, getByText} = render(<TodoScreen />);

    const input = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    fireEvent.changeText(input, 'First task');

    fireEvent.press(addButton);

    expect(getByText('First task')).toBeTruthy();
  });
});

describe('TodoScreen - Complete Task', () => {
  it('should marks a task as completed and updates the UI with strikethrough style', () => {
    const {getByTestId} = render(<TodoScreen />);

    const input = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    fireEvent.changeText(input, 'Task to Complete');
    fireEvent.press(addButton);

    const taskText = getByTestId('taskText-1');
    expect(taskText.props.style).not.toContainEqual({
      textDecorationLine: 'line-through',
    });

    const completeButton = getByTestId('completeButton-1');
    fireEvent.press(completeButton);

    expect(taskText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textDecorationLine: 'line-through',
          color: '#aaa',
        }),
      ]),
    );
  });
});

describe('TodoScreen - Delete Task', () => {
  it('should removes a task from the list when the Delete button is pressed', () => {
    const {getByTestId, queryByText} = render(<TodoScreen />);

    const input = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    fireEvent.changeText(input, 'Task to Delete');
    fireEvent.press(addButton);

    expect(queryByText('Task to Delete')).toBeTruthy();

    const deleteButton = getByTestId('deleteButton-1');
    fireEvent.press(deleteButton);

    expect(queryByText('Task to Delete')).toBeNull();
  });
});
