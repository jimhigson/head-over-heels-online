import { subRoomById } from "../../RoomJson";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import { type VerticalDirection, verticalLinks } from "./helpers/verticalLinks";
import { type VerificationRoomId } from "./verificationTypes";

type VerticalLinkBadSubRoom = {
  roomId: VerificationRoomId;
  cellId: string;
  direction: VerticalDirection;
  targetRoom: VerificationRoomId;
  badSubRoom: string;
};

/** B8: a vertical link's `subRoom` names a cell that doesn't exist in the target */
export const verticalLinkBadSubRoomVerifier: CampaignVerifier<VerticalLinkBadSubRoom> =
  {
    name: "Vertical link to missing sub-room",
    *check(campaign) {
      for (const { roomId, cellId, direction, link } of verticalLinks(
        campaign,
      )) {
        if (link.subRoom === undefined || !(link.room in campaign.rooms)) {
          continue;
        }
        if (
          subRoomById(campaign.rooms[link.room], link.subRoom) !== undefined
        ) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          msg: `‘${roomId}’ links ${direction} to sub-room ‘${link.subRoom}’ of ‘${link.room}’, which doesn't exist`,
          fixable: false,
          fixText: `Point the ${direction} link of ‘${roomId}’ at a real sub-room of ‘${link.room}’`,
          issueData: {
            roomId,
            cellId,
            direction,
            targetRoom: link.room,
            badSubRoom: link.subRoom,
          },
          verifier: verticalLinkBadSubRoomVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
