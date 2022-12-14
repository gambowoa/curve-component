import styles from "./styles.module.scss";
import { CurveEditor } from "./components/CurveEditor";
import {
  CurveEditorContext,
  CurveEditorDispatchContext,
} from "./components/CurveEditor/CurveEditorContext";
import { useCurveEditor } from "./hooks/useCurveEditor";

export const App = () => {
  const { curveEditor, dispatch } = useCurveEditor([
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ]);

  return (
    <main>
      <CurveEditorContext.Provider value={curveEditor}>
        <CurveEditorDispatchContext.Provider value={dispatch}>
          <div className={styles.wrapper}>
            <h1>Curve Editor</h1>
            <CurveEditor />
          </div>
        </CurveEditorDispatchContext.Provider>
      </CurveEditorContext.Provider>
    </main>
  );
};
