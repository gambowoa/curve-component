import { ChangeEvent, useState, KeyboardEvent } from "react";
import styles from "./CurveEditor.module.scss";
import { ActionType } from "./CurveEditorContext";
import { useCurveEditorData } from "../../hooks/useCurveEditorData";
import { useCurveEditorDispatch } from "../../hooks/useCurveEditorDispatch";

export interface CurveEditorInputProps {
  axis: "x" | "y";
  label: string;
}

export const CurveEditorInput = ({ axis, label }: CurveEditorInputProps) => {
  const { points, selectedPointIndex } = useCurveEditorData();
  const dispatch = useCurveEditorDispatch();
  const [value, setValue] = useState<string | number>(
    points[selectedPointIndex][axis]
  );
  const [shouldUseInputValue, setShouldUseInputValue] = useState(false);
  const previousPoint = points[selectedPointIndex + 1];
  const nextPoint = points[selectedPointIndex + 1];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShouldUseInputValue(true);
    setValue(e.target.value);
    let min = 0,
      max = 0;
    if (axis === "x") {
      min = nextPoint === undefined ? 1 : previousPoint?.x || 0;
      max = previousPoint === undefined ? 0 : nextPoint?.x || 1;
    }
    if (
      isNaN(+e.target.value) ||
      !(min <= +e.target.value || +e.target.value <= max)
    ) {
      return;
    }
    dispatch({
      type: ActionType.MOVE_POINT,
      x:
        axis === "x"
          ? +(+e.target.value).toFixed(2)
          : points[selectedPointIndex].x,
      y:
        axis === "y"
          ? +(+e.target.value).toFixed(2)
          : points[selectedPointIndex].y,
      index: selectedPointIndex,
    });
  };

  const handleBlur = () => {
    setValue(points[selectedPointIndex][axis]);
    setShouldUseInputValue(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setValue(points[selectedPointIndex][axis]);
      setShouldUseInputValue(false);
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleClick = () => {
    (document.activeElement as HTMLInputElement).select();
  };

  return (
    <label
      aria-label={`Set point ${selectedPointIndex} ${axis} value`}
      className={styles.CurveEditorInput}
      htmlFor={axis}
    >
      {label}
      <input
        id={axis}
        name={axis}
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        step={0.01}
        type="number"
        value={shouldUseInputValue ? value : points[selectedPointIndex][axis]}
      />
    </label>
  );
};
