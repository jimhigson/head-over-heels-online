import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { changeWallsFloorsLocked } from "../../slice/levelEditorSlice";

export const WallsFloorsLockedSwitch = ({
  class: className,
}: {
  class?: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      class={className}
      label="Scenery"
      ariaLabel="Lock walls and floors"
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
