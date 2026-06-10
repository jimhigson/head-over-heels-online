import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
  setTool,
} from "../../slice/levelEditorSlice";

/**
 * Picks up the selected item as the active item tool (the same as eye-dropping
 * it), so copies can be stamped down. Shown only when a single item is selected.
 */
export const DuplicateMenuItem = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

  if (selectedJsonItemIds.length !== 1) {
    return null;
  }

  const [jsonItemId] = selectedJsonItemIds;
  const jsonItem = roomJson.items[jsonItemId];

  if (jsonItem === undefined) {
    return null;
  }

  return (
    <ContextMenuItem
      value="duplicate"
      onSelect={() =>
        dispatch(
          setTool({
            type: "item",
            item: { type: jsonItem.type, config: jsonItem.config },
          }),
        )
      }
    >
      Duplicate
    </ContextMenuItem>
  );
};
