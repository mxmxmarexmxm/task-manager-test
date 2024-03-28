import { useState, useEffect } from 'react';
import Task from '../types/Task';

// Custom hook to fetch tasksData from local storage
export const useTasksData = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const localStorageData = localStorage.getItem('tasks');
      if (localStorageData) {
        const parsedData: Task[] = JSON.parse(localStorageData);
        setTasksData(parsedData);
      }
    };
    fetchDataFromLocalStorage();
  }, []);

  return {tasksData, setTasksData};
};
