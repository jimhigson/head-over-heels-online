import { produce } from "immer";

import { partnerDoorSubRoomId } from "../../../map/partnerDoorSubRoomId";
import { isWholeRoomSubRooms } from "../../../RoomJson";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import { allDoors, type DoorRef } from "../helpers/doorPartner";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type RedundantToSubRoom = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
};

type RedundancyReason = "inferable" | "undivided";

/** why a door's `toSubRoom` is redundant, or undefined when it isn't */
const redundancyReason = (
  campaign: VerificationCampaign,
  { roomId, door }: DoorRef,
): RedundancyReason | undefined => {
  const { toRoom } = door.config;
  const toSubRoom = door.config.meta?.toSubRoom;
  if (
    toSubRoom === undefined ||
    toRoom === exitGameRoomId ||
    !(toRoom in campaign.rooms)
  ) {
    return undefined;
  }
  const subRooms = campaign.rooms[toRoom].meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    return "undivided";
  }
  return (
      partnerDoorSubRoomId(campaign.rooms, roomId, door, toRoom) === toSubRoom
    ) ?
      "inferable"
    : undefined;
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
        const reason = redundancyReason(campaign, doorRef);
        if (reason === undefined) {
          continue;
        }
        const { roomId, doorId, door } = doorRef;
        const { toRoom } = door.config;
        const toSubRoom = door.config.meta?.toSubRoom;
        yield {
          severity: "warning",
          roomId,
          itemId: doorId,
          msg:
            reason === "undivided" ?
              `Door ‘${doorId}’ in room ‘${roomId}’ sets config.toSubRoom explicitly to ‘${toSubRoom}’, but this is redundant since ‘${toRoom}’ isn't divided into sub-rooms`
            : `Door ‘${doorId}’ in room ‘${roomId}’ sets config.toSubRoom explicitly to ‘${toSubRoom}’, but this is redundant since the map would already find the matching door in ‘${toRoom}’ and notice it is in the same sub-room`,
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
        redundancyReason(campaign, { roomId, doorId, door }) === undefined
      ) {
        throw new Error(
          `cannot auto-fix toSubRoom on door ‘${doorId}’ in ‘${roomId}’: it isn't redundant`,
        );
      }
      return produce(campaign, (draft) => {
        const draftDoor = draft.rooms[roomId].items[doorId];
        if (draftDoor.type === "door" && draftDoor.config.meta !== undefined) {
          delete draftDoor.config.meta.toSubRoom;
          if (Object.keys(draftDoor.config.meta).length === 0) {
            delete draftDoor.config.meta;
          }
        }
      });
    },
  };
