import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import type { OverridePropertiesDeep } from "type-fest";

import { addReturnDoorInPlace } from "../../../model/inPlaceMutators/addReturnDoorInPlace";
import { changeRoomSceneryInPlace } from "../../../model/inPlaceMutators/changeRoomSceneryInPlace";
import { nextItemIdInItems } from "../../../model/inPlaceMutators/nextItemId";
import { doorLinkNeedsToDoor } from "../../../model/json/candidatePartnerDoors";
import {
  exitGameRoomId,
  type FloorType,
} from "../../../model/json/ItemConfigMap";
import type { JsonItemConfig } from "../../../model/json/JsonItem";
import { subRoomsIntersectingJsonItem } from "../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../model/map/roomGridPositions";
import {
  isWholeRoomSubRooms,
  roomNonContiguousRelationship,
  roomVerticalLink,
  subRoomById,
  writeRoomNonContiguousRelationship,
} from "../../../model/RoomJson";
import {
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJsonItemIterators";
import {
  completeTimesXy,
  completeTimesXyz,
  optimiseTimesXyz,
} from "../../../model/times";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import { keysIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXy,
  oppositeDirection,
  originXy,
  scaleXyz,
  subXy,
  type Xy,
  xyEqual,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { changeRoomIdInPlace } from "../inPlaceMutators/changeRoomIdInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { deleteItemInPlace } from "../inPlaceMutators/deleteItemInPlace";
import { setSelectionOnCursorRoomInPlace } from "../inPlaceMutators/setSelectionOnCursorRoomInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
  selectCursorRoomSelectionFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
  selectCursorSubRoomIdFromLevelEditorState,
  selectRoomFromLevelEditorState,
} from "../levelEditorSelectors";
import type { LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import {
  describeRoomJsonEdit,
  type UndoDescription,
  type UndoItemEntry,
} from "./undoDescription";
import {
  pushUndoForRoomInPlace,
  pushUndoToCursorRoomInPlace,
} from "./undoReducers";

export type SetRoomAboveOrBelowPayload =
  | {
      direction: "above" | "below";
      /** to break the link */
      roomId: undefined;
      createNew: false;
    }
  | {
      direction: "above" | "below";
      createNew: true;
    }
  | {
      direction: "above" | "below";
      roomId: EditorRoomId;
      createNew: false;
    };

const changeFloorTypeInPlace = (
  roomJson: EditorRoomJson,
  floorType: FloorType,
) => {
  roomJsonItemsIterable(roomJson)
    .filter((item) => item.type === "floor")
    .filter((item) => item.position.z === 0)
    .forEach((floor) => {
      floor.config = {
        ...floor.config,
        floorType,
        ...{ scenery: floorType === "standable" ? roomJson.planet : undefined },
      } as JsonItemConfig<"floor", EditorRoomId, EditorRoomItemId>;
    });
};

type VerticalLinkDirection = "above" | "below";
type VerticalLinkTarget = { room: EditorRoomId; subRoom?: string };

/** the sub-room id under which an undivided room holds its links (`'*'`), or the
 * first cell of a divided room */
const primarySubRoomId = (room: EditorRoomJson): string => {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    return "*";
  }
  const [first] = Object.keys(subRooms);
  return first;
};

/**
 * a vertical link to a room, naming the sub-room it attaches to only when
 * that isn't the whole room
 */
const verticalLinkTarget = (
  roomId: EditorRoomId,
  subRoomId: string | undefined,
): VerticalLinkTarget => ({
  room: roomId,
  ...(subRoomId !== undefined && subRoomId !== "*" && { subRoom: subRoomId }),
});

const writeVerticalLink = (
  room: EditorRoomJson,
  subRoomId: string,
  direction: VerticalLinkDirection,
  target: undefined | VerticalLinkTarget,
): void => {
  room.meta ??= {};
  if (room.meta.subRooms === undefined) {
    room.meta.subRooms = { "*": {} };
  }
  const { subRooms } = room.meta;
  const holder =
    isWholeRoomSubRooms(subRooms) ? subRooms["*"] : subRooms[subRoomId];
  if (holder === undefined) {
    return;
  }
  if (target === undefined) {
    delete holder[direction];
  } else {
    holder[direction] = target;
  }
};

/**
 * the room (and its sub-room) occupying the map cell directly above/below the
 * given sub-room, if any - used to connect to an existing room rather than
 * create a duplicate one overlapping it
 */
const roomAtVerticalNeighbour = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId: string,
  direction: VerticalLinkDirection,
): { roomId: EditorRoomId; subRoomId: string } | undefined => {
  const neighbourVector =
    direction === "above" ? unitVectors.up : unitVectors.down;
  const targetSpec = roomGridPositions({
    campaign: state.campaignInProgress,
    roomId,
    subRoomId,
    skipMissingRooms: true,
  }).nodes.find(({ gridPosition }) => xyzEqual(gridPosition, neighbourVector));

  if (
    targetSpec === undefined ||
    targetSpec.roomId === roomId ||
    targetSpec.roomId === exitGameRoomId
  ) {
    return undefined;
  }
  return { roomId: targetSpec.roomId, subRoomId: targetSpec.subRoomId };
};

