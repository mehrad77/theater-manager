import React from 'react';
import { uploadFileLocally } from '../fileUtils';
import { PositionControls, SizeControls } from '../controllers';
import type { ControllerProps, ImageContent, RendererProps } from './types';

function ImageController({ content, onUpdate }: ControllerProps<ImageContent>) {
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
          htmlFor={`${content.id}-image-upload`}
          className="file-upload-label"
        >
          Upload Image:
          <input
            id={`${content.id}-image-upload`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </label>
      </div>
    </div>
  );
}

function ImageRenderer({ content }: RendererProps<ImageContent>) {
  return (
    <img
      src={content.fileUrl}
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
