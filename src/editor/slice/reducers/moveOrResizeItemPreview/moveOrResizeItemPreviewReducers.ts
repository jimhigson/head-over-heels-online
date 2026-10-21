import {
  current,
  type PayloadAction,
  type SliceCaseReducers,
} from "@reduxjs/toolkit";

import { getConsolidatableVector } from "../../../../consolidateItems/ConsolidatableJsonItem";
import { generateHoleInWallsForDoor } from "../../../../model/inPlaceMutators/generateHoleInWallsForDoor";
import { isRoomStructureItemType } from "../../../../model/json/isRoomStructureItemType";
import { isDoorBesideFloor } from "../../../../model/json/verification/helpers/isDoorBesideFloor";
import {
  isItemOverFloor,
  needsFloorUnder,
} from "../../../../model/json/verification/helpers/isItemOverFloor";
import {
  doorWidth,
  floorSquares,
} from "../../../../model/json/verification/helpers/roomPerimeter";
import { iterateRoomJsonItemsWithIds } from "../../../../model/RoomJsonItemIterators";
import {
  getJsonItemTimes,
  optimiseTimesXyz,
  wallTimes,
} from "../../../../model/times";
import { entries, keys, valuesIter } from "../../../../utils/entries";
import { eachAxis } from "../../../../utils/vectors/eachAxis";
import {
  addXyz,
  type AxisXy,
  doorAlongAxis,
  elementWiseProductXyz,
  isExactIntegerXyz,
  manhattanLengthXyz,
  tangentAxis,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorJsonItemWithTimes,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomJsonItems,
} from "../../../editorTypes";
import { movesOnlyInWholeBlocks } from "../../../snapGridResolution";
import { commitPendingNudgeInPlace } from "../../inPlaceMutators/commitPendingNudgeInPlace";
import { generateWallHealingInPlaceOfDoor } from "../../inPlaceMutators/generateWallHealingInPlaceOfDoor";
import { itemsWithEdits } from "../../itemsWithEdits";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectItemInLevelEditorState,
} from "../../levelEditorSelectors";
import {
  type LevelEditorState,
  type PendingEdits,
  type PreviewedRoomItemEdits,
} from "../../levelEditorSlice";
import { perimeterGapFillingEdits } from "../../perimeterGapFillingEdits";
import { moveVerb, type UndoItemEntry } from "../undoDescription";
import { wallAndDoorEditsForFloorChange } from "./wallAndDoorEditsForFloorChange";

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

/**
 * a wall dragged along its edge, carrying the floor's end with it: it moves
 * whole, as far as the floor goes
 */
const wallDraggedAlongFloorEnd = (
  wall: EditorJsonItem<"wall">,
  wallPositionDelta: Xyz,
  alongAxis: AxisXy,
  /**
   * where the floor starts along the wall, after the drag
   */
  floorStart: number,
  /**
   * where the floor ends along the wall, after the drag
   */
  floorEnd: number,
): EditorJsonItem<"wall"> => {
  const { tiles } = wall.config;
  const movedStart = wall.position[alongAxis] + wallPositionDelta[alongAxis];
  const start = Math.max(movedStart, floorStart);
  const end = Math.min(movedStart + tiles.length, floorEnd);
  return {
    ...wall,
    position: {
      ...addXyz(wall.position, wallPositionDelta),
      [alongAxis]: start,
    },
    config: {
      ...wall.config,
      tiles: tiles.slice(start - movedStart, end - movedStart),
    },
  };
};

/**
 * the edits that resize the floor a wall is on as the wall moves, keeping the
 * floor's other walls and doors around it - or undefined if that is not a valid edit
 */
const floorEditsForWallChange = (
  room: EditorRoomJson,
  wallId: EditorRoomItemId,
  wall: EditorJsonItem<"wall">,
  wallPositionDelta: Xyz,
  wallTimesDelta?: Xyz,
): PreviewedRoomItemEdits | undefined => {
  const edits: PreviewedRoomItemEdits = {};
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
      edits[floorId] = floorCopy;
    }

    const wallAndDoorEdits = wallAndDoorEditsForFloorChange(
      room,
      floor,
      floorPositionDelta,
      floorTimesDelta,
    );
    if (wallAndDoorEdits === undefined) {
      return undefined;
    }
    Object.assign(edits, wallAndDoorEdits);

    if (
      wallMovementTangent !== 0 &&
      (wallEdgeInfo.wallStart === floor.position[wallEdgeInfo.tangentAxis] ||
        wallEdgeInfo.wallTouchesFloorEnd)
    ) {
      edits[wallId] = wallDraggedAlongFloorEnd(
        wall,
        wallPositionDelta,
        wallEdgeInfo.tangentAxis,
        addXyz(floor.position, floorPositionDelta)[wallEdgeInfo.tangentAxis],
        addXyz(
          floor.position,
          floorPositionDelta,
          floor.config.times,
          floorTimesDelta,
        )[wallEdgeInfo.tangentAxis],
      );
    }
  }
  return edits;
};

