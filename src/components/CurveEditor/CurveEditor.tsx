import { CurveEditorChart } from "./CurveEditorChart";
import { CurveEditorInput } from "./CurveEditorInput";

export const CurveEditor = () => {
  return (
    <div>
      <button>Reset</button>
      <CurveEditorChart />
      <CurveEditorInput axis="x" label="X: " />
      <CurveEditorInput axis="y" label="Y: " />
    </div>
  );
};
