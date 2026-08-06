import { keys } from "../../../../utils/entries";
import { Graph } from "../../../../utils/graph/Graph";
import {
  type RoomGraph,
  roomGridPositions,
} from "../../../map/roomGridPositions";
import { type VerificationCampaign } from "../verificationTypes";

/**
 * the whole-campaign room graph the verifiers run against: positions for every
 * room (`totalGraph`) plus the typed edges between them. Built once per campaign
 * and handed to every verifier.
 */
export const verificationGraph = (
  campaign: VerificationCampaign,
): RoomGraph<string> => {
  const [seedRoomId] = keys(campaign.rooms);
  if (seedRoomId === undefined) {
    return new Graph(true);
  }
  return roomGridPositions({
    campaign,
    roomId: seedRoomId,
    totalGraph: true,
    skipMissingRooms: true,
  });
};
