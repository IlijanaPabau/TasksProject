import { useState, useEffect } from "react";
import { Task } from "./types";
import React from "react";
import styles from './Form.module.css'; // Import the CSS module

type FormProps = {
    addTask: (task: Task) => void;
    editTask?: (task: Task) => void; 
    editingTask?: Task;
};

function Form({ addTask, editTask, editingTask }: FormProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (editingTask) {
            setText(editingTask.description);
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            alert('Please enter a task');
            return;
        }
        if (editingTask && editTask) {
            editTask({
                ...editingTask,
                description: text,
            });
        } else {
            addTask({
                id: new Date().getTime().toString(),
                description: text,
                isCompleted: false,
            });
        }
        setText('');
    };

    return (
        <form className={`${styles.form} ${styles.taskForm}`} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.formInput}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className={styles.btn}>
                {editingTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
}

export default Form;
