import { entries } from "../../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJsonItemIterators";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { isItemOverFloor, needsFloorUnder } from "../helpers/isItemOverFloor";
import { floorSquares } from "../helpers/roomPerimeter";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type ItemOffFloor = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
};

/**
 * an item in the room with no floor under any of it - it is out in space, off
 * the room's edge.
 */
export const itemOffFloorVerifier: CampaignVerifier<ItemOffFloor> = {
  name: "Item off floor",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      const floors = floorSquares(room);
      for (const [itemId, item] of iterateRoomJsonItemsWithIds(room.items)) {
        if (!needsFloorUnder(room, item) || isItemOverFloor(floors, item)) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          itemId,
          msg: `‘${itemId}’ in ‘${roomId}’ is not over the floor`,
          fixable: false,
          fixText: `Move ‘${itemId}’ over the floor in ‘${roomId}’`,
          issueData: { roomId, itemId },
          verifier: itemOffFloorVerifier,
        };
      }
    }
  },
  fix() {
    return notAutoFixable();
  },
};
