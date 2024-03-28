import Plus from '../assets/icons/Plus';
import { generateUniqueID } from '../utils/generateUniqueID';

interface Group {
  id: string;
  name: string;
}

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
    <div className="bg-[#1F1F1F] w-[215px] p-4 rounded-lg flex flex-col">
      <h2 className="font-bold text-2xl mb-4">Groups</h2>
      <ul className="flex flex-col gap-2">
        {groupsData &&
          groupsData.map((group) => (
            <li
              className={`cursor-pointer ${
                group.id === activeGroup?.id ? 'text-accent' : 'text-white'
              }`}
              onClick={() => setActiveGroup(group)}
              key={group.id}
            >
              {group.name}
            </li>
          ))}
      </ul>
      <div className="flex bg-primary rounded-lg  mt-8 px-5 py-3">
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
  );
};

export default GroupsList;
