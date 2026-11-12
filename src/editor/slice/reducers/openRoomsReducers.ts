import {
  nanoid,
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { keys } from "../../../utils/entries";
import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";
import { firstSubRoomId } from "../inPlaceMutators/firstSubRoomId";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  closeRoomsNotInCampaignInPlace,
  existingOpenRoom,
  findRoomTab,
  openRoomDefaults,
  type OpenRoomId,
  resetOpenRoomsInPlace,
  selectActiveOpenRoomIdFromLevelEditorState,
} from "../OpenRoom";

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
      state.openRooms[openRoomId] = {
        ...openRoomDefaults,
        roomId,
        subRoomId: firstSubRoomId(roomJson),
        editable: false,
        selectedJsonItemIds,
      };
    },
    // the dialog needs to know the id of the room it opens:
    prepare: (payload: DialogRoom) => ({
      payload: { ...payload, openRoomId: `dialog-${nanoid()}` as OpenRoomId },
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
    delete state.openRooms[openRoomId];
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
    const tabbedOpenRoomIds = new Set(
      state.tabs.map(({ openRoomId }) => openRoomId),
    );
    // tabs whose open room was never stored (eg stored by an older version):
    state.tabs = state.tabs.filter(
      ({ openRoomId }) => state.openRooms[openRoomId] !== undefined,
    );
    for (const openRoomId of keys(state.openRooms)) {
      if (!tabbedOpenRoomIds.has(openRoomId)) {
        delete state.openRooms[openRoomId];
      }
    }
    resetOpenRoomsInPlace(state);
    closeRoomsNotInCampaignInPlace(state);
    if (findRoomTab(state, state.cursorRoomId) === undefined) {
      state.cursorRoomId = existingOpenRoom(
        state,
        state.tabs[0].openRoomId,
      ).roomId;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const openRoomsSelectors = {
  selectActiveOpenRoomId: selectActiveOpenRoomIdFromLevelEditorState,
} satisfies SliceSelectors<LevelEditorState>;
