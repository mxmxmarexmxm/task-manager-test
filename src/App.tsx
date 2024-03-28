import React, { useEffect, useState } from 'react';
import { generateUniqueID } from './utils/generateUniqueID';
import Plus from './assets/icons/Plus';
import './index.css';

interface Group {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [groupsListIsVisible, setGruopsListIsVisible] = useState<boolean>(true);

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


  const handleAddGroup = () => {
    if (newGroupName.trim().length === 0) return;
    try {
      let newGroup: Group = {
        id: generateUniqueID(),
        name: newGroupName,
      };

      setGroupsData((prevGroups) => {
        const updatedGroups = [...prevGroups, newGroup];
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        return updatedGroups;
      });

      setNewGroupName('');
    } catch (error) {
      console.error('Error adding group:', error);
    }
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
        {/* Groups List */}
        {groupsListIsVisible && (
          <div className="bg-[#1F1F1F] w-[215px] p-4 rounded-lg flex flex-col">
            <h2 className="font-bold text-2xl mb-4">Groups</h2>
            <ul className="flex flex-col gap-2">
              {groupsData &&
                groupsData.map((group) => (
                  <li
                    className={`cursor-pointer ${
                      group.id === activeGroup?.id
                        ? 'text-accent'
                        : 'text-white'
                    }`}
                    onClick={() => setActiveGroup(group)}
                    key={group.id}
                  >
                    {group.name}
                  </li>
                ))}
            </ul>
            <div className="flex   bg-primary rounded-lg  mt-8 px-5 py-3">
              <input
                className="italic bg-transparent  text-white outline-none"
                type="text"
                placeholder="New group"
                onChange={(e) => setNewGroupName(e.target.value)}
                value={newGroupName}
              />
              <button
                className={`w-6 h-6 ml-4 border-2 border-accent rounded-md flex items-center justify-center`}
                onClick={handleAddGroup}
              >
                <Plus />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