/**
 * the size of hole cut by `makeHoleInSelectedFloor`, in blocks
 */
const holeSize: Xy = { x: 2, y: 2 };

/**
 * a floor can have a hole made in it if the hole fits strictly inside it
 */
export const canMakeHoleInFloor = (floor: EditorJsonItem<"floor">) => {
  const timesCompleted = completeTimesXy(floor.config.times);
  return (
    floor.config.floorType !== "none" &&
    timesCompleted.x > holeSize.x &&
    timesCompleted.y > holeSize.y
  );
};

/**
 * the floors that replace `floor` once a hole is cut in its centre: a
 * `none` floor for the hole, and up to four surrounding it
 */
const floorsAroundHole = (
  floor: EditorJsonItem<"floor">,
): {
  hole: EditorJsonItem<"floor">;
  surrounding: EditorJsonItem<"floor">[];
} => {
  const {
    position,
    config: { times, ...configWithoutTimes },
  } = floor;
  const timesCompleted = completeTimesXy(times);
  // rounded down for floors of odd size:
  const holeFrom: Xy = {
    x: Math.floor((timesCompleted.x - holeSize.x) / 2),
    y: Math.floor((timesCompleted.y - holeSize.y) / 2),
  };
  const holeTo = addXy(holeFrom, holeSize);

  const floorPart = (from: Xy, partTimes: Xy): EditorJsonItem<"floor"> => {
    const optimisedPartTimes = optimiseTimesXyz(completeTimesXyz(partTimes));
    return {
      ...floor,
      position: { ...position, x: position.x + from.x, y: position.y + from.y },
      config: {
        ...configWithoutTimes,
        ...(optimisedPartTimes !== undefined && { times: optimisedPartTimes }),
      },
    };
  };

  const surrounding = [
    // in front of the hole, the floor's full width:
    floorPart({ x: 0, y: 0 }, { x: timesCompleted.x, y: holeFrom.y }),
    // behind the hole, the floor's full width:
    floorPart(
      { x: 0, y: holeTo.y },
      { x: timesCompleted.x, y: timesCompleted.y - holeTo.y },
    ),
    // either side of the hole:
    floorPart({ x: 0, y: holeFrom.y }, { x: holeFrom.x, y: holeSize.y }),
    floorPart(
      { x: holeTo.x, y: holeFrom.y },
      { x: timesCompleted.x - holeTo.x, y: holeSize.y },
    ),
  ].filter(({ config }) => {
    const partTimesCompleted = completeTimesXy(config.times);
    return partTimesCompleted.x > 0 && partTimesCompleted.y > 0;
  });

  return {
    hole: {
      ...floorPart(holeFrom, holeSize),
      config: { floorType: "none", times: holeSize },
    },
    surrounding,
  };
};

/**
 * the size of each map cell of `room`, and the cells it covers - from which
 * a new room of the same size and shape can be made
 */
