import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { type EditorThunk } from "../../store/store";
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

export const confirmDeleteRoomThunk: EditorThunk<Promise<void>> = async (
  dispatch,
  getState,
) => {
  const { cursorRoom } = getState().levelEditor;
  const { roomId } = cursorRoom;
  if (
    await confirm({
      heading: "Delete room?",
      body: (
        <BlockyMarkdown>{`**This can't be undone!**

* ${roomId}`}</BlockyMarkdown>
      ),
      cancelText: "Nope",
      okText: "Delete",
    })
  ) {
    dispatch(removeRoom());
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
