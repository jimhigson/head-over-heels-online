import { type AllUnionFields } from "type-fest";

import { keysIter, objectEntriesIter } from "../../utils/entries";
import { Graph } from "../../utils/graph/Graph";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  type DirectionXy4,
  originXy,
  originXyz,
  subXy,
  subXyz,
  type Xy,
  xyEqual,
  type Xyz,
} from "../../utils/vectors/vectors";
import { exitGameRoomId } from "../json/ItemConfigMap";
import { type JsonItem, type JsonItemUnion } from "../json/JsonItem";
import { type Campaign } from "../modelTypes";
import {
  isWholeRoomSubRooms,
  iterateRoomJsonItemsWithIds,
  type RoomJson,
  type SubRooms,
} from "../RoomJson";
import { findSubRoomForItem } from "./itemIsInSubRoom";

type RoomGridPositionsOptions<RoomId extends string> = {
  /** the room to seed the traversal from */
  roomId: RoomId;
  subRoomId?: string;
  campaign: Pick<Campaign<RoomId>, "rooms">;
  /**
   * when true, after the seed traversal every still-unvisited room is re-seeded
   * (each into its own `subgraph`), so the graph covers the whole campaign. When
   * false (the default, used by the map) only the cells reachable from the seed
   * are included, all in `subgraph: 0`.
   */
  totalGraph?: boolean;
  /**
   * when true, a link to a room that isn't in the campaign is skipped rather than
   * throwing. Used by verification, which deliberately runs over broken campaigns;
   * the map leaves it false so a dangling link surfaces as a map error.
   */
  skipMissingRooms?: boolean;
};

export type Boundaries = {
  [d in DirectionXy4]: "doorway" | "open" | "wall";
};

/** a single positioned cell on the map - a sub-room, or the whole room ("*") */
export type RoomNode<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  gridPosition: Xyz;
  boundaries: Boundaries;
  /** the disjoint subgraph (layout component) this cell belongs to */
  subgraph: number;
};

export type RoomGraphEdgeKind =
  "door" | "ncr" | "subRoom" | "teleporter" | "vertical";

export type RoomEdge = {
  kind: RoomGraphEdgeKind;
  /** the map-grid step from `from` to `to`; absent for teleporters */
  vector?: Xyz;
  /** the door / teleporter item in the `from` room expressing this edge */
  viaItemId?: string;
  /** for teleporters, the item landed on in the `to` room (when known) */
  toItemId?: string;
};

export type RoomGraph<RoomId extends string> = Graph<
  RoomNode<RoomId>,
  RoomEdge
>;

/** the teleporter config with all the union branches' fields flattened to optional */
type FlatTeleporterConfig<RoomId extends string> = AllUnionFields<
  JsonItem<"teleporter", RoomId>["config"]
>;

/** where a teleporter lands: the destination (sub-)room and item, when known */
type TeleporterTargetEndpoint = { subRoomId: string; itemId?: string };

/**
 * which sub-room (and which item) of the target room does this teleporter land
 * on? A json-side, read-only echo of `findTeleporterDestinationPosition` (in
 * changeCharacterRoom.ts): land on the configured position/item, else on the
 * single teleporter in the target room.
 */
const findTargetEndpoint = <RoomId extends string>(
  config: FlatTeleporterConfig<RoomId>,
  targetRoom: RoomJson<RoomId, string>,
): TeleporterTargetEndpoint | undefined => {
  if (config.toPosition !== undefined) {
    return {
      subRoomId: findSubRoomForItem(config.toPosition, "block", targetRoom),
    };
  }

  if (config.toItemId !== undefined) {
    const targetItem = targetRoom.items[config.toItemId];
    return targetItem === undefined ? undefined : (
        {
          subRoomId: findSubRoomForItem(
            targetItem.position,
            "block",
            targetRoom,
          ),
          itemId: config.toItemId,
        }
      );
  }

  // no explicit target: land on the single teleporter in the target room
  let lone: [string, JsonItemUnion<RoomId, string>] | undefined;
  for (const entry of iterateRoomJsonItemsWithIds(
    targetRoom.items,
    "teleporter",
    "portableTeleporter",
  )) {
    if (lone !== undefined) {
      // ambiguous - more than one teleporter and no explicit target
      return undefined;
    }
    lone = entry;
  }
  if (lone === undefined) {
    return undefined;
  }
  const [loneId, loneItem] = lone;
  return {
    subRoomId: findSubRoomForItem(loneItem.position, "block", targetRoom),
    itemId: loneId,
  };
};

const getBoundary = (
  direction: DirectionXy4,
  doors: Array<JsonItem<"door">>,
  subRooms: SubRooms<string> | undefined,
  currentSubRoomPosition: undefined | Xy,
) => {
  return (
    doors.some((d) => d.config.direction === direction) ? "doorway"
    : subRooms === undefined || isWholeRoomSubRooms(subRooms) ? "wall"
    : (
      Object.values(subRooms).some(({ gridPosition }) =>
        xyEqual(
          unitVectors[direction],
          subXy(gridPosition, currentSubRoomPosition!),
        ),
      )
    ) ?
      "open"
    : "wall"
  );
};

