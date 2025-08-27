import type { GridResolution } from "../slice/levelEditorSlice";

import { useAppDispatch } from "../../store/hooks";
import { Switch3 } from "../../ui/Switch";
import {
  changeGridResolution,
  gridResolutions,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const HalfGridResolutionSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Switch3
      className={className}
      label="snap"
      values={gridResolutions}
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.gridResolution,
      )}
      onChange={(value: GridResolution) => {
        dispatch(changeGridResolution(value));
      }}
      valueLabels={["block", "half", "fine"]}
      shortcutKeys={["S"]}
      tooltipContent={`snaps to either the grid (like the original game)

or, on a half-block grid

or to a fine 2px resolution`}
    />
  );
};
