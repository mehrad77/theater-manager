import React, { useState, useCallback } from 'react';

interface FontSizeControlsProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const FontSizeControls: React.FC<FontSizeControlsProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [size, setSize] = useState(value.replace(/[^0-9]/g, ''));
  const [unit, setUnit] = useState(value.replace(/[0-9]/g, '') || 'px');

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = e.target.value.replace(/[^0-9]/g, '');
      setSize(newSize);
      onChange(newSize + unit);
    },
    [unit, onChange],
  );

  const handleUnitChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newUnit = e.target.value;
      setUnit(newUnit);
      onChange(size + newUnit);
    },
    [size, onChange],
  );

  return (
    <label htmlFor={id} className="flex flex-col space-y-1 text-sm font-medium">
      {label}
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="number"
          value={size}
          onChange={handleSizeChange}
          className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="px-2 py-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="px">px</option>
        </select>
      </div>
    </label>
  );
};
