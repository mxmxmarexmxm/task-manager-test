import React from 'react';
import Plus from '../assets/icons/Plus';
import { generateUniqueID } from '../utils/generateUniqueID';
import Group from '../types/Group';

interface GroupsListProps {
  setGroupsData: React.Dispatch<React.SetStateAction<Group[]>>;
  groupsData: Group[];
  setActiveGroup: React.Dispatch<React.SetStateAction<Group | null>>;
  activeGroup: Group | null;
  setNewGroupName: React.Dispatch<React.SetStateAction<string>>;
  newGroupName: string;
}

const GroupsList: React.FC<GroupsListProps> = ({
  setGroupsData,
  groupsData,
  setActiveGroup,
  activeGroup,
  setNewGroupName,
  newGroupName,
}) => {
  const handleAddGroup = () => {
    if (newGroupName.trim().length === 0) return;
    try {
      const newGroup: Group = {
        id: generateUniqueID(),
        name: newGroupName,
      };

      // Update groupsData state
      setGroupsData((prevGroups) => {
        const updatedGroups = [...prevGroups, newGroup];
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        return updatedGroups;
      });

      // Clear the newGroupName input
      setNewGroupName('');
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  return (
    <div className="bg-secondary min-w-[335px] max-h-[90vh] max-w-[250px] p-4 rounded-lg flex flex-col absolute md:static inset-0 justify-between z-10">
      <div style={{ maxHeight: 'calc(100% - 100px)' }}>
        <h2 className="font-bold text-2xl mb-4">Groups</h2>
        <div
          className="overflow-auto"
          style={{ maxHeight: 'calc(100% - 15px)' }}
        >
          <ul className="flex flex-col gap-2">
            {groupsData.map((group) => (
              <li
                className={`cursor-pointer overflow-hidden whitespace-nowrap max-w-[90%] overflow-ellipsis ${
                  group.id === activeGroup?.id ? 'text-accent' : 'text-white'
                }`}
                onClick={() => {
                  setActiveGroup(group);
                }}
                key={group.id}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex bg-primary rounded-lg mt-8 px-5 py-3">
        <input
          className="italic w-12/12 bg-transparent text-white outline-none"
          type="text"
          placeholder="New group..."
          onChange={(e) => setNewGroupName(e.target.value)}
          value={newGroupName}
        />
        <button
          className="w-6 h-6  bg-accent rounded-md flex items-center justify-center"
          onClick={handleAddGroup}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default GroupsList;
