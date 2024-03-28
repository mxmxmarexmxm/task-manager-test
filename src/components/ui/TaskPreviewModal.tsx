import React, { useState, useRef, useEffect } from 'react';
import { useModal } from '../../context/ModalProvider';
import Check from '../../assets/icons/Check';
import DeleteConfirmationModalContent from './DeleteConfirmationModal';
import Delete from '../../assets/icons/Delete';
import Task from '../../types/Task';

interface TaskPreviewModalProps {
  task: Task;
  activeGroupName: string;
  onUpdate: (updatedTask: Task) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskPreviewModal: React.FC<TaskPreviewModalProps> = ({
  task,
  onUpdate,
  handleDeleteTask,
  activeGroupName,
}) => {
  const [taskState, setTaskState] = useState<Task>(task);
  const [confiramtionModalOpen, setConfirmModalIsOpen] = useState(false);
  const { closeModal, openModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !confiramtionModalOpen
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompletedChange = () => {
    setTaskState((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }));
  };

  const handleSaveClick = () => {
    if (taskState.title.trim().length === 0) return;
    onUpdate(taskState);
    closeModal();
  };

  const handleDeleteTaskClick = () => {
    handleDeleteTask(taskState.id);
    closeModal();
  };

  const handleDeleteClick = () => {
    setConfirmModalIsOpen(true);
    openModal(
      <DeleteConfirmationModalContent
        handleDeleteTaskClick={handleDeleteTaskClick}
        setConfirmModalIsOpen={setConfirmModalIsOpen}
      />
    );
  };

  return (
    <div
      className="h-[80vh] p-6 rounded-lg  bg-secondary max-w-[90vw] bg-red inset-0 top-0 left-0 flex flex-col"
      ref={modalRef}
    >
      <div className="flex justify-between">
        <span className="text-accent">{activeGroupName}</span>
        <div className="flex items-center justify-center gap-3 h-6">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 rounded-lg px-2 py-1 w-7 h-full flex items-center justify-center"
          >
            <Delete />
          </button>
          <button
            className={`border gap-2 flex items-center px-2 py-1 justify-center border-accent rounded-md text-xs font-bold ${
              taskState.completed ? 'bg-accent' : 'bg-transparent'
            }`}
            onClick={handleCompletedChange}
          >
            <div className="flex items-center justify-center ">
              <Check />
            </div>
            {taskState.completed ? 'Completed' : 'Complete'}
          </button>
        </div>
      </div>
      <div className="flex flex-col font-normal text-xs flex-1">
        <h2 className="font-bold text-2xl my-6">
          <input
            className={`font-bold text-2xl my-6 bg-transparent border-none outline-none`}
            type="text"
            name="title"
            value={taskState.title}
            onChange={handleInputChange}
          />
        </h2>
        {taskState.title.trim().length === 0 && (
          <p className="text-red-500 -mt-8 mb-2">Title can't be empty</p>
        )}
        <span className="">Description</span>
        <textarea
          className={
            'flex-1 my-4 rounded-lg p-4 font-normal bg-primary resize-none outline-none'
          }
          name="description"
          value={taskState.description}
          onChange={handleInputChange}
        ></textarea>
        <button
          className="bg-accent p-2 rounded-lg font-bold"
          onClick={handleSaveClick}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TaskPreviewModal;
