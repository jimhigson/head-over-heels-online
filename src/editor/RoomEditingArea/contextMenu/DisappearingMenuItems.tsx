import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedItemsDisappearing,
} from "../../slice/levelEditorSlice";

/**
 * Add or remove "disappear on stand" for the selection. Shown only when every
 * selected item can disappear on stand (blocks and conveyors). Offers "add" when
 * not all already disappear and "remove" when any do - matching the other toggle
 * menus, which list the state(s) the selection isn't uniformly already in.
 */
export const DisappearingMenuItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  // only blocks and conveyors can disappear on stand:
  if (
    items.length === 0 ||
    !items.every((item) => item.type === "block" || item.type === "conveyor")
  ) {
    return null;
  }

  const disappears = (item: (typeof items)[number]) =>
    (item.type === "block" || item.type === "conveyor") &&
    item.config.disappearing !== undefined;

  const allDisappear = items.every(disappears);
  const noneDisappear = !items.some(disappears);

  return (
    <>
      {!allDisappear && (
        <CommandContextMenuItem
          command={{
            type: "action",
            label: "Disappear on stand",
            action: () =>
              setSelectedItemsDisappearing({
                disappearing: true,
                timestamp: Date.now(),
              }),
          }}
        />
      )}
      {!noneDisappear && (
        <CommandContextMenuItem
          command={{
            type: "action",
            label: "Don't disappear",
            action: () =>
              setSelectedItemsDisappearing({
                disappearing: false,
                timestamp: Date.now(),
              }),
          }}
        />
      )}
    </>
  );
};