/**
 * whether the room, as edited, is still valid where the edit touches it: every
 * door it moves or makes still has floor beside it, no wall it moves or makes
 * lies over a door, and nothing that was over the floor is left hanging off it
 */
const isValidEdit = (
  room: EditorRoomJson,
  edits: PreviewedRoomItemEdits,
  /**
   * the room's items with the edits applied
   */
  editedItems: EditorRoomJsonItems,
  /**
   * whether the edits change any of the room's floors, walls or doors
   */
  editsStructure: boolean,
): boolean => {
  const editedFloorSquares = floorSquares({ items: editedItems });
  const editedDoors = iterateRoomJsonItemsWithIds(editedItems, "door")
    .map(([, door]) => door)
    .toArray();

  const wallIsOverDoor = (wall: EditorJsonItem<"wall">) => {
    const { direction } = wall.config;
    const alongAxis = doorAlongAxis(direction);
    const throughAxis = tangentAxis(direction);
    const wallStart = wall.position[alongAxis];
    const wallEnd = wallStart + wall.config.tiles.length;
    return editedDoors.some(
      (door) =>
        door.config.direction === direction &&
        door.position[throughAxis] === wall.position[throughAxis] &&
        door.position[alongAxis] < wallEnd &&
        door.position[alongAxis] + doorWidth > wallStart,
    );
  };

  const editedItemsAreValid = valuesIter(edits).every(
    (item) =>
      item === null ||
      (item.type === "door" ?
        isDoorBesideFloor(editedFloorSquares, item)
      : item.type !== "wall" || !wallIsOverDoor(item)),
  );

  // changing the room's structure can strand anything in the room, so then
  // every item that was over the floor must still be; otherwise the floor is
  // as it was, and only the edited items can have left it:
  const floorSquaresBefore =
    editsStructure ? floorSquares(room) : editedFloorSquares;
  const itemsToCheck =
    editsStructure ?
      iterateRoomJsonItemsWithIds(editedItems)
    : entries(edits).filter(
        (entry): entry is [EditorRoomItemId, EditorJsonItemUnion] =>
          entry[1] !== null,
      );
  const itemsStayOverFloor = itemsToCheck.every(([id, item]) => {
    const itemBefore = room.items[id];
    return (
      !needsFloorUnder(room, item) ||
      itemBefore === undefined ||
      !isItemOverFloor(floorSquaresBefore, itemBefore) ||
      isItemOverFloor(editedFloorSquares, item)
    );
  });

  return editedItemsAreValid && itemsStayOverFloor;
};

export type MoveOrResizeItems = {
  jsonItemIds: EditorRoomItemId[];
  timesDelta?: Xyz;
  /**
   * the total offset from where the items were, not from any previous preview
   */
  positionDelta: Xyz;
  timestamp: number;
};

/**
 * what moving or resizing items does to the room: the edits it makes, with
 * whatever corrections keep the room valid (walls cut back to floors, doors
 * pushed along with them, gaps in the perimeter closed) - or that the move
 * isn't a valid edit, or does nothing
 */
export type MoveOrResizeOutcome =
  | { type: "invalid" }
  | { type: "unchanged" }
  | {
      type: "valid";
      pendingEdits: Omit<PendingEdits, "origin">;
    };

/**
 * work out what moving or resizing items would do, without doing it - so a
 * drag can try out moves to find one that is valid
 */
