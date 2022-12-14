import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
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

  useEffect(() => {
    axis === "x"
      ? setValue(points[selectedPointIndex].x)
      : setValue(points[selectedPointIndex].y);
  }, [selectedPointIndex, points, axis]);

  const handleBlur = () => {
    setValue(points[selectedPointIndex][axis]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.MOVE_POINT,
      x: axis === "x" ? +e.target.value : points[selectedPointIndex].x,
      y: axis === "y" ? +e.target.value : points[selectedPointIndex].y,
      index: selectedPointIndex,
    });
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setValue(points[selectedPointIndex][axis]);
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div className={styles.CurveEditorInput}>
      <label htmlFor={axis}>{label}</label>
      <input
        id={axis}
        name={axis}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        step={0.01}
        type="number"
        value={value}
      />
    </div>
  );
};
