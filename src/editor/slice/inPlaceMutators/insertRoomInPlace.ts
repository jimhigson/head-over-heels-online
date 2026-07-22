import { nextItemId } from "../../../model/inPlaceMutators/nextItemId";
import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { typePrefix } from "../../../model/json/typePrefix";
import { findSubRoomForItem } from "../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../model/map/roomGridPositions";
import {
  iterateRoomJsonItemsWithIds,
  subRoomById,
} from "../../../model/RoomJson";
import { keys, valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  oppositeDirection,
  type Xy,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import {
  selectCurrentRoomJsonFromLevelEditorState,
  selectCursorSubRoomId,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  roomFloorMaxX,
  roomFloorMaxY,
  roomFloorMinX,
  roomFloorMinY,
} from "../roomJsonSelectors";
import { addReturnDoorInPlace } from "./addDoorInPlace";
import { addNewRoomInPlace } from "./addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "./changeCurrentRoomInPlace";
import { cutHoleInWallsForDoorsInPlace } from "./cutHoleInWallsForDoorsInPlace";

type FloorBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const getRoomFloorBounds = (room: EditorRoomJson): FloorBounds => ({
  minX: roomFloorMinX(room),
  maxX: roomFloorMaxX(room),
  minY: roomFloorMinY(room),
  maxY: roomFloorMaxY(room),
});

const getSubRoomFloorBounds = (
  room: EditorRoomJson,
  subRoomId: string,
): FloorBounds => {
  const roomBounds = getRoomFloorBounds(room);

  if (subRoomId !== "*") {
    const subRoom = subRoomById(room, subRoomId);
    if (subRoom) {
      return {
        minX: Math.max(subRoom.physicalPosition.from.x, roomBounds.minX),
        maxX: Math.min(subRoom.physicalPosition.to.x, roomBounds.maxX),
        minY: Math.max(subRoom.physicalPosition.from.y, roomBounds.minY),
        maxY: Math.min(subRoom.physicalPosition.to.y, roomBounds.maxY),
      };
    }
  }

  return roomBounds;
};

const doorPositionOnWall = (
  bounds: FloorBounds,
  doorDirection: DirectionXy4,
  matchPosition: Xyz,
): Xyz => ({
  x:
    doorDirection === "left" ? bounds.maxX
    : doorDirection === "right" ? bounds.minX
    : matchPosition.x,
  y:
    doorDirection === "away" ? bounds.maxY
    : doorDirection === "towards" ? bounds.minY
    : matchPosition.y,
  z: matchPosition.z,
});

const doorWidth = 2;

const wallCentreMidpoint = (bounds: FloorBounds): Xyz => ({
  x: Math.floor((bounds.minX + bounds.maxX - doorWidth) / 2),
  y: Math.floor((bounds.minY + bounds.maxY - doorWidth) / 2),
  z: 0,
});

export const insertRoomInPlace = (
  state: LevelEditorState,
  direction: DirectionXy4,
  roomSize?: Xy,
): void => {
  const currentRoom = selectCurrentRoomJsonFromLevelEditorState(state);
  const oppositeDir = oppositeDirection(direction);

  const subRoomId = selectCursorSubRoomId(state);
  const currentSubRoomBounds = getSubRoomFloorBounds(currentRoom, subRoomId);

  const currentRoomDoorsInDirection = iterateRoomJsonItemsWithIds(
    currentRoom.items,
    "door",
  )
    .filter(([, door]) => door.config.direction === direction)
    .filter(
      ([, door]) =>
        findSubRoomForItem(door.position, "block", currentRoom) === subRoomId,
    )
    .toArray();

  const inboundDoorsFromOppositeDirection: Array<{
    doorId: EditorRoomItemId;
    door: EditorJsonItem<"door">;
    room: EditorRoomJson;
  }> = [];

  for (const room of valuesIter(state.campaignInProgress.rooms)) {
    if (room.id === currentRoom.id) {
      continue;
    }
    for (const [doorId, door] of iterateRoomJsonItemsWithIds(
      room.items,
      "door",
    )) {
      if (
        door.config.toRoom === currentRoom.id &&
        door.config.direction === oppositeDir &&
        (door.config.meta?.toSubRoom ?? "*") === subRoomId
      ) {
        inboundDoorsFromOppositeDirection.push({
          doorId: doorId as EditorRoomItemId,
          door: door as EditorJsonItem<"door">,
          room: room as EditorRoomJson,
        });
      }
    }
  }

  const gridPositions = [
    ...roomGridPositions({
      campaign: state.campaignInProgress,
      roomId: currentRoom.id,
      subRoomId: selectCursorSubRoomId(state),
    }).keys(),
  ];
  const targetSpec = gridPositions.find(({ gridPosition }) =>
    xyzEqual(gridPosition, unitVectors[direction]),
  );
  const existingRoomAtTarget =
    targetSpec ?
      (state.campaignInProgress.rooms[targetSpec.roomId] as
        EditorRoomJson | undefined)
    : undefined;

  const hasDoors =
    currentRoomDoorsInDirection.length > 0 ||
    inboundDoorsFromOppositeDirection.length > 0;

  if (existingRoomAtTarget) {
    if (existingRoomAtTarget.id === currentRoom.id) {
      return;
    }

    if (hasDoors) {
      const targetSubtree = new Set<string>([existingRoomAtTarget.id]);
      const queue: string[] = [];
      let formsACycle = false;

      const enqueueNeighbours = (
        room: EditorRoomJson,
        skipIntercepted: boolean,
      ) => {
        for (const item of valuesIter(room.items)) {
          if (item.type !== "door") {
            continue;
          }
          if (
            skipIntercepted &&
            item.config.toRoom === currentRoom.id &&
            item.config.direction === oppositeDir
          ) {
            continue;
          }
          const nextId = item.config.toRoom as EditorRoomId;
          if (nextId === currentRoom.id) {
            formsACycle = true;
            return;
          }
          if (
            !targetSubtree.has(nextId) &&
            state.campaignInProgress.rooms[nextId]
          ) {
            targetSubtree.add(nextId);
            queue.push(nextId);
          }
        }
      };

      enqueueNeighbours(existingRoomAtTarget, true);

      while (!formsACycle && queue.length > 0) {
        const id = queue.shift()!;
        const room = state.campaignInProgress.rooms[id as EditorRoomId];
        if (room) {
          enqueueNeighbours(room as EditorRoomJson, false);
        }
      }

      if (formsACycle) {
        return;
      }

      const dirVec = unitVectors[direction];
      const wouldCollide = gridPositions.some(
        (spec) =>
          targetSubtree.has(spec.roomId) &&
          gridPositions.some(
            (other) =>
              !targetSubtree.has(other.roomId) &&
              other.gridPosition.x === spec.gridPosition.x + dirVec.x &&
              other.gridPosition.y === spec.gridPosition.y + dirVec.y &&
              other.gridPosition.z === spec.gridPosition.z + dirVec.z,
          ),
      );

      if (wouldCollide) {
        return;
      }
    }

    if (!hasDoors) {
      const centrePosition = doorPositionOnWall(
        currentSubRoomBounds,
        direction,
        wallCentreMidpoint(currentSubRoomBounds),
      );

      const outDoorId = nextItemId(
        keys(currentRoom.items),
        typePrefix.door,
      ) as EditorRoomItemId;
      const targetSubRoomId = targetSpec!.subRoomId;
      const outDoor: EditorJsonItem<"door"> = {
        type: "door",
        config: {
          toRoom: existingRoomAtTarget.id,
          direction,
          meta:
            targetSubRoomId === "*" ? undefined : (
              { toSubRoom: targetSubRoomId }
            ),
        },
        position: centrePosition,
      };
      currentRoom.items[outDoorId] = outDoor;

      cutHoleInWallsForDoorsInPlace(
        state,
        currentRoom.id,
        direction,
        centrePosition,
        false,
      );

      addReturnDoorInPlace({
        state,
        fromRoomJson: currentRoom,
        toRoomJson: existingRoomAtTarget,
        outgoingDoorEntry: [outDoorId, outDoor],
        outgoingDoorRelativeTo: {
          x: currentSubRoomBounds.minX,
          y: currentSubRoomBounds.minY,
        },
      });

      changeCurrentRoomInPlace(state, existingRoomAtTarget.id as EditorRoomId);
      return;
    }
  }

  const newRoom = addNewRoomInPlace({
    state,
    scenery: currentRoom.planet,
    roomSize,
  });

  if (hasDoors) {
    for (const [outDoorId, outDoor] of currentRoomDoorsInDirection) {
      const oldToRoom = outDoor.config.toRoom;

      addReturnDoorInPlace({
        state,
        fromRoomJson: currentRoom,
        toRoomJson: newRoom,
        outgoingDoorEntry: [
          outDoorId as EditorRoomItemId,
          outDoor as EditorJsonItem<"door">,
        ],
        outgoingDoorRelativeTo: {
          x: currentSubRoomBounds.minX,
          y: currentSubRoomBounds.minY,
        },
      });

      outDoor.config.toRoom = newRoom.id;
      delete outDoor.config.meta;

      if (
        oldToRoom === exitGameRoomId ||
        !state.campaignInProgress.rooms[oldToRoom as EditorRoomId]
      ) {
        const fwdDoorId = nextItemId(keys(newRoom.items), typePrefix.door);
        const fwdDoorPosition = doorPositionOnWall(
          getRoomFloorBounds(newRoom),
          direction,
          outDoor.position,
        );

        const fwdDoor: EditorJsonItem<"door"> = {
          type: "door",
          config: {
            toRoom: oldToRoom,
            direction,
          },
          position: fwdDoorPosition,
        };
        newRoom.items[fwdDoorId] = fwdDoor;

        cutHoleInWallsForDoorsInPlace(
          state,
          newRoom.id,
          direction,
          fwdDoorPosition,
          false,
        );
      }
    }

    for (const {
      doorId: inDoorId,
      door: inDoor,
      room: inRoom,
    } of inboundDoorsFromOppositeDirection) {
      addReturnDoorInPlace({
        state,
        fromRoomJson: inRoom,
        toRoomJson: newRoom,
        outgoingDoorEntry: [inDoorId, inDoor],
      });

      inDoor.config.toRoom = newRoom.id;
      delete inDoor.config.meta;
    }
  } else {
    const centrePosition = doorPositionOnWall(
      currentSubRoomBounds,
      direction,
      wallCentreMidpoint(currentSubRoomBounds),
    );

    const outDoorId = nextItemId(
      keys(currentRoom.items),
      typePrefix.door,
    ) as EditorRoomItemId;
    const outDoor: EditorJsonItem<"door"> = {
      type: "door",
      config: { toRoom: newRoom.id, direction },
      position: centrePosition,
    };
    currentRoom.items[outDoorId] = outDoor;

    cutHoleInWallsForDoorsInPlace(
      state,
      currentRoom.id,
      direction,
      centrePosition,
      false,
    );

    addReturnDoorInPlace({
      state,
      fromRoomJson: currentRoom,
      toRoomJson: newRoom,
      outgoingDoorEntry: [outDoorId, outDoor],
      outgoingDoorRelativeTo: {
        x: currentSubRoomBounds.minX,
        y: currentSubRoomBounds.minY,
      },
    });
  }

  changeCurrentRoomInPlace(state, newRoom.id);
};
