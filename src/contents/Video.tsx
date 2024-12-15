import React, { useState } from 'react';
import { PositionControls, SizeControls } from '../controllers';
import { uploadFileLocally, getFileBlob } from '../fileUtils';
import type { ControllerProps, RendererProps, VideoContent } from './types';

function VideoController({ content, onUpdate }: ControllerProps<VideoContent>) {
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
      <div className="inside no-drag">
        <div className="flex flex-row justify-start items-center my-2">
          <button
            type="button"
            className={`w-10 h-10 ml-2 p-2 rounded ${
              content.loop
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white`}
            onClick={() => onUpdate({ loop: !content.loop })}
          >
            🔁
          </button>

          <button
            type="button"
            className={`w-10 h-10 ml-2 p-2 rounded ${
              content.playing
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
            onClick={() => onUpdate({ playing: !content.playing })}
          >
            {content.playing ? '⏸️' : '▶️'}
          </button>
        </div>
        <PositionControls
          id={content.id}
          position={content.position}
          onUpdate={onUpdate}
        />
        <SizeControls id={content.id} size={content.size} onUpdate={onUpdate} />

        <div className="mt-1 flex items-center">
          <label
            htmlFor={`${content.id}-video-upload`}
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Upload Video:
            <input
              id={`${content.id}-video-upload`}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="file-input bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
          </label>
        </div>

        {previewUrl && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={previewUrl}
            className="video-preview mt-2"
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              border: '1px solid #ccc',
            }}
            controls
          />
        )}
      </div>
    </div>
  );
}

function VideoRenderer({ content }: RendererProps<VideoContent>) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (content.playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [content.playing]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoRef}
      src={content.fileUrl}
      autoPlay={content.autoplay}
      loop={content.loop}
      controls={false}
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
