import React, { useCallback } from 'react';
import { Size } from '../contents/types';

const convertToPercentage = (value: number, direction: keyof Size) => {
  const screenSize =
    direction === 'height' ? window.innerHeight : window.innerWidth;
  return Math.round((value / screenSize) * 100);
};

const convertToPixels = (value: number, direction: keyof Size) => {
  const screenSize =
    direction === 'height' ? window.innerHeight : window.innerWidth;
  return Math.round((value / 100) * screenSize);
};

interface SizeControlsProps {
  id: string;
  size: Size;
  onUpdate: (updates: Partial<{ size: Size }>) => void;
}

export const SizeControls: React.FC<SizeControlsProps> = ({
  id,
  size,
  onUpdate,
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, direction: keyof Size) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const increment = e.key === 'ArrowUp' ? 1 : -1;
        const value =
          parseInt(size[direction].replace(/[^0-9]/g, ''), 10) + increment;
        const unit = size[direction].replace(/[0-9]/g, '');
        onUpdate({ size: { ...size, [direction]: value + unit } });
      }
    },
    [size, onUpdate],
  );

  const handleButtonClick = (direction: keyof Size, increment: number) => {
    const value =
      parseInt(size[direction].replace(/[^0-9]/g, ''), 10) + increment;
    const unit = size[direction].replace(/[0-9]/g, '');
    onUpdate({ size: { ...size, [direction]: value + unit } });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    direction: keyof Size,
  ) => {
    const currentUnit = size[direction].replace(/[0-9]/g, '');
    const value = parseInt(size[direction].replace(/[^0-9]/g, ''), 10);
    let newValue = value;

    if (currentUnit === 'px' && e.target.value === '%') {
      newValue = convertToPercentage(value, direction);
    } else if (currentUnit === '%' && e.target.value === 'px') {
      newValue = convertToPixels(value, direction);
    }

    onUpdate({
      size: { ...size, [direction]: newValue + e.target.value },
    });
  };

  return (
    <div className="row">
      <div className="flex flex-col space-y-4">
        {(['width', 'height'] as Array<keyof Size>).map((direction) => (
          <div key={direction} className="flex items-center space-x-2">
            <label htmlFor={`${id}-size-${direction}`} className="text-right">
              {direction.charAt(0).toUpperCase() + direction.slice(1)}:
            </label>
            <button
              type="button"
              onClick={() => handleButtonClick(direction, -1)}
              className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              -
            </button>
            <input
              type="text"
              id={`${id}-size-${direction}`}
              name={`${id}-size-${direction}`}
              value={size[direction]}
              onChange={(e) =>
                onUpdate({ size: { ...size, [direction]: e.target.value } })
              }
              onKeyDown={(e) => handleKeyDown(e, direction)}
              className="flex-1 max-w-24 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => handleButtonClick(direction, 1)}
              className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              +
            </button>
            <select
              value={size[direction].replace(/[0-9]/g, '')}
              onChange={(e) => handleSelectChange(e, direction)}
              className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="px">px</option>
              <option value="%">%</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
