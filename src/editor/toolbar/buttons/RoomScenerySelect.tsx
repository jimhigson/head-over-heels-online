import { capitalize } from "string-transform";

import { type SceneryName, sceneryNames } from "../../../sprites/planets";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { Select } from "../../../ui/Select";
import {
  changeRoomScenery,
  selectCurrentEditingRoomScenery,
} from "../../slice/levelEditorSlice";

export function RoomScenerySelect() {
  const dispatch = useAppDispatch();

  const currentRoomScenery = useEditorAppSelector(
    selectCurrentEditingRoomScenery,
  );
  return (
    <Select<SceneryName>
      value={currentRoomScenery}
      onSelect={(currentValue) => {
        dispatch(changeRoomScenery(currentValue as SceneryName));
      }}
      values={sceneryNames.toSorted()}
      placeholder="scenery"
      triggerButtonClassName="w-full"
      triggerButtonLabel={capitalize(currentRoomScenery)}
      tooltipContent="Change this room’s scenery"
      valueDisplayFormat={capitalize}
    />
  );
}
