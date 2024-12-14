import React from 'react';

interface ColorControlsProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorControls: React.FC<ColorControlsProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col space-y-1 text-sm font-medium flex-1"
    >
      {label}
      <input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-10 p-0 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </label>
  );
};
