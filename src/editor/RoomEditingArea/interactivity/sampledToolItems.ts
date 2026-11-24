import { isWritableNonEmptyTuple } from "../../../utils/isWritableNonEmptyTuple";
import { subXyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import type { ItemToolItem, ItemToolItems } from "./Tool";

const toolItemRelativeTo = (
  item: EditorJsonItemUnion,
  clickedItem: EditorJsonItemUnion,
): ItemToolItem =>
  item === clickedItem ?
    // goes where the tool puts down, so needs no position:
    { type: item.type, config: item.config }
  : {
      type: item.type,
      config: item.config,
      position: subXyz(item.position, clickedItem.position),
    };

/**
 * the items the eye dropper gives the item tool when it is clicked on an item:
 * all of the selection if the item is part of a selection of several,
 * otherwise just the item. Each item's position is relative to the item
 * clicked, which is first. Doors are left out of a selection of several,
 * because they only go in walls and a door put down alone is cut into its wall
 */
export const sampledToolItems = (
  clickedItemId: EditorRoomItemId,
  selectedItemIds: readonly EditorRoomItemId[],
  roomItems: EditorRoomJsonItems,
): ItemToolItems => {
  const clickedItem = roomItems[clickedItemId];
  const clickedItemOnly: ItemToolItems = [
    toolItemRelativeTo(clickedItem, clickedItem),
  ];

  if (selectedItemIds.length < 2 || !selectedItemIds.includes(clickedItemId)) {
    return clickedItemOnly;
  }

  const sampledItems = [
    clickedItemId,
    ...selectedItemIds.filter((itemId) => itemId !== clickedItemId),
  ]
    .map((itemId) => roomItems[itemId])
    .filter((item) => item.type !== "door")
    .map((item) => toolItemRelativeTo(item, clickedItem));

  // a selection of nothing but doors leaves just the one clicked:
  return isWritableNonEmptyTuple(sampledItems) ? sampledItems : clickedItemOnly;
};
