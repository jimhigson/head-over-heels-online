import { useAppDispatch } from "../../store/hooks";
import { Switch } from "../../ui/Switch";
import {
  changeWallsFloorsLocked,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const WallsFloorsLockedSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      className={className}
      label="Scenery"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.wallsFloorsLocked,
      )}
      onChange={(value) => {
        dispatch(changeWallsFloorsLocked(value));
      }}
      falseLabel="edit"
      trueLabel="lock"
      shortcutKeys={["C"]}
      tooltipContent={`locks walls and floors, to edit their contents`}
    />
  );
};
