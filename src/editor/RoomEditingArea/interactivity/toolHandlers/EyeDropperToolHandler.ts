import type { Tool } from "../../../Tool";
import type {
  MouseDownParams,
  MouseLeaveParams,
  MouseMoveParams,
  MouseUpParams,
  ToolHandler,
} from "./ToolHandler";

import { store } from "../../../../store/store";
import { setTool } from "../../../slice/levelEditorSlice";
import { dispatchHoveredOnChangedIfNeeded } from "../dispatchHoveredOnChangedIfNeeded";
import { itemsAreLocked } from "../itemsAreLocked";
import { jsonItemAndIdForInPlayItemId } from "../jsonItemAndIdForInPlayItemId";

const { dispatch } = store;

export class EyeDropperToolHandler
  implements ToolHandler<Extract<Tool, { type: "eyeDropper" }>>
{
  handleMouseMove({
    roomState,
    pointingAt,
  }: MouseMoveParams<Extract<Tool, { type: "eyeDropper" }>>) {
    dispatchHoveredOnChangedIfNeeded(roomState, pointingAt);
  }

  handleMouseUp({
    roomState,
    pointingAt,
    storeState,
    isClick,
  }: MouseUpParams<Extract<Tool, { type: "eyeDropper" }>>) {
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

    const asJson = jsonItemAndIdForInPlayItemId(storeState, roomState, itemId);
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
  }

  handleMouseDown(
    _params: MouseDownParams<Extract<Tool, { type: "eyeDropper" }>>,
  ) {
    // EyeDropper tool doesn't need to do anything on mouse down
  }

  handleMouseLeave(
    _params: MouseLeaveParams<Extract<Tool, { type: "eyeDropper" }>>,
  ) {
    // EyeDropper tool doesn't need to do anything on mouse leave
  }
}

// Legacy export for backwards compatibility - to be removed after migration
export const eyeDropperMouseMove = (
  params: MouseMoveParams<Extract<Tool, { type: "eyeDropper" }>>,
) => {
  const handler = new EyeDropperToolHandler();
  handler.handleMouseMove(params);
};
