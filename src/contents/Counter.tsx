import { PositionControls } from '../controllers';
import type { ControllerProps, RendererProps, CounterContent } from './types';

function CounterController({
  content,
  onUpdate,
}: ControllerProps<CounterContent>) {
  return (
    <div className="controller-item">
      {content.name && <h3>{content.name}</h3>}
      <div className="inside">
        <PositionControls
          id={content.id}
          position={content.position}
          onUpdate={onUpdate}
        />
        <label htmlFor={`${content.id}-count`}>
          Count:
          <input
            id={`${content.id}-count`}
            type="number"
            value={content.count}
            onChange={(e) =>
              onUpdate({ count: parseInt(e.target.value, 10) || 0 })
            }
          />
        </label>
        <button
          type="button"
          onClick={() => onUpdate({ count: content.count + 1 })}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => onUpdate({ count: Math.max(0, content.count - 1) })}
        >
          Decrement
        </button>
        <button
          type="button"
          onClick={() =>
            onUpdate({
              paused: !content.paused,
            })
          }
        >
          {content.paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}

function CounterRenderer({ content }: RendererProps<CounterContent>) {
  return (
    <div
      style={{
        position: 'absolute',
        top: content.position.top,
        left: content.position.left,
        width: content.size.width,
        height: content.size.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        fontSize: '20px',
      }}
    >
      {content.paused ? 'Paused' : content.count}
    </div>
  );
}

export { CounterController, CounterRenderer };
