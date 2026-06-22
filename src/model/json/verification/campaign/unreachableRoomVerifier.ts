import { entries } from "../../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { reachableRoomIds, startRoomIds } from "../helpers/reachableRooms";
import { type VerificationRoomId } from "../verificationTypes";

type UnreachableRoom = {
  roomId: VerificationRoomId;
};

/**
 * a room that can't be reached from either player's start room by walking
 * through doors, teleporters or above/below links. Stays silent when there's no
 * start room at all (that's G1's job, and every room would otherwise flag).
 */
export const unreachableRoomVerifier: CampaignVerifier<UnreachableRoom> = {
  name: "Unreachable room",
  *check(campaign, graph) {
    const starts = startRoomIds(campaign);
    if (starts.size === 0) {
      return;
    }
    const reached = reachableRoomIds(graph, starts);
    for (const [roomId] of entries(campaign.rooms)) {
      if (reached.has(roomId)) {
        continue;
      }
      yield {
        severity: "warning",
        roomId,
        msg: `‘${roomId}’ can't be reached from either player's starting room`,
        fixable: false,
        fixText: `Connect ‘${roomId}’ to the rest of the campaign with a door, teleporter or above/below link`,
        issueData: { roomId },
        verifier: unreachableRoomVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
