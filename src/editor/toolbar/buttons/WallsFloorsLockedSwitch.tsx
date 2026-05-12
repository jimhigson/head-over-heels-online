import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { changeWallsFloorsLocked } from "../../slice/levelEditorSlice";

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
      value={useEditorAppSelector(
        (state) => state.levelEditor.wallsFloorsLocked,
      )}
      onChange={(value) => {
        dispatch(changeWallsFloorsLocked(value));
      }}
      falseLabel="edit"
      trueLabel="lock"
      shortcutKeys={["C"]}
      tooltipContent={`Locks walls and floors, to edit their contents`}
    />
  );
};
