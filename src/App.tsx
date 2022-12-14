import styles from "./styles.module.scss";
import { CurveEditor } from "./components/CurveEditor";
import {
  CurveEditorContext,
  CurveEditorDispatchContext,
} from "./components/CurveEditor/CurveEditorContext";
import { useCurveEditor } from "./hooks/useCurveEditor";

export const App = () => {
  const { curveEditor, dispatch } = useCurveEditor([
    { x: 0, y: 0.9 },
    { x: 1, y: 0 },
  ]);

  return (
    <CurveEditorContext.Provider value={curveEditor}>
      <CurveEditorDispatchContext.Provider value={dispatch}>
        <div className={styles.wrapper}>
          <CurveEditor />
        </div>
      </CurveEditorDispatchContext.Provider>
    </CurveEditorContext.Provider>
  );
};