export const moveOrResizeOutcome = (
  state: LevelEditorState,
  { jsonItemIds, timesDelta, positionDelta, timestamp }: MoveOrResizeItems,
): MoveOrResizeOutcome => {
  // positionDelta is cumulative (total offset from the original position), so
  // each preview must be recomputed from the base room state, not layered on
  // top of a previous preview's edits (which may have modified surrounding
  // walls, doors, etc.)
  const isResize =
    timesDelta !== undefined && manhattanLengthXyz(timesDelta) > 0;
  const isMove = manhattanLengthXyz(positionDelta) > 0;

  if (!isResize && !isMove) {
    // ie, drag-and-return to the original position - nothing is done:
    return { type: "unchanged" };
  }

  const verb = isResize ? "Resize" : moveVerb(positionDelta);
  const items: UndoItemEntry[] = jsonItemIds.map((id) => {
    const item = selectItemInLevelEditorState(state, id);
    if (item === undefined) {
      throw new Error(
        `no item found for id ${id} when generating undo description`,
      );
    }
    return [id, item];
  });

  const edits: PreviewedRoomItemEdits = {};

  const room = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
  const isIntegerPosDelta = isExactIntegerXyz(positionDelta);

  for (const jsonItemId of jsonItemIds) {
    // get the json item we will be changing for the preview:
    const jsonItem = selectItemInLevelEditorState(state, jsonItemId);

    if (jsonItem === undefined) {
      throw new Error(
        `no json item found for some of the ids in resize ${jsonItemId}`,
      );
    }

    if (movesOnlyInWholeBlocks(jsonItem.type) && !isIntegerPosDelta) {
      continue;
    }

    if (jsonItem.type === "wall") {
      const floorEdits = floorEditsForWallChange(
        room,
        jsonItemId,
        jsonItem,
        positionDelta,
        timesDelta,
      );
      if (floorEdits === undefined) {
        return { type: "invalid" };
      }
      Object.assign(edits, floorEdits);
      continue;
    }

    if (jsonItem.type === "floor") {
      const wallAndDoorEdits = wallAndDoorEditsForFloorChange(
        room,
        jsonItem,
        positionDelta,
        timesDelta,
      );
      if (wallAndDoorEdits === undefined) {
        return { type: "invalid" };
      }
      Object.assign(edits, wallAndDoorEdits);
    }

    if (jsonItem.type === "door") {
      // first, we heal up the wall under the door:
      for (const [
        healedWallItemId,
        healedWallItem,
      ] of generateWallHealingInPlaceOfDoor(jsonItem, room.planet, [
        ...keys(room.items),
        ...keys(edits),
      ])) {
        edits[healedWallItemId] = healedWallItem;
      }
    }

    const previewedCopy = {
      ...jsonItem,
      position: addXyz(jsonItem.position, positionDelta),
      config: {
        ...jsonItem.config,
      },
    };

    edits[jsonItemId] = previewedCopy as EditorJsonItemUnion;

    addTimesDeltaToJsonItemInPlace(
      previewedCopy as EditorJsonItemWithTimes,
      timesDelta,
    );

    if (jsonItem.type === "door") {
      // now, we cut any wall under the door:
      for (const [cutItemId, cutItem] of generateHoleInWallsForDoor(
        { ...room.items, ...edits },
        (previewedCopy as EditorJsonItem<"door">).config.direction,
        previewedCopy.position,
      )) {
        edits[cutItemId] = cutItem;
      }
    }
  }

  const editsStructure = valuesIter(edits).some(
    (item) => item !== null && isRoomStructureItemType(item.type),
  );
  const editedItems = itemsWithEdits(room.items, edits);
  if (editsStructure) {
    // only a change to the room's structure can open a gap in its perimeter:
    const fillingWalls = perimeterGapFillingEdits(room, editedItems);
    Object.assign(edits, fillingWalls);
    Object.assign(editedItems, fillingWalls);
  }

  if (!isValidEdit(room, edits, editedItems, editsStructure)) {
    return { type: "invalid" };
  }

  return {
    type: "valid",
    pendingEdits: {
      edits,
      description: { kind: "itemAction", verb, items },
      timestamp,
    },
  };
};

export const moveOrResizeItemPreviewReducers = {
  /**
   * preview moving or resizing items - or, if that isn't a valid edit, keep
   * the last valid preview
   */
  moveOrResizeItemAsPreview(
    _state,
    { payload }: PayloadAction<MoveOrResizeItems>,
  ) {
    const state = _state as LevelEditorState;
    commitPendingNudgeInPlace(state);
    // worked out on a snapshot of the state rather than on the draft of it:
    const outcome = moveOrResizeOutcome(current(_state), payload);
    switch (outcome.type) {
      case "unchanged":
        state.pendingEdits = undefined;
        return;
      case "invalid":
        return;
      case "valid":
        state.pendingEdits = {
          ...outcome.pendingEdits,
          origin: { type: "drag" },
        };
        return;
      default:
        outcome satisfies never;
    }
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
    if (manhattanLengthXyz(timesDeltaOnConsolidatableAxes) > 0) {
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
