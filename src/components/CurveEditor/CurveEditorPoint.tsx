import clsx from "clsx";
import { useCurveEditorData } from "../../hooks/useCurveEditorData";
import { useCurveEditorDispatch } from "../../hooks/useCurveEditorDispatch";
import { ActionType } from "./CurveEditorContext";
import styles from "./CurveEditor.module.scss";

export interface CurveEditorPointProps {
  id: string;
  index: number;
  x: number;
  y: number;
}

export const CurveEditorPoint = ({
  id,
  index,
  x,
  y,
}: CurveEditorPointProps) => {
  const { isPointSelected, isPointVisible } = useCurveEditorData();
  const dispatch = useCurveEditorDispatch();

  const handlePointerDown = (index: number) => {
    dispatch({ type: ActionType.ACTIVATE_POINT });
    dispatch({ type: ActionType.SELECT_POINT, index });
  };
  return (
    <div
      className={clsx(
        styles.CurveEditorPoint,
        isPointSelected(index) && styles.selected
      )}
      onPointerDown={() => {
        handlePointerDown(index);
      }}
      style={{
        left: `${x * 100}%`,
        opacity: isPointVisible(id) ? 1 : 0,
        top: `${y * 100}%`,
      }}
    />
  );
};
