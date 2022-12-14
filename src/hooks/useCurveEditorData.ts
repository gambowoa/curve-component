import { useContext, useRef } from "react";
import { pointsToPath } from "../components/CurveEditor/CurveEditor.utils";
import {
  CurveEditorContext,
  CurveEditorContextType,
} from "../components/CurveEditor/CurveEditorContext";

export const useCurveEditorData = () => {
  const { isDragActive, points, selectedPointIndex, shouldDeletePoint } =
    useContext(CurveEditorContext) as CurveEditorContextType;
  const ref = useRef<HTMLDivElement>(null);

  const nextPoint = points[selectedPointIndex + 1];
  const previousPoint = points[selectedPointIndex - 1];
  const visiblePoints = points.filter(
    (_, i) => !(i === selectedPointIndex && shouldDeletePoint)
  );
  const svgPath = pointsToPath(visiblePoints);

  const isPointVisible = (id: string) => {
    return !!visiblePoints.find((point) => {
      return point.id === id;
    });
  };

  const isPointSelected = (index: number) => {
    return index === selectedPointIndex;
  };

  return {
    isDragActive,
    isPointSelected,
    isPointVisible,
    nextPoint,
    previousPoint,
    points,
    ref,
    selectedPointIndex,
    shouldDeletePoint,
    svgPath,
    visiblePoints,
  };
};
