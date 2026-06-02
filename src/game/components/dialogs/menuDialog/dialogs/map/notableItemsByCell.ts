import { type Campaign } from "../../../../../../model/modelTypes";
import { emptyObject } from "../../../../../../utils/empty";
import { entries } from "../../../../../../utils/entries";
import { type Xy } from "../../../../../../utils/vectors/vectors";
import { type PickupsCollected } from "../../../../../gameState/GameState";
import { notableItemSlotPositions } from "./ItemsInRoomLayout";
import { type NotableItem } from "./NotableItem";
import { selectNotableItems } from "./selectNotableItems";
import { type SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";

/** the notable items shown in one map cell, and their 0..1 slot positions */
export type NotableItemsInCell<RoomId extends string> = {
  items: Record<string, NotableItem<RoomId>>;
  positions: Record<string, Xy>;
};

export type NotableItemsByCell<RoomId extends string> = Record<
  `${RoomId}/${string}`,
  NotableItemsInCell<RoomId>
>;

/**
 * for every placed cell on the map, work out which items are notable and where
 * their icons sit. Computed once in the map-data stage so the room renderer and
 * the editor's behaviours (eg teleporter links) draw to the same positions.
 */
export const computeNotableItemsByCell = <RoomId extends string>(
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>,
  campaign: Pick<Campaign<RoomId>, "rooms">,
  pickupsCollected: PickupsCollected<RoomId>,
): NotableItemsByCell<RoomId> => {
  const result = {} as NotableItemsByCell<RoomId>;

  for (const [cellKey, { roomId, subRoomId }] of entries(gridPositions)) {
    const roomJson = campaign.rooms[roomId];
    if (roomJson === undefined) {
      continue;
    }
    const items = selectNotableItems(
      roomJson,
      pickupsCollected[roomId] ?? emptyObject,
      subRoomId,
    );
    result[cellKey] = {
      items,
      positions: notableItemSlotPositions(items, roomJson, subRoomId),
    };
  }

  return result;
};
