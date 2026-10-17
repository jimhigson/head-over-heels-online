import { produce } from "immer";

import { addReturnDoorInPlace } from "../../../inPlaceMutators/addReturnDoorInPlace";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
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

/**
 * A3: a door leading to a real room that has no door leading back. Fixed by
 * adding a door back, on the facing wall
 */
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
        fixable: true,
        fixText: `Add a door in ‘${toRoom}’ back to ‘${roomId}’`,
        issueData: { roomId, doorId, toRoom },
        verifier: doorNoReturnVerifier,
      };
    }
  },
  fix(campaign, { roomId, doorId, toRoom }) {
    return produce(campaign, (draft) => {
      const draftDoor = draft.rooms[roomId].items[doorId];
      if (draftDoor.type !== "door") {
        throw new Error(
          `cannot auto-fix: ‘${doorId}’ in ‘${roomId}’ is not a door`,
        );
      }
      addReturnDoorInPlace({
        rooms: draft.rooms,
        fromRoomJson: draft.rooms[roomId],
        toRoomJson: draft.rooms[toRoom],
        outgoingDoorEntry: [doorId, draftDoor],
      });
    });
  },
};
