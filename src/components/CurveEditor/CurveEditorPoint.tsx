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

  const handleClick = () => {
    dispatch({ type: ActionType.SELECT_POINT, index });
  };

  return (
    <li>
      <button
        aria-label={`Select Point ${index} at (${x}, ${y})`}
        className={clsx(
          styles.CurveEditorPoint,
          isPointSelected(index) && styles.selected
        )}
        onClick={handleClick}
        onPointerDown={() => {
          handlePointerDown(index);
        }}
        style={{
          left: `${x * 100}%`,
          opacity: isPointVisible(id) ? 1 : 0,
          top: `${y * 100}%`,
        }}
      />
    </li>
  );
};
