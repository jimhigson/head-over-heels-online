import { entries } from "../../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { uncoveredPerimeterEdges } from "../helpers/roomPerimeter";
import { type VerificationRoomId } from "../verificationTypes";

type RoomPerimeterCoverage = {
  roomId: VerificationRoomId;
  gaps: number;
};

/**
 * D: a room whose floor has an outside edge with no wall or door covering it -
 * a gap in the perimeter the player could walk out of. Reported once per room
 * with the number of uncovered edges, since they usually come in runs.
 */
export const roomPerimeterCoverageVerifier: CampaignVerifier<RoomPerimeterCoverage> =
  {
    name: "Gap in room perimeter",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        const uncovered = uncoveredPerimeterEdges(room);
        if (uncovered.length === 0) {
          continue;
        }
        const [{ x, y, direction }] = uncovered;
        yield {
          severity: "warning",
          roomId,
          msg: `‘${roomId}’ has ${uncovered.length} perimeter edge${uncovered.length === 1 ? "" : "s"} with no wall or door (eg the ${direction} edge of square (${x}, ${y}))`,
          fixable: false,
          fixText: `Add walls or doors to close the perimeter of ‘${roomId}’`,
          issueData: { roomId, gaps: uncovered.length },
          verifier: roomPerimeterCoverageVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
