import { CommandItem } from "../../ui/command";
import {
  changeRoomScenery,
  selectCurrentEditingRoomScenery,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { useAppDispatch } from "../../store/hooks";
import { Select } from "../../ui/Select";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
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
      OptionCommandItem={({ value, onSelect }) => (
        <CommandItem value={value} onSelect={onSelect}>
          <BitmapText>{value}</BitmapText>
        </CommandItem>
      )}
      triggerButtonClassName="w-18 text-white"
      triggerButtonLabel={<BitmapText>{currentRoomScenery}</BitmapText>}
    />
  );
}
