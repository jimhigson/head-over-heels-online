import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type JsonItemType } from "../../../model/json/JsonItem";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJsonItemIterators";
import { type EditorRoomItemId } from "../../editorTypes";
import {
  itemTypeAndMaybeSubtype,
  type ItemTypeAndSubtype,
} from "../../itemTypeAndSubtype";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "../inPlaceMutators/setSelectedJsonItemIdsOnCursorRoomInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type HoveredItem, type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  layoutNodesOfType,
  maybeLayoutNode,
  selectActiveOpenRoomFromLevelEditorState,
  selectOpenRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../PaneLayout";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";

/**
 * drop, from every open room's selection, the items no longer in its room
 */
export const removeNonExistingItemsFromSelection = (
  _state: LevelEditorState,
) => {
  // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
  // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
  // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
  const state = _state as LevelEditorState;

  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
    const roomItems = state.campaignInProgress.rooms[openRoom.roomId].items;
    if (
      openRoom.selectedJsonItemIds.some(
        (jsonItemId) => !(jsonItemId in roomItems),
      )
    ) {
      openRoom.selectedJsonItemIds = openRoom.selectedJsonItemIds.filter(
        (jsonItemId) => jsonItemId in roomItems,
      );
    }
  }
};

export const selectionsReducers = {
  /**
   * set (or unset) the active open room's selection
   */
  setSelectedItemsInRoom(
    _state,
    {
      payload: { jsonItemIds },
    }: PayloadAction<{
      /** Sets the selection to the provided jsonItemIds, replacing any existing selection. */
      jsonItemIds: EditorRoomItemId[];
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const activeOpenRoom = selectActiveOpenRoomFromLevelEditorState(state);
    // nudges act on the selection, so a new one ends them:
    commitPendingNudgeInPlace(state);
    const { roomId } = activeOpenRoom;
    const roomItems = state.campaignInProgress.rooms[roomId].items;
    for (const jsonItemId of jsonItemIds) {
      if (!roomItems[jsonItemId]) {
        throw new Error(
          `Item with json item id "${jsonItemId}" is not in the active open room's room "${roomId}"`,
        );
      }
    }

    activeOpenRoom.selectedJsonItemIds = jsonItemIds;
    clearContextMenuXyInPlace(state);
  },

  /**
   * toggle the selection of a single item, in the active open room
   */
  toggleSelectedItemInRoom(
    _state,
    {
      payload: { jsonItemId, onlySelect = false },
    }: PayloadAction<{
      jsonItemId: EditorRoomItemId;
      /**
       * when true, an already-selected item is left selected rather than being
       * removed - ie, the toggle only ever adds to the selection
       */
      onlySelect?: boolean;
    }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const activeOpenRoom = selectActiveOpenRoomFromLevelEditorState(state);
    // nudges act on the selection, so a new one ends them:
    commitPendingNudgeInPlace(state);
    const { selectedJsonItemIds } = activeOpenRoom;
    if (!selectedJsonItemIds.includes(jsonItemId)) {
      // not selected, add it
      activeOpenRoom.selectedJsonItemIds = [...selectedJsonItemIds, jsonItemId];
    } else if (!onlySelect) {
      // already selected, remove it
      activeOpenRoom.selectedJsonItemIds = selectedJsonItemIds.filter(
        (selectedJsonItemId) => selectedJsonItemId !== jsonItemId,
      );
    }
    clearContextMenuXyInPlace(state);
  },

  setHoveredItemInRoom(
    state,
    {
      payload: { openRoomId, hoveredItem },
    }: PayloadAction<{
      openRoomId: OpenRoomId;
      hoveredItem: HoveredItem | undefined;
    }>,
  ) {
    const openRoom = maybeLayoutNode(state.layout, openRoomId);
    // the pointer may report on an open room that has since closed:
    if (openRoom === undefined) {
      return;
    }
    openRoom.hoveredItem = hoveredItem;
  },
  setClickableAnnotationHovered(
    state,
    {
      payload: { openRoomId, hovered },
    }: PayloadAction<{ openRoomId: OpenRoomId; hovered: boolean }>,
  ) {
    const openRoom = maybeLayoutNode(state.layout, openRoomId);
    // eg an annotation unhovering as its click replaces its open room:
    if (openRoom === undefined) {
      return;
    }
    openRoom.clickableAnnotationHovered = hovered;
  },
  /**
   * select every item of the given type in the cursor room, narrowed to one
   * subtype if given
   */
  selectAllOfTypeInCursorRoom(
    _state,
    {
      payload: { itemType, subtype },
    }: PayloadAction<
      // undefined subtype selects every subtype:
      { itemType: JsonItemType; subtype: undefined } | ItemTypeAndSubtype
    >,
  ) {
    // DO REMOVE CAST - see setSelectedItemsInRoom
    const state = _state as LevelEditorState;
    commitPendingNudgeInPlace(state);
    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    setSelectedJsonItemIdsOnCursorRoomInPlace(
      state,
      iterateRoomJsonItemsWithIds(roomJson.items, itemType)
        .filter(
          ([, item]) =>
            subtype === undefined ||
            itemTypeAndMaybeSubtype(item).subtype === subtype,
        )
        .map(([jsonItemId]) => jsonItemId)
        .toArray(),
    );
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const selectionsSelectors = {
  selectCursorRoomSelectedJsonItemIds:
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
  selectOpenRoomSelectedJsonItemIds:
    selectOpenRoomSelectedJsonItemIdsFromLevelEditorState,
  selectOpenRoomHoveredItem(state: LevelEditorState, openRoomId: OpenRoomId) {
    return maybeLayoutNode(state.layout, openRoomId)?.hoveredItem;
  },
} satisfies SliceSelectors<LevelEditorState>;
