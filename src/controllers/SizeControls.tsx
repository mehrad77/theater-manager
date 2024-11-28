import { Size } from '../contents/types';

export function SizeControls({
  id,
  size,
  onUpdate,
}: {
  id: string;
  size: Size;
  onUpdate: (updates: Partial<{ size: Size }>) => void;
}) {
  return (
    <div className="row">
      <label htmlFor={`${id}-size-width`}>
        Width:
        <input
          type="text"
          name={`${id}-size-width`}
          value={size.width}
          onChange={(e) =>
            onUpdate({ size: { ...size, width: e.target.value } })
          }
        />
      </label>
      <label htmlFor={`${id}-size-height`}>
        Height:
        <input
          type="text"
          name={`${id}-size-height`}
          value={size.height}
          onChange={(e) =>
            onUpdate({ size: { ...size, height: e.target.value } })
          }
        />
      </label>
    </div>
  );
}