const roomShape = (
  room: EditorRoomJson,
): { cellSize: Xy; gridPositions: Xy[]; gridOrigin: Xy } => {
  const subRooms = room.meta?.subRooms;
  if (subRooms !== undefined && !isWholeRoomSubRooms(subRooms)) {
    const subRoomsList = Object.values(subRooms);
    const [{ physicalPosition }] = subRoomsList;
    const gridOrigin: Xy = {
      x: Math.min(...subRoomsList.map(({ gridPosition }) => gridPosition.x)),
      y: Math.min(...subRoomsList.map(({ gridPosition }) => gridPosition.y)),
    };
    return {
      cellSize: subXy(physicalPosition.to, physicalPosition.from),
      gridPositions: subRoomsList.map(({ gridPosition }) =>
        subXy(gridPosition, gridOrigin),
      ),
      gridOrigin,
    };
  }

  const groundFloors = roomJsonItemsIterable(room)
    .filter((item) => item.type === "floor")
    .filter((floor) => floor.position.z === 0)
    .toArray();
  const extentFrom: Xy = {
    x: Math.min(...groundFloors.map(({ position }) => position.x)),
    y: Math.min(...groundFloors.map(({ position }) => position.y)),
  };
  const extentTo: Xy = {
    x: Math.max(
      ...groundFloors.map(
        ({ position, config }) => position.x + completeTimesXy(config.times).x,
      ),
    ),
    y: Math.max(
      ...groundFloors.map(
        ({ position, config }) => position.y + completeTimesXy(config.times).y,
      ),
    ),
  };
  return {
    cellSize: subXy(extentTo, extentFrom),
    gridPositions: [originXy],
    gridOrigin: originXy,
  };
};

/**
 * makes sure the given sub-room has a room below it to fall into: links to
 * the room already in the map cell below, or else creates one the same size
 * and shape as `room`
 */
const ensureRoomBelowInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  room: EditorRoomJson,
  subRoomId: string,
) => {
  if (roomVerticalLink(room, "below", subRoomId) !== undefined) {
    return;
  }

  const existingBelow = roomAtVerticalNeighbour(
    state,
    roomId,
    subRoomId,
    "below",
  );

  let roomBelowId: EditorRoomId;
  let roomBelow: EditorRoomJson;
  let subRoomBelowId: string;
  if (existingBelow !== undefined) {
    roomBelowId = existingBelow.roomId;
    roomBelow = selectRoomFromLevelEditorState(state, existingBelow.roomId)!;
    subRoomBelowId = existingBelow.subRoomId;
  } else {
    const { cellSize, gridPositions, gridOrigin } = roomShape(room);
    ({ roomId: roomBelowId, room: roomBelow } = addNewRoomInPlace({
      state,
      scenery: room.planet,
      maybeColour: room.color,
      roomSize: cellSize,
      gridPositions,
    }));
    const subRoom = subRoomById(room, subRoomId);
    // a divided new room's sub-rooms are keyed by their index in gridPositions:
    subRoomBelowId =
      gridPositions.length === 1 || subRoom === undefined ?
        "*"
      : gridPositions
          .findIndex((gridPosition) =>
            xyEqual(gridPosition, subXy(subRoom.gridPosition, gridOrigin)),
          )
          .toString();
  }

  writeVerticalLink(
    room,
    subRoomId,
    "below",
    verticalLinkTarget(roomBelowId, subRoomBelowId),
  );
  writeVerticalLink(
    roomBelow,
    subRoomBelowId,
    "above",
    verticalLinkTarget(roomId, subRoomId),
  );
};

