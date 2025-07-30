import {
  changeRoomScenery,
  selectCurrentEditingRoomScenery,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { useAppDispatch } from "../../store/hooks";
import { Select } from "../../ui/Select";
import type { SceneryName } from "../../sprites/planets";
import { sceneryNames } from "../../sprites/planets";

export function RoomScenerySelect() {
  const dispatch = useAppDispatch();

  const currentRoomScenery = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomScenery,
  );

  return (
    <Select<SceneryName>
      value={currentRoomScenery}
      onSelect={(currentValue) => {
        dispatch(changeRoomScenery(currentValue as SceneryName));
      }}
      values={sceneryNames}
      placeholder="scenery"
      triggerButtonClassName="w-full"
      triggerButtonLabel={currentRoomScenery}
      tooltipContent="Change this room’s scenery"
    />
  );
}
