import { PositionControls, SizeControls } from '../controllers';
import type { ControllerProps, ImageContent, RendererProps } from './types';

function ImageController({ content, onUpdate }: ControllerProps<ImageContent>) {
  return (
    <div className="controller-item">
      {content.name && <h3>{content.name}</h3>}
      <div className="inside">
        <PositionControls
          id={content.id}
          position={content.position}
          onUpdate={onUpdate}
        />
        <SizeControls id={content.id} size={content.size} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

function ImageRenderer({ content }: RendererProps<ImageContent>) {
  return (
    <img
      src={content.file}
      alt={content.name}
      style={{
        position: 'absolute',
        top: content.position.top,
        left: content.position.left,
        width: content.size.width,
        height: content.size.height,
      }}
    />
  );
}

export { ImageController, ImageRenderer };
