import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus } from '../types/Task';
import { loadTasks, saveTasks } from '../storage/taskStorage';

interface TasksContextValue {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadTasks().then((stored) => {
      setTasks(stored);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveTasks(tasks);
  }, [tasks, loaded]);

  const addTask = useCallback((title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : ('completed' as TaskStatus) }
          : t
      )
    );
  }, []);

  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks]
  );

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, getTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used inside TasksProvider');
  return ctx;
}
