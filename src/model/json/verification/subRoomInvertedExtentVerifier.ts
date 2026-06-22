import { entries } from "../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import { cellHasInvertedExtent, dividedCells } from "./helpers/subRoomGeometry";
import { type VerificationRoomId } from "./verificationTypes";

type SubRoomInvertedExtent = {
  roomId: VerificationRoomId;
  cellId: string;
};

/**
 * C11: a sub-room cell whose `physicalPosition` is empty or inverted (`from`
 * is not strictly before `to`), which would make the cell cover no squares.
 */
export const subRoomInvertedExtentVerifier: CampaignVerifier<SubRoomInvertedExtent> =
  {
    name: "Sub-room with empty extent",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        for (const { cellId, cell } of dividedCells(room)) {
          if (!cellHasInvertedExtent(cell)) {
            continue;
          }
          yield {
            severity: "error",
            roomId,
            msg: `Sub-room ‘${cellId}’ of ‘${roomId}’ has an empty or inverted extent (its ‘from’ corner isn't before its ‘to’ corner)`,
            fixable: false,
            fixText: `Fix the physicalPosition of sub-room ‘${cellId}’ in ‘${roomId}’`,
            issueData: { roomId, cellId },
            verifier: subRoomInvertedExtentVerifier,
          };
        }
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
