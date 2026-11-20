import { produce } from "immer";

import {
  dropRedundantToSubRoomInPlace,
  toSubRoomRedundancy,
} from "../../../map/toSubRoomRedundancy";
import type { CampaignVerifier } from "../CampaignVerification";
import { allDoors } from "../helpers/doorPartner";
import { itemIdMd, valueMd } from "../helpers/messageMarkdown";
import type {
  VerificationRoomId,
  VerificationRoomItemId,
} from "../verificationTypes";

type RedundantToSubRoom = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
};

/**
 * A9: a door `meta.toSubRoom` with no effect - its room is undivided, or its
 * partner door's position already implies it
 */
export const redundantToSubRoomVerifier: CampaignVerifier<RedundantToSubRoom> =
  {
    name: "Redundant property on door.config: `toSubRoom`",
    *check(campaign) {
      for (const doorRef of allDoors(campaign)) {
        const { roomId, doorId, door } = doorRef;
        const redundancy = toSubRoomRedundancy(campaign.rooms, roomId, door);
        if (redundancy === undefined) {
          continue;
        }
        const { toRoom } = door.config;
        const { type: reason, toSubRoom } = redundancy;
        yield {
          severity: "warning",
          roomId,
          itemIds: [doorId],
          msg:
            reason === "undivided" ?
              `Door ‘${itemIdMd(doorId)}’ in room ‘${valueMd(roomId)}’ sets config.toSubRoom explicitly to ‘${valueMd(toSubRoom)}’, but this is redundant since ‘${valueMd(toRoom)}’ isn't divided into sub-rooms`
            : `Door ‘${itemIdMd(doorId)}’ in room ‘${valueMd(roomId)}’ sets config.toSubRoom explicitly to ‘${valueMd(toSubRoom)}’, but this is redundant since the map would already find the matching door in ‘${valueMd(toRoom)}’ and notice it is in the same sub-room`,
          fixable: true,
          fixText: `Remove the redundant config.toSubRoom from door ‘${doorId}’ in ‘${roomId}’`,
          issueData: { roomId, doorId },
          verifier: redundantToSubRoomVerifier,
        };
      }
    },
    fix(campaign, { roomId, doorId }) {
      const door = campaign.rooms[roomId].items[doorId];
      if (
        door.type !== "door" ||
        toSubRoomRedundancy(campaign.rooms, roomId, door) === undefined
      ) {
        throw new Error(
          `cannot auto-fix toSubRoom on door ‘${doorId}’ in ‘${roomId}’: it isn't redundant`,
        );
      }
      return produce(campaign, (draft) => {
        const draftDoor = draft.rooms[roomId].items[doorId];
        if (draftDoor.type === "door") {
          dropRedundantToSubRoomInPlace(draft.rooms, roomId, draftDoor);
        }
      });
    },
  };
