import React, { useCallback } from 'react';
import { Position } from '../contents/types';

interface PositionControlsProps {
  id: string;
  position: Position;
  onUpdate: (updates: Partial<{ position: Position }>) => void;
}

const convertToPercentage = (value: number, direction: keyof Position) => {
  const screenSize =
    direction === 'top' ? window.innerHeight : window.innerWidth;
  return Math.round((value / screenSize) * 100);
};

const convertToPixels = (value: number, direction: keyof Position) => {
  const screenSize =
    direction === 'top' ? window.innerHeight : window.innerWidth;
  return Math.round((value / 100) * screenSize);
};

export const PositionControls: React.FC<PositionControlsProps> = ({
  id,
  position,
  onUpdate,
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, direction: keyof Position) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const increment = e.key === 'ArrowUp' ? 1 : -1;
        const value =
          parseInt(position[direction].replace(/[^0-9]/g, ''), 10) + increment;
        const unit = position[direction].replace(/[0-9]/g, '');
        onUpdate({ position: { ...position, [direction]: value + unit } });
      }
    },
    [position, onUpdate],
  );

  const handleButtonClick = (direction: keyof Position, increment: number) => {
    const value =
      parseInt(position[direction].replace(/[^0-9]/g, ''), 10) + increment;
    const unit = position[direction].replace(/[0-9]/g, '');
    onUpdate({ position: { ...position, [direction]: value + unit } });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    direction: keyof Position,
  ) => {
    const currentUnit = position[direction].replace(/[0-9]/g, '');
    const value = parseInt(position[direction].replace(/[^0-9]/g, ''), 10);
    let newValue = value;

    if (currentUnit === 'px' && e.target.value === '%') {
      newValue = convertToPercentage(value, direction);
    } else if (currentUnit === '%' && e.target.value === 'px') {
      newValue = convertToPixels(value, direction);
    }

    onUpdate({
      position: { ...position, [direction]: newValue + e.target.value },
    });
  };

  return (
    <div className="row">
      <div className="flex flex-col space-y-4">
        {(['top', 'left'] as Array<keyof Position>).map((direction) => (
          <div key={direction} className="flex items-center space-x-2">
            <label
              htmlFor={`${id}-position-${direction}`}
              className="text-right"
            >
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
              id={`${id}-position-${direction}`}
              name={`${id}-position-${direction}`}
              value={position[direction]}
              onChange={(e) =>
                onUpdate({
                  position: { ...position, [direction]: e.target.value },
                })
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
              value={position[direction].replace(/[0-9]/g, '')}
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
