import React from 'react';
import type {
  Content,
  CounterContent,
  ImageContent,
  TextContent,
  VideoContent,
} from '../contents/types';

const contentTypes = ['image', 'video', 'text', 'counter'] as const;

const testContents: Content[] = [
  {
    id: `1${Date.now()}`,
    type: 'image',
    layout: { x: 0, y: 0, w: 4, h: 6 },
    show: true,
    position: { top: '10px', left: '20px' },
    size: { width: '200px', height: '150px' },
    file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
  } as ImageContent,
  {
    id: `2${Date.now()}`,
    type: 'video',
    layout: { x: 4, y: 0, w: 4, h: 6 },
    show: true,
    position: { top: '50px', left: '100px' },
    size: { width: '400px', height: '300px' },
    file: 'data:video/mp4;base64,AAAA...',
    autoplay: false,
    loop: true,
  } as VideoContent,
  {
    id: `3${Date.now()}`,
    type: 'text',
    layout: { x: 8, y: 0, w: 4, h: 6 },
    show: true,
    position: { top: '150px', left: '200px' },
    size: { width: '300px', height: '50px' },
    text: 'Sample Text Content',
    fontSize: '18px',
    color: '#333333',
    alignment: 'center',
  } as TextContent,
  {
    id: `4${Date.now()}`,
    type: 'counter',
    layout: { x: 0, y: 1, w: 4, h: 6 },
    show: true,
    position: { top: '250px', left: '300px' },
    size: { width: '100px', height: '50px' },
    count: 5,
    paused: false,
  } as CounterContent,
];

const AddNewContent: React.FC<{
  addContent: (content: Content) => void;
}> = ({ addContent }) => {
  const addTestingContent = () => {
    const randomIndex = Math.floor(Math.random() * testContents.length);
    const newContent = {
      ...testContents[randomIndex],
      id: `${randomIndex}${Date.now()}`,
    };
    addContent(newContent);
  };

  return (
    <>
      <button
        type="button"
        className="bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-600"
        onClick={addTestingContent}
      >
        Add Testing Content
      </button>
      {contentTypes.map((content) => {
        return (
          <button
            type="button"
            className="bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600"
            onClick={() => {}}
          >
            Add {content}
          </button>
        );
      })}
    </>
  );
};

export default AddNewContent;
