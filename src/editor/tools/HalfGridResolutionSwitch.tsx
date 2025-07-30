import { useAppDispatch } from "../../store/hooks";
import { Switch } from "../../ui/Switch";
import {
  changeGridResolution,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const HalfGridResolutionSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      className={className}
      label="snap"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.halfGridResolution,
      )}
      onChange={(value) => {
        dispatch(changeGridResolution(value));
      }}
      falseLabel="Block"
      trueLabel="Half"
      shortcutKeys={["S"]}
      tooltipContent={`snaps to either the grid (like the original game)

or, allows placing on a half-block grid

hotkey: **S**
`}
    />
  );
};
