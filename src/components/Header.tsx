import React from 'react';
import HamburgerMenu from '../assets/icons/HamburgerMenu';

interface HeaderProps {
  setGruopsListIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  activeGroupName: string | null | undefined; 
}

const Header: React.FC<HeaderProps> = ({
  setGruopsListIsVisible,
  activeGroupName,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="flex justify-center items-center sm:hidden"
        onClick={() => setGruopsListIsVisible((isVisible) => !isVisible)}
      >
        <HamburgerMenu />
      </button>
      <h1 className="text-3xl font-bold mb-4 inline">
        Tasks - {activeGroupName}
      </h1>
    </div>
  );
};

export default Header;
