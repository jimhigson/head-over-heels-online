import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { changeRoomSceneryInPlace } from "../../../model/inPlaceMutators/changeRoomSceneryInPlace";
import {
  exitGameRoomId,
  type FloorType,
} from "../../../model/json/ItemConfigMap";
import { type JsonItemConfig } from "../../../model/json/JsonItem";
import {
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJson";
import { type ZxSpectrumRoomColour } from "../../../originalGame";
import { type SceneryName } from "../../../sprites/planets";
import { keysIter } from "../../../utils/entries";
import { oppositeDirection, scaleXyz } from "../../../utils/vectors/vectors";
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
  selectCurrentRoomFromLevelEditorState,
  selectCursorRoomId,
  selectRoomFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
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
    for (const { roomId } of state.selectedRooms) {
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
    for (const { roomId } of state.selectedRooms) {
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

    const prevOutboundNCR = prevRoomJson.meta?.nonContiguousRelationship;
    const nextOutboundNCR = newRoomJson.meta?.nonContiguousRelationship;
    if (nextOutboundNCR !== undefined) {
      // add a link back from the new NCR room:
      const otherRoom = rooms[nextOutboundNCR.with.room];
      otherRoom.meta = {
        ...otherRoom.meta,
        nonContiguousRelationship: {
          with: { room: newRoomJson.id },
          gridOffset: scaleXyz(nextOutboundNCR.gridOffset, -1),
        },
      };
    }

    if (
      prevOutboundNCR?.with.room !== undefined &&
      nextOutboundNCR?.with.room !== prevOutboundNCR.with.room
    ) {
      // we were linking to a room, but are not linking to that room anymore -
      // break the inbound link:
      const prevNcrRoom = rooms[prevOutboundNCR.with.room];
      if (
        prevNcrRoom.meta?.nonContiguousRelationship?.with.room ===
        selectCursorRoomId(state)
      ) {
        delete prevNcrRoom.meta.nonContiguousRelationship;
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

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

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

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

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
  },

  /** add or remove the room above the current room */
  setRoomAboveOrBelow(
    _state,
    { payload }: PayloadAction<SetRoomAboveOrBelowPayload>,
  ) {
    const state = _state as LevelEditorState;

    const forwardDirection =
      payload.direction === "above" ? "roomAbove" : "roomBelow";
    const reverseProperty =
      forwardDirection === "roomAbove" ? "roomBelow" : "roomAbove";

    const currentRoomJson = selectCurrentRoomFromLevelEditorState(state);

    const newLinkedToRoomId =
      payload.createNew ?
        addNewRoomInPlace({
          state,
          scenery: currentRoomJson.planet,
          maybeColour: currentRoomJson.color,
        }).id
      : payload.roomId;

    const previouslyLinkedRoom =
      currentRoomJson[forwardDirection] &&
      selectRoomFromLevelEditorState(state, currentRoomJson[forwardDirection]);

    currentRoomJson[forwardDirection] = newLinkedToRoomId;

    const newlyLinkedToRoom =
      newLinkedToRoomId &&
      selectRoomFromLevelEditorState(state, newLinkedToRoomId);

    if (newlyLinkedToRoom !== undefined) {
      newlyLinkedToRoom[reverseProperty] = currentRoomJson.id;

      if (payload.createNew && previouslyLinkedRoom) {
        newlyLinkedToRoom[forwardDirection] = previouslyLinkedRoom.id;
        previouslyLinkedRoom[reverseProperty] = newlyLinkedToRoom.id;
      }
    }

    if (!payload.createNew && previouslyLinkedRoom) {
      if (previouslyLinkedRoom[reverseProperty] === selectCursorRoomId(state)) {
        previouslyLinkedRoom[reverseProperty] = undefined;
      }
    }

    if (newlyLinkedToRoom) {
      changeFloorTypeInPlace(
        forwardDirection === "roomBelow" ? currentRoomJson : newlyLinkedToRoom,
        "none",
      );
    } else {
      changeFloorTypeInPlace(
        forwardDirection === "roomBelow" ? currentRoomJson : (
          previouslyLinkedRoom!
        ),
        "standable",
      );
    }

    if (payload.createNew && newLinkedToRoomId) {
      changeCurrentRoomInPlace(state, newLinkedToRoomId as EditorRoomId);
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
