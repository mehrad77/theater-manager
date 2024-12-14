import { useEffect, useState } from 'react';
import { ProjectorRendererFactory } from '../../contents/ProjectorRendererFactory';
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
      {contents.map((content) => (
        <ProjectorRendererFactory key={content.id} content={content} />
      ))}
    </div>
  );
}
