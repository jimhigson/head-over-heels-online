import { useEditorAppSelector } from "../../../store/store";
import { MenuItemGlyphIcon } from "../../../ui/menuBar/MenuItemGlyphIcon";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * Picks up the selected item as the active item tool (the same as eye-dropping
 * it), so copies can be stamped down. Shown only when a single item is selected.
 */
export const DuplicateMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  if (selectedJsonItemIds.length !== 1) {
    return null;
  }

  const [jsonItemId] = selectedJsonItemIds;
  const jsonItem = roomJson.items[jsonItemId];

  if (jsonItem === undefined) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "itemTool",
        label: "Duplicate",
        menuIcon: <MenuItemGlyphIcon glyph="*2" />,
        itemTool: { type: jsonItem.type, config: jsonItem.config },
      }}
    />
  );
};
