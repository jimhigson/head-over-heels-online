import { produce } from "immer";

import { defaultRoomHeightBlocks } from "../../defaultRoomHeightBlocks";
import { type CampaignVerifier } from "./CampaignVerification";
import { allDoors } from "./helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorAboveRoomHeight = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  z: number;
  height: number;
};

/**
 * D16: a door positioned at or above the room's height, so it sits in the
 * ceiling - the player can never reach it and the room above loads at the wrong
 * point.
 */
export const doorAboveRoomHeightVerifier: CampaignVerifier<DoorAboveRoomHeight> =
  {
    name: "Door above room height",
    *check(campaign) {
      for (const { roomId, doorId, door } of allDoors(campaign)) {
        const height = campaign.rooms[roomId].height ?? defaultRoomHeightBlocks;
        const { z } = door.position;
        if (z < height) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          itemId: doorId,
          msg: `Door ‘${doorId}’ in ‘${roomId}’ is at height ${z}, at or above the room's height of ${height}`,
          fixable: true,
          fixText: `Raise ‘${roomId}’ to height ${z + 1} so door ‘${doorId}’ sits inside the room`,
          issueData: { roomId, doorId, z, height },
          verifier: doorAboveRoomHeightVerifier,
        };
      }
    },
    fix(campaign, { roomId, doorId }) {
      const door = campaign.rooms[roomId].items[doorId];
      if (door.type !== "door") {
        throw new Error(`‘${doorId}’ in ‘${roomId}’ is not a door`);
      }
      // lift the ceiling just above the door so it is no longer in it - never
      // lower it, in case another door already needs it higher
      const raisedHeight = Math.max(
        campaign.rooms[roomId].height ?? defaultRoomHeightBlocks,
        door.position.z + 1,
      );
      return produce(campaign, (draft) => {
        draft.rooms[roomId].height = raisedHeight;
      });
    },
  };
