import { produce } from "immer";

import { type DoorConfig } from "../../../../model/json/ItemConfigMap";
import {
  type EditorRootState,
  type EditorThunk,
} from "../../../../store/store";
import { noopFunction } from "../../../../utils/empty";
import { nonZeroVectorClosestDirectionXy4 } from "../../../../utils/vectors/vectors";
import {
  type EditorItemInPlayUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../../editorTypes";
import { selectPreviewOnlyJsonItemIds } from "../../../slice/levelEditorSelectors";
import {
  applyItemTool,
  resetPreviewedEdits,
  resetTool,
  selectTool,
} from "../../../slice/levelEditorSlice";
import { addingItemWouldCollide } from "../../cursor/editWouldCollide";
import { itemToolPutDownLocation } from "../../cursor/itemToolPutDownLocation";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import { type Tool } from "../Tool";
import {
  type MouseDownParams,
  type MouseLeaveParams,
  type MouseMoveParams,
  type MouseUpParams,
  type ToolHandler,
} from "./ToolHandler";

/**
 * the selected tool, which is the item tool whenever this handler is used
 */
const selectItemTool = (
  storeState: EditorRootState,
): Extract<Tool, { type: "item" }> => {
  const tool = selectTool(storeState);
  if (tool.type !== "item") {
    throw new Error(
      `the item tool handler was used with the ${tool.type} tool`,
    );
  }
  return tool;
};

export class ItemToolHandler implements ToolHandler {
  handleMouseMove({
    pointingAtChanged,
    roomState,
    pointingAt,
  }: MouseMoveParams): EditorThunk {
    if (!pointingAtChanged) {
      return noopFunction;
    }
    return (dispatch, getState) => {
      const storeState = getState();
      const tool = selectItemTool(storeState);

      // remove old previews
      dispatch(resetPreviewedEdits());

      if (pointingAt.world === undefined) {
        return;
      }

      const pointingAtItem = findItemInPlayForPicking(
        roomState,
        pointingAt.world.itemId,
      );
      const asJson = jsonItemAndIdForInPlayItem(storeState, pointingAtItem);
      if (pointingAtItem === undefined || asJson === undefined) {
        return;
      }
      const [, jsonItem] = asJson;

      const putDownBlockPosition = itemToolPutDownLocation(
        pointingAt,
        pointingAtItem,
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
            const wall = pointingAtItem as EditorItemInPlayUnion<"wall">;
            (draft.config as DoorConfig<EditorRoomId>).direction =
              nonZeroVectorClosestDirectionXy4(wall.config.direction);
          })
          // otherwise, can use as-is
        : tool.item;

      const collides = addingItemWouldCollide({
        roomState,
        blockPosition: putDownBlockPosition,
        itemTool: toolItem,
        previewOnlyJsonItemIds: selectPreviewOnlyJsonItemIds(
          storeState,
          roomState.id,
        ),
      });

      if (collides) {
        return;
      }

      dispatch(
        applyItemTool({
          roomId: roomState.id,
          blockPosition: putDownBlockPosition,
          pointedAtItemJson: jsonItem,
          preview: true,
          timestamp: Date.now(),
        }),
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
      const tool = selectItemTool(storeState);

      if (pointingAt.world === undefined) {
        // if using item tool, clicking on nothing is a quick way to go back to
        // the pointer:
        dispatch(resetTool());
        return;
      }

      const pointingAtItem = findItemInPlayForPicking(
        roomState,
        pointingAt.world.itemId,
      );
      const asJson = jsonItemAndIdForInPlayItem(storeState, pointingAtItem);
      if (pointingAtItem === undefined || asJson === undefined) {
        return;
      }
      const [, jsonItem] = asJson;

      const putDownBlockPosition = itemToolPutDownLocation(
        pointingAt,
        pointingAtItem,
        tool.item,
      );

      if (putDownBlockPosition === undefined) {
        return;
      }

      dispatch(
        applyItemTool({
          roomId: roomState.id,
          blockPosition: putDownBlockPosition,
          pointedAtItemJson: jsonItem,
          preview: false,
          timestamp: Date.now(),
        }),
      );
    };
  }

  handleMouseDown(_params: MouseDownParams): EditorThunk {
    // Item tool doesn't need to do anything on mouse down:
    return noopFunction;
  }

  claimsDrag(_params: MouseDownParams) {
    // the item tool places on click, not drag:
    return false;
  }

  handleMouseLeave(_params: MouseLeaveParams): EditorThunk {
    return (dispatch) => {
      dispatch(resetPreviewedEdits());
    };
  }
}
/**
 * find the in-play item that a picked (pointed-at) item id refers to.
 *
 * Usually this is just the item in the room. But when the current preview has
 * changed or removed that item (eg a door preview cutting into a wall), picking
 * points at the item as it was committed, not as previewed, so that is what
 * this returns - taken from the room's `itemsOverriddenByPreview`.
 */
export const findItemInPlayForPicking = (
  roomState: EditorRoomState,
  itemId: EditorRoomItemId,
): EditorUnionOfAllItemInPlayTypes | undefined =>
  roomState.itemsOverriddenByPreview[itemId] ?? roomState.items[itemId];
