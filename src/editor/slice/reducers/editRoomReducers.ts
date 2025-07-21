import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import { changeRoomSceneryInPlace } from "../inPlaceMutators.ts/changeRoomSceneryInPlace";
import {
  selectCurrentRoomFromLevelEditorState,
  selectRoomFromLevelEditorState,
} from "../levelEditorSliceSelectors";
import { pushUndoInPlace } from "./undoReducers";
import { keysIter } from "../../../utils/entries";
import type {
  EditorJsonItem,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";
import { addNewRoomInPlace } from "../inPlaceMutators.ts/addNewRoomInPlace";
import {
  iterateRoomJsonItems,
  type AnyRoomJson,
} from "../../../model/RoomJson";
import type { Subset } from "../../../utils/subset";
import type { FloorType } from "../../../model/json/ItemConfigMap";
import type { JsonItemConfig } from "../../../model/json/JsonItem";
import { nextItemId } from "./addItemInPlace";
import {
  isWallHidden,
  type WallJsonConfig,
} from "../../../model/json/WallJsonConfig";
import { rotatingSceneryTiles } from "../createStarterRoom";
import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";

export type AboveOrBelowProperties = Subset<
  keyof AnyRoomJson,
  "roomAbove" | "roomBelow"
>;

export type SetRoomAboveOrBelowPayload =
  | {
      direction: AboveOrBelowProperties;
      roomId: EditorRoomId;
      createNew: false;
    }
  | {
      direction: AboveOrBelowProperties;
      createNew: true;
    }
  | {
      direction: AboveOrBelowProperties;
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

const deleteItemInPlace = (
  roomJson: EditorRoomJson,
  itemId: EditorRoomItemId,
) => {
  const item = roomJson.items[itemId];

  if (item.type === "door") {
    const replacementWall: EditorJsonItem<"wall"> = {
      type: "wall" as const,
      config:
        isWallHidden(item.config.direction) ?
          item.config.direction === "towards" ?
            ({
              direction: item.config.direction,
              times: { x: 2 },
            } satisfies WallJsonConfig)
          : ({
              direction: item.config.direction,
              times: { y: 2 },
            } satisfies WallJsonConfig)
        : ({
            direction: item.config.direction,
            tiles: [
              ...rotatingSceneryTiles(
                roomJson.planet,
                2,
                item.position[item.config.direction === "away" ? "x" : "y"],
              ),
            ],
          } satisfies WallJsonConfig),
      position: { ...item.position, z: 0 },
    } satisfies EditorJsonItem<"wall">;

    // deleting a door - replace with the equivalent wall, and then consolidate to
    // join the new wall with adjacent walls:
    const nextWallId = nextItemId(roomJson, replacementWall, false);

    roomJson.items[nextWallId] = replacementWall;

    // consolidate all walls in this room, to 'heal' any walls around the wall we just added:
    // TODO: this will currently consolidate unknown items too!
    roomJson.items = consolidateItemsMap(roomJson.items);
  }

  delete roomJson.items[itemId];
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
    state.campaignInProgress.rooms[state.currentlyEditingRoomId] = roomJson;
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

    const forwardDirection = payload.direction;
    const reverseDirection: AboveOrBelowProperties =
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
      previouslyLinkedRoom?.[reverseDirection] === state.currentlyEditingRoomId
    ) {
      previouslyLinkedRoom[reverseDirection] = undefined;
    }

    currentRoomJson[forwardDirection] = newLinkedToRoomId;

    const newlyLinkedToRoom =
      newLinkedToRoomId &&
      selectRoomFromLevelEditorState(state, newLinkedToRoomId);

    if (newlyLinkedToRoom !== undefined) {
      // add the link back down, if there is a room to add it to:
      newlyLinkedToRoom[reverseDirection] = currentRoomJson.id;
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
