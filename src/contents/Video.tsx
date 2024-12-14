import React from 'react';
import { PositionControls, SizeControls } from '../controllers';
import { uploadFileLocally } from '../fileUtils';
import type { ControllerProps, RendererProps, VideoContent } from './types';

function VideoController({ content, onUpdate }: ControllerProps<VideoContent>) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const fileBlobUrl = await uploadFileLocally(event.target.files[0]);
      onUpdate({ fileUrl: fileBlobUrl });
    }
  };

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

        <label
          htmlFor={`${content.id}-video-upload`}
          className="file-upload-label"
        >
          Upload Video:
          <input
            id={`${content.id}-video-upload`}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </label>

        <label htmlFor={`${content.id}-autoplay`}>
          Autoplay:
          <input
            id={`${content.id}-autoplay`}
            type="checkbox"
            checked={content.autoplay}
            onChange={(e) => onUpdate({ autoplay: e.target.checked })}
          />
        </label>

        <label htmlFor={`${content.id}-loop`}>
          Loop:
          <input
            id={`${content.id}-loop`}
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
      src={content.fileUrl}
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
