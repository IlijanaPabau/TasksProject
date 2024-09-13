import React from 'react';
import { Task } from './types';
import './List.css';

type ListProps = {
    tasks: Task[];
    toggleTask: ({ id }: { id: string }) => void;
    setEditingTask: (task: Task) => void;
    deleteTask: (id: string) => void;
};

const List = ({ tasks, toggleTask, setEditingTask, deleteTask }: ListProps) => {
    return (
        <ul className='list'>
            {tasks.map((task) => (
                <li key={task.id} className='list-item'>
                    <div className='task-details'>
                        <input
                            type='checkbox'
                            className='task-checkbox'
                            checked={task.isCompleted}
                            onChange={() => toggleTask({ id: task.id })}
                        />
                        <p className='task-text'>{task.description}</p>
                    </div>
                    <div className='task-actions'>
                        <button className='edit-button' onClick={() => setEditingTask(task)}>Edit</button>
                        <button className='delete-button' onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default List;
