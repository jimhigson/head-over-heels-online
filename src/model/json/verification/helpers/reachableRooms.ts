import { entries } from "../../../../utils/entries";
import { reachableNodes } from "../../../../utils/graph/reachableNodes";
import { type RoomGraph } from "../../../map/roomGridPositions";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import {
  type VerificationCampaign,
  type VerificationRoomId,
} from "../verificationTypes";

/** the rooms a player (head, heels or joined) starts in */
export const startRoomIds = (
  campaign: VerificationCampaign,
): Set<VerificationRoomId> => {
  const starts = new Set<VerificationRoomId>();
  for (const [roomId, room] of entries(campaign.rooms)) {
    if (iterateRoomJsonItemsWithIds(room.items, "player").some(() => true)) {
      starts.add(roomId);
    }
  }
  return starts;
};

/**
 * every room reachable from the start rooms by walking the graph's edges
 * (directed - a one-way door is a dead end). The graph already includes every
 * kind of edge (doors, above/below, sub-rooms, teleporters), so "all edges"
 * reachability falls out of a plain graph walk.
 */
export const reachableRoomIds = (
  graph: RoomGraph<string>,
  starts: ReadonlySet<VerificationRoomId>,
): Set<VerificationRoomId> => {
  const startNodes = [...graph.keys()].filter((node) =>
    starts.has(node.roomId),
  );
  const reached = new Set<VerificationRoomId>();
  for (const node of reachableNodes(graph, startNodes)) {
    reached.add(node.roomId);
  }
  return reached;
};
