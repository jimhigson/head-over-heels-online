import { roomVerticalLink } from "../../RoomJson";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import {
  oppositeVerticalDirection,
  type VerticalDirection,
  verticalLinks,
} from "./helpers/verticalLinks";
import { type VerificationRoomId } from "./verificationTypes";

type VerticalLinkOneWay = {
  roomId: VerificationRoomId;
  cellId: string;
  direction: VerticalDirection;
  targetRoom: VerificationRoomId;
};

/**
 * B7: a sub-room's above/below link whose target room is missing, or doesn't
 * link back. Detection only - which side to add the reverse link to is a
 * judgement call.
 */
export const verticalLinkOneWayVerifier: CampaignVerifier<VerticalLinkOneWay> =
  {
    name: "One-way vertical link",
    *check(campaign) {
      for (const { roomId, cellId, direction, link } of verticalLinks(
        campaign,
      )) {
        const issueData = { roomId, cellId, direction, targetRoom: link.room };
        const back = oppositeVerticalDirection(direction);
        if (!(link.room in campaign.rooms)) {
          yield {
            severity: "error",
            roomId,
            msg: `‘${roomId}’ links ${direction} to ‘${link.room}’, which isn't a room in this campaign`,
            fixable: false,
            fixText: `Point the ${direction} link of ‘${roomId}’ at a real room`,
            issueData,
            verifier: verticalLinkOneWayVerifier,
          };
          continue;
        }
        const reverse = roomVerticalLink(
          campaign.rooms[link.room],
          back,
          link.subRoom,
        );
        if (reverse !== undefined && reverse.room === roomId) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          msg:
            reverse === undefined ?
              `‘${roomId}’ links ${direction} to ‘${link.room}’, which has no matching ${back} link back`
            : `‘${roomId}’ links ${direction} to ‘${link.room}’, but ‘${link.room}’ links ${back} to ‘${reverse.room}’ instead`,
          fixable: false,
          fixText: `Add a ${back} link from ‘${link.room}’ back to ‘${roomId}’`,
          issueData,
          verifier: verticalLinkOneWayVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
