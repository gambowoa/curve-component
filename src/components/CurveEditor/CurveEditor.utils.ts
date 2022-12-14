import { line, curveMonotoneX } from "d3-shape";
import { Point, Rectangle } from "./CurveEditor.types";

export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

export const clampToRect = (x: number, y: number, rect: Rectangle) => {
  const newX = clamp(x, rect.min.x, rect.max.x);
  const newY = clamp(y, rect.min.y, rect.max.y);
  return { x: newX, y: newY };
};

export const distanceFromRectangle = (
  x: number,
  y: number,
  rect: Rectangle
) => {
  const distanceY = Math.max(rect.min.y - y, 0, y - rect.max.y);
  const distanceX = Math.max(rect.min.x - x, 0, x - rect.max.x);
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};

export const getCoordinates = (
  x: number,
  y: number,
  ref: React.RefObject<HTMLDivElement>
) => {
  const rect = ref.current?.getBoundingClientRect() as DOMRect;
  return {
    pointCoordinates: {
      x: +((x - rect.left) / rect.width).toFixed(2),
      y: +(1 - (y - rect.top) / rect.height).toFixed(2),
    },
    divCoordinates: {
      x: x - rect.left,
      y: y - rect.top,
    },
  };
};

export const isOutOfBounds = (
  x: number,
  y: number,
  ref: React.RefObject<HTMLDivElement>
) => {
  const MAX_DISTANCE = 16;
  const rect = ref.current?.getBoundingClientRect() as DOMRect;
  return (
    distanceFromRectangle(x, y, {
      min: { x: 0, y: 0 },
      max: { x: rect?.width, y: rect?.height },
    }) > MAX_DISTANCE
  );
};

export const pointsToPath = (points: Point[]) => {
  const lineGenerator = line<Point>()
    .curve(curveMonotoneX)
    .x((d) => d.x)
    .y((d) => d.y);

  return lineGenerator(points);
};
