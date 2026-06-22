import { produce } from "immer";

import { type DirectionXy4 } from "../../../../utils/vectors/vectors";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import { allDoors, candidatePartners } from "../helpers/doorPartner";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type RedundantToDoor = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

/** true when the `toDoor` names the one and only door the link would resolve to anyway */
const toDoorIsRedundant = (
  campaign: VerificationCampaign,
  roomId: VerificationRoomId,
  toRoom: VerificationRoomId,
  direction: DirectionXy4,
  toDoor: string,
): boolean => {
  const candidates = candidatePartners(campaign, roomId, toRoom, direction);
  if (candidates.length !== 1) {
    return false;
  }
  const [only] = candidates;
  return only.doorId === toDoor;
};

/** A7: a `toDoor` that the link would resolve to unambiguously without it */
export const redundantToDoorVerifier: CampaignVerifier<RedundantToDoor> = {
  name: "Redundant door toDoor",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const { toRoom, toDoor, direction } = door.config;
      if (
        toDoor === undefined ||
        toRoom === exitGameRoomId ||
        !(toRoom in campaign.rooms)
      ) {
        continue;
      }
      if (!toDoorIsRedundant(campaign, roomId, toRoom, direction, toDoor)) {
        continue;
      }
      yield {
        severity: "warning",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ sets toDoor ‘${toDoor}’, but ‘${toRoom}’ has only one matching door back so it's unnecessary`,
        fixable: true,
        fixText: `Remove the redundant toDoor from door ‘${doorId}’ in ‘${roomId}’`,
        issueData: { roomId, doorId, toRoom },
        verifier: redundantToDoorVerifier,
      };
    }
  },
  fix(campaign, { roomId, doorId, toRoom }) {
    const door = campaign.rooms[roomId].items[doorId];
    if (
      door.type !== "door" ||
      door.config.toDoor === undefined ||
      !toDoorIsRedundant(
        campaign,
        roomId,
        toRoom,
        door.config.direction,
        door.config.toDoor,
      )
    ) {
      throw new Error(
        `cannot auto-fix toDoor on door ‘${doorId}’ in ‘${roomId}’: it isn't redundant`,
      );
    }
    return produce(campaign, (draft) => {
      const draftDoor = draft.rooms[roomId].items[doorId];
      if (draftDoor.type === "door") {
        delete draftDoor.config.toDoor;
      }
    });
  },
};
