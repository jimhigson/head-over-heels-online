import type { PayloadAction } from "@reduxjs/toolkit";

import { current, type SliceCaseReducers } from "@reduxjs/toolkit";

import type { AnyWallJsonConfig } from "../../../model/json/WallJsonConfig";
import type { SceneryName } from "../../../sprites/planets";
import type {
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";

import { getConsolidatableVector } from "../../../consolidateItems/ConsolidatableJsonItem";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import {
  getJsonItemTimes,
  optimiseTimesXyz,
  wallTimes,
} from "../../../model/times";
import { iterate } from "../../../utils/iterate";
import { eachAxis } from "../../../utils/vectors/eachAxis";
import {
  addXyz,
  type AxisXy,
  elementWiseProductXyz,
  lengthXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { addOrRemoveWallTilesInPlace } from "../inPlaceMutators/addOrRemoveWallTilesInPlace";
import { generateHoleInWallsForDoor } from "../inPlaceMutators/cutHoleInWallsForDoorsInPlace";
import { generateWallHealingInPlaceOfDoor } from "../inPlaceMutators/generateWallHealingInPlaceOfDoor";
import {
  selectCurrentRoomFromLevelEditorState,
  selectItemInLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

// Helper type for wall edge information
type WallEdgeInfo = {
  tangentAxis: AxisXy; // The axis along which the wall extends (parallel to the wall)
  normalAxis: AxisXy; // The axis perpendicular to the wall (pointing away from floor)
  edgePosition: number; // The position of the edge the wall is ON
  wallStart: number; // Starting position along the tangent axis
  wallLength: number; // Length along the tangent axis
  isOnFloorEdge: boolean; // Whether the wall is on a floor edge
  wallFullySpansFloor: boolean; // Whether wall spans entire floor edge
  wallTouchesFloorEnd: boolean; // Whether wall touches the end of floor edge
};

// Get standardized information about a wall's position and relationship to floor
function getWallEdgeInfo(
  wall: EditorJsonItem<"wall">,
  floor: EditorJsonItem<"floor">,
): null | WallEdgeInfo {
  const wTimes = wallTimes(wall.config);
  const floorEnd = addXyz(floor.position, floor.config.times);

  switch (wall.config.direction) {
    case "towards":
      // Towards walls are ON y edge, extend along x
      if (
        wall.position.y === floor.position.y &&
        wall.position.x >= floor.position.x &&
        wall.position.x < floorEnd.x
      ) {
        return {
          tangentAxis: "x",
          normalAxis: "y",
          edgePosition: wall.position.y,
          wallStart: wall.position.x,
          wallLength: wTimes.x ?? 1,
          isOnFloorEdge: true,
          wallFullySpansFloor:
            wall.position.x === floor.position.x &&
            wTimes.x === floor.config.times.x,
          wallTouchesFloorEnd: wall.position.x + (wTimes.x ?? 1) === floorEnd.x,
        };
      }
      break;

    case "right":
      // Right walls are ON x edge, extend along y
      if (
        wall.position.x === floor.position.x &&
        wall.position.y >= floor.position.y &&
        wall.position.y < floorEnd.y
      ) {
        return {
          tangentAxis: "y",
          normalAxis: "x",
          edgePosition: wall.position.x,
          wallStart: wall.position.y,
          wallLength: wTimes.y ?? 1,
          isOnFloorEdge: true,
          wallFullySpansFloor:
            wall.position.y === floor.position.y &&
            wTimes.y === floor.config.times.y,
          wallTouchesFloorEnd: wall.position.y + (wTimes.y ?? 1) === floorEnd.y,
        };
      }
      break;

    case "away":
      // Away walls are ON y edge (far side), extend along x
      if (
        wall.position.y === floor.position.y + floor.config.times.y &&
        wall.position.x >= floor.position.x &&
        wall.position.x < floorEnd.x
      ) {
        return {
          tangentAxis: "x",
          normalAxis: "y",
          edgePosition: wall.position.y,
          wallStart: wall.position.x,
          wallLength: wTimes.x ?? 1,
          isOnFloorEdge: true,
          wallFullySpansFloor:
            wall.position.x === floor.position.x &&
            wTimes.x === floor.config.times.x,
          wallTouchesFloorEnd: wall.position.x + (wTimes.x ?? 1) === floorEnd.x,
        };
      }
      break;

    case "left":
      // Left walls are ON x edge (far side), extend along y
      if (
        wall.position.x === floor.position.x + floor.config.times.x &&
        wall.position.y >= floor.position.y &&
        wall.position.y < floorEnd.y
      ) {
        return {
          tangentAxis: "y",
          normalAxis: "x",
          edgePosition: wall.position.x,
          wallStart: wall.position.y,
          wallLength: wTimes.y ?? 1,
          isOnFloorEdge: true,
          wallFullySpansFloor:
            wall.position.y === floor.position.y &&
            wTimes.y === floor.config.times.y,
          wallTouchesFloorEnd: wall.position.y + (wTimes.y ?? 1) === floorEnd.y,
        };
      }
      break;
  }

  return null;
}

function* changeWallsAndDoorsForFloorChangeInPlace(
  items: Iterable<
    [EditorRoomItemId, EditorJsonItem<"door"> | EditorJsonItem<"wall">]
  >,
  floor: EditorJsonItem<"floor">,
  scenery: SceneryName,
  positionDelta: Xyz,
  timesDelta?: Xyz,
): Generator<[EditorRoomItemId, EditorJsonItemUnion | null]> {
  const floorNewPosition = addXyz(floor.position, positionDelta);
  const floorOldTimes = floor.config.times;
  const floorNewTimes =
    timesDelta ? addXyz(floorOldTimes, timesDelta) : floor.config.times;

  // Get the floor boundaries (old and new)
  const floorOldEnd = addXyz(floor.position, floorOldTimes);
  const floorNewEnd = addXyz(floorNewPosition, floorNewTimes);

  for (const [id, item] of iterate(items)) {
    if (item.type === "wall" && item.position.z !== floor.position.z) {
      continue;
    }

    if (item.type === "door") {
      // Doors just move with the floor, they don't resize
      const doorConfig = item.config;

      // Check if door is on a floor edge
      let shouldMove = false;
      let newPosition = { ...current(item.position) };

      switch (doorConfig.direction) {
        case "towards":
          if (
            item.position.y === floor.position.y &&
            item.position.x >= floor.position.x &&
            item.position.x < floor.position.x + floorOldTimes.x
          ) {
            shouldMove = true;
            newPosition = addXyz(item.position, positionDelta);
          }
          break;
        case "right":
          if (
            item.position.x === floor.position.x &&
            item.position.y >= floor.position.y &&
            item.position.y < floor.position.y + floorOldTimes.y
          ) {
            shouldMove = true;
            newPosition = addXyz(item.position, positionDelta);
          }
          break;
        case "away":
          if (
            item.position.y === floor.position.y + floorOldTimes.y &&
            item.position.x >= floor.position.x &&
            item.position.x < floor.position.x + floorOldTimes.x
          ) {
            shouldMove = true;
            newPosition = addXyz(item.position, {
              x: positionDelta.x,
              y: positionDelta.y + (timesDelta?.y ?? 0),
              z: positionDelta.z,
            });
          }
          break;
        case "left":
          if (
            item.position.x === floor.position.x + floorOldTimes.x &&
            item.position.y >= floor.position.y &&
            item.position.y < floor.position.y + floorOldTimes.y
          ) {
            shouldMove = true;
            newPosition = addXyz(item.position, {
              x: positionDelta.x + (timesDelta?.x ?? 0),
              y: positionDelta.y,
              z: positionDelta.z,
            });
          }
          break;
      }

      if (shouldMove) {
        const doorCopy = structuredClone(
          current(item) as EditorJsonItem<"door">,
        );
        doorCopy.position = newPosition;
        yield [id, doorCopy];
      }
      continue;
    }

    // Handle walls
    const wall = item;
    const wallInfo = getWallEdgeInfo(wall, floor);

    if (!wallInfo || !wallInfo.isOnFloorEdge) {
      continue;
    }

    // Cast to AnyWallJsonConfig to handle dynamic property access
    const wallCopy = structuredClone(
      current(wall),
    ) as EditorJsonItem<"wall"> & { config: AnyWallJsonConfig };

    // Calculate new position based on wall direction
    switch (wall.config.direction) {
      case "towards":
      case "right":
        wallCopy.position = addXyz(wall.position, positionDelta);
        break;
      case "away": {
        const newY = floorNewPosition.y + floorNewTimes.y;
        wallCopy.position = {
          ...wall.position,
          x: wall.position.x + positionDelta.x,
          y: newY,
        };
        break;
      }
      case "left": {
        const newX = floorNewPosition.x + floorNewTimes.x;
        wallCopy.position = {
          ...wall.position,
          x: newX,
          y: wall.position.y + positionDelta.y,
        };
        break;
      }
    }

    // Handle wall resizing
    if (wallInfo.wallFullySpansFloor) {
      // Wall fully spans floor, resize to match new floor size
      const newLength = floorNewTimes[wallInfo.tangentAxis];

      if (
        wall.config.direction === "away" ||
        wall.config.direction === "left"
      ) {
        // Away and left walls use tiles
        addOrRemoveWallTilesInPlace(wallCopy.config.tiles!, scenery, newLength);
      } else {
        // Towards and right walls use times
        wallCopy.config.times = { [wallInfo.tangentAxis]: newLength };
      }
      yield [id, wallCopy as EditorJsonItem<"wall">];
    } else {
      // Partial wall - calculate new bounds
      const floorOldStart = floor.position[wallInfo.tangentAxis];
      const floorOldEndCoord = floorOldEnd[wallInfo.tangentAxis];
      const floorNewStart = floorNewPosition[wallInfo.tangentAxis];
      const floorNewEndCoord = floorNewEnd[wallInfo.tangentAxis];

      // Check if wall is completely outside new floor bounds
      const wallNewStart = wallCopy.position[wallInfo.tangentAxis];
      if (wallNewStart >= floorNewEndCoord) {
        yield [id, null];
        continue;
      }

      // Calculate current wall overlap with floor
      const currentWallStart = Math.max(wallInfo.wallStart, floorOldStart);
      const currentWallEnd = Math.min(
        wallInfo.wallStart + wallInfo.wallLength,
        floorOldEndCoord,
      );
      const currentWallLength = currentWallEnd - currentWallStart;

      // Check if the edge the wall is ON is moving
      let edgeIsMoving: boolean;
      if (
        wall.config.direction === "away" ||
        wall.config.direction === "left"
      ) {
        // Far edges - check if the far edge moved
        const oldFarEdge =
          floor.position[wallInfo.normalAxis] +
          floorOldTimes[wallInfo.normalAxis];
        const newFarEdge =
          floorNewPosition[wallInfo.normalAxis] +
          floorNewTimes[wallInfo.normalAxis];
        edgeIsMoving = oldFarEdge !== newFarEdge;
      } else {
        // Near edges - check if the near edge moved
        edgeIsMoving =
          floor.position[wallInfo.normalAxis] !==
          floorNewPosition[wallInfo.normalAxis];
      }

      // Calculate new wall bounds
      const newWallStart = Math.max(wallNewStart, floorNewStart);
      let newWallEnd;

      if (wallInfo.wallTouchesFloorEnd && !edgeIsMoving) {
        // Wall touches floor edge and edge isn't moving - extend to maintain connection
        newWallEnd = floorNewEndCoord;
      } else {
        // Normal case - maintain current length
        newWallEnd = Math.min(
          wallNewStart + currentWallLength,
          floorNewEndCoord,
        );
      }

      const newWallLength = newWallEnd - newWallStart;

      if (newWallLength <= 0) {
        yield [id, null];
      } else {
        // Update wall size based on type
        if (
          wall.config.direction === "away" ||
          wall.config.direction === "left"
        ) {
          // Away and left walls use tiles
          addOrRemoveWallTilesInPlace(
            wallCopy.config.tiles!,
            scenery,
            newWallLength,
          );
        } else {
          // Towards and right walls use times
          wallCopy.config.times = { [wallInfo.tangentAxis]: newWallLength };
        }
        yield [id, wallCopy];
      }
    }
  }
}

function* moveFloorForWallChangeInPlace(
  room: EditorRoomJson,
  wall: EditorJsonItem<"wall">,
  wallPositionDelta: Xyz,
  wallTimesDelta?: Xyz,
): Generator<[EditorRoomItemId, EditorJsonItemUnion | null]> {
  for (const [floorId, floor] of iterateRoomJsonItemsWithIds(
    room.items,
    "floor",
  )) {
    const wallEdgeInfo = getWallEdgeInfo(wall, floor);

    // When a wall moves perpendicular to its edge, the floor should resize so that the edge the wall is moving on
    // Moves, but the opposite edge stays in-place.
    // The opposite edge's coordinate in the axis at a normal to the wall should never change.
    // This is like resizing a rectangle in a vector graphics program - when once edge (wall) is grabbed and moved,
    // the rectangle (floor) resizes while keeping the opposite edge stable in-place.
    // If the wall is being resized along its tangent axis, and the wall touches a corner at the start or the end,
    // the floor should resize in the same way.

    if (!wallEdgeInfo) {
      continue; // Wall is not on this floor's edge
    }

    const floorPositionDelta: Xyz = { x: 0, y: 0, z: 0 };
    const floorTimesDelta: Xyz = { x: 0, y: 0, z: 0 };

    // Calculate how the floor should change based on wall movement
    const wallMovementNormal = wallPositionDelta[wallEdgeInfo.normalAxis];
    const wallMovementTangent = wallPositionDelta[wallEdgeInfo.tangentAxis];
    const wallResizeTangent =
      wallTimesDelta ? wallTimesDelta[wallEdgeInfo.tangentAxis] : 0;

    // Handle movement perpendicular to the wall (normal axis)
    if (wallMovementNormal !== 0) {
      if (
        wall.config.direction === "towards" ||
        wall.config.direction === "right"
      ) {
        // Near edges - floor position changes, size changes inversely
        floorPositionDelta[wallEdgeInfo.normalAxis] = wallMovementNormal;
        floorTimesDelta[wallEdgeInfo.normalAxis] = -wallMovementNormal;
      } else {
        // Far edges (away/left) - only size changes
        floorTimesDelta[wallEdgeInfo.normalAxis] = wallMovementNormal;
      }
    }

    // Handle movement along the wall (tangent axis)
    if (wallMovementTangent !== 0) {
      // Check if wall is at the start of the floor edge
      if (wallEdgeInfo.wallStart === floor.position[wallEdgeInfo.tangentAxis]) {
        // Wall at start - move floor start position, adjust size
        floorPositionDelta[wallEdgeInfo.tangentAxis] = wallMovementTangent;
        floorTimesDelta[wallEdgeInfo.tangentAxis] = -wallMovementTangent;
      } else if (wallEdgeInfo.wallTouchesFloorEnd) {
        // Wall at end - only adjust size
        floorTimesDelta[wallEdgeInfo.tangentAxis] = wallMovementTangent;
      }
    }

    // Handle wall resizing along tangent axis
    if (wallResizeTangent !== 0) {
      if (wallEdgeInfo.wallTouchesFloorEnd) {
        // Wall touches end - extend floor
        floorTimesDelta[wallEdgeInfo.tangentAxis] = wallResizeTangent;
      }
    }

    // Apply floor changes if any
    if (
      floorPositionDelta.x !== 0 ||
      floorPositionDelta.y !== 0 ||
      floorTimesDelta.x !== 0 ||
      floorTimesDelta.y !== 0
    ) {
      // Update the floor preview
      const newFloorTimes = addXyz(floor.config.times, floorTimesDelta);
      const floorCopy = {
        ...floor,
        position: addXyz(floor.position, floorPositionDelta),
        config: {
          ...floor.config,
          times: {
            x: newFloorTimes.x,
            y: newFloorTimes.y,
          },
        },
      } as EditorJsonItem<"floor">;
      yield [floorId, floorCopy];
    }

    yield* changeWallsAndDoorsForFloorChangeInPlace(
      iterateRoomJsonItemsWithIds(room.items, "wall", "door"),
      floor,
      room.planet,
      floorPositionDelta,
      floorTimesDelta,
    );
  }
}

export const moveOrResizeItemPreviewReducers = {
  /** add or remove the room above the current room */
  moveOrResizeItemAsPreview(
    _state,
    {
      payload: { jsonItemIds, timesDelta, positionDelta },
    }: PayloadAction<{
      jsonItemIds: EditorRoomItemId[];
      timesDelta?: Xyz;
      positionDelta: Xyz;
    }>,
  ) {
    const state = _state as LevelEditorState;
    const room = selectCurrentRoomFromLevelEditorState(state);

    for (const jsonItemId of jsonItemIds) {
      // get the json item we will be changing for the preview:
      const jsonItem = selectItemInLevelEditorState(state, jsonItemId);

      if (jsonItem === undefined) {
        throw new Error(
          `no json item found for some of the ids in resize ${jsonItemId}`,
        );
      }

      if (jsonItem.type === "wall") {
        for (const [id, modifiedItem] of moveFloorForWallChangeInPlace(
          room,
          jsonItem,
          positionDelta,
          timesDelta,
        )) {
          // Apply the modified wall item to the preview state
          state.previewedEdits[id] = modifiedItem;
        }
        continue;
      }

      if (jsonItem.type === "floor") {
        for (const [
          id,
          modifiedItem,
        ] of changeWallsAndDoorsForFloorChangeInPlace(
          iterateRoomJsonItemsWithIds(room.items, "wall", "door"),
          jsonItem,
          room.planet,
          positionDelta,
          timesDelta,
        )) {
          // Apply the modified wall item to the preview state
          state.previewedEdits[id] = modifiedItem;
        }
      }

      if (jsonItem.type === "door") {
        console.log("before healing, room items are", current(room.items));

        for (const [nextWallId, healedWall] of generateWallHealingInPlaceOfDoor(
          jsonItem,
          current(room),
        )) {
          console.log("healing", `"${nextWallId}"`, healedWall);
          state.previewedEdits[nextWallId] = healedWall;
        }
      }

      // Always update the item being moved/resized
      const previewedCopy = {
        ...jsonItem,
        position: addXyz(jsonItem.position, positionDelta),
        config: {
          ...jsonItem.config,
        },
      };

      state.previewedEdits[jsonItemId] = previewedCopy as EditorJsonItemUnion;

      addTimesDeltaToJsonItemInPlace(
        previewedCopy as EditorJsonItemWithTimes,
        timesDelta,
      );

      if (jsonItem.type === "door") {
        console.log("before cutting room plus previews is", {
          ...current(room.items),
          ...current(state.previewedEdits),
        });

        for (const [cutItemId, cutItem] of generateHoleInWallsForDoor(
          { ...current(room.items), ...current(state.previewedEdits) },
          (previewedCopy as EditorJsonItem<"door">).config.direction,
          previewedCopy.position,
        )) {
          console.log("cutting", `"${cutItemId}"`, cutItem);
          state.previewedEdits[cutItemId] = cutItem;
        }
      }
    }

    state.dragInProgress = true;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

/**
 * adds to an item's times, taking into account the axes it can be extended in and the minimum
 * size of 1
 */
export const addTimesDeltaToJsonItemInPlace = (
  jsonItem: EditorJsonItemWithTimes,
  timesDelta?: Xyz,
) => {
  if (timesDelta !== undefined) {
    const originalTimes = getJsonItemTimes(jsonItem);

    // we actually only add in the axes this item can be extended in:
    const consolidatableVector = getConsolidatableVector(jsonItem);

    const timesDeltaOnConsolidatableAxes = elementWiseProductXyz(
      timesDelta,
      consolidatableVector,
    );
    if (lengthXyz(timesDeltaOnConsolidatableAxes) > 0) {
      const finalTimes = optimiseTimesXyz(
        eachAxis(
          (original, consolidatableTimesDelta) =>
            // can never go below 1 in any axis:
            Math.max(1, original + consolidatableTimesDelta),
          originalTimes,
          timesDeltaOnConsolidatableAxes,
        ),
      );

      if (finalTimes === undefined) {
        delete jsonItem.config.times;
      } else {
        jsonItem.config.times = finalTimes;
      }
    }
  }
};
