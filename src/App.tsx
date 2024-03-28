import React, { useEffect, useState } from 'react';
import { useModal } from './context/ModalProvider';
import { generateUniqueID } from './utils/generateUniqueID';
import TaskItem from './components/TaskItem';
import TaskPreviewModalContent from './components/ui/TaskPreviewModal';
import GroupsList from './components/GroupsList';
import Plus from './assets/icons/Plus';
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
  const { openModal } = useModal();

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

  const handleAddTask = () => {
    if (
      newTaskTitle.trim().length === 0 ||
      activeGroup?.name.trim().length === 0
    ) {
      return;
    }

    try {
      const newTask: Task = {
        id: generateUniqueID(),
        title: newTaskTitle,
        completed: false,
        groupId: activeGroup?.id!,
        description: '',
      };

      setTasksData((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });

      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    try {
      setTasksData((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        );

        const incompleteTasks = updatedTasks.filter((task) => !task.completed);
        const completedTasks = updatedTasks.filter((task) => task.completed);

        const updatedTaskIndex = completedTasks.findIndex(
          (task) => task.id === taskId
        );
        if (updatedTaskIndex !== -1) {
          completedTasks.splice(updatedTaskIndex, 1);
          completedTasks.push(updatedTasks.find((task) => task.id === taskId)!);
        }

        const sortedTasks = [...incompleteTasks, ...completedTasks];

        localStorage.setItem('tasks', JSON.stringify(sortedTasks));
        return sortedTasks;
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasksData.filter((task) => task.id !== taskId);
    setTasksData(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskPreview = (task: Task) => {
    openModal(
      <TaskPreviewModalContent
        task={task}
        onUpdate={(updatedTask) => handleUpdateTask(task.id, updatedTask)}
        handleDeleteTask={handleDeleteTask}
      />
    );
  };

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

        {/* Tasks List */}
        <div>
          <ul className="flex flex-col gap-3 w-[428px] max-h-[70vh] overflow-auto">
            {tasksData &&
              tasksData
                .filter((task) => task.groupId === activeGroup?.id)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                    handleTaskPreview={() => handleTaskPreview(task)}
                    handleUpdateTask={(updatedTask) =>
                      handleUpdateTask(task.id, updatedTask)
                    }
                  />
                ))}
          </ul>
          <div className="flex justify-between bg-secondary rounded-lg w-full mt-8 px-5 py-3">
            <input
              type="text"
              placeholder="Add task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="italic bg-transparent flex-1 text-white outline-none"
            />
            <button
              className={`w-6 h-6 ml-4 border-2 border-accent rounded-md flex items-center justify-center`}
              onClick={handleAddTask}
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
