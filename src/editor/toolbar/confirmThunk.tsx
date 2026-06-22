import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { type EditorThunk } from "../../store/store";
import { type EditorRoomId } from "../editorTypes";
import {
  clearRoom,
  type LevelEditorSliceAction,
  removeRoom,
} from "../slice/levelEditorSlice";
import { confirm, type ConfirmOptions } from "./confirm";

export const confirmThenDispatch =
  (
    options: ConfirmOptions,
    action: LevelEditorSliceAction,
  ): EditorThunk<Promise<void>> =>
  async (dispatch) => {
    if (await confirm(options)) {
      dispatch(action);
    }
  };

export const confirmDeleteRoomThunk =
  (
    /** the room to delete; defaults to the room the editor is currently on */
    roomId?: EditorRoomId,
  ): EditorThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const targetRoomId = roomId ?? getState().levelEditor.cursorRoom.roomId;
    if (
      await confirm({
        heading: "Delete room?",
        body: (
          <BlockyMarkdown>{`**This can't be undone!**

* ${targetRoomId}`}</BlockyMarkdown>
        ),
        cancelText: "Nope",
        okText: "Delete",
      })
    ) {
      dispatch(removeRoom(roomId !== undefined ? { roomId } : undefined));
    }
  };

export const confirmClearRoomThunk: EditorThunk<Promise<void>> = async (
  dispatch,
  getState,
) => {
  const { cursorRoom } = getState().levelEditor;
  const { roomId } = cursorRoom;
  if (
    await confirm({
      heading: "Clear room?",
      body: (
        <BlockyMarkdown>{`**This can't be undone!**

* ${roomId}`}</BlockyMarkdown>
      ),
      cancelText: "Nope",
      okText: "Clear",
    })
  ) {
    dispatch(clearRoom({ timestamp: Date.now() }));
  }
};
