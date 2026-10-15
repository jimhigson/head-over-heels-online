import { useMemo } from "preact/hooks";

import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { useEditorAppSelector } from "../../../store/store";
import { keys } from "../../../utils/entries";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { type EditorRoomJsonItems } from "../../editorTypes";
import {
  coalesceSelectedItems,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * Coalesces the selected items into a single multiplied item. Shown only when
 * the whole selection would consolidate down to one item - reusing the real
 * consolidation enforces its matching type/config, fractional offset, and
 * cuboid adjacency rules.
 */
export const CoalesceMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const canCoalesce = useMemo(() => {
    const selectedById = Object.fromEntries(
      selectedJsonItemIds
        .map((id) => [id, roomJson.items[id]] as const)
        .filter(([, item]) => item !== undefined),
    ) as EditorRoomJsonItems;
    return (
      keys(selectedById).length > 1 &&
      keys(consolidateItemsMap(selectedById)).length === 1
    );
  }, [selectedJsonItemIds, roomJson]);

  if (!canCoalesce) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: "Coalesce",
        action: () => coalesceSelectedItems({ timestamp: Date.now() }),
      }}
    />
  );
};
