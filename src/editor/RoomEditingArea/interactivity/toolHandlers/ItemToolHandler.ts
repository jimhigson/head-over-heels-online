import { produce } from "immer";

import type { DoorConfig } from "../../../../model/json/ItemConfigMap";
import type { EditorItemInPlayUnion, EditorRoomId } from "../../../editorTypes";
import type { Tool } from "../../../Tool";
import type {
  MouseDownParams,
  MouseLeaveParams,
  MouseMoveParams,
  MouseUpParams,
  ToolHandler,
} from "./ToolHandler";

import { store } from "../../../../store/store";
import {
  applyItemTool,
  resetPreviewedEdits,
  setTool,
} from "../../../slice/levelEditorSlice";
import { addingItemWouldCollide } from "../../cursor/editWouldCollide";
import { itemToolPutDownLocation } from "../../cursor/itemToolPutDownLocation";
import { jsonItemAndIdForInPlayItemId } from "../jsonItemAndIdForInPlayItemId";

const { dispatch } = store;

export class ItemToolHandler
  implements ToolHandler<Extract<Tool, { type: "item" }>>
{
  handleMouseMove({
    pointingAtChanged,
    roomState,
    pointingAt,
    tool,
    storeState,
  }: MouseMoveParams<Extract<Tool, { type: "item" }>>) {
    if (!pointingAtChanged) {
      return;
    }

    // remove old previews
    dispatch(resetPreviewedEdits());

    if (pointingAt.world === undefined) {
      return;
    }

    const asJson = jsonItemAndIdForInPlayItemId(
      storeState,
      roomState,
      pointingAt.world.itemId,
    );
    if (asJson === undefined) {
      return;
    }
    const [, jsonItem] = asJson;

    const putDownBlockPosition = itemToolPutDownLocation(
      pointingAt,
      roomState,
      tool.item,
    );

    if (putDownBlockPosition === undefined) {
      return;
    }

    const { item } = tool;
    // if tool is a door, need to switch it to the side of the wall it is on.
    // otherwise, the collision detection will fail to detect properly because
    // different door directions would protrude differently
    const toolItem =
      item.type === "door" ?
        produce(item, (draft) => {
          const wall = roomState.items[
            pointingAt.world.itemId
          ] as EditorItemInPlayUnion<"wall">;
          (draft.config as DoorConfig<EditorRoomId>).direction =
            wall.config.direction;
        })
        // otherwise, can use as-is
      : tool.item;

    const collides = addingItemWouldCollide({
      roomState,
      blockPosition: putDownBlockPosition,
      itemTool: toolItem,
    });

    if (collides) {
      return;
    }

    dispatch(
      applyItemTool({
        blockPosition: putDownBlockPosition,
        pointedAtItemJson: jsonItem,
        preview: true,
      }),
    );
  }

  handleMouseUp({
    roomState,
    pointingAt,
    tool,
    storeState,
    isClick,
  }: MouseUpParams<Extract<Tool, { type: "item" }>>) {
    if (!isClick) {
      return;
    }

    if (pointingAt.world === undefined) {
      // if using item tool, clicking on nothing is a quick way to go back to
      // the pointer:
      dispatch(setTool({ type: "pointer" }));
      return;
    }

    const asJson = jsonItemAndIdForInPlayItemId(
      storeState,
      roomState,
      pointingAt.world.itemId,
    );
    if (asJson === undefined) {
      return;
    }
    const [, jsonItem] = asJson;

    const putDownBlockPosition = itemToolPutDownLocation(
      pointingAt,
      roomState,
      tool.item,
    );

    if (putDownBlockPosition === undefined) {
      return;
    }

    dispatch(
      applyItemTool({
        blockPosition: putDownBlockPosition,
        pointedAtItemJson: jsonItem,
        preview: false,
      }),
    );
  }

  handleMouseDown(_params: MouseDownParams<Extract<Tool, { type: "item" }>>) {
    // Item tool doesn't need to do anything on mouse down
  }

  handleMouseLeave(_params: MouseLeaveParams<Extract<Tool, { type: "item" }>>) {
    dispatch(resetPreviewedEdits());
  }
}
