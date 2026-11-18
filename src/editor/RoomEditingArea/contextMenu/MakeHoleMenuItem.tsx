import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  makeHoleInSelectedFloor,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";
import { canMakeHoleInFloor } from "../../slice/reducers/editRoomReducers";

/**
 * Cuts a hole through the middle of a floor, down into the room below. Shown
 * only when a single floor big enough to hold the hole is selected.
 */
export const MakeHoleMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const [selectedItem] = selectedJsonItemIds.map((id) => roomJson.items[id]);

  if (
    selectedJsonItemIds.length !== 1 ||
    selectedItem?.type !== "floor" ||
    !canMakeHoleInFloor(selectedItem)
  ) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: "Make hole",
        action: () => makeHoleInSelectedFloor({ timestamp: Date.now() }),
      }}
    />
  );
};
