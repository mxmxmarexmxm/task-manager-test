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
    <div className="flex items-center w-full sm:justify-center mt-4 ml-2">
      <button
        className="flex justify-center items-center xl:hidden mb-4 mr-4"
        onClick={() => setGruopsListIsVisible((isVisible) => !isVisible)}
      >
        <HamburgerMenu />
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 inline sm:text-center">
        Tasks - {activeGroupName}
      </h1>
    </div>
  );
};

export default Header;
