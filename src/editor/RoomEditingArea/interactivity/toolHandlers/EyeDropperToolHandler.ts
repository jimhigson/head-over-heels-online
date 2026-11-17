import { type EditorThunk } from "../../../../store/store";
import { setTool } from "../../../slice/levelEditorSlice";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import { setHoveredItemIfChangedThunk } from "../setHoveredItemIfChangedThunk";
import { type Tool } from "../Tool";
import {
  type MouseDownParams,
  type MouseLeaveParams,
  type MouseMoveParams,
  type MouseUpParams,
  type ToolHandler,
} from "./ToolHandler";

export class EyeDropperToolHandler implements ToolHandler<
  Extract<Tool, { type: "eyeDropper" }>
> {
  handleMouseMove({
    openRoomId,
    editable,
    roomState,
    pointingAt,
  }: MouseMoveParams<Extract<Tool, { type: "eyeDropper" }>>): EditorThunk {
    return (dispatch) => {
      dispatch(
        setHoveredItemIfChangedThunk(
          openRoomId,
          editable,
          roomState,
          pointingAt,
        ),
      );
    };
  }

  handleMouseUp({
    roomState,
    pointingAt,
    storeState,
    isClick,
  }: MouseUpParams<Extract<Tool, { type: "eyeDropper" }>>): EditorThunk {
    return (dispatch) => {
      if (!isClick) {
        return;
      }

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

  handleMouseDown(
    _params: MouseDownParams<Extract<Tool, { type: "eyeDropper" }>>,
  ): EditorThunk {
    return () => {
      // EyeDropper tool doesn't need to do anything on mouse down
    };
  }

  claimsDrag(_params: MouseDownParams<Extract<Tool, { type: "eyeDropper" }>>) {
    // the eye dropper picks on click, not drag:
    return false;
  }

  handleMouseLeave(
    _params: MouseLeaveParams<Extract<Tool, { type: "eyeDropper" }>>,
  ): EditorThunk {
    return () => {
      // EyeDropper tool doesn't need to do anything on mouse leave
    };
  }
}
