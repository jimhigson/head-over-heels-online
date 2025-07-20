import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import type { EditorRoomJson, EditorRoomItemId } from "../../editorTypes";
import { generateWallHealingInPlaceOfDoor } from "./generateWallHealingInPlaceOfDoor";

export const deleteItemInPlace = (
  roomJson: EditorRoomJson,
  itemId: EditorRoomItemId,
) => {
  const item = roomJson.items[itemId];

  if (item.type === "door") {
    for (const [
      nextWallId,
      replacementWall,
    ] of generateWallHealingInPlaceOfDoor(item, roomJson)) {
      roomJson.items[nextWallId] = replacementWall;
    }

    // consolidate all walls in this room, to 'heal' any walls around the wall we just added:
    // TODO: this will currently consolidate all other room items too - maybe that's ok?
    roomJson.items = consolidateItemsMap(roomJson.items);
  }

  delete roomJson.items[itemId];
};
