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
      disableCommandInput
      triggerButtonClassName="w-full"
      triggerButtonLabel={currentRoomScenery}
    />
  );
}
