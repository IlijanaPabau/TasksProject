"use client"
import React, { useState } from 'react';
import Form from './Form';
import List from './List';
import Search from './Search';
import { Task } from './types';

const App = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredTasks = tasks.filter(task =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const editTask = (updatedTask: Task) => {
        setTasks(tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
        setEditingTask(undefined);
    };

    const toggleTask = ({ id }: { id: string }) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <Form
                addTask={addTask}
                editTask={editTask}
                editingTask={editingTask}
            />
            <Search
                placeholder="Search tasks..."
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <List
                tasks={filteredTasks} 
                toggleTask={toggleTask}
                setEditingTask={setEditingTask}
                deleteTask={deleteTask}
            />
        </div>
    );
};

export default App;
