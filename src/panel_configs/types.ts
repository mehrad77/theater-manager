import type { Content } from '../contents/types';

// Panels Types
export interface PanelState {
  contents: Content[]; // Array of all content items
}

export interface ExportedConfiguration {
  contents: Content[]; // Array of all content items, including Base64-encoded files
}
