export type Position = { top: string; left: string };
export type Size = { width: string; height: string };

export type Video = {
  id: string;
  show: boolean;
  position: Position;
  size: Size;
};

export type Counter = {
  id: string;
  count: number;
  show: boolean;
  position: Position;
  size: string;
};
