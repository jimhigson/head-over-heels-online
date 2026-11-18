import { type EditorThunk } from "../../../../store/store";
import { noopFunction } from "../../../../utils/empty";
import { setTool } from "../../../slice/levelEditorSlice";
import { maybeLayoutNode } from "../../../slice/PaneLayout";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import { setHoveredItemIfChangedThunk } from "../setHoveredItemIfChangedThunk";
import {
  type MouseDownParams,
  type MouseLeaveParams,
  type MouseMoveParams,
  type MouseUpParams,
  type ToolHandler,
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

  handleMouseUp({
    roomState,
    pointingAt,
    isClick,
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

      const asJson = jsonItemAndIdForInPlayItem(storeState, clickedOnItem);
      if (asJson === undefined) {
        return;
      }
      const [, jsonItem] = asJson;

      dispatch(
        setTool({
          type: "item",
          item: {
            type: jsonItem.type,
            config: jsonItem.config,
          },
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
