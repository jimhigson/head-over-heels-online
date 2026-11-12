import nanoEqual from "nano-equal";

import { editorStore, store } from "../../../store/store";
import { type EditorRoomState } from "../../editorTypes";
import {
  type HoveredItem,
  selectOpenRoomHoveredItem,
  setHoveredItemInRoom,
} from "../../slice/levelEditorSlice";
import { type OpenRoomId } from "../../slice/OpenRoom";
import { type MaybePointingAtSomething } from "../cursor/PointingAt";
import { itemsAreLocked } from "./itemsAreLocked";

export const dispatchHoveredOnChangedIfNeeded = (
  openRoomId: OpenRoomId,
  /**
   * whether the open room is editable - only an editable one locks items
   */
  editable: boolean,
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
) => {
  const storeState = editorStore.getState();

  let newHoveredItem: HoveredItem | undefined;

  if (pointingAt.world) {
    const pointingAtItemId = pointingAt.world.itemId;

    // convert from id of item in world to id of item in json:
    const hoveredInPlayItem =
      pointingAtItemId && roomState.items[pointingAtItemId];

    const newHoveredItemJsonId =
      editable && itemsAreLocked(storeState, hoveredInPlayItem) ? undefined : (
        hoveredInPlayItem.jsonItemId
      );

    newHoveredItem =
      newHoveredItemJsonId === undefined ? undefined : (
        {
          jsonItemId: newHoveredItemJsonId,
          pointingAtOnItem: pointingAt.world!.onItem,
        }
      );
  } else {
    newHoveredItem = undefined;
  }

  if (
    // only dispatch if something is different, to stop the redux dev tools being flooded:
    !nanoEqual(
      selectOpenRoomHoveredItem(storeState, openRoomId),
      newHoveredItem,
    )
  ) {
    store.dispatch(
      setHoveredItemInRoom({ openRoomId, hoveredItem: newHoveredItem }),
    );
  }
};
