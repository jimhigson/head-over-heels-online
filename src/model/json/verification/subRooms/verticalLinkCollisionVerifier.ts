import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import {
  type VerticalDirection,
  verticalLinks,
} from "../helpers/verticalLinks";
import { type VerificationRoomId } from "../verificationTypes";

type VerticalLinkCollision = {
  roomId: VerificationRoomId;
  direction: VerticalDirection;
  targetRoom: VerificationRoomId;
  cellIds: string[];
};

/** B9: two or more sub-rooms of a room link to the same place above/below */
export const verticalLinkCollisionVerifier: CampaignVerifier<VerticalLinkCollision> =
  {
    name: "Sub-rooms share a vertical target",
    *check(campaign) {
      const groups = new Map<string, VerticalLinkCollision>();
      for (const { roomId, cellId, direction, link } of verticalLinks(
        campaign,
      )) {
        const key = `${roomId}|${direction}|${link.room}|${link.subRoom ?? ""}`;
        const group = groups.get(key) ?? {
          roomId,
          direction,
          targetRoom: link.room,
          cellIds: [],
        };
        group.cellIds.push(cellId);
        groups.set(key, group);
      }
      for (const group of groups.values()) {
        if (group.cellIds.length < 2) {
          continue;
        }
        yield {
          severity: "error",
          roomId: group.roomId,
          msg: `Sub-rooms ${group.cellIds.map((cellId) => `‘${cellId}’`).join(", ")} of ‘${group.roomId}’ all link ${group.direction} to the same place in ‘${group.targetRoom}’`,
          fixable: false,
          fixText: `Give each sub-room of ‘${group.roomId}’ a distinct ${group.direction} target`,
          issueData: {
            roomId: group.roomId,
            direction: group.direction,
            targetRoom: group.targetRoom,
            cellIds: group.cellIds,
          },
          verifier: verticalLinkCollisionVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