const cellKey = (roomId: string, subRoomId: string): string =>
  `${roomId}/${subRoomId}`;

/**
 * the cell a link into `toRoom` lands on, matching the traversal's own choice:
 * the named `toSubRoom` when it is a real cell, otherwise the first cell (or the
 * whole-room `"*"` for an undivided room).
 */
const resolveTargetSubRoomId = <RoomId extends string>(
  campaign: Pick<Campaign<RoomId>, "rooms">,
  toRoom: RoomId,
  toSubRoom: string | undefined,
): string => {
  const room = campaign.rooms[toRoom];
  const subRooms = room?.meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    return "*";
  }
  return toSubRoom !== undefined && toSubRoom in subRooms ?
      toSubRoom
    : Object.keys(subRooms)[0];
};

type BuildState<RoomId extends string> = {
  campaign: Pick<Campaign<RoomId>, "rooms">;
  skipMissingRooms: boolean;
  /** room id → the sub-room ids already positioned in that room */
  visited: Map<string, Set<string>>;
  nodeByKey: Map<string, RoomNode<RoomId>>;
  rawEdges: Array<{ from: string; to: string; edge: RoomEdge }>;
};

/**
 * position one cell and record the relationships leaving it, recursing into the
 * cells it positions (doors / above-below / sub-rooms / NCRs - not teleporters,
 * which don't impose a position). Every relationship is recorded as an edge,
 * even the ones whose target is already placed.
 */
