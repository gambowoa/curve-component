export type Point = {
  id: string;
  x: number;
  y: number;
};

export type Rectangle = {
  max: { x: number; y: number };
  min: { x: number; y: number };
};
