import type { Campaign } from "../../../../../../model/modelTypes";
import { iterateRoomJsonItemsWithIds } from "../../../../../../model/RoomJsonItemIterators";
import type { PickupsCollected } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { objectEntriesIter } from "../../../../../../utils/entries";

/**
 * count the campaign's collected pickups, leaving out crowns (they are scored as planets)
 * and scrolls (duplicate manual pages can't all be collected)
 */
export const countCollectedPickups = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): number => {
  let collectedCount = 0;
  // loop over the campaign, just in case the pickupsCollected has rooms in it
  // from an old save, and the campaign got reloaded at a later version with different
  // rooms in it
  for (const [roomId, roomJson] of objectEntriesIter(campaign.rooms)) {
    const roomPickupsCollected = pickupsCollected[roomId];
    if (roomPickupsCollected === undefined) {
      continue;
    }
    for (const [pickupId, pickup] of iterateRoomJsonItemsWithIds(
      roomJson.items,
      "pickup",
    )) {
      if (
        roomPickupsCollected[pickupId] === true &&
        pickup.config.gives !== "crown" &&
        pickup.config.gives !== "scroll"
      ) {
        collectedCount++;
      }
    }
  }
  return collectedCount;
};
