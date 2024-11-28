import { Position } from '../contents/types';

export function PositionControls({
  id,
  position,
  onUpdate,
}: {
  id: string;
  position: Position;
  onUpdate: (updates: Partial<{ position: Position }>) => void;
}) {
  return (
    <div className="row">
      <label htmlFor={`${id}-position-top`}>
        Top:
        <input
          type="text"
          name={`${id}-position-top`}
          value={position.top}
          onChange={(e) =>
            onUpdate({ position: { ...position, top: e.target.value } })
          }
        />
      </label>
      <label htmlFor={`${id}-position-left`}>
        Left:
        <input
          type="text"
          name={`${id}-position-left`}
          value={position.left}
          onChange={(e) =>
            onUpdate({ position: { ...position, left: e.target.value } })
          }
        />
      </label>
    </div>
  );
}
