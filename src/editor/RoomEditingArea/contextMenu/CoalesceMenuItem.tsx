import { useMemo } from "preact/hooks";

import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import { keys } from "../../../utils/entries";
import { type EditorRoomJsonItems } from "../../editorTypes";
import {
  coalesceSelectedItems,
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * Coalesces the selected items into a single multiplied item. Shown only when
 * the whole selection would consolidate down to one item - reusing the real
 * consolidation enforces its matching type/config, fractional offset, and
 * cuboid adjacency rules.
 */
export const CoalesceMenuItem = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

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
    <ContextMenuItem
      value="coalesce"
      onSelect={() =>
        dispatch(coalesceSelectedItems({ timestamp: Date.now() }))
      }
    >
      Coalesce
    </ContextMenuItem>
  );
};
