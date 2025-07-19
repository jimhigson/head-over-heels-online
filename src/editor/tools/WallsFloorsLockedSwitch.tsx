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
      label="scenery"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.wallsFloorsLocked,
      )}
      onClick={(_e, value) => {
        dispatch(changeWallsFloorsLocked(value));
      }}
      falseLabel="edit"
      trueLabel="lock"
    />
  );
};