const visit = <RoomId extends string>(
  state: BuildState<RoomId>,
  roomIdIn: RoomId,
  subRoomIdIn: string | undefined,
  vectorFromPrevious: undefined | Xyz,
  previousRoomGridPosition: Xyz,
  subgraph: number,
): void => {
  if (roomIdIn === "nowhere") {
    // nowhere is a special value in the editor that means the door hasn't had
    // anywhere for it to go wired up yet
    return;
  }
  const { campaign } = state;
  const room = campaign.rooms[roomIdIn];
  if (room === undefined) {
    if (state.skipMissingRooms) {
      return;
    }
    throw new Error(`no room in the campaign with id="${roomIdIn}"`);
  }

  const subRooms = room.meta?.subRooms;
  const dividedSubRooms =
    subRooms !== undefined && !isWholeRoomSubRooms(subRooms) ?
      subRooms
    : undefined;

  let subRoomId = subRoomIdIn ?? "*";
  if (dividedSubRooms === undefined) {
    subRoomId = "*";
  } else if (subRoomId === "*" || !(subRoomId in dividedSubRooms)) {
    [subRoomId] = Object.keys(dividedSubRooms);
  }

  const roomVisited = state.visited.get(roomIdIn) ?? new Set<string>();
  if (roomVisited.has(subRoomId)) {
    return;
  }
  roomVisited.add(subRoomId);
  state.visited.set(roomIdIn, roomVisited);

  const doorEntries = iterateRoomJsonItemsWithIds(room.items, "door")
    .filter(
      // DOORS ARE NOT DETECTED AS IN THE SUB_ROOM - use closest instead!!
      ([, door]) =>
        findSubRoomForItem(door.position, "block", room) === subRoomId,
    )
    .toArray();
  const doors = doorEntries.map(([, door]) => door);

  const gridPosition: Xyz = addXyz(
    previousRoomGridPosition,
    vectorFromPrevious ?? originXy,
  );

  const currentSubRoom =
    subRooms === undefined ? undefined
    : isWholeRoomSubRooms(subRooms) ? subRooms["*"]
    : subRooms[subRoomId];

  const currentSubRoomGridPosition =
    dividedSubRooms === undefined ? undefined : (
      dividedSubRooms[subRoomId].gridPosition
    );

  const boundaries: Boundaries = {
    left: getBoundary("left", doors, subRooms, currentSubRoomGridPosition),
    right: getBoundary("right", doors, subRooms, currentSubRoomGridPosition),
    away: getBoundary("away", doors, subRooms, currentSubRoomGridPosition),
    towards: getBoundary(
      "towards",
      doors,
      subRooms,
      currentSubRoomGridPosition,
    ),
  };

  const fromKey = cellKey(roomIdIn, subRoomId);
  state.nodeByKey.set(fromKey, {
    roomId: roomIdIn,
    subRoomId,
    gridPosition,
    boundaries,
    subgraph,
  });

  const record = (to: string, edge: RoomEdge): void => {
    state.rawEdges.push({ from: fromKey, to, edge });
  };

  // other sub-rooms of this room
  if (dividedSubRooms !== undefined) {
    for (const [
      nextSubRoomId,
      { gridPosition: nextSubroomGridPosition },
    ] of objectEntriesIter(dividedSubRooms)) {
      if (nextSubRoomId === subRoomId) {
        continue;
      }
      const vector = subXyz(
        { ...nextSubroomGridPosition, z: 0 },
        currentSubRoomGridPosition!,
      );
      record(cellKey(roomIdIn, nextSubRoomId), { kind: "subRoom", vector });
      visit(state, roomIdIn, nextSubRoomId, vector, gridPosition, subgraph);
    }
  }

  // above / below
  for (const [direction, vector] of [
    ["above", unitVectors.up],
    ["below", unitVectors.down],
  ] as const) {
    const link = currentSubRoom?.[direction];
    if (link === undefined) {
      continue;
    }
    record(
      cellKey(
        link.room,
        resolveTargetSubRoomId(campaign, link.room, link.subRoom),
      ),
      { kind: "vertical", vector },
    );
    visit(state, link.room, link.subRoom, vector, gridPosition, subgraph);
  }

  // doors
  for (const [doorId, doorItem] of doorEntries) {
    const { toRoom } = doorItem.config;
    if (toRoom === exitGameRoomId) {
      continue;
    }
    const vector = unitVectors[doorItem.config.direction];
    record(
      cellKey(
        toRoom,
        resolveTargetSubRoomId(
          campaign,
          toRoom,
          doorItem.config.meta?.toSubRoom,
        ),
      ),
      { kind: "door", vector, viaItemId: doorId },
    );
    try {
      visit(
        state,
        toRoom,
        doorItem.config.meta?.toSubRoom,
        vector,
        gridPosition,
        subgraph,
      );
    } catch (e) {
      throw new Error(
        `error while traversing door ${doorId} in room ${roomIdIn} to room ${toRoom}`,
        { cause: e },
      );
    }
  }

  // non-contiguous relationship
  const ncr = currentSubRoom?.nonContiguousRelationship;
  if (ncr !== undefined) {
    const {
      with: { room: withRoom, subRoom: withSubRoom },
      gridOffset,
    } = ncr;
    record(
      cellKey(
        withRoom,
        resolveTargetSubRoomId(campaign, withRoom, withSubRoom),
      ),
      { kind: "ncr", vector: gridOffset },
    );
    try {
      visit(state, withRoom, withSubRoom, gridOffset, gridPosition, subgraph);
    } catch (e) {
      throw new Error(
        `Error in non-contiguous relationship ${roomIdIn} to ${withRoom}/${withSubRoom ?? "*"}`,
        { cause: e },
      );
    }
  }

  // teleporters - recorded as edges, never traversed for position
  for (const [teleporterId, teleporter] of iterateRoomJsonItemsWithIds(
    room.items,
    "teleporter",
    "portableTeleporter",
  )) {
    if (findSubRoomForItem(teleporter.position, "block", room) !== subRoomId) {
      continue;
    }
    const config = teleporter.config as FlatTeleporterConfig<RoomId>;
    const targetRoomId = config.toRoom ?? roomIdIn;
    if (targetRoomId === exitGameRoomId) {
      continue;
    }
    const targetRoom = campaign.rooms[targetRoomId];
    if (targetRoom === undefined) {
      continue;
    }
    const target = findTargetEndpoint(config, targetRoom);
    if (target === undefined) {
      continue;
    }
    record(cellKey(targetRoomId, target.subRoomId), {
      kind: "teleporter",
      viaItemId: teleporterId,
      toItemId: target.itemId,
    });
  }
};

/**
 * position the rooms on a 3d cartesian grid and return the graph of cells and
 * the typed relationships between them.
 */
export const roomGridPositions = <RoomId extends string>(
  options: RoomGridPositionsOptions<RoomId>,
): RoomGraph<RoomId> => {
  const {
    roomId,
    subRoomId,
    campaign,
    totalGraph = false,
    skipMissingRooms = false,
  } = options;
  const state: BuildState<RoomId> = {
    campaign,
    skipMissingRooms,
    visited: new Map(),
    nodeByKey: new Map(),
    rawEdges: [],
  };

  visit(state, roomId, subRoomId, undefined, originXyz, 0);

  if (totalGraph) {
    let subgraph = 0;
    for (const seedRoomId of keysIter(campaign.rooms)) {
      if (state.visited.has(seedRoomId)) {
        continue;
      }
      subgraph++;
      visit(state, seedRoomId, undefined, undefined, originXyz, subgraph);
    }
  }

  // every recorded relationship becomes its own edge: two cells can be joined
  // in more than one way (say by a door and a teleporter), and each such link
  // is separately drawable and separately checkable
  const graph: RoomGraph<RoomId> = new Graph(true);
  graph.beginRebuild(state.nodeByKey.values());
  for (const { from, to, edge } of state.rawEdges) {
    const fromNode = state.nodeByKey.get(from);
    const toNode = state.nodeByKey.get(to);
    if (fromNode !== undefined && toNode !== undefined) {
      graph.addAnnotatedEdge(fromNode, toNode, edge);
    }
  }
  graph.finalise();
  return graph;
};
