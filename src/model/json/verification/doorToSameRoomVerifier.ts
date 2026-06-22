import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import { allDoors } from "./helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorToSameRoom = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
};

/** F3: a door whose `toRoom` is its own room - the transition can't work */
export const doorToSameRoomVerifier: CampaignVerifier<DoorToSameRoom> = {
  name: "Door to same room",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      if (door.config.toRoom !== roomId) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ links back to its own room`,
        fixable: false,
        fixText: `Point door ‘${doorId}’ at a different room, or delete it`,
        issueData: { roomId, doorId },
        verifier: doorToSameRoomVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
