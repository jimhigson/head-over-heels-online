import { type Campaign } from "../../../../../../model/modelTypes";
import { iterateRoomJsonItemsWithIds } from "../../../../../../model/RoomJsonItemIterators";
import { type PickupsCollected } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { objectEntriesIter } from "../../../../../../utils/entries";

/**
 * count the campaign's collected pickups, leaving out crowns (they are scored as planets)
 */
export const countCollectedPickups = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): number => {
  let collectedCount = 0;
  for (const [roomId, roomPickupsCollected] of objectEntriesIter(
    pickupsCollected,
  )) {
    const { items } = campaign.rooms[roomId];
    for (const [pickupId, pickup] of iterateRoomJsonItemsWithIds(
      items,
      "pickup",
    )) {
      if (
        roomPickupsCollected[pickupId] === true &&
        pickup.config.gives !== "crown"
      ) {
        collectedCount++;
      }
    }
  }
  return collectedCount;
};
