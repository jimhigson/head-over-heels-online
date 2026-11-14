import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { entries } from "../../../utils/entries";
import { type EditorRoomItemId } from "../../editorTypes";
import {
  type EditorPaneId,
  paneRoomId,
  panesIter,
  requirePane,
  selectActivePaneFromLevelEditorState,
  selectPaneSelectedJsonItemIdsFromLevelEditorState,
} from "../EditorPane";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { selectCursorRoomSelectedJsonItemIdsFromLevelEditorState } from "../levelEditorSelectors";
import { type HoveredItem, type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";

/**
 * drop, from every pane's selection, the items no longer in the room they are
 * selected in
 */
export const removeNonExistingItemsFromSelection = (
  _state: LevelEditorState,
) => {
  // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
  // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
  // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
  const state = _state as LevelEditorState;

  for (const pane of panesIter(state)) {
    for (const [roomId, selectedJsonItemIds] of entries(
      pane.selectedJsonItemIdsByRoom,
    )) {
      const roomItems = state.campaignInProgress.rooms[roomId]?.items;
      if (
        selectedJsonItemIds !== undefined &&
        roomItems !== undefined &&
        selectedJsonItemIds.some((jsonItemId) => !(jsonItemId in roomItems))
      ) {
        pane.selectedJsonItemIdsByRoom[roomId] = selectedJsonItemIds.filter(
          (jsonItemId) => jsonItemId in roomItems,
        );
      }
    }
  }
};

/**
 * set the active pane's selection, in the room it shows. Every pane can
 * select, editable or not
 */
const setActivePaneSelectionInPlace = (
  state: LevelEditorState,
  jsonItemIds: EditorRoomItemId[],
) => {
  const activePane = selectActivePaneFromLevelEditorState(state);
  if (activePane !== undefined) {
    activePane.selectedJsonItemIdsByRoom[paneRoomId(state, activePane)] =
      jsonItemIds;
  }
};

export const selectionsReducers = {
  /** set (or unset) the active pane's selection */
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
    const activePane = selectActivePaneFromLevelEditorState(state);
    if (activePane === undefined) {
      return;
    }
    // nudges act on the selection, so a new one ends them:
    commitPendingNudgeInPlace(state);
    const roomId = paneRoomId(state, activePane);
    const roomItems = state.campaignInProgress.rooms[roomId]?.items ?? {};
    for (const jsonItemId of jsonItemIds) {
      if (!roomItems[jsonItemId]) {
        throw new Error(
          `Item with json item id "${jsonItemId}" is not in the active pane's room "${roomId}"`,
        );
      }
    }

    setActivePaneSelectionInPlace(state, jsonItemIds);
    clearContextMenuXyInPlace(state);
  },

  /** toggle the selection of a single item, in the active pane */
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
    if (state.activePaneId === undefined) {
      return;
    }
    // nudges act on the selection, so a new one ends them:
    commitPendingNudgeInPlace(state);
    const selectedJsonItemIds =
      selectPaneSelectedJsonItemIdsFromLevelEditorState(
        state,
        state.activePaneId,
      );
    if (!selectedJsonItemIds.includes(jsonItemId)) {
      // not selected, add it
      setActivePaneSelectionInPlace(state, [
        ...selectedJsonItemIds,
        jsonItemId,
      ]);
    } else if (!onlySelect) {
      // already selected, remove it
      setActivePaneSelectionInPlace(
        state,
        selectedJsonItemIds.filter(
          (selectedJsonItemId) => selectedJsonItemId !== jsonItemId,
        ),
      );
    }
    clearContextMenuXyInPlace(state);
  },

  setHoveredItemInRoom(
    state,
    {
      payload: { paneId, hoveredItem },
    }: PayloadAction<{
      paneId: EditorPaneId;
      hoveredItem: HoveredItem | undefined;
    }>,
  ) {
    const pane = requirePane(state, paneId);
    pane.hoveredItem = hoveredItem;
  },
  setClickableAnnotationHovered(
    state,
    {
      payload: { paneId, hovered },
    }: PayloadAction<{ paneId: EditorPaneId; hovered: boolean }>,
  ) {
    const pane = requirePane(state, paneId);
    pane.clickableAnnotationHovered = hovered;
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const selectionsSelectors = {
  selectCursorRoomSelectedJsonItemIds:
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
  selectPaneSelectedJsonItemIds:
    selectPaneSelectedJsonItemIdsFromLevelEditorState,
  selectPaneHoveredItem(state: LevelEditorState, paneId: EditorPaneId) {
    return requirePane(state, paneId).hoveredItem;
  },
} satisfies SliceSelectors<LevelEditorState>;
