import { useState, useEffect } from 'react';
import Group from '../types/Group';

// Custom hook to fetch groupsData from local storage
export const useGroupsData = () => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const localStorageData = localStorage.getItem('groups');
      if (localStorageData) {
        const parsedData: Group[] = JSON.parse(localStorageData);
        setGroupsData(parsedData);
        setActiveGroup(parsedData[0]);
      }
    };
    fetchDataFromLocalStorage();
  }, []);

  return { groupsData, activeGroup, setActiveGroup, setGroupsData };
};
