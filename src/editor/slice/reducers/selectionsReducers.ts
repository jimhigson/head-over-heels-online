import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type JsonItemType } from "../../../model/json/JsonItem";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJsonItemIterators";
import {
  itemTypeAndMaybeSubtype,
  type ItemTypeAndSubtype,
} from "../../itemTypeAndSubtype";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { setSelectionOnCursorRoomInPlace } from "../inPlaceMutators/setSelectionOnCursorRoomInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectionFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsIncludingEditorGhostOwnersFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type HoveredItem, type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  layoutNodesOfType,
  maybeLayoutNode,
  selectActiveOpenRoomFromLevelEditorState,
  selectOpenRoomSelectionFromLevelEditorState,
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
} from "../PaneLayout";
import { type SelectionEntry } from "../SelectionEntry";
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
      openRoom.selection.some(
        (selectionEntry) => !(selectionEntry.jsonItemId in roomItems),
      )
    ) {
      openRoom.selection = openRoom.selection.filter(
        (selectionEntry) => selectionEntry.jsonItemId in roomItems,
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
      payload: { selection },
    }: PayloadAction<{
      /**
       * replaces any existing selection
       */
      selection: SelectionEntry[];
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
    for (const selectionEntry of selection) {
      const { jsonItemId } = selectionEntry;
      if (!roomItems[jsonItemId]) {
        throw new Error(
          `Item with json item id "${jsonItemId}" is not in the active open room's room "${roomId}"`,
        );
      }
    }

    activeOpenRoom.selection = selection;
    clearContextMenuXyInPlace(state);
  },

  /**
   * toggle the selection of a single item (or editor ghost), in the active open room
   */
  toggleSelectedItemInRoom(
    _state,
    {
      payload: { selectionEntry, onlySelect = false },
    }: PayloadAction<{
      selectionEntry: SelectionEntry;
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
    const { selection } = activeOpenRoom;
    if (
      !selection.some(
        (selected) =>
          selected.jsonItemId === selectionEntry.jsonItemId &&
          selected.whichEditorGhost === selectionEntry.whichEditorGhost,
      )
    ) {
      // not selected, add it
      activeOpenRoom.selection = [...selection, selectionEntry];
    } else if (!onlySelect) {
      // already selected, remove it
      activeOpenRoom.selection = selection.filter(
        (selected) =>
          selected.jsonItemId !== selectionEntry.jsonItemId ||
          selected.whichEditorGhost !== selectionEntry.whichEditorGhost,
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
    setSelectionOnCursorRoomInPlace(
      state,
      iterateRoomJsonItemsWithIds(roomJson.items, itemType)
        .filter(
          ([, item]) =>
            subtype === undefined ||
            itemTypeAndMaybeSubtype(item).subtype === subtype,
        )
        .map(([jsonItemId]) => ({ jsonItemId, whichEditorGhost: undefined }))
        .toArray(),
    );
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const selectionsSelectors = {
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections:
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsIncludingEditorGhostOwners:
    selectCursorRoomSelectionJsonItemIdsIncludingEditorGhostOwnersFromLevelEditorState,
  selectCursorRoomSelection: selectCursorRoomSelectionFromLevelEditorState,
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections:
    selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
  selectOpenRoomSelection: selectOpenRoomSelectionFromLevelEditorState,
  selectOpenRoomHoveredItem(state: LevelEditorState, openRoomId: OpenRoomId) {
    return maybeLayoutNode(state.layout, openRoomId)?.hoveredItem;
  },
} satisfies SliceSelectors<LevelEditorState>;
