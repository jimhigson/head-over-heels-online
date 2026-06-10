import { getJsonItemTimes } from "../../../model/times";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  explodeSelectedItems,
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * Explodes coalesced (multiplied) items back into their separate parts. Shown
 * only when every selected item is a multiplied item (times > 1 on some axis).
 */
export const ExplodeMenuItem = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

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
    <ContextMenuItem
      value="explode"
      onSelect={() => dispatch(explodeSelectedItems({ timestamp: Date.now() }))}
    >
      Explode
    </ContextMenuItem>
  );
};
