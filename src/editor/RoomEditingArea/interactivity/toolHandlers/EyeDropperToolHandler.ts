import type { EditorThunk } from "../../../../store/store";
import { noopFunction } from "../../../../utils/empty";
import {
  selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  setTool,
  toggleSelectedItemInRoom,
} from "../../../slice/levelEditorSlice";
import { maybeLayoutNode } from "../../../slice/PaneLayout";
import { itemsAreLocked } from "../itemsAreLocked";
import { sampledToolItems } from "../sampledToolItems";
import { setHoveredItemIfChangedThunk } from "../setHoveredItemIfChangedThunk";
import type {
  MouseDownParams,
  MouseLeaveParams,
  MouseMoveParams,
  MouseUpParams,
  ToolHandler,
} from "./ToolHandler";

export class EyeDropperToolHandler implements ToolHandler {
  handleMouseMove({
    openRoomId,
    roomState,
    pointingAt,
  }: MouseMoveParams): EditorThunk {
    return (dispatch, getState) => {
      const openRoom = maybeLayoutNode(
        getState().levelEditor.layout,
        openRoomId,
      );
      // the open room may have been closed or replaced (its pane is going):
      if (openRoom === undefined) {
        return;
      }
      dispatch(
        setHoveredItemIfChangedThunk(
          openRoomId,
          openRoom.editable,
          roomState,
          pointingAt,
        ),
      );
    };
  }

  /**
   * clicking an item takes it (or the whole selection, if it is part of one) as
   * the item tool's items. With ctrl or cmd held, it instead toggles the item in
   * the selection, as the pointer tool does, so a selection can be built to take
   */
  handleMouseUp({
    openRoomId,
    roomState,
    pointingAt,
    isClick,
    mouseEvent,
  }: MouseUpParams): EditorThunk {
    if (!isClick) {
      return noopFunction;
    }
    return (dispatch, getState) => {
      const storeState = getState();

      const itemId = pointingAt.world?.itemId;

      if (itemId === undefined) {
        console.warn("no itemId");
        return;
      }

      const clickedOnItem = roomState.items[itemId];

      if (itemsAreLocked(storeState, clickedOnItem)) {
        return;
      }

      const clickedJsonItemId = clickedOnItem.jsonItemId;
      if (clickedJsonItemId === undefined) {
        return;
      }

      if (mouseEvent.ctrlKey || mouseEvent.metaKey) {
        dispatch(
          toggleSelectedItemInRoom({
            selectionEntry: {
              jsonItemId: clickedJsonItemId,
              whichEditorGhost: undefined,
            },
          }),
        );
        return;
      }

      dispatch(
        setTool({
          type: "item",
          items: sampledToolItems(
            clickedJsonItemId,
            selectOpenRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
              storeState,
              openRoomId,
            ),
            roomState.roomJson.items,
          ),
        }),
      );
    };
  }

  handleMouseDown(_params: MouseDownParams): EditorThunk {
    // EyeDropper tool doesn't need to do anything on mouse down:
    return noopFunction;
  }

  claimsDrag(_params: MouseDownParams) {
    // the eye dropper picks on click, not drag:
    return false;
  }

  handleMouseLeave(_params: MouseLeaveParams): EditorThunk {
    // EyeDropper tool doesn't need to do anything on mouse leave:
    return noopFunction;
  }
}
