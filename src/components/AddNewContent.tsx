import React from 'react';
import type {
  Content,
  CounterContent,
  ImageContent,
  TextContent,
  VideoContent,
} from '../contents/types';

const contentTypes = ['image', 'video', 'text', 'counter'] as const;

const createContent = (type: (typeof contentTypes)[number]): Content => {
  const id = `${type}${Date.now()}`;
  const defaultFileUrl = ''; // Placeholder until file is uploaded

  switch (type) {
    case 'image':
      return {
        id,
        type: 'image',
        layout: { x: 0, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '10px', left: '20px' },
        size: { width: '200px', height: '150px' },
        fileUrl: defaultFileUrl, // Use Blob Storage reference here
      } as ImageContent;
    case 'video':
      return {
        id,
        type: 'video',
        layout: { x: 4, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '50px', left: '100px' },
        size: { width: '400px', height: '300px' },
        fileUrl: defaultFileUrl, // Use Blob Storage reference here
        autoplay: false,
        loop: true,
      } as VideoContent;
    case 'text':
      return {
        id,
        type: 'text',
        layout: { x: 8, y: 0, w: 4, h: 6 },
        show: true,
        position: { top: '150px', left: '200px' },
        size: { width: '300px', height: '50px' },
        text: 'Sample Text Content',
        fontSize: '18px',
        color: '#333333',
        alignment: 'center',
      } as TextContent;
    case 'counter':
      return {
        id,
        type: 'counter',
        layout: { x: 0, y: 1, w: 4, h: 6 },
        show: true,
        position: { top: '250px', left: '300px' },
        size: { width: '100px', height: '50px' },
        count: 5,
        paused: false,
      } as CounterContent;
    default:
      throw new Error('Unknown content type');
  }
};

const AddNewContent: React.FC<{
  addContent: (content: Content) => void;
}> = ({ addContent }) => {
  return (
    <>
      {contentTypes.map((type) => (
        <button
          key={type}
          type="button"
          className="bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600"
          onClick={() => addContent(createContent(type))}
        >
          Add {type}
        </button>
      ))}
    </>
  );
};

export default AddNewContent;
