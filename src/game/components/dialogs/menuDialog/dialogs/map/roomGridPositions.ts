import { objectValues } from "iter-tools";
import type { Campaign } from "../../../../../../model/modelTypes";
import { iterate } from "../../../../../../utils/iterate";
import { unitVectors } from "../../../../../../utils/vectors/unitVectors";
import type {
  DirectionXy4,
  DirectionXyz4,
  Xy,
  Xyz,
} from "../../../../../../utils/vectors/vectors";
import {
  addXyz,
  originXy,
  originXyz,
  subXy,
  xyEqual,
} from "../../../../../../utils/vectors/vectors";
import { entries } from "../../../../../../utils/entries";
import type { JsonItem } from "../../../../../../model/json/JsonItem";
import type { SubRooms } from "../../../../../../model/RoomJson";
import { jsonItemIsInSubRoom } from "./itemIsInSubRoom";

type RoomGridPositionsOptions<RoomId extends string> = {
  roomId: RoomId;
  subRoomId?: string;
  campaign: Campaign<RoomId>;
  visited?: { [roomId in RoomId]?: { [subRoom in string]: true } };
  direction?: DirectionXyz4;
  previousRoomGridPosition?: Xyz;
};

export type Boundaries = {
  [d in DirectionXy4]: "wall" | "open" | "doorway";
};

export type RoomGridPositionSpec<RoomId extends string> = {
  roomId: RoomId;
  subRoomId: string;
  gridPosition: Xyz;
  boundaries: Boundaries;
};

const getBoundary = (
  direction: DirectionXy4,
  doors: Array<JsonItem<"door">>,
  subRooms: SubRooms | undefined,
  currentSubRoomPosition: Xy | undefined,
) => {
  return (
    doors.some((d) => d.config.direction === direction) ? "doorway"
    : subRooms === undefined ? "wall"
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
      `\n  error in recursion ${options.roomId}/${options.subRoomId ?? "*"} ---found--v \n ${error.message}`,
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
  direction,
  previousRoomGridPosition = originXyz,
}: RoomGridPositionsOptions<RoomId>): Generator<RoomGridPositionSpec<RoomId>> {
  if (visited[roomId]?.[subRoomId]) {
    // already visited this room
    return;
  }

  if (visited[roomId] === undefined) {
    visited[roomId] = {};
  }

  visited[roomId][subRoomId] = true;

  const room = campaign.rooms[roomId];

  const doors = [
    ...iterate(objectValues(room.items))
      .filter((item) => item.type === "door")
      .filter((door) => jsonItemIsInSubRoom(door, subRoomId, room)),
  ];

  const gridPosition: Xyz = addXyz(
    previousRoomGridPosition,
    direction === undefined ? originXy : unitVectors[direction],
  );

  const subRooms = room.meta?.subRooms;
  if (subRooms) {
    if (subRoomId === "*") {
      throw new Error(
        `subRoomId '*' means 'all' and is not allowed for big rooms. Must be one of the sub-rooms in ${roomId}: ${Object.keys(subRooms)}`,
      );
    }
    if (!subRooms[subRoomId]) {
      throw new Error(
        `Sub-room ${subRoomId} not found in room ${roomId}. Available sub-rooms: ${Object.keys(subRooms)}`,
      );
    }
  }
  const currentSubRoomGridPosition = subRooms?.[subRoomId].gridPosition;

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

  // branch to other sub-rooms:
  if (subRooms !== undefined) {
    if (currentSubRoomGridPosition === undefined) {
      throw new Error(
        `Sub-room ${subRoomId} not found in room ${roomId}. Available sub-rooms: ${Object.keys(
          subRooms,
        )}`,
      );
    }
    for (const [
      nextSubRoomId,
      { gridPosition: nextSubroomGridPosition },
    ] of iterate(entries(subRooms))) {
      if (nextSubRoomId === subRoomId) {
        continue;
      }
      yield* roomGridPositions({
        roomId,
        subRoomId: nextSubRoomId,
        campaign,
        visited,
        direction: undefined,
        previousRoomGridPosition: addXyz(
          gridPosition,
          subXy(nextSubroomGridPosition, currentSubRoomGridPosition),
        ),
      });
    }
  }

  // branch above:
  if (room.roomAbove !== undefined) {
    const { roomAbove, subRoomAbove } = room;

    yield* roomGridPositions({
      roomId: roomAbove,
      subRoomId: subRoomAbove,
      campaign,
      visited,
      direction: "up",
      previousRoomGridPosition: gridPosition,
    });
  }

  // branch below:
  if (room.roomBelow !== undefined) {
    const { roomBelow, subRoomBelow } = room;
    yield* roomGridPositions({
      roomId: roomBelow,
      subRoomId: subRoomBelow,
      campaign,
      visited,
      direction: "down",
      previousRoomGridPosition: gridPosition,
    });
  }

  // branch via doors:
  for (const doorItem of doors) {
    const { toRoom } = doorItem.config;
    yield* roomGridPositions({
      roomId: toRoom,
      campaign,
      visited,
      subRoomId: doorItem.config.meta?.toSubRoom,
      direction: doorItem.config.direction,
      previousRoomGridPosition: gridPosition,
    });
  }
}
