import React, { useState, useContext, createContext, ReactNode } from 'react';

interface ModalContextType {
  openModal: (modalContent: React.ReactNode) => void;
  closeModal: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<React.ReactNode[]>([]);

  const openModal = (modalContent: React.ReactNode) => {
    setModals((prevModals) => [...prevModals, modalContent]);
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modalContent, index) => (
        <div
          key={index}
          className="h-svh w-full bg-primary bg-opacity-80 absolute top-0 left-0 flex justify-center items-center"
        >
          <div className="flex items-center justify-center bg-secondary rounded-lg">
            {modalContent}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};
