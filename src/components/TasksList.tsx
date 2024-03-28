import { generateUniqueID } from '../utils/generateUniqueID';
import TaskItem from './TaskItem';
import TaskPreviewModalContent from '../components/ui/TaskPreviewModal';
import { useModal } from '../context/ModalProvider';
import Plus from '../assets/icons/Plus';
import Task from '../types/Task';

interface TasksListProps {
  tasksData: Task[];
  activeGroup: {
    id: string;
    name: string;
  } | null;
  newTaskTitle: string;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksList: React.FC<TasksListProps> = ({
  tasksData,
  activeGroup,
  newTaskTitle,
  setNewTaskTitle,
  setTasksData,
}) => {
  const { openModal } = useModal();
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
        activeGroupName={activeGroup?.name ?? ''}
        onUpdate={(updatedTask) => handleUpdateTask(task.id, updatedTask)}
        handleDeleteTask={handleDeleteTask}
      />
    );
  };

  return (
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
  );
};

export default TasksList;
