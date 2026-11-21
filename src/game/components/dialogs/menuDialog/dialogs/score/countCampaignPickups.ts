import type { Campaign } from "../../../../../../model/modelTypes";
import type { RoomJson } from "../../../../../../model/RoomJson";
import { roomJsonItemsIterable } from "../../../../../../model/RoomJsonItemIterators";
import { valuesIter } from "../../../../../../utils/entries";

/**
 * count the campaign's pickups, leaving out crowns (they are scored as planets)
 * and scrolls (duplicate manual pages can't all be collected)
 */
export const countCampaignPickups = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): number => {
  let pickupsCount = 0;
  for (const roomJson of valuesIter<RoomJson<RoomId, string>>(campaign.rooms)) {
    for (const pickup of roomJsonItemsIterable(roomJson, "pickup")) {
      if (pickup.config.gives !== "crown" && pickup.config.gives !== "scroll") {
        pickupsCount++;
      }
    }
  }
  return pickupsCount;
};
