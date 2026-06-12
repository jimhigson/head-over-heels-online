import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
  setSelectedItemsDisappearing,
} from "../../slice/levelEditorSlice";

/**
 * Add or remove "disappear on stand" for the selection. Shown only when every
 * selected item can disappear on stand (blocks and conveyors). Offers "add" when
 * not all already disappear and "remove" when any do - matching the other toggle
 * menus, which list the state(s) the selection isn't uniformly already in.
 */
export const DisappearingMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

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
        <ContextMenuItem
          value="add-disappearing"
          onSelect={() =>
            dispatch(
              setSelectedItemsDisappearing({
                disappearing: true,
                timestamp: Date.now(),
              }),
            )
          }
        >
          Disappear on stand
        </ContextMenuItem>
      )}
      {!noneDisappear && (
        <ContextMenuItem
          value="remove-disappearing"
          onSelect={() =>
            dispatch(
              setSelectedItemsDisappearing({
                disappearing: false,
                timestamp: Date.now(),
              }),
            )
          }
        >
          Don't disappear
        </ContextMenuItem>
      )}
    </>
  );
};
