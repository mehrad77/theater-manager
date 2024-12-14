import React from 'react';
import { ImageController } from './Image';
import { VideoController } from './Video';
import { TextController } from './Text';
import { CounterController } from './Counter';
import type {
  Content,
  ImageContent,
  VideoContent,
  TextContent,
  CounterContent,
} from './types';

interface ContentControllerFactoryProps {
  content: Content;
  onUpdate: <T extends Content>(id: string, updates: Partial<T>) => void;
}

export const ContentControllerFactory: React.FC<
  ContentControllerFactoryProps
> = ({ content, onUpdate }) => {
  const handleUpdate = <T extends Content>(updates: Partial<T>) => {
    onUpdate(content.id, updates);
  };

  switch (content.type) {
    case 'image':
      return (
        <ImageController
          content={content as ImageContent}
          onUpdate={handleUpdate}
        />
      );
    case 'video':
      return (
        <VideoController
          content={content as VideoContent}
          onUpdate={handleUpdate}
        />
      );
    case 'text':
      return (
        <TextController
          content={content as TextContent}
          onUpdate={handleUpdate}
        />
      );
    case 'counter':
      return (
        <CounterController
          content={content as CounterContent}
          onUpdate={handleUpdate}
        />
      );
    default:
      return null;
  }
};
