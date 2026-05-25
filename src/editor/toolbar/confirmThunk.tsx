import { type UnknownAction } from "@reduxjs/toolkit";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { type AppThunk } from "../../store/store";
import { clearRoom, removeRoom } from "../slice/levelEditorSlice";
import { confirm, type ConfirmOptions } from "./confirm";

export const confirmThenDispatch =
  (options: ConfirmOptions, action: UnknownAction): AppThunk<Promise<void>> =>
  async (dispatch) => {
    if (await confirm(options)) {
      dispatch(action);
    }
  };

export const confirmDeleteRoomThunk: AppThunk<Promise<void>> = async (
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

export const confirmClearRoomThunk: AppThunk<Promise<void>> = async (
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
