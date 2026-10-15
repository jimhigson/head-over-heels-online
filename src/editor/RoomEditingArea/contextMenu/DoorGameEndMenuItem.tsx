import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedDoorsToGameEnd,
} from "../../slice/levelEditorSlice";

/**
 * make the selected doors end the game. Hidden unless the selection is all
 * doors, at least one of which doesn't end the game already
 */
export const DoorGameEndMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds.map((id) => roomJson.items[id]);
  if (
    items.length === 0 ||
    !items.every((item) => item?.type === "door") ||
    items.every((item) => item.config.toRoom === exitGameRoomId)
  ) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: "Make game end",
        action: () => setSelectedDoorsToGameEnd({ timestamp: Date.now() }),
      }}
    />
  );
};
