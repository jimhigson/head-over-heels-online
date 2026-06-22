import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { allDoors, doorsBackTo } from "../helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type DoorNoReturn = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

/** A3: a door leading to a real room that has no door leading back */
export const doorNoReturnVerifier: CampaignVerifier<DoorNoReturn> = {
  name: "Door with no return",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const { toRoom } = door.config;
      if (toRoom === exitGameRoomId || !(toRoom in campaign.rooms)) {
        continue;
      }
      if (doorsBackTo(campaign, roomId, toRoom).length > 0) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ leads to ‘${toRoom}’, which has no door back to ‘${roomId}’`,
        fixable: false,
        fixText: `Add a door from ‘${toRoom}’ back to ‘${roomId}’ by hand`,
        issueData: { roomId, doorId, toRoom },
        verifier: doorNoReturnVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