export const editRoomReducers = {
  /**
   * give a room another id, following it everywhere it is referred to - as
   * one undoable edit in that room
   */
  renameRoom(
    _state,
    {
      payload: { fromRoomId, toRoomId, timestamp },
    }: PayloadAction<{
      fromRoomId: EditorRoomId;
      toRoomId: EditorRoomId;
      timestamp: number;
    }>,
  ) {
    const state = _state as LevelEditorState;
    pushUndoForRoomInPlace(
      state,
      fromRoomId,
      { kind: "renameRoom", fromRoomId, toRoomId },
      timestamp,
    );
    changeRoomIdInPlace(state, fromRoomId, toRoomId);
  },

  changeRoomColour(
    _state,
    {
      payload: { colour, timestamp },
    }: PayloadAction<{
      colour: Partial<ZxSpectrumRoomColour>;
      timestamp: number;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    pushUndoToCursorRoomInPlace(state, { kind: "changeColour" }, timestamp);
    for (const roomId of state.selectedRoomIds) {
      const target = state.campaignInProgress.rooms[roomId]?.color;
      if (target) {
        Object.assign(target, colour);
      }
    }
  },
  changeRoomScenery(
    _state,
    {
      payload: { sceneryName, timestamp },
    }: PayloadAction<{ sceneryName: SceneryName; timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    pushUndoToCursorRoomInPlace(
      state,
      { kind: "changeScenery", sceneryName },
      timestamp,
    );
    for (const roomId of state.selectedRoomIds) {
      const roomJson = state.campaignInProgress.rooms[roomId];
      if (roomJson) {
        changeRoomSceneryInPlace(roomJson, sceneryName);
      }
    }
  },

  /**
   * general callback for making arbitrary changes to the room json
   * (eg, editing from monaco)
   */
  roomJsonEdited(
    _state,
    {
      payload: {
        roomJson: newRoomJson,
        description: descriptionOverride,
        timestamp,
      },
    }: PayloadAction<{
      roomJson: EditorRoomJson;
      description?: UndoDescription;
      timestamp: number;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const { rooms } = state.campaignInProgress;
    const cursorRoomId = selectCursorRoomIdFromLevelEditorState(state);
    const prevRoomJson = rooms[cursorRoomId];

    const description =
      descriptionOverride ??
      describeRoomJsonEdit(prevRoomJson as EditorRoomJson, newRoomJson);

    pushUndoToCursorRoomInPlace(state, description, timestamp);
    rooms[cursorRoomId] = newRoomJson;

    // selected items may no longer exist in the room after reloading - remove these selections:
    const selectionThatStillExists =
      selectCursorRoomSelectionFromLevelEditorState(state).filter(
        (selectionEntry) =>
          newRoomJson.items[selectionEntry.jsonItemId] !== undefined,
      );
    if (
      // check first for removals, since state.foo = state.foo.filter() creates a state change even
      // if all items are kept
      selectionThatStillExists.length !==
      selectCursorRoomSelectionFromLevelEditorState(state).length
    ) {
      // some items were removed, so update the selection
      setSelectionOnCursorRoomInPlace(state, selectionThatStillExists);
    }

    clearContextMenuXyInPlace(state);

    iterateRoomJsonItemsWithIds(newRoomJson.items, "door")
      // was already a door in in the room before this edit:
      .filter(([id, _doorItem]) => prevRoomJson.items[id]?.type === "door")
      // points to a room that exists:
      .filter(
        (
          entry,
        ): entry is [
          EditorRoomItemId,
          // predicate discriminates to door not being to out of the game (not "$$final")
          OverridePropertiesDeep<
            EditorJsonItem<"door">,
            { config: { toRoom: EditorRoomId } }
          >,
        ] => {
          const [, doorItem] = entry;
          return (
            doorItem.config.toRoom !== exitGameRoomId &&
            rooms[doorItem.config.toRoom] !== undefined
          );
        },
      )
      .forEach(([doorItemId, doorItem]) => {
        const otherRoom = rooms[doorItem.config.toRoom] as EditorRoomJson;
        const otherRoomDoorDirection = oppositeDirection(
          doorItem.config.direction,
        );

        // in the other room, check if there is exactly one opposite-direction door:
        const matchingDoors = iterateRoomJsonItemsWithIds(
          otherRoom.items,
          "door",
        )
          .filter(
            ([, otherRoomDoor]) =>
              otherRoomDoor.config.direction === otherRoomDoorDirection,
          )
          .toArray();

        // need to find exactly 1 for mutating existing doors to find an unambiguous target to modify:
        switch (matchingDoors.length) {
          case 0:
            // No matching doors found; add one
            addReturnDoorInPlace({
              rooms: state.campaignInProgress.rooms,
              outgoingDoorEntry: [doorItemId, doorItem],
              fromRoomId: cursorRoomId,
              fromRoomJson: newRoomJson,
              toRoomId: doorItem.config.toRoom,
              toRoomJson: otherRoom,
            });
            break;
          case 1: {
            // Exactly one matching door found; update it to point back to us:
            const [[, doorToChange]] = matchingDoors;
            doorToChange.config.toRoom = cursorRoomId;
            // only keep a toDoor when the link back is ambiguous (more than one
            // door leads here). When it's the only one, the toDoor is redundant,
            // so drop it rather than fight the verifier that would strip it.
            if (
              doorLinkNeedsToDoor(
                rooms,
                doorItem.config.toRoom,
                cursorRoomId,
                doorToChange.config.direction,
              )
            ) {
              doorToChange.config.toDoor = doorItemId;
            } else {
              delete doorToChange.config.toDoor;
            }
            break;
          }
          default:
            // More than one matching door found; ambiguous, do nothing
            break;
        }
      });

    const prevOutboundNCR = roomNonContiguousRelationship(prevRoomJson);
    const nextOutboundNCR = roomNonContiguousRelationship(newRoomJson);
    if (nextOutboundNCR !== undefined) {
      const outboundRoom = rooms[nextOutboundNCR.with.room];
      if (outboundRoom === undefined) {
        throw new Error(
          `room ${cursorRoomId} has a non-contiguous link to non-existing room ${nextOutboundNCR.with.room}`,
        );
      }
      // add a link back from the new NCR room:
      writeRoomNonContiguousRelationship(outboundRoom, {
        with: { room: cursorRoomId },
        gridOffset: scaleXyz(nextOutboundNCR.gridOffset, -1),
      });
    }

    if (
      prevOutboundNCR?.with.room !== undefined &&
      nextOutboundNCR?.with.room !== prevOutboundNCR.with.room
    ) {
      // we were linking to a room, but are not linking to that room anymore -
      // break the inbound link:
      const prevNcrRoom = rooms[prevOutboundNCR.with.room];
      if (prevNcrRoom === undefined) {
        throw new Error(
          `room ${cursorRoomId} has a non-contiguous link to non-existing room ${prevOutboundNCR.with.room}`,
        );
      }
      if (
        roomNonContiguousRelationship(prevNcrRoom)?.with.room ===
        selectCursorRoomIdFromLevelEditorState(state)
      ) {
        writeRoomNonContiguousRelationship(prevNcrRoom, undefined);
      }
    }
  },

  deleteSelected(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);

    const items: UndoItemEntry[] =
      selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
        state,
      ).map((jsonItemId) => [
        { jsonItemId, whichEditorGhost: undefined },
        roomJson.items[jsonItemId],
      ]);
    pushUndoToCursorRoomInPlace(
      state,
      { kind: "itemAction", verb: "Delete", items },
      timestamp,
    );

    for (const id of selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
      state,
    )) {
      deleteItemInPlace(roomJson, id);
    }

    setSelectionOnCursorRoomInPlace(state, []);
    clearContextMenuXyInPlace(state);

    if (state.autoCoalesce) {
      consolidateCurrentRoomInPlace(state);
    }
  },
  /**
   * cut a hole in the centre of the selected floor, splitting it into the
   * hole (a `none` floor) and the floors around it, and make sure there is a
   * room below to fall into
   */
  makeHoleInSelectedFloor(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    const [floorId] =
      selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
        state,
      );
    const floor = roomJson.items[floorId];
    if (floor?.type !== "floor" || !canMakeHoleInFloor(floor)) {
      return;
    }

    pushUndoToCursorRoomInPlace(
      state,
      {
        kind: "itemAction",
        verb: "Make hole",
        items: [[{ jsonItemId: floorId, whichEditorGhost: undefined }, floor]],
      },
      timestamp,
    );

    const { hole, surrounding } = floorsAroundHole(floor);
    delete roomJson.items[floorId];
    for (const surroundingFloor of surrounding) {
      roomJson.items[nextItemIdInItems(roomJson.items, floorId)] =
        surroundingFloor;
    }
    const holeId = nextItemIdInItems(roomJson.items, floorId);
    roomJson.items[holeId] = hole;

    // a hole across several sub-rooms needs each one to lead below:
    for (const subRoomId of subRoomsIntersectingJsonItem(hole, roomJson)) {
      ensureRoomBelowInPlace(
        state,
        selectCursorRoomIdFromLevelEditorState(state),
        roomJson,
        subRoomId,
      );
    }

    setSelectionOnCursorRoomInPlace(state, [
      { jsonItemId: holeId, whichEditorGhost: undefined },
    ]);
    clearContextMenuXyInPlace(state);
  },
  clearRoom(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);

    pushUndoToCursorRoomInPlace(state, { kind: "clearRoom" }, timestamp);

    for (const k of keysIter(roomJson.items)) {
      const item = roomJson.items[k];
      if (
        item.type !== "floor" &&
        item.type !== "wall" &&
        item.type !== "door"
      ) {
        // remove all items except the floor and walls
        delete roomJson.items[k];
        setSelectionOnCursorRoomInPlace(
          state,
          selectCursorRoomSelectionFromLevelEditorState(state).filter(
            ({ jsonItemId }) => jsonItemId !== k,
          ),
        );
      }
    }

    clearContextMenuXyInPlace(state);
  },

  /** add or remove the room above the current room */
  setRoomAboveOrBelow(
    _state,
    { payload }: PayloadAction<SetRoomAboveOrBelowPayload>,
  ) {
    const state = _state as LevelEditorState;

    const { direction } = payload;
    const reverseDirection: VerticalLinkDirection =
      direction === "above" ? "below" : "above";

    const currentRoomJson =
      selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    const currentSubRoomId = selectCursorSubRoomIdFromLevelEditorState(state);

    const previouslyLinkedRoomId = roomVerticalLink(
      currentRoomJson,
      direction,
      currentSubRoomId,
    )?.room;
    const previouslyLinkedRoom =
      previouslyLinkedRoomId === undefined ? undefined : (
        selectRoomFromLevelEditorState(state, previouslyLinkedRoomId)
      );

    // when asked to create a new room but the map cell in that direction is
    // already occupied by another room (eg closing a loop), link to that
    // existing room instead of creating a duplicate overlapping it
    const existingAtTarget =
      payload.createNew && previouslyLinkedRoom === undefined ?
        roomAtVerticalNeighbour(
          state,
          selectCursorRoomIdFromLevelEditorState(state),
          currentSubRoomId,
          direction,
        )
      : undefined;

    let createdNewRoom = false;
    let newLinkedToRoomId: EditorRoomId | undefined;
    let linkedSubRoomId: string | undefined;
    if (payload.createNew) {
      if (existingAtTarget !== undefined) {
        newLinkedToRoomId = existingAtTarget.roomId;
        linkedSubRoomId = existingAtTarget.subRoomId;
      } else {
        ({ roomId: newLinkedToRoomId } = addNewRoomInPlace({
          state,
          scenery: currentRoomJson.planet,
          maybeColour: currentRoomJson.color,
        }));
        createdNewRoom = true;
      }
    } else {
      newLinkedToRoomId = payload.roomId;
    }

    const newlyLinkedToRoom =
      newLinkedToRoomId === undefined ? undefined : (
        selectRoomFromLevelEditorState(state, newLinkedToRoomId)
      );

    // which sub-room of the linked room the link attaches to
    const targetSubRoomId =
      newlyLinkedToRoom === undefined ? undefined : (
        (linkedSubRoomId ?? primarySubRoomId(newlyLinkedToRoom))
      );

    // forward link: current room (at its cursor sub-room) -> the linked room
    writeVerticalLink(
      currentRoomJson,
      currentSubRoomId,
      direction,
      newLinkedToRoomId === undefined ? undefined : (
        verticalLinkTarget(newLinkedToRoomId, targetSubRoomId)
      ),
    );

    if (newLinkedToRoomId !== undefined && newlyLinkedToRoom !== undefined) {
      // reverse link: linked room -> current room's cursor sub-room
      writeVerticalLink(
        newlyLinkedToRoom,
        targetSubRoomId!,
        reverseDirection,
        verticalLinkTarget(
          selectCursorRoomIdFromLevelEditorState(state),
          currentSubRoomId,
        ),
      );

      if (
        createdNewRoom &&
        previouslyLinkedRoomId !== undefined &&
        previouslyLinkedRoom
      ) {
        // splice the new room in between the current and previously-linked rooms
        writeVerticalLink(
          newlyLinkedToRoom,
          primarySubRoomId(newlyLinkedToRoom),
          direction,
          { room: previouslyLinkedRoomId },
        );
        writeVerticalLink(
          previouslyLinkedRoom,
          primarySubRoomId(previouslyLinkedRoom),
          reverseDirection,
          { room: newLinkedToRoomId },
        );
      }
    }

    if (!payload.createNew && previouslyLinkedRoom) {
      const back = roomVerticalLink(previouslyLinkedRoom, reverseDirection);
      if (back?.room === selectCursorRoomIdFromLevelEditorState(state)) {
        writeVerticalLink(
          previouslyLinkedRoom,
          primarySubRoomId(previouslyLinkedRoom),
          reverseDirection,
          undefined,
        );
      }
    }

    if (newlyLinkedToRoom) {
      changeFloorTypeInPlace(
        direction === "below" ? currentRoomJson : newlyLinkedToRoom,
        "none",
      );
    } else {
      changeFloorTypeInPlace(
        direction === "below" ? currentRoomJson : previouslyLinkedRoom!,
        "standable",
      );
    }

    if (payload.createNew && newLinkedToRoomId) {
      changeCurrentRoomInPlace(state, newLinkedToRoomId);
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
