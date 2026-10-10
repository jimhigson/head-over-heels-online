import { type EditorThunk } from "../../store/store";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import {
  findItemsDropPlacement,
  type ItemsDropPlacement,
} from "./findItemsDropPlacement";
import { moveItemsToRoom } from "./levelEditorSlice";

/**
 * move items from the current room into the nearest free spot in another room,
 * as dropping them on its map tile does. Returns where they went, or undefined
 * if there was no room for them
 */
export const dropItemsOnRoom =
  ({
    itemIds,
    toRoomId,
    toSubRoomId,
  }: {
    itemIds: EditorRoomItemId[];
    toRoomId: EditorRoomId;
    toSubRoomId: string;
  }): EditorThunk<ItemsDropPlacement | undefined> =>
  (dispatch, getState) => {
    const placement = findItemsDropPlacement(
      getState().levelEditor,
      itemIds,
      toRoomId,
      toSubRoomId,
    );
    if (placement !== undefined) {
      dispatch(
        moveItemsToRoom({
          ...placement,
          toRoomId,
          toSubRoomId,
          timestamp: Date.now(),
        }),
      );
    }
    return placement;
  };
