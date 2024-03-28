import React, { useState } from 'react';
import { useTasksData } from './hooks/useTasksData';
import { useGroupsData } from './hooks/useGroupsData';
import Header from './components/Header';
import GroupsList from './components/GroupsList';
import TasksList from './components/TasksList';
import './index.css';

const App: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [groupsListIsVisible, setGruopsListIsVisible] = useState<boolean>(true);
  const { groupsData, activeGroup, setActiveGroup, setGroupsData } =
    useGroupsData();
  const { tasksData, setTasksData } = useTasksData();

  return (
    <div className="bg-primary overflow-hidden h-screen text-white flex flex-col xl:px-[160px] xl:pt-[60px] w-full">
      <Header
        activeGroupName={activeGroup?.name}
        setGruopsListIsVisible={setGruopsListIsVisible}
      />
      <div className="flex relative gap-20 xl:gap-96 md:static w-full max-h-[90%] justify-start">
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
          groupsListIsVisible={groupsListIsVisible}
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
