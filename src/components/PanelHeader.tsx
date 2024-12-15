/* eslint-disable no-alert */
import React, { useState } from 'react';

interface PanelHeaderProps {
  id: string;
  name: string;
  type: string;
  isCollapsed: boolean;
  toggleCollapse: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  id,
  name,
  type,
  isCollapsed,
  toggleCollapse,
  onDelete,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete the content '${id}'?`)
    ) {
      onDelete(id);
    }
  };

  const handleRename = () => {
    if (currentName.trim()) {
      onRename(id, currentName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-800 cursor-pointer">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={currentName}
            defaultValue={currentName || id}
            onChange={(e) => setCurrentName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleRename}
            className="text-base font-semibold capitalize px-2 py-1 bg-gray-700 text-white focus:outline-none rounded"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        ) : (
          <h3
            id={`${id}-title`}
            className="text-base font-semibold capitalize no-drag"
            onDoubleClick={() => setIsEditing(true)}
          >
            {currentName || id}
          </h3>
        )}
        <h6 className="text-xs font-thin capitalize">{type}</h6>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 no-drag mr-4"
        >
          ❌
        </button>
        <button
          type="button"
          onClick={() => toggleCollapse(id)}
          className="text-white no-drag"
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
    </div>
  );
};

export default PanelHeader;
