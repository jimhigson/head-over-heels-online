import { addXyz, type Xyz } from "../../../../utils/vectors/vectors";
import { type RoomNode } from "../../../map/roomGridPositions";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type MapGeometryIssue = {
  roomId: VerificationRoomId;
  itemId?: VerificationRoomItemId;
};

const positionKey = (position: Xyz): string =>
  `${position.x},${position.y},${position.z}`;

const cellLabel = (node: RoomNode<string>): string =>
  node.subRoomId === "*" ?
    `‘${node.roomId}’`
  : `‘${node.roomId}’ sub-room ‘${node.subRoomId}’`;

/**
 * Euclidean map-geometry check, over the room graph. Within each subgraph
 * (a connected piece of the layout):
 * - no two cells may share a grid position (an overlap);
 * - every spatial edge (door / above-below / sub-room / NCR) must place its two
 *   ends exactly that one step apart.
 * An edge whose two ends fall in different subgraphs can't be laid out
 * adjacently at all, so it's an error too. Teleporters impose no adjacency and
 * are ignored. Detection only.
 */
export const mapGeometryVerifier: CampaignVerifier<MapGeometryIssue> = {
  name: "Inconsistent map geometry",
  *check(_campaign, graph) {
    // overlaps: cells sharing a grid position within their subgraph
    const byPosition = new Map<string, RoomNode<string>[]>();
    for (const node of graph.nodes) {
      const key = `${node.subgraph}|${positionKey(node.gridPosition)}`;
      const cells = byPosition.get(key) ?? [];
      cells.push(node);
      byPosition.set(key, cells);
    }
    for (const cells of byPosition.values()) {
      if (cells.length < 2) {
        continue;
      }
      const [first] = cells;
      yield {
        severity: "error",
        roomId: first.roomId,
        msg: `${cells.map(cellLabel).join(" and ")} occupy the same position on the map grid`,
        fixable: false,
        fixText: `Give ${cells.map(cellLabel).join(" and ")} distinct map positions`,
        issueData: { roomId: first.roomId },
        verifier: mapGeometryVerifier,
      };
    }

    // consistency: spatial edges must agree with the positions
    for (const {
      from,
      to,
      annotation: edge,
    } of graph.iterateAnnotatedEdges()) {
      if (edge.kind === "teleporter") {
        // teleporters impose no adjacency
        continue;
      }
      const itemId = edge.viaItemId;
      if (from.subgraph !== to.subgraph) {
        yield {
          severity: "error",
          roomId: from.roomId,
          ...(itemId !== undefined ? { itemId } : {}),
          msg: `The ${edge.kind} link from ${cellLabel(from)} to ${cellLabel(to)} can't be placed adjacently - the two rooms end up in different parts of the map`,
          fixable: false,
          fixText: `Connect ${cellLabel(from)} and ${cellLabel(to)} into one consistent map layout`,
          issueData: {
            roomId: from.roomId,
            ...(itemId !== undefined ? { itemId } : {}),
          },
          verifier: mapGeometryVerifier,
        };
        continue;
      }
      if (edge.vector === undefined) {
        continue;
      }
      const expected = addXyz(from.gridPosition, edge.vector);
      if (
        expected.x === to.gridPosition.x &&
        expected.y === to.gridPosition.y &&
        expected.z === to.gridPosition.z
      ) {
        continue;
      }
      yield {
        severity: "error",
        roomId: from.roomId,
        ...(itemId !== undefined ? { itemId } : {}),
        msg: `The ${edge.kind} link from ${cellLabel(from)} to ${cellLabel(to)} doesn't match where they sit on the map grid`,
        fixable: false,
        fixText: `Make ${cellLabel(from)} and ${cellLabel(to)} consistent on the map (their ${edge.kind} link disagrees with their grid positions)`,
        issueData: {
          roomId: from.roomId,
          ...(itemId !== undefined ? { itemId } : {}),
        },
        verifier: mapGeometryVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
