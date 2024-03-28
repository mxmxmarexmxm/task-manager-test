import React from 'react';
import Check from '../assets/icons/Check';

interface TaskItemProps {
  title: string;
  completed: boolean;
  handleTaskPreview: () => void;
  handleUpdateTask: (updatedTask: { completed: boolean }) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  completed,
  handleTaskPreview,
  handleUpdateTask,
}) => {
  const handleCheckboxChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const updatedTask = { completed: !completed };
    handleUpdateTask(updatedTask);
  };

  return (
    <li
      className={`${
        completed ? 'bg-primary border border-secondary' : 'bg-secondary'
      } px-5 py-3 rounded-md cursor-pointer flex justify-between font-bold max-w-full overflow-clip`}
      onClick={handleTaskPreview}
    >
      <span className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{title}</span>
      <div
        className={`w-6 h-6 flex-shrink-0 ml-4  text-white border-2 border-accent ${
          completed ? 'bg-accent' : ''
        } rounded-md flex items-center justify-center`}
        onClick={handleCheckboxChange}
      >
        <Check />
      </div>
    </li>
  );
};

export default TaskItem;
