import { createContext, Dispatch } from "react";
import { clampToRect } from "./CurveEditor.utils";
import { Point } from "./CurveEditor.types";
import { nanoid } from "nanoid";

export type CurveEditorContextType = {
  isDragActive: boolean;
  points: Point[];
  selectedPointIndex: number;
  shouldDeletePoint: boolean;
};

export const CurveEditorContext = createContext<CurveEditorContextType | null>(
  null
);

export enum ActionType {
  ACTIVATE_POINT = "activate point",
  ADD_POINT = "add point",
  ALLOW_POINT_DELETION = "allow point deletion",
  DEACTIVATE_POINT = "deactivate point",
  DELETE_POINT = "delete point",
  DENY_POINT_DELETION = "deny point deletion",
  MOVE_POINT = "move point",
  RESET = "reset",
  SELECT_POINT = "select point",
}
export type CurveEditorDispatchContextType =
  | { type: ActionType.ACTIVATE_POINT }
  | { type: ActionType.ADD_POINT; point: Point; index: number }
  | { type: ActionType.ALLOW_POINT_DELETION }
  | { type: ActionType.DEACTIVATE_POINT }
  | { type: ActionType.DELETE_POINT; index: number }
  | { type: ActionType.DENY_POINT_DELETION }
  | { type: ActionType.MOVE_POINT; x: number; y: number; index: number }
  | { type: ActionType.RESET }
  | { type: ActionType.SELECT_POINT; index: number };

export const CurveEditorDispatchContext =
  createContext<Dispatch<CurveEditorDispatchContextType> | null>(null);

export const curveEditorReducer = (
  curveEditor: CurveEditorContextType,
  action: CurveEditorDispatchContextType
) => {
  switch (action.type) {
    case ActionType.ACTIVATE_POINT: {
      curveEditor.isDragActive = true;
      return;
    }
    case ActionType.ADD_POINT: {
      curveEditor.points.splice(action.index, 0, action.point);
      curveEditor.selectedPointIndex = action.index;
      return;
    }
    case ActionType.ALLOW_POINT_DELETION: {
      curveEditor.shouldDeletePoint = true;
      return;
    }
    case ActionType.DEACTIVATE_POINT: {
      curveEditor.isDragActive = false;
      return;
    }
    case ActionType.DELETE_POINT: {
      curveEditor.points.splice(action.index, 1);
      curveEditor.shouldDeletePoint = false;
      curveEditor.isDragActive = false;
      return;
    }
    case ActionType.DENY_POINT_DELETION: {
      curveEditor.shouldDeletePoint = false;
      return;
    }
    case ActionType.MOVE_POINT: {
      const previousPoint =
        curveEditor.points[curveEditor.selectedPointIndex - 1];
      const nextPoint = curveEditor.points[curveEditor.selectedPointIndex + 1];
      const newCoords = clampToRect(action.x, action.y, {
        min: {
          x: nextPoint === undefined ? 1 : previousPoint?.x || 0,
          y: 0,
        },
        max: {
          x: previousPoint === undefined ? 0 : nextPoint?.x || 1,
          y: 1,
        },
      });
      curveEditor.points[action.index].x = newCoords.x;
      curveEditor.points[action.index].y = newCoords.y;
      return;
    }
    case ActionType.RESET: {
      curveEditor.points = [
        { x: 0, y: 1, id: nanoid() },
        { x: 1, y: 0, id: nanoid() },
      ];
      curveEditor.selectedPointIndex = 0;
      return;
    }
    case ActionType.SELECT_POINT: {
      curveEditor.selectedPointIndex = action.index;
      return;
    }

    default: {
      throw Error("Unknown action");
    }
  }
};
