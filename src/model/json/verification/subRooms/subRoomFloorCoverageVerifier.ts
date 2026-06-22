import { entries } from "../../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { floorSquares } from "../helpers/roomPerimeter";
import { cellCoversSquare, dividedCells } from "../helpers/subRoomGeometry";
import { type VerificationRoomId } from "../verificationTypes";

type SubRoomFloorCoverage = {
  roomId: VerificationRoomId;
  uncovered: number;
};

/**
 * in a divided room, floor squares that no sub-room cell's
 * `physicalPosition` covers, so the map shows their items in the wrong place (in
 * game the nearest sub-room is used as a fallback, so it's a warning, not an
 * error). Reported once per room with a count, as the gaps usually come in runs.
 */
export const subRoomFloorCoverageVerifier: CampaignVerifier<SubRoomFloorCoverage> =
  {
    name: "Floor squares outside every sub-room",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        const cells = dividedCells(room).toArray();
        if (cells.length === 0) {
          continue;
        }
        const uncovered: Array<{ x: number; y: number }> = [];
        for (const key of floorSquares(room)) {
          const [x, y] = key.split(",").map(Number);
          if (!cells.some(({ cell }) => cellCoversSquare(cell, x, y))) {
            uncovered.push({ x, y });
          }
        }
        if (uncovered.length === 0) {
          continue;
        }
        const [{ x, y }] = uncovered;
        yield {
          severity: "warning",
          roomId,
          msg: `${uncovered.length} floor square${uncovered.length === 1 ? "" : "s"} of ‘${roomId}’ ${uncovered.length === 1 ? "isn't" : "aren't"} inside any sub-room (eg (${x}, ${y}))`,
          fixable: false,
          fixText: `Extend the sub-rooms of ‘${roomId}’ to cover its whole floor`,
          issueData: { roomId, uncovered: uncovered.length },
          verifier: subRoomFloorCoverageVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
