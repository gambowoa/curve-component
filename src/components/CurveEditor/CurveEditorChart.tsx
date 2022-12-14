import { RefObject } from "react";
import sortedIndex from "lodash/sortedIndex";
import { nanoid } from "nanoid";
import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";
import { getCoordinates, isOutOfBounds } from "./CurveEditor.utils";
import { ActionType } from "./CurveEditorContext";
import { CurveEditorPoint } from "./CurveEditorPoint";
import styles from "./CurveEditor.module.scss";
import { useCurveEditorData } from "../../hooks/useCurveEditorData";
import { useCurveEditorDispatch } from "../../hooks/useCurveEditorDispatch";

export const CurveEditorChart = () => {
  const {
    isDragActive,
    nextPoint,
    points,
    previousPoint,
    ref,
    selectedPointIndex,
    shouldDeletePoint,
    svgPath,
  } = useCurveEditorData();
  const dispatch = useCurveEditorDispatch();

  const handleDrag = (
    e: DraggableEvent,
    data: DraggableData,
    ref: RefObject<HTMLDivElement>
  ) => {
    const { x, y } = getCoordinates(data.x, data.y, ref).pointCoordinates;
    const { x: divX, y: divY } = getCoordinates(
      data.x,
      data.y,
      ref
    ).divCoordinates;
    dispatch({
      type: ActionType.MOVE_POINT,
      x,
      y,
      index: selectedPointIndex,
    });
    isOutOfBounds(divX, divY, ref) &&
    !(previousPoint === undefined || nextPoint === undefined)
      ? dispatch({ type: ActionType.ALLOW_POINT_DELETION })
      : dispatch({ type: ActionType.DENY_POINT_DELETION });
  };

  const handleStart = (
    e: DraggableEvent,
    data: DraggableData,
    ref: RefObject<HTMLDivElement>
  ) => {
    dispatch({ type: ActionType.DEACTIVATE_POINT });
    const { x, y } = getCoordinates(data.x, data.y, ref).pointCoordinates;
    if (isDragActive) {
      return;
    }
    const newPoint = {
      x,
      y,
      id: nanoid(),
    };
    const newPointIndex = sortedIndex(
      points.map((point) => point.x),
      newPoint.x
    );
    dispatch({
      type: ActionType.ADD_POINT,
      index: newPointIndex,
      point: newPoint,
    });
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    dispatch({ type: ActionType.DEACTIVATE_POINT });
    if (shouldDeletePoint) {
      dispatch({ type: ActionType.DELETE_POINT, index: selectedPointIndex });
    }
  };

  return (
    <DraggableCore
      nodeRef={ref}
      onDrag={(e, ui) => {
        handleDrag(e, ui, ref);
      }}
      onStart={(e, ui) => handleStart(e, ui, ref)}
      onStop={handleStop}
    >
      <div className={styles.CurveEditorChart} ref={ref}>
        <svg
          aria-hidden="true"
          className={styles.CurveEditorGraph}
          focusable="false"
          preserveAspectRatio="none"
          viewBox="0 0 1 1"
        >
          <path d={svgPath as string} vectorEffect="non-scaling-stroke" />
        </svg>
        <ul aria-label="Chart points">
          {points.map((point, index) => (
            <CurveEditorPoint
              id={point.id}
              index={index}
              key={point.id}
              x={point.x}
              y={point.y}
            ></CurveEditorPoint>
          ))}
        </ul>
      </div>
    </DraggableCore>
  );
};
