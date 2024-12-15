import { useEffect } from 'react';
import { PositionControls } from '../controllers';
import type { ControllerProps, RendererProps, CounterContent } from './types';

function CounterController({
  content,
  onUpdate,
}: ControllerProps<CounterContent>) {
  useEffect(() => {
    if (!content.paused) {
      const interval = setInterval(() => {
        onUpdate({ count: content.count + 1 });
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [content.paused, content.count, onUpdate]);

  return (
    <div className="controller-item">
      <div className="inside no-drag">
        <PositionControls
          id={content.id}
          position={content.position}
          onUpdate={onUpdate}
        />
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="w-10 h-10 text-lg bg-red-300 text-white rounded hover:bg-red-400"
              onClick={() =>
                onUpdate({ count: Math.max(0, content.count - 1) })
              }
            >
              ➖
            </button>
            <input
              id={`${content.id}-count`}
              type="number"
              value={content.count}
              onChange={(e) =>
                onUpdate({ count: parseInt(e.target.value, 10) || 0 })
              }
              className=" h-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-32 text-xl"
            />
            <button
              type="button"
              className="w-10 h-10 text-lg bg-blue-300 text-white rounded hover:bg-blue-400"
              onClick={() => onUpdate({ count: content.count + 1 })}
            >
              ➕
            </button>
          </div>
          <button
            type="button"
            className={`w-10 h-10 ml-2 p-2 rounded ${
              content.paused
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white`}
            onClick={() => {
              onUpdate({
                paused: !content.paused,
              });
            }}
          >
            {content.paused ? '▶️' : '⏸️'}
          </button>
        </div>
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
        fontSize: content.fontSize,
      }}
    >
      {content.count}
    </div>
  );
}

export { CounterController, CounterRenderer };
