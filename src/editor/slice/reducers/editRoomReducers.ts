import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { changeRoomSceneryInPlace } from "../../../model/inPlaceMutators/changeRoomSceneryInPlace";
import {
  exitGameRoomId,
  type FloorType,
} from "../../../model/json/ItemConfigMap";
import { type JsonItemConfig } from "../../../model/json/JsonItem";
import {
  isWholeRoomSubRooms,
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
  roomNonContiguousRelationship,
  roomVerticalLink,
  writeRoomNonContiguousRelationship,
} from "../../../model/RoomJson";
import { type ZxSpectrumRoomColour } from "../../../originalGame";
import { type SceneryName } from "../../../sprites/planets";
import { keysIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  oppositeDirection,
  scaleXyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { addReturnDoorInPlace } from "../inPlaceMutators/addDoorInPlace";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { changeIdOfCurrentRoomInPlace } from "../inPlaceMutators/changeIdOfCurrentRoomInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { deleteItemInPlace } from "../inPlaceMutators/deleteItemInPlace";
import {
  selectCurrentRoomJsonFromLevelEditorState,
  selectCursorRoomId,
  selectCursorSubRoomId,
  selectRoomFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import {
  describeRoomJsonEdit,
  type UndoDescription,
  type UndoItemEntry,
} from "./undoDescription";
import { pushUndoInPlace } from "./undoReducers";

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
  room: EditorRoomJson,
  subRoomId: string,
  direction: VerticalLinkDirection,
): { roomId: EditorRoomId; subRoomId: string } | undefined => {
  const neighbourVector =
    direction === "above" ? unitVectors.up : unitVectors.down;
  const targetSpec = [
    ...roomGridPositions({
      campaign: state.campaignInProgress,
      roomId: room.id,
      subRoomId,
    }),
  ].find(({ gridPosition }) => xyzEqual(gridPosition, neighbourVector));

  if (
    targetSpec === undefined ||
    targetSpec.roomId === room.id ||
    targetSpec.roomId === exitGameRoomId
  ) {
    return undefined;
  }
  return { roomId: targetSpec.roomId, subRoomId: targetSpec.subRoomId };
};

export const editRoomReducers = {
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

    pushUndoInPlace(state, { kind: "changeColour" }, timestamp);
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

    pushUndoInPlace(state, { kind: "changeScenery", sceneryName }, timestamp);
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
    const cursorRoomId = selectCursorRoomId(state);
    const prevRoomJson = rooms[cursorRoomId];

    const description =
      descriptionOverride ??
      describeRoomJsonEdit(prevRoomJson as EditorRoomJson, newRoomJson);

    pushUndoInPlace(state, description, timestamp);
    rooms[cursorRoomId] = newRoomJson;

    // selected items may no longer exist in the room after reloading - remove these selections:
    const selectedJsonItemIdsThatStillExist = state.selectedJsonItemIds.filter(
      (id) => newRoomJson.items[id] !== undefined,
    );
    if (
      // check first for removals, since state.foo = state.foo.filter() creates a state change even
      // if all items are kept
      selectedJsonItemIdsThatStillExist.length !==
      state.selectedJsonItemIds.length
    ) {
      // some items were removed, so update the selection
      state.selectedJsonItemIds = selectedJsonItemIdsThatStillExist;
    }

    clearContextMenuXyInPlace(state);

    if (newRoomJson.id !== selectCursorRoomId(state)) {
      changeIdOfCurrentRoomInPlace(state, newRoomJson.id);
    }

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
          EditorJsonItem<"door"> & { config: { toRoom: EditorRoomId } },
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
              state,
              outgoingDoorEntry: [doorItemId, doorItem],
              fromRoomJson: newRoomJson,
              toRoomJson: otherRoom,
            });
            break;
          case 1: {
            // Exactly one matching door found; update it to point back to us:
            const [[, doorToChange]] = matchingDoors;
            doorToChange.config.toRoom = newRoomJson.id;
            doorToChange.config.toDoor = doorItemId;
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
      // add a link back from the new NCR room:
      writeRoomNonContiguousRelationship(rooms[nextOutboundNCR.with.room], {
        with: { room: newRoomJson.id },
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
      if (
        roomNonContiguousRelationship(prevNcrRoom)?.with.room ===
        selectCursorRoomId(state)
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

    const roomJson = selectCurrentRoomJsonFromLevelEditorState(state);

    const items: UndoItemEntry[] = state.selectedJsonItemIds.map((id) => [
      id,
      roomJson.items[id],
    ]);
    pushUndoInPlace(
      state,
      { kind: "itemAction", verb: "Delete", items },
      timestamp,
    );

    for (const id of state.selectedJsonItemIds) {
      deleteItemInPlace(roomJson, id);
    }

    state.selectedJsonItemIds = [];
    clearContextMenuXyInPlace(state);

    if (state.autoCoalesce) {
      consolidateCurrentRoomInPlace(state);
    }
  },
  clearRoom(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomJsonFromLevelEditorState(state);

    pushUndoInPlace(state, { kind: "clearRoom" }, timestamp);

    for (const k of keysIter(roomJson.items)) {
      const item = roomJson.items[k];
      if (
        item.type !== "floor" &&
        item.type !== "wall" &&
        item.type !== "door"
      ) {
        // remove all items except the floor and walls
        delete roomJson.items[k];
        state.selectedJsonItemIds = state.selectedJsonItemIds.filter(
          (id) => id !== k,
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

    const currentRoomJson = selectCurrentRoomJsonFromLevelEditorState(state);
    const currentSubRoomId = selectCursorSubRoomId(state);

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
          currentRoomJson,
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
        newLinkedToRoomId = addNewRoomInPlace({
          state,
          scenery: currentRoomJson.planet,
          maybeColour: currentRoomJson.color,
        }).id;
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
        {
          room: newLinkedToRoomId,
          subRoom: targetSubRoomId === "*" ? undefined : targetSubRoomId,
        }
      ),
    );

    if (newlyLinkedToRoom !== undefined) {
      // reverse link: linked room -> current room's cursor sub-room
      writeVerticalLink(newlyLinkedToRoom, targetSubRoomId!, reverseDirection, {
        room: currentRoomJson.id,
        subRoom: currentSubRoomId === "*" ? undefined : currentSubRoomId,
      });

      if (createdNewRoom && previouslyLinkedRoom) {
        // splice the new room in between the current and previously-linked rooms
        writeVerticalLink(
          newlyLinkedToRoom,
          primarySubRoomId(newlyLinkedToRoom),
          direction,
          { room: previouslyLinkedRoom.id },
        );
        writeVerticalLink(
          previouslyLinkedRoom,
          primarySubRoomId(previouslyLinkedRoom),
          reverseDirection,
          { room: newlyLinkedToRoom.id },
        );
      }
    }

    if (!payload.createNew && previouslyLinkedRoom) {
      const back = roomVerticalLink(previouslyLinkedRoom, reverseDirection);
      if (back?.room === selectCursorRoomId(state)) {
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
