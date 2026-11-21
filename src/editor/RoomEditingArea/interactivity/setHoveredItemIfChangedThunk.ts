import nanoEqual from "nano-equal";

import type { EditorThunk } from "../../../store/store";
import type { EditorRoomState } from "../../editorTypes";
import {
  type HoveredItem,
  selectOpenRoomHoveredItem,
  setHoveredItemInRoom,
} from "../../slice/levelEditorSlice";
import type { OpenRoomId } from "../../slice/OpenRoom";
import type { MaybePointingAtSomething } from "../cursor/PointingAt";
import { itemsAreLocked } from "./itemsAreLocked";

/**
 * set the item the pointer is over in an open room, if that has changed
 */
export const setHoveredItemIfChangedThunk =
  (
    openRoomId: OpenRoomId,
    /**
     * whether the open room is editable - only an editable one locks items
     */
    editable: boolean,
    roomState: EditorRoomState,
    pointingAt: MaybePointingAtSomething,
  ): EditorThunk =>
  (dispatch, getState) => {
    const storeState = getState();

    let newHoveredItem: HoveredItem | undefined;

    if (pointingAt.world) {
      const pointingAtItemId = pointingAt.world.itemId;

      // convert from id of item in world to id of item in json:
      const hoveredInPlayItem =
        pointingAtItemId && roomState.items[pointingAtItemId];

      const newHoveredItemJsonId =
        editable && itemsAreLocked(storeState, hoveredInPlayItem) ? undefined
        : hoveredInPlayItem.jsonItemId;

      newHoveredItem =
        newHoveredItemJsonId === undefined ? undefined : (
          {
            jsonItemId: newHoveredItemJsonId,
            whichEditorGhost:
              hoveredInPlayItem.type === "editorGhost" ?
                hoveredInPlayItem.config.whichEditorGhost
              : undefined,
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
      dispatch(
        setHoveredItemInRoom({ openRoomId, hoveredItem: newHoveredItem }),
      );
    }
  };
