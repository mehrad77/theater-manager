import { PositionControls } from '../controllers';
import type { ControllerProps, RendererProps, TextContent } from './types';

function TextController({ content, onUpdate }: ControllerProps<TextContent>) {
  return (
    <div className="controller-item">
      {content.name && <h3>{content.name}</h3>}
      <div className="inside">
        <label htmlFor={`${content.id}-text`}>
          <PositionControls
            id={content.id}
            position={content.position}
            onUpdate={onUpdate}
          />
          Text:
          <input
            id={`${content.id}-text`}
            name={`${content.id}-text`}
            type="text"
            value={content.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </label>
        <label htmlFor={`${content.id}-fontSize`}>
          Font Size:
          <input
            id={`${content.id}-fontSize`}
            name={`${content.id}-fontSize`}
            type="text"
            value={content.fontSize}
            onChange={(e) => onUpdate({ fontSize: e.target.value })}
          />
        </label>
        <label htmlFor={`${content.id}-color`}>
          Color:
          <input
            id={`${content.id}-color`}
            name={`${content.id}-color`}
            type="color"
            value={content.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
          />
        </label>
        {/* <label htmlFor={`${content.id}-alignment`}>
        Alignment:
        <select
          id={`${content.id}-alignment`}
          name={`${content.id}-alignment`}
          value={content.alignment}
          onChange={(e) => onUpdate({ alignment: e.target.value })}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label> */}
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
    >
      {content.text}
    </div>
  );
}

export { TextController, TextRenderer };
