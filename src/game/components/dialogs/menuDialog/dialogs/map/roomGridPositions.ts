import { type AllUnionFields } from "type-fest";

import { exitGameRoomId } from "../../../../../../model/json/ItemConfigMap";
import {
  type JsonItem,
  type JsonItemUnion,
} from "../../../../../../model/json/JsonItem";
import { type Campaign } from "../../../../../../model/modelTypes";
import {
  isWholeRoomSubRooms,
  iterateRoomJsonItemsWithIds,
  type RoomJson,
  type SubRooms,
} from "../../../../../../model/RoomJson";
import { objectEntriesIter, valuesIter } from "../../../../../../utils/entries";
import { unitVectors } from "../../../../../../utils/vectors/unitVectors";
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
} from "../../../../../../utils/vectors/vectors";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { type TeleporterLink } from "./teleporterLinks";

type RoomGridPositionsOptions<RoomId extends string> = {
  roomId: RoomId;
  subRoomId?: string;
  campaign: Pick<Campaign<RoomId>, "rooms">;
  visited?: { [roomId in RoomId]?: { [subRoom in string]: true } };
  vectorFromPrevious?: Xyz;
  previousRoomGridPosition?: Xyz;
  /**
   * if given, teleporter links leaving each visited room are pushed onto this
   * array as the room graph is traversed
   */
  teleporterLinksOut?: TeleporterLink<RoomId>[];
};

export type Boundaries = {
  [d in DirectionXy4]: "doorway" | "open" | "wall";
};

export type RoomGridPositionSpec<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  gridPosition: Xyz;
  boundaries: Boundaries;
};

/** the teleporter config with all the union branches' fields flattened to optional */
type FlatTeleporterConfig<RoomId extends string> = AllUnionFields<
  JsonItem<"teleporter", RoomId>["config"]
>;

/** where a teleporter lands: the destination (sub-)room and item, when known */
type TeleporterTargetEndpoint = { subRoomId: string; itemId?: string };

/**
 * which sub-room (and which item) of the target room does this teleporter land
 * on?
 *
 * a json-side, read-only echo of `findTeleporterDestinationPosition` (in
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

/**
 * collect the teleporter links leaving one sub-room of one room.
 *
 * same-room links (no `toRoom`, or `toRoom` equal to this room) are still
 * yielded - they are filtered out at render time, not here.
 */
