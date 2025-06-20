import { useAppDispatch } from "../../store/hooks";
import { Switch } from "../../ui/Switch";
import {
  changeGridResolution,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const HalfGridResolutionSwitch = () => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      className="w-full"
      label="res"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.halfGridResolution,
      )}
      onClick={(_e, value) => {
        dispatch(changeGridResolution(value));
      }}
      falseLabel="Blocks"
      trueLabel="Halves"
    />
  );
};
