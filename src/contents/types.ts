// Content Attributes
export type Position = { top: string; left: string }; // Position coordinates for content
export type Size = { width: string; height: string }; // Size dimensions for content

// Content Types
interface BaseContent {
  id: string;
  name?: string;
  type: 'image' | 'video' | 'audio' | 'text' | 'counter';
  show: boolean;
  position: Position;
  size: Size;
  layout?: any;
}

export interface ImageContent extends BaseContent {
  type: 'image';
  fileUrl: string;
}

export interface VideoContent extends BaseContent {
  type: 'video';
  fileUrl: string;
  playing: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

export interface AudioContent extends BaseContent {
  type: 'audio';
  file: string;
  autoplay?: boolean;
  loop?: boolean;
  volume: number;
}

export interface TextContent extends BaseContent {
  type: 'text';
  text: string;
  fontSize: string;
  color: string;
}

export interface CounterContent extends BaseContent {
  type: 'counter';
  count: number;
  fontSize: string;
  color: string;
  paused: boolean;
}

// export interface WebEmbedContent extends BaseContent {
//   type: 'webEmbed';
//   url: string; // URL of the embedded web page
//   allowScrolling: boolean; // Whether to allow scrolling
//   iframeAttributes?: Record<string, string>; // Additional attributes for the iframe
// }

export type Content =
  | ImageContent
  | VideoContent
  // | AudioContent
  | TextContent
  | CounterContent;

export interface ControllerProps<T extends Content> {
  content: T; // Content data
  onUpdate: (updatedFields: Partial<T>) => void; // Callback for updates
}

export interface RendererProps<T extends Content> {
  content: T; // Content data
}
