import { useEffect, useState } from 'react';
// import eye1 from '../../assets/media/eye1.mp4';
import eye2 from '../../assets/media/eye2.mp4';
import type { Counter, Video } from './types';

// Projector Component
export function Projector() {
  const [eye, setEye] = useState<string>(
    () => localStorage.getItem('eye') || 'eye1',
  );

  const [videos, setVideos] = useState<Video[]>(() => {
    const storedVideos = localStorage.getItem('videos');
    return storedVideos ? JSON.parse(storedVideos) : [];
  });

  const [counters, setCounters] = useState<Counter[]>(() => {
    const storedCounters = localStorage.getItem('counters');
    return storedCounters ? JSON.parse(storedCounters) : [];
  });

  useEffect(() => {
    // Listen for storage events to update state
    const handleStorageChange = () => {
      const updatedVideos = localStorage.getItem('videos');
      const updatedCounters = localStorage.getItem('counters');
      const updatedEye = localStorage.getItem('eye');
      if (updatedVideos) {
        setVideos(JSON.parse(updatedVideos));
      }
      if (updatedCounters) {
        setCounters(JSON.parse(updatedCounters));
      }
      if (updatedEye) {
        console.log(`updatedEye => ${updatedEye}`);
        setEye(updatedEye);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="proj-projector-container">
      {videos.map((video) =>
        video.show ? (
          <div
            key={video.id}
            className="proj-video-wrapper"
            style={{
              top: video.position.top,
              left: video.position.left,
              position: 'absolute',
              width: `${video.size?.width}`,
              height: `${video.size?.height}`,
            }}
          >
            <video controls={false} autoPlay loop muted>
              {/* {eye === 'eye1' && <source src={eye1} type="video/mp4" />} */}
              <source src={eye2} type="video/mp4" />
            </video>
          </div>
        ) : null,
      )}

      {counters.map((counter) =>
        counter.show ? (
          <div
            key={counter.id}
            className="proj-counter-wrapper"
            style={{
              top: counter.position.top,
              left: counter.position.left,
              position: 'absolute',
            }}
          >
            <span className="counter-display">
              {counter.count.toString().padStart(4, '0')}
            </span>
          </div>
        ) : null,
      )}
    </div>
  );
}
