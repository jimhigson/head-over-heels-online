import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { allDoors } from "../helpers/doorPartner";
import { isDoorBesideFloor } from "../helpers/isDoorBesideFloor";
import { floorSquares } from "../helpers/roomPerimeter";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type DoorOffFloor = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
};

/**
 * a door without floor beside both of its blocks - it hangs off the room's
 * edge, so the player can't walk through all of it.
 */
export const doorOffFloorVerifier: CampaignVerifier<DoorOffFloor> = {
  name: "Door off floor",
  *check(campaign) {
    // each room's floor squares, built once for all of its doors:
    const floorSquaresByRoom = new Map<VerificationRoomId, Set<string>>();
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const floors = floorSquaresByRoom.getOrInsertComputed(roomId, () =>
        floorSquares(campaign.rooms[roomId]),
      );
      if (isDoorBesideFloor(floors, door)) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ is not beside floor along all of its width`,
        fixable: false,
        fixText: `Move door ‘${doorId}’ onto the edge of the floor in ‘${roomId}’`,
        issueData: { roomId, doorId },
        verifier: doorOffFloorVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
