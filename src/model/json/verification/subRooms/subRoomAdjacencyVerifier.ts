import { entries } from "../../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import {
  dividedCells,
  gridAdjacent,
  physicallyAdjacent,
} from "../helpers/subRoomGeometry";
import { type VerificationRoomId } from "../verificationTypes";

type SubRoomAdjacency = {
  roomId: VerificationRoomId;
  cellIds: [string, string];
};

/**
 * a pair of sub-rooms whose map (grid) adjacency disagrees with their
 * physical adjacency - either they sit next to each other on the map but their
 * floors don't touch, or their floors touch but they're apart on the map. Either
 * way the map won't line up with the rooms, so a warning.
 */
export const subRoomAdjacencyVerifier: CampaignVerifier<SubRoomAdjacency> = {
  name: "Sub-room grid and physical adjacency disagree",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      const cells = dividedCells(room).toArray();
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          const a = cells[i];
          const b = cells[j];
          const byGrid = gridAdjacent(a.cell, b.cell);
          const byPhysical = physicallyAdjacent(a.cell, b.cell);
          if (byGrid === byPhysical) {
            continue;
          }
          yield {
            severity: "warning",
            roomId,
            msg:
              byGrid ?
                `Sub-rooms ‘${a.cellId}’ and ‘${b.cellId}’ of ‘${roomId}’ are next to each other on the map but their floors don't touch`
              : `Sub-rooms ‘${a.cellId}’ and ‘${b.cellId}’ of ‘${roomId}’ touch physically but aren't adjacent on the map`,
            fixable: false,
            fixText: `Line up the gridPosition and physicalPosition of sub-rooms ‘${a.cellId}’ and ‘${b.cellId}’ in ‘${roomId}’`,
            issueData: { roomId, cellIds: [a.cellId, b.cellId] },
            verifier: subRoomAdjacencyVerifier,
          };
        }
      }
    }
  },
  fix() {
    return notAutoFixable();
  },
};
