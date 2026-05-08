import type { GridResolution } from "../../slice/levelEditorSlice";

import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { Switch3 } from "../../../ui/Switch";
import {
  changeGridResolution,
  gridResolutions,
} from "../../slice/levelEditorSlice";

export const HalfGridResolutionSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Switch3
      className={className}
      label="Snap"
      values={gridResolutions}
      value={useEditorAppSelector((state) => state.levelEditor.gridResolution)}
      onChange={(value: GridResolution) => {
        dispatch(changeGridResolution(value));
      }}
      valueLabels={["block", "half", "fine"]}
      shortcutKeys={["S"]}
      tooltipContent={`Snaps to either the grid (like the original game)

Or, on a half-block grid

Or, to a fine 2px resolution`}
    />
  );
};
