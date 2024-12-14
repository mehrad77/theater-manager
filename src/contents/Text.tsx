import {
  ColorControls,
  FontSizeControls,
  PositionControls,
} from '../controllers';
import type { ControllerProps, RendererProps, TextContent } from './types';

function TextController({ content, onUpdate }: ControllerProps<TextContent>) {
  return (
    <div className="controller-item">
      {content.name && (
        <h3 className="text-lg font-semibold">{content.name}</h3>
      )}
      <div className="inside no-drag space-y-4">
        <PositionControls
          id={content.id}
          position={content.position}
          onUpdate={onUpdate}
        />

        <div className="flex flex-col space-y-2">
          <label htmlFor={`${content.id}-text`} className="text-sm font-medium">
            Text:
            <input
              id={`${content.id}-text`}
              type="text"
              value={content.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>

          <div className="flex justify-between space-x-4">
            <FontSizeControls
              id={`${content.id}-fontSize`}
              label="Font Size:"
              value={content.fontSize}
              onChange={(newValue) => onUpdate({ fontSize: newValue })}
            />
            <ColorControls
              id={`${content.id}-color`}
              label="Color:"
              value={content.color}
              onChange={(newValue) => onUpdate({ color: newValue })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextRenderer({ content }: RendererProps<TextContent>) {
  return (
    <div
      style={{
        position: 'absolute',
        top: content.position.top,
        left: content.position.left,
        width: content.size.width,
        height: content.size.height,
        fontSize: content.fontSize,
        color: content.color,
        // textAlign: content.alignment as 'left' | 'center' | 'right',
      }}
      className="flex items-center justify-center border border-gray-300"
    >
      {content.text}
    </div>
  );
}

export { TextController, TextRenderer };
