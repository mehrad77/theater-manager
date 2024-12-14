import React from 'react';

const SettingsControl: React.FC = () => {
  return (
    <button
      type="button"
      className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600"
      onClick={() => console.log('Settings clicked')}
    >
      Settings
    </button>
  );
};

export default SettingsControl;
