import {
  nanoid,
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";
import { firstSubRoomId } from "../inPlaceMutators/firstSubRoomId";
import { type LevelEditorState } from "../levelEditorSlice";
import { openRoomDefaults, type OpenRoomId } from "../OpenRoom";
import {
  closeRoomsNotInCampaignInPlace,
  resetOpenRoomsInPlace,
  selectActiveOpenRoomFromLevelEditorState,
  tabGroupsIter,
} from "../PaneLayout";

/**
 * a room a dialog opens, and the items selected in it when it opens
 */
export type DialogRoom = {
  roomId: EditorRoomId;
  selectedJsonItemIds: EditorRoomItemId[];
};

export const openRoomsReducers = {
  /**
   * a dialog opened a room for picking items in it, outside the tabs. It is
   * the active open room until the dialog closes it
   */
  dialogRoomOpened: {
    reducer(
      _state,
      {
        payload: { openRoomId, roomId, selectedJsonItemIds },
      }: PayloadAction<DialogRoom & { openRoomId: OpenRoomId }>,
    ) {
      // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
      // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
      // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
      const state = _state as LevelEditorState;
      const roomJson = state.campaignInProgress.rooms[roomId];
      state.layout.nodes[openRoomId] = {
        ...openRoomDefaults,
        id: openRoomId,
        roomId,
        subRoomId: firstSubRoomId(roomJson),
        editable: false,
        selectedJsonItemIds,
      };
      state.dialogOpenRoomIds.push(openRoomId);
    },
    // the dialog needs to know the id of the room it opens:
    prepare: (payload: DialogRoom) => ({
      payload: {
        ...payload,
        openRoomId: `openRoom-dialog-${nanoid()}` as OpenRoomId,
      },
    }),
  },

  /**
   * a dialog closed the room it opened
   */
  dialogRoomClosed(_state, { payload: openRoomId }: PayloadAction<OpenRoomId>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    delete state.layout.nodes[openRoomId];
    state.dialogOpenRoomIds = state.dialogOpenRoomIds.filter(
      (dialogOpenRoomId) => dialogOpenRoomId !== openRoomId,
    );
  },

  /**
   * the open rooms and tabs were restored from storage: nothing selected,
   * hovered, dragged or framed there is current, rooms no longer in the campaign
   * close, dialogs' rooms close, and with no tab left the campaign's starting
   * room opens
   */
  openRoomsRestored(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    // dialogs' open rooms, which no dialog is open to close:
    for (const openRoomId of state.dialogOpenRoomIds) {
      delete state.layout.nodes[openRoomId];
    }
    state.dialogOpenRoomIds = [];
    resetOpenRoomsInPlace(state);
    closeRoomsNotInCampaignInPlace(state);
    if (
      !tabGroupsIter(state.layout).some(
        ({ id }) => id === state.focusedTabGroupId,
      )
    ) {
      const [firstTabGroup] = tabGroupsIter(state.layout);
      state.focusedTabGroupId = firstTabGroup.id;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const openRoomsSelectors = {
  selectActiveOpenRoomId: (state: LevelEditorState) =>
    selectActiveOpenRoomFromLevelEditorState(state).id,
} satisfies SliceSelectors<LevelEditorState>;
