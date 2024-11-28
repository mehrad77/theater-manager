import { PositionControls, SizeControls } from '../controllers';
import type { ControllerProps, RendererProps, VideoContent } from './types';

function VideoController({ content, onUpdate }: ControllerProps<VideoContent>) {
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
        <label htmlFor={`${content.id}-autoplay`}>
          Autoplay:
          <input
            id={`${content.id}-autoplay`}
            name={`${content.id}-autoplay`}
            type="checkbox"
            checked={content.autoplay}
            onChange={(e) => onUpdate({ autoplay: e.target.checked })}
          />
        </label>
        <label htmlFor={`${content.id}-loop`}>
          Loop:
          <input
            id={`${content.id}-loop`}
            name={`${content.id}-loop`}
            type="checkbox"
            checked={content.loop}
            onChange={(e) => onUpdate({ loop: e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
}

function VideoRenderer({ content }: RendererProps<VideoContent>) {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={content.file}
      autoPlay={content.autoplay}
      loop={content.loop}
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

export { VideoController, VideoRenderer };
