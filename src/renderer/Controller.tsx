/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-else-return */
import { useState } from 'react';
import type { Counter, Position, Size, Video } from './types';
import { defaultCounters, defaultVideos } from './const';

// Controller Component
export function Controller() {
  const [eye, setEye] = useState<'eye1' | 'eye2'>(() => {
    const storedEye = localStorage.getItem('eye');
    if (storedEye) {
      return storedEye as 'eye1' | 'eye2';
    } else {
      return 'eye2';
    }
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      return JSON.parse(storedVideos);
    } else {
      return defaultVideos;
    }
  });

  const [counters, setCounters] = useState<Counter[]>(() => {
    const storedCounters = localStorage.getItem('counters');
    if (storedCounters) {
      return JSON.parse(storedCounters);
    } else {
      return defaultCounters;
    }
  });

  // Toggle visibility of a video
  const handleToggleVideo = (index: number) => {
    const newVideos = videos.map((video, i) =>
      i === index ? { ...video, show: !video.show } : video,
    );
    setVideos(newVideos);
    localStorage.setItem('videos', JSON.stringify(newVideos));
  };

  // Update position of a video
  const handlePositionVideo = (index: number, newPosition: Position) => {
    const newVideos = videos.map((video, i) =>
      i === index ? { ...video, position: newPosition } : video,
    );
    setVideos(newVideos);
    localStorage.setItem('videos', JSON.stringify(newVideos));
  };

  // Update size of a video
  const handleVideoSizeChange = (index: number, newSize: Size) => {
    const newVideos = videos.map((video, i) =>
      i === index ? { ...video, size: newSize } : video,
    );
    setVideos(newVideos);
    localStorage.setItem('videos', JSON.stringify(newVideos));
  };

  // Toggle visibility of a counter
  const handleToggleCounter = (index: number) => {
    const newCounters = counters.map((counter, i) =>
      i === index ? { ...counter, show: !counter.show } : counter,
    );
    setCounters(newCounters);
    localStorage.setItem('counters', JSON.stringify(newCounters));
  };

  // Update position of a counter
  const handlePositionCounter = (index: number, newPosition: Position) => {
    const newCounters = counters.map((counter, i) =>
      i === index ? { ...counter, position: newPosition } : counter,
    );
    setCounters(newCounters);
    localStorage.setItem('counters', JSON.stringify(newCounters));
  };

  // Update size of a counter
  const handleSizeCounter = (index: number, newSize: string) => {
    const newCounters = counters.map((counter, i) =>
      i === index ? { ...counter, size: newSize } : counter,
    );
    setCounters(newCounters);
    localStorage.setItem('counters', JSON.stringify(newCounters));
  };

  // Change counter value
  const handleCounterChange = (index: number, value: number) => {
    const newCounters = counters.map((counter, i) =>
      i === index
        ? { ...counter, count: Math.max(counter.count + value, 0) }
        : counter,
    );
    setCounters(newCounters);
    localStorage.setItem('counters', JSON.stringify(newCounters));
  };

  const handleResetCounter = (index: number) => {
    const newCounters = counters.map((counter, i) =>
      i === index ? { ...counter, count: 0 } : counter,
    );
    setCounters(newCounters);
    localStorage.setItem('counters', JSON.stringify(newCounters));
  };

  const handleResetAll = () => {
    setVideos(defaultVideos);
    setCounters(defaultCounters);
    localStorage.setItem('videos', JSON.stringify(defaultVideos));
    localStorage.setItem('counters', JSON.stringify(defaultCounters));
  };

  const handleEyeChange = (value: 'eye1' | 'eye2') => {
    setEye(value);
    localStorage.setItem('eye', value);
  };

  return (
    <div className="ctrl-controller-container">
      <h1>Theater VFX Controller</h1>
      <button type="button" onClick={handleResetAll}>
        Reset to Defaults
      </button>{' '}
      <div className="ctrl-video-name-controls" style={{ display: 'none' }}>
        <label>
          Select Eye:
          <select
            value={eye}
            onChange={(e) => handleEyeChange(e.target.value as 'eye1' | 'eye2')}
          >
            <option value="eye1">eye1</option>
            <option value="eye2">eye2</option>
          </select>
        </label>
      </div>
      <div className="ctrl-main">
        <div className="ctrl-video-container">
          <h2>Videos</h2>
          {videos.map((video, index) => (
            <div key={video.id} className="ctrl-video-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={video.show}
                  onChange={() => handleToggleVideo(index)}
                />
                {video.id}
              </label>

              <div className="ctrl-position-controls">
                <label>
                  Top:
                  <input
                    type="text"
                    value={video.position.top}
                    onChange={(e) =>
                      handlePositionVideo(index, {
                        ...video.position,
                        top: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Left:
                  <input
                    type="text"
                    value={video.position.left}
                    onChange={(e) =>
                      handlePositionVideo(index, {
                        ...video.position,
                        left: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="ctrl-size-controls">
                <label>
                  Width:
                  <input
                    type="text"
                    value={video.size?.width}
                    onChange={(e) =>
                      handleVideoSizeChange(index, {
                        ...video.size,
                        width: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Height:
                  <input
                    type="text"
                    value={video.size?.height}
                    onChange={(e) =>
                      handleVideoSizeChange(index, {
                        ...video.size,
                        height: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="ctrl-counter-container">
          <h2>Counters</h2>
          {counters.map((counter, index) => (
            <div key={counter.id} className="ctrl-counter-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={counter.show}
                  onChange={() => handleToggleCounter(index)}
                />
                {counter.id}
              </label>
              {counter.show && (
                <div className="ctrl-position-controls">
                  <label>
                    Top:
                    <input
                      type="text"
                      value={counter.position.top}
                      onChange={(e) =>
                        handlePositionCounter(index, {
                          ...counter.position,
                          top: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Left:
                    <input
                      type="text"
                      value={counter.position.left}
                      onChange={(e) =>
                        handlePositionCounter(index, {
                          ...counter.position,
                          left: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              )}
              {counter.show && (
                <div className="ctrl-counter-controls">
                  <button
                    type="button"
                    onClick={() => handleCounterChange(index, 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCounterChange(index, -1)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResetCounter(index)}
                  >
                    Reset
                  </button>
                </div>
              )}
              {counter.show && (
                <div className="ctrl-size-controls">
                  <label>
                    Height:
                    <input
                      type="text"
                      value={counter.size}
                      onChange={(e) => handleSizeCounter(index, e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
