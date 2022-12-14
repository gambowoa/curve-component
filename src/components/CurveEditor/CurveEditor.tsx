import { useCurveEditorDispatch } from "../../hooks/useCurveEditorDispatch";
import { CurveEditorChart } from "./CurveEditorChart";
import { ActionType } from "./CurveEditorContext";
import { CurveEditorInput } from "./CurveEditorInput";

export const CurveEditor = () => {
  const dispatch = useCurveEditorDispatch();
  const handleClick = () => {
    dispatch({ type: ActionType.RESET });
  };

  return (
    <div>
      <button onClick={handleClick}>Reset</button>
      <CurveEditorChart />
      <CurveEditorInput axis="x" label="X: " />
      <CurveEditorInput axis="y" label="Y: " />
    </div>
  );
};
