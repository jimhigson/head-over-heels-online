import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import { changeRoomSceneryInPlace } from "../inPlaceMutators/changeRoomSceneryInPlace";
import {
  selectCurrentRoomFromLevelEditorState,
  selectRoomFromLevelEditorState,
} from "../levelEditorSliceSelectors";
import { pushUndoInPlace } from "./undoReducers";
import { keysIter } from "../../../utils/entries";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { iterateRoomJsonItems } from "../../../model/RoomJson";
import type { FloorType } from "../../../model/json/ItemConfigMap";
import type { JsonItemConfig } from "../../../model/json/JsonItem";
import { deleteItemInPlace } from "../inPlaceMutators/deleteItemInPlace";
import { changeIdOfCurrentRoomInPlace } from "../inPlaceMutators/changeIdOfCurrentRoomInPlace";

export type SetRoomAboveOrBelowPayload =
  | {
      direction: "above" | "below";
      roomId: EditorRoomId;
      createNew: false;
    }
  | {
      direction: "above" | "below";
      createNew: true;
    }
  | {
      direction: "above" | "below";
      /** to break the link */
      roomId: undefined;
      createNew: false;
    };

const changeFloorTypeInPlace = (
  roomJson: EditorRoomJson,
  floorType: FloorType,
) => {
  iterateRoomJsonItems(roomJson)
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
    { payload: colour }: PayloadAction<Partial<ZxSpectrumRoomColour>>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const target =
      state.campaignInProgress.rooms[state.currentlyEditingRoomId].color;

    pushUndoInPlace(state);
    Object.assign(target, colour);
  },
  changeRoomScenery(
    _state,
    { payload: sceneryName }: PayloadAction<SceneryName>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomFromLevelEditorState(state);
    pushUndoInPlace(state);
    changeRoomSceneryInPlace(roomJson, sceneryName);
  },

  /**
   * general callback for making arbitrary changes to the room json
   * (eg, editing from monaco)
   */
  roomJsonEdited(_state, { payload: roomJson }: PayloadAction<EditorRoomJson>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    pushUndoInPlace(state);
    state.campaignInProgress.rooms[state.currentlyEditingRoomId] = roomJson;

    // selected items may no longer exist in the room after reloading - remove these selections:
    const selectedJsonItemIdsThatStillExist = state.selectedJsonItemIds.filter(
      (id) => roomJson.items[id] !== undefined,
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

    if (roomJson.id !== state.currentlyEditingRoomId) {
      changeIdOfCurrentRoomInPlace(state, roomJson.id);
    }
  },

  deleteSelected(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

    pushUndoInPlace(state);

    state.selectedJsonItemIds.forEach((id) => {
      deleteItemInPlace(roomJson, id);
    });

    state.selectedJsonItemIds = [];
  },
  clearRoom(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

    pushUndoInPlace(state);

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
        addNewRoomInPlace(state, currentRoomJson.planet, currentRoomJson.color)
          .id
      : payload.roomId;

    const previouslyLinkedRoom =
      currentRoomJson[forwardDirection] &&
      selectRoomFromLevelEditorState(state, currentRoomJson[forwardDirection]);

    // break the link the other way, if one exists:
    if (
      previouslyLinkedRoom?.[reverseProperty] === state.currentlyEditingRoomId
    ) {
      previouslyLinkedRoom[reverseProperty] = undefined;
    }

    currentRoomJson[forwardDirection] = newLinkedToRoomId;

    const newlyLinkedToRoom =
      newLinkedToRoomId &&
      selectRoomFromLevelEditorState(state, newLinkedToRoomId);

    if (newlyLinkedToRoom !== undefined) {
      // add the link back down, if there is a room to add it to:
      newlyLinkedToRoom[reverseProperty] = currentRoomJson.id;
    }

    // if creating a link, remove some floors:
    if (newlyLinkedToRoom) {
      changeFloorTypeInPlace(
        forwardDirection === "roomBelow" ? currentRoomJson : newlyLinkedToRoom,
        "none",
      );
    } else {
      // broke a link - put floor back:
      changeFloorTypeInPlace(
        forwardDirection === "roomBelow" ? currentRoomJson : (
          previouslyLinkedRoom!
        ),
        "standable",
      );
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
