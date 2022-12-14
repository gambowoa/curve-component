import { nanoid } from "nanoid";
import { useImmerReducer } from "use-immer";
import { curveEditorReducer } from "../components/CurveEditor/CurveEditorContext";

export const useCurveEditor = (coordinates: { x: number; y: number }[]) => {
  const initialPoints = coordinates.map((coordinate) => {
    return { ...coordinate, id: nanoid() };
  });
  const [curveEditor, dispatch] = useImmerReducer(curveEditorReducer, {
    isDragActive: false,
    points: initialPoints,
    selectedPointIndex: 0,
    shouldDeletePoint: false,
  });
  return { curveEditor, dispatch };
};
