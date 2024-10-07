import axios from 'axios';
import { Task } from '../types/task'

const API_URL = 'http://localhost:8080/api';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post<Task>(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};