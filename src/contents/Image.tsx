import React, { useState } from 'react';
import { uploadFileLocally, getFileBlob } from '../fileUtils';
import { PositionControls, SizeControls } from '../controllers';
import type { ControllerProps, ImageContent, RendererProps } from './types';

function ImageController({ content, onUpdate }: ControllerProps<ImageContent>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(content.fileUrl);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const fileId = await uploadFileLocally(event.target.files[0], content);
      const fileBlobUrl = await getFileBlob(fileId);
      if (fileBlobUrl) {
        onUpdate({ fileUrl: fileBlobUrl });
        setPreviewUrl(fileBlobUrl); // Update preview
      }
    }
  };

  return (
    <div className="controller-item">
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

        {previewUrl && (
          <img
            src={previewUrl}
            alt={content.name || 'Preview'}
            className="image-preview mt-2"
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              border: '1px solid #ccc',
            }}
          />
        )}
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
