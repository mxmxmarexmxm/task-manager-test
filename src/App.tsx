import React, { useEffect, useState } from 'react';
import GroupsList from './components/GroupsList';
import TasksList from './components/TasksList';
import './index.css';

interface Group {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  groupId: string;
}

const App: React.FC = () => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [groupsListIsVisible, setGruopsListIsVisible] = useState<boolean>(true);

  // Function to fetch groupsData from local storage
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

  // Function to fetch tasksData from local storage
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

  return (
    <div className="bg-primary overflow-hidden h-screen text-white flex flex-col items-center justify-center">
      <div className="flex justify-between">
        <button
          onClick={() => setGruopsListIsVisible((isVisible) => !isVisible)}
        >
          Hide
        </button>
        <h1 className="text-3xl font-bold mb-4 inline">
          Tasks - {activeGroup?.name}
        </h1>
      </div>
      <div className="flex gap-20">
        {groupsListIsVisible && (
          <GroupsList
            groupsData={groupsData}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            setNewGroupName={setNewGroupName}
            newGroupName={newGroupName}
            setGroupsData={setGroupsData}
          />
        )}
        <TasksList
          activeGroup={activeGroup}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          setTasksData={setTasksData}
          tasksData={tasksData}
        />
      </div>
    </div>
  );
};

export default App;