function* roomTeleporterLinks<RoomId extends string>(
  roomId: RoomId,
  subRoomId: string,
  room: RoomJson<RoomId, string>,
  campaign: Pick<Campaign<RoomId>, "rooms">,
): Generator<TeleporterLink<RoomId>> {
  for (const [sourceItemId, teleporter] of iterateRoomJsonItemsWithIds(
    room.items,
    "teleporter",
    "portableTeleporter",
  )) {
    if (findSubRoomForItem(teleporter.position, "block", room) !== subRoomId) {
      // attribute each teleporter to its own sub-room, so it is only collected
      // once when that sub-room is visited
      continue;
    }

    const config = teleporter.config as FlatTeleporterConfig<RoomId>;

    const targetRoomId = config.toRoom ?? roomId;
    if (targetRoomId === exitGameRoomId) {
      // exits the game - no room on the map to link to
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

    yield {
      from: { roomId, subRoomId, itemId: sourceItemId },
      to: {
        roomId: targetRoomId,
        subRoomId: target.subRoomId,
        itemId: target.itemId,
      },
    };
  }
}

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

export function* roomGridPositions<RoomId extends string>(
  options: RoomGridPositionsOptions<RoomId>,
): Generator<RoomGridPositionSpec<RoomId>> {
  try {
    yield* _roomGridPositions(options);
  } catch (e) {
    const error = e as Error;

    throw new Error(
      `\n  error in recursion ${options.roomId}/${options.subRoomId ?? "*"}`,
      {
        cause: error,
      },
    );
  }
}

/**
 * position all rooms on a 3d cartesian grid
 */
function* _roomGridPositions<RoomId extends string>({
  roomId,
  subRoomId = "*",
  campaign,
  visited = {},
  vectorFromPrevious,
  previousRoomGridPosition = originXyz,
  teleporterLinksOut,
}: RoomGridPositionsOptions<RoomId>): Generator<RoomGridPositionSpec<RoomId>> {
  if (roomId === "nowhere") {
    // nowhere is a special value in the editor that means the door hasn't had
    // anywhere for it to go wired up yet
    return;
  }

  const room = campaign.rooms[roomId];

  if (room === undefined) {
    throw new Error(`no room in the campaign with id="${roomId}"`);
  }

  const subRooms = room.meta?.subRooms;
  const dividedSubRooms =
    subRooms !== undefined && !isWholeRoomSubRooms(subRooms) ?
      subRooms
    : undefined;

  if (dividedSubRooms === undefined) {
    // a plain room, or the whole-room ('*') form: only the whole room exists
    subRoomId = "*";
  } else if (subRoomId === "*" || !(subRoomId in dividedSubRooms)) {
    // a divided room entered without a specific sub-room (eg via a door with no
    // toSubRoom): start from the first sub-room
    [subRoomId] = Object.keys(dividedSubRooms);
  }

  if (visited[roomId]?.[subRoomId]) {
    // already visited this room
    return;
  }

  if (visited[roomId] === undefined) {
    visited[roomId] = {};
  }

  visited[roomId][subRoomId] = true;

  const doors = [
    ...valuesIter(room.items)
      .filter((item) => item.type === "door")
      // DOORS ARE NOT DETECTED AS IN THE SUB_ROOM - use closest instead!!
      .filter(
        (door) =>
          findSubRoomForItem(door.position, "block", room) === subRoomId,
      ),
  ];

  const gridPosition: Xyz = addXyz(
    previousRoomGridPosition,
    vectorFromPrevious === undefined ? originXy : vectorFromPrevious,
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

  yield {
    roomId,
    subRoomId,
    gridPosition,
    boundaries,
  };

  if (teleporterLinksOut !== undefined) {
    for (const link of roomTeleporterLinks(roomId, subRoomId, room, campaign)) {
      teleporterLinksOut.push(link);
    }
  }

  // branch to other sub-rooms:
  if (dividedSubRooms !== undefined) {
    for (const [
      nextSubRoomId,
      { gridPosition: nextSubroomGridPosition },
    ] of objectEntriesIter(dividedSubRooms)) {
      if (nextSubRoomId === subRoomId) {
        continue;
      }
      yield* roomGridPositions({
        roomId,
        subRoomId: nextSubRoomId,
        campaign,
        visited,
        vectorFromPrevious: subXyz(
          { ...nextSubroomGridPosition, z: 0 },
          currentSubRoomGridPosition!,
        ),
        previousRoomGridPosition: gridPosition,
        teleporterLinksOut,
      });
    }
  }

  // branch above:
  const above = currentSubRoom?.above;
  if (above !== undefined) {
    yield* roomGridPositions({
      roomId: above.room,
      subRoomId: above.subRoom,
      campaign,
      visited,
      vectorFromPrevious: unitVectors.up,
      previousRoomGridPosition: gridPosition,
      teleporterLinksOut,
    });
  }

  // branch below:
  const below = currentSubRoom?.below;
  if (below !== undefined) {
    yield* roomGridPositions({
      roomId: below.room,
      subRoomId: below.subRoom,
      campaign,
      visited,
      vectorFromPrevious: unitVectors.down,
      previousRoomGridPosition: gridPosition,
      teleporterLinksOut,
    });
  }

  // branch via doors:
  for (const doorItem of doors) {
    const { toRoom } = doorItem.config;

    if (toRoom === exitGameRoomId) {
      // door out of the game at the end - nothing to traverse into
      continue;
    }
    try {
      yield* roomGridPositions({
        roomId: toRoom,
        campaign,
        visited,
        subRoomId: doorItem.config.meta?.toSubRoom,
        vectorFromPrevious: unitVectors[doorItem.config.direction],
        previousRoomGridPosition: gridPosition,
        teleporterLinksOut,
      });
    } catch (e) {
      throw new Error(
        `error while traversing door ${JSON.stringify(doorItem, null, 2)} in room ${roomId} to room ${toRoom}`,
        {
          cause: e,
        },
      );
    }
  }

  // branch via non-contiguous relationshps (rooms that aren't joined but are
  // mapped together):
  const nonContiguousRelationship = room.meta?.nonContiguousRelationship;
  if (nonContiguousRelationship !== undefined) {
    const {
      with: { room: withRoom, subRoom: withSubRoom },
      gridOffset,
    } = nonContiguousRelationship;
    try {
      yield* roomGridPositions({
        roomId: withRoom,
        subRoomId: withSubRoom,
        campaign,
        visited,
        vectorFromPrevious: gridOffset,
        previousRoomGridPosition: gridPosition,
        teleporterLinksOut,
      });
    } catch (e) {
      throw new Error(
        `Error in non-contiguous relationship ${roomId} to ${withRoom}/${withSubRoom ?? "*"}`,
        { cause: e },
      );
    }
  }
}
