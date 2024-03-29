import Delete from '../../assets/icons/Delete';
import { useModal } from '../../context/ModalProvider';

interface DeleteConfirmationModalProps {
  handleDeleteTaskClick: () => void;
  setConfirmModalIsOpen: (open: boolean) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  handleDeleteTaskClick,
  setConfirmModalIsOpen,
}) => {
  const { closeModal } = useModal();

  const handleCancelClick = () => {
    closeModal();
    setConfirmModalIsOpen(false);
  };

  const handleConfirmDeleteClick = () => {
    handleDeleteTaskClick();
    closeModal();
    setConfirmModalIsOpen(false);
  };

  return (
    <div className="flex flex-col text-center p-6 rounded-lg bg-secondary z-30">
      <h2 className="text-lg font-bold">Delete Confirmation</h2>
      <p className="my-8">Are you sure you want to delete this task?</p>
      <div className="flex justify-center gap-4">
        <button
          className="p-2 border-b-2 border-primary rounded-lg font-bold"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 flex items-center gap-2 p-2 rounded-lg font-bold"
          onClick={handleConfirmDeleteClick}
        >
          <Delete />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
