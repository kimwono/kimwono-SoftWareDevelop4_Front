import React, { useState, useEffect } from 'react';
import './Todo.css';
import axios from 'axios';

const API_URL = 'http://localhost:3333/api/todo';

const Todo = () => {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [newTask, setNewTask] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            fetchTasks(storedUsername);
        }
    }, []);

    const fetchTasks = async (user) => {
        try {
            const response = await axios.get(`${API_URL}/${user}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error.response ? error.response.data : error);
            alert('Failed to fetch tasks. Please try again.');
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim() === '') {
            setErrorMessage('작업 내용을 입력해주세요.');
            return;
        }
        setErrorMessage(''); // 에러 메시지 초기화
        try {
            await addTask(newTask, username);
            setTasks(prevTasks => ({
                ...prevTasks,
                todo: [...prevTasks.todo, newTask]
            }));
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
            setErrorMessage('작업 추가에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleMoveTask = async (task, fromStatus, toStatus) => {
        try {
            await moveTask(task, fromStatus, toStatus, username);
            await fetchTasks(username);
        } catch (error) {
            console.error('Error moving task:', error);
        }
    };

    const handleDeleteTask = async (task, status) => {
        try {
            await deleteTask(task, status, username);
            await fetchTasks(username);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const addTask = async (task, user) => {
        await axios.post(`${API_URL}/add`, { task, user });
    };

    const moveTask = async (task, fromStatus, toStatus, user) => {
        await axios.put(`${API_URL}/move`, { task, fromStatus, toStatus, user });
    };

    const deleteTask = async (task, status, user) => {
        await axios.delete(`${API_URL}/delete`, { data: { task, status, user } });
    };

    const renderTask = (task, status) => (
        <div key={task} className="todo-task">
            {task}
            <div className="todo-task-buttons">
                {status !== 'todo' && (
                    <button className="todo-button" onClick={() => handleMoveTask(task, status, 'todo')}>Todo</button>
                )}
                {status !== 'inProgress' && (
                    <button className="todo-button" onClick={() => handleMoveTask(task, status, 'inProgress')}>In Progress</button>
                )}
                {status !== 'done' && (
                    <button className="todo-button" onClick={() => handleMoveTask(task, status, 'done')}>Done</button>
                )}
                <button className="todo-button-delete" onClick={() => handleDeleteTask(task, status)}>Delete</button>
            </div>
        </div>
    );

    return (
        <div className="todo-kanban-board">
            <h1>Welcome, {username}!</h1>
            <div className="todo-input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task"
                />
                <button className="todo-button" onClick={handleAddTask}>Add Task</button>
                {errorMessage && <div className="todo-error-message">{errorMessage}</div>}
            </div>
            <div className="todo-columns-container">
                {Object.keys(tasks).map(status => (
                    <div key={status} className="todo-column">
                        <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                        {tasks[status].map(task => renderTask(task, status))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
