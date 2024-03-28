import React, { useState } from 'react';
import GroupsList from './components/GroupsList';
import TasksList from './components/TasksList';
import { useTasksData } from './hooks/useTasksData';
import { useGroupsData } from './hooks/useGroupsData';
import './index.css';

const App: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [groupsListIsVisible, setGruopsListIsVisible] = useState<boolean>(true);
  const { groupsData, activeGroup, setActiveGroup, setGroupsData } =
    useGroupsData();
  const { tasksData, setTasksData } = useTasksData();

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
