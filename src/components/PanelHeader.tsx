import React from 'react';

interface PanelHeaderProps {
  id: string;
  type: string;
  isCollapsed: boolean;
  toggleCollapse: (id: string) => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  id,
  type,
  isCollapsed,
  toggleCollapse,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-800 cursor-pointer">
      <div>
        <h3 className="text-base font-semibold capitalize">{id}</h3>
        <h6 className="text-xs font-thin capitalize">{type}</h6>
      </div>
      <button
        type="button"
        onClick={() => toggleCollapse(id)}
        className="text-white no-drag"
      >
        {isCollapsed ? '▼' : '▲'}
      </button>
    </div>
  );
};

export default PanelHeader;
