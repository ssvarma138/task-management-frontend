'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async (newTask: Omit<Task, 'id'>) => {
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    await updateTask(updatedTask);
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main>
      <h1>Task Management System</h1>
      <TaskForm onSubmit={handleCreateTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onStatusChange={handleUpdateTask} />
    </main>
  );
}