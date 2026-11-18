import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { valueMd } from "../helpers/messageMarkdown";
import {
  oppositeVerticalDirection,
  subRoomCells,
  type VerticalDirection,
  verticalLinks,
} from "../helpers/verticalLinks";
import { type VerificationRoomId } from "../verificationTypes";

type VerticalLinkAmbiguousSubRoom = {
  roomId: VerificationRoomId;
  cellId: string;
  direction: VerticalDirection;
  targetRoom: VerificationRoomId;
};

/**
 * a vertical link names no sub-room of a room with several sub-rooms leading
 * back - so which one it arrives in is ambiguous
 */
export const verticalLinkAmbiguousSubRoomVerifier: CampaignVerifier<VerticalLinkAmbiguousSubRoom> =
  {
    name: "Vertical link needs a sub-room",
    *check(campaign) {
      for (const { roomId, cellId, direction, link } of verticalLinks(
        campaign,
      )) {
        if (link.subRoom !== undefined || !(link.room in campaign.rooms)) {
          continue;
        }
        const returningDirection = oppositeVerticalDirection(direction);
        const returningCellCount = subRoomCells(campaign)
          .filter(
            ({ roomId: cellRoomId, cell }) =>
              cellRoomId === link.room &&
              cell[returningDirection]?.room === roomId,
          )
          .reduce((count) => count + 1, 0);
        if (returningCellCount <= 1) {
          continue;
        }
        yield {
          severity: "error",
          itemIds: [],
          roomId,
          msg: `‘${valueMd(roomId)}’ links ${valueMd(direction)} to ‘${valueMd(link.room)}’ without naming a sub-room, but ${returningCellCount} sub-rooms of ‘${valueMd(link.room)}’ link back`,
          fixable: false,
          fixText: `Name which sub-room of ‘${link.room}’ the ${direction} link of ‘${roomId}’ leads to`,
          issueData: { roomId, cellId, direction, targetRoom: link.room },
          verifier: verticalLinkAmbiguousSubRoomVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
