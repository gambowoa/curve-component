import { useCurveEditorDispatch } from "../../hooks/useCurveEditorDispatch";
import styles from "./CurveEditor.module.scss";
import { CurveEditorChart } from "./CurveEditorChart";
import { ActionType } from "./CurveEditorContext";
import { CurveEditorInput } from "./CurveEditorInput";

export const CurveEditor = () => {
  const dispatch = useCurveEditorDispatch();
  const handleClick = () => {
    dispatch({ type: ActionType.RESET });
  };

  return (
    <div className={styles.CurveEditor}>
      <button onClick={handleClick}>Reset</button>
      <CurveEditorChart />
      <div>
        <CurveEditorInput axis="x" label="X: " />
        <CurveEditorInput axis="y" label="Y: " />
      </div>
    </div>
  );
};
