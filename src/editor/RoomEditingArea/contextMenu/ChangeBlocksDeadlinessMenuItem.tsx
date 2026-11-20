import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { setSelectedBlocksDeadly } from "../../slice/levelEditorSlice";
import { useSelectedJsonItems } from "./useSelectedJsonItems";

/**
 * Swap the selection between blocks and deadly blocks. Shown only when every
 * selected item is a block, or every one is a deadly block.
 */
export const ChangeBlocksDeadlinessMenuItem = () => {
  const items = useSelectedJsonItems();

  if (items.length === 0) {
    return null;
  }

  const makeDeadly =
    items.every((item) => item.type === "block") ? true
    : items.every((item) => item.type === "deadlyBlock") ? false
    : undefined;

  if (makeDeadly === undefined) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: makeDeadly ? "Change to deadly" : "Change to safe",
        action: () =>
          setSelectedBlocksDeadly({ makeDeadly, timestamp: Date.now() }),
      }}
    />
  );
};
