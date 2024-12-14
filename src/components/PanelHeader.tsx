/* eslint-disable no-alert */
import React from 'react';

interface PanelHeaderProps {
  id: string;
  type: string;
  isCollapsed: boolean;
  toggleCollapse: (id: string) => void;
  onDelete: (id: string) => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  id,
  type,
  isCollapsed,
  toggleCollapse,
  onDelete,
}) => {
  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete the content '${id}'?`)
    ) {
      onDelete(id);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-800 cursor-pointer">
      <div>
        <h3 className="text-base font-semibold capitalize">{id}</h3>
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
