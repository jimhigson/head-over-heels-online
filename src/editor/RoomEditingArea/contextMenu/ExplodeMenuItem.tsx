import { getJsonItemTimes } from "../../../model/times";
import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  explodeSelectedItems,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * Explodes coalesced (multiplied) items back into their separate parts. Shown
 * only when every selected item is a multiplied item (times > 1 on some axis).
 */
export const ExplodeMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const selectedItems = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const canExplode =
    selectedItems.length > 0 &&
    selectedItems.every((item) => {
      const times = getJsonItemTimes(item);
      return times.x > 1 || times.y > 1 || times.z > 1;
    });

  if (!canExplode) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: "Explode",
        action: () => explodeSelectedItems({ timestamp: Date.now() }),
      }}
    />
  );
};
