import { produce } from "immer";

import { isWholeRoomSubRooms } from "../../../RoomJson";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import { allDoors } from "../helpers/doorPartner";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type RedundantToSubRoom = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

const destinationUndivided = (
  campaign: VerificationCampaign,
  toRoom: VerificationRoomId,
): boolean => {
  const subRooms = campaign.rooms[toRoom].meta?.subRooms;
  return subRooms === undefined || isWholeRoomSubRooms(subRooms);
};

/** A9: a door `meta.toSubRoom` pointing into a room that isn't divided */
export const redundantToSubRoomVerifier: CampaignVerifier<RedundantToSubRoom> =
  {
    name: "Redundant door toSubRoom",
    *check(campaign) {
      for (const { roomId, doorId, door } of allDoors(campaign)) {
        const { toRoom } = door.config;
        const toSubRoom = door.config.meta?.toSubRoom;
        if (
          toSubRoom === undefined ||
          toRoom === exitGameRoomId ||
          !(toRoom in campaign.rooms)
        ) {
          continue;
        }
        if (!destinationUndivided(campaign, toRoom)) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          itemId: doorId,
          msg: `Door ‘${doorId}’ in ‘${roomId}’ sets toSubRoom ‘${toSubRoom}’, but ‘${toRoom}’ isn't divided into sub-rooms so it has no effect`,
          fixable: true,
          fixText: `Remove the redundant toSubRoom from door ‘${doorId}’ in ‘${roomId}’`,
          issueData: { roomId, doorId, toRoom },
          verifier: redundantToSubRoomVerifier,
        };
      }
    },
    fix(campaign, { roomId, doorId, toRoom }) {
      const door = campaign.rooms[roomId].items[doorId];
      if (
        door.type !== "door" ||
        door.config.meta?.toSubRoom === undefined ||
        !destinationUndivided(campaign, toRoom)
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
