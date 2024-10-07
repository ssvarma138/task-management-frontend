import React from 'react';
import { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatusChange: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onStatusChange }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <select
            value={task.status}
            onChange={(e) => onStatusChange({ ...task, status: e.target.value as Task['status'] })}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;