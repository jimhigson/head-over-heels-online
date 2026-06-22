import { roomNonContiguousRelationship } from "../../../RoomJson";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { subRoomCells } from "../helpers/verticalLinks";
import { type VerificationRoomId } from "../verificationTypes";

type NonContiguousMirror = {
  roomId: VerificationRoomId;
  cellId: string;
  withRoom: VerificationRoomId;
};

/**
 * a sub-room's `nonContiguousRelationship` that the partner doesn't mirror
 * (no inverse relationship, or a `gridOffset` that isn't negated). Map-layout
 * only, so a warning.
 */
export const nonContiguousMirrorVerifier: CampaignVerifier<NonContiguousMirror> =
  {
    name: "Non-contiguous link not mirrored",
    *check(campaign) {
      for (const { roomId, cellId, cell } of subRoomCells(campaign)) {
        const relationship = cell.nonContiguousRelationship;
        if (relationship === undefined) {
          continue;
        }
        const withRoom = relationship.with.room;
        const issueData = { roomId, cellId, withRoom };
        if (!(withRoom in campaign.rooms)) {
          yield {
            severity: "warning",
            roomId,
            msg: `‘${roomId}’ has a non-contiguous relationship with ‘${withRoom}’, which isn't a room in this campaign`,
            fixable: false,
            fixText: `Point the relationship of ‘${roomId}’ at a real room`,
            issueData,
            verifier: nonContiguousMirrorVerifier,
          };
          continue;
        }
        const partner = roomNonContiguousRelationship(
          campaign.rooms[withRoom],
          relationship.with.subRoom,
        );
        const offset = relationship.gridOffset;
        const mirrored =
          partner !== undefined &&
          partner.with.room === roomId &&
          partner.gridOffset.x === -offset.x &&
          partner.gridOffset.y === -offset.y &&
          partner.gridOffset.z === -offset.z;
        if (mirrored) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          msg: `‘${roomId}’ has a non-contiguous relationship with ‘${withRoom}’ that isn't mirrored back`,
          fixable: false,
          fixText: `Add the mirrored relationship (with the gridOffset negated) on ‘${withRoom}’`,
          issueData,
          verifier: nonContiguousMirrorVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
