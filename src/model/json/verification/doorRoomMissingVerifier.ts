import { exitGameRoomId } from "../ItemConfigMap";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import { allDoors } from "./helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorRoomMissing = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

/** A1: a door whose `toRoom` isn't `$$final` and isn't a room in the campaign */
export const doorRoomMissingVerifier: CampaignVerifier<DoorRoomMissing> = {
  name: "Door to missing room",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const { toRoom } = door.config;
      if (toRoom === exitGameRoomId || toRoom in campaign.rooms) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ leads to ‘${toRoom}’, which isn't a room in this campaign`,
        fixable: false,
        fixText: `Repoint or delete door ‘${doorId}’ in ‘${roomId}’ — ‘${toRoom}’ doesn't exist`,
        issueData: { roomId, doorId, toRoom },
        verifier: doorRoomMissingVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
