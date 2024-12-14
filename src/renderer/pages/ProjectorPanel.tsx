/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
// import eye1 from '../../assets/media/eye1.mp4';
// import eye2 from '../../assets/media/eye2.mp4';
import { ImageRenderer } from '../../contents/Image';
import { VideoRenderer } from '../../contents/Video';
import { TextRenderer } from '../../contents/Text';
import { CounterRenderer } from '../../contents/Counter';
import { Content } from '../../contents/types';
import './Projector.css';

// Projector Component
export function ProjectorPanel() {
  const [contents, setContents] = useState<Content[]>(() => {
    const storedContents = localStorage.getItem('contents');
    return storedContents ? JSON.parse(storedContents) : [];
  });

  useEffect(() => {
    // Listen for storage events to update state
    const handleStorageChange = () => {
      const updatedContents = localStorage.getItem('contents');
      if (updatedContents) {
        setContents(JSON.parse(updatedContents));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="proj-projector-container">
      {contents.map((content) => {
        switch (content.type) {
          case 'image':
            return <ImageRenderer key={content.id} content={content} />;
          case 'video':
            return <VideoRenderer key={content.id} content={content} />;
          case 'text':
            return <TextRenderer key={content.id} content={content} />;
          case 'counter':
            return <CounterRenderer key={content.id} content={content} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
