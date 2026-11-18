import { type EditorThunk } from "../../store/store";
import {
  findItemsDropPlacement,
  type ItemsDrop,
  type ItemsDropPlacement,
} from "./findItemsDropPlacement";
import { moveItemsToRoom } from "./levelEditorSlice";

/**
 * move items from their room into the nearest free spot in another room,
 * as dropping them on its map tile does. Returns where they went, or undefined
 * if there was no room for them
 */
export const dropItemsOnRoomThunk =
  (itemsDrop: ItemsDrop): EditorThunk<ItemsDropPlacement | undefined> =>
  (dispatch, getState) => {
    const placement = findItemsDropPlacement(getState().levelEditor, itemsDrop);
    if (placement !== undefined) {
      dispatch(
        moveItemsToRoom({
          ...placement,
          fromRoomId: itemsDrop.fromRoomId,
          toRoomId: itemsDrop.toRoomId,
          toSubRoomId: itemsDrop.toSubRoomId,
          timestamp: Date.now(),
        }),
      );
    }
    return placement;
  };
