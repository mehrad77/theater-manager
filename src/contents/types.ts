// Content Attributes
export type Position = { top: string; left: string }; // Position coordinates for content
export type Size = { width: string; height: string }; // Size dimensions for content

// Content Types
export interface BaseContent {
  id: string; // Unique identifier for the content
  name?: string; // Name of the content
  type: 'image' | 'video' | 'audio' | 'text' | 'counter'; // Type of content
  show: boolean; // Visibility toggle
  position: Position; // Content's position on screen
  size: Size; // Dimensions of the content
  layout?: any; // for positioning in the controller grid
}

export interface ImageContent extends BaseContent {
  type: 'image';
  file: string; // Base64-encoded image file
}

export interface VideoContent extends BaseContent {
  type: 'video';
  file: string; // Base64-encoded video file
  autoplay?: boolean; // Autoplay toggle
  loop?: boolean; // Loop playback toggle
}

export interface AudioContent extends BaseContent {
  type: 'audio';
  file: string; // Base64-encoded audio file
  autoplay?: boolean; // Autoplay toggle
  loop?: boolean; // Loop playback toggle
  volume: number; // Volume level (0 to 100)
}

export interface TextContent extends BaseContent {
  type: 'text';
  text: string; // The text string to display
  fontSize: string; // Font size (e.g., "16px")
  color: string; // Font color (e.g., "#000000")
}

export interface CounterContent extends BaseContent {
  type: 'counter';
  count: number;
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
