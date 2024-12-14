import React from 'react';
import { ImageRenderer } from './Image';
import { VideoRenderer } from './Video';
import { TextRenderer } from './Text';
import { CounterRenderer } from './Counter';
import type {
  Content,
  ImageContent,
  VideoContent,
  TextContent,
  CounterContent,
} from './types';

interface ProjectorRendererFactoryProps {
  content: Content;
}

export const ProjectorRendererFactory: React.FC<
  ProjectorRendererFactoryProps
> = ({ content }) => {
  switch (content.type) {
    case 'image':
      return <ImageRenderer content={content as ImageContent} />;
    case 'video':
      return <VideoRenderer content={content as VideoContent} />;
    case 'text':
      return <TextRenderer content={content as TextContent} />;
    case 'counter':
      return <CounterRenderer content={content as CounterContent} />;
    default:
      return null;
  }
};
