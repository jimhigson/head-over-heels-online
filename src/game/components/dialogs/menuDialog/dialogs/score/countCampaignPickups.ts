import { type Campaign } from "../../../../../../model/modelTypes";
import { roomJsonItemsIterable } from "../../../../../../model/RoomJsonItemIterators";
import { objectEntriesIter } from "../../../../../../utils/entries";

/**
 * count the campaign's pickups, leaving out crowns (they are scored as planets)
 */
export const countCampaignPickups = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): number => {
  let pickupsCount = 0;
  for (const [, roomJson] of objectEntriesIter(campaign.rooms)) {
    for (const pickup of roomJsonItemsIterable(roomJson, "pickup")) {
      if (pickup.config.gives !== "crown") {
        pickupsCount++;
      }
    }
  }
  return pickupsCount;
};
