import { useContext, Dispatch } from "react";
import {
  CurveEditorDispatchContext,
  CurveEditorDispatchContextType,
} from "../components/CurveEditor/CurveEditorContext";

export const useCurveEditorDispatch = () => {
  const dispatch = useContext(
    CurveEditorDispatchContext
  ) as Dispatch<CurveEditorDispatchContextType>;
  return dispatch;
};
