import { produce } from "immer";

import { type DoorConfig } from "../../../../model/json/ItemConfigMap";
import { roomWallBounds } from "../../../../model/roomWallBounds";
import { completeTimesXy } from "../../../../model/times";
import {
  type EditorRootState,
  type EditorThunk,
} from "../../../../store/store";
import { noopFunction } from "../../../../utils/empty";
import {
  nonZeroVectorClosestDirectionXy4,
  type Xyz,
} from "../../../../utils/vectors/vectors";
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
import { type OpenRoom } from "../../../slice/OpenRoom";
import { maybeLayoutNode } from "../../../slice/PaneLayout";
import { type ApplyToolToRoomJsonPayload } from "../../../slice/reducers/applyItemToolReducers";
import { snapGridResolution } from "../../../snapGridResolution";
import { addingItemCollisionCheck } from "../../cursor/editWouldCollide";
import { itemToolPutDownLocation } from "../../cursor/itemToolPutDownLocation";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import {
  candidatesAround,
  nearestCandidatesFirst,
  placementReachBlocks,
} from "../nearestCandidatesFirst";
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

/**
 * where the item tool would put its item down with the pointer here, and the
 * item pointed at - or undefined if pointing at nothing it can go on, or if it
 * would collide everywhere near there. Searches around where it is pointed,
 * on the same level, for the nearest spot that fits - except doors, which only
 * go where they are pointed, on the wall
 */
const itemToolPlacement = (
  storeState: EditorRootState,
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
  /**
   * the open room being pointed into, for its camera angle and sub-room
   */
  { cameraAngle, subRoomId }: OpenRoom,
): ApplyToolToRoomJsonPayload | undefined => {
  if (pointingAt.world === undefined) {
    return undefined;
  }
  const tool = selectItemTool(storeState);

  const pointingAtItem = findItemInPlayForPicking(
    roomState,
    pointingAt.world.itemId,
  );
  const asJson = jsonItemAndIdForInPlayItem(storeState, pointingAtItem);
  if (pointingAtItem === undefined || asJson === undefined) {
    return undefined;
  }
  const [, jsonItem] = asJson;

  const putDownBlockPosition = itemToolPutDownLocation(
    pointingAt,
    pointingAtItem,
    tool.item,
  );
  if (putDownBlockPosition === undefined) {
    return undefined;
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

  const wouldCollideAt = addingItemCollisionCheck({
    roomState,
    itemTool: toolItem,
    // the tool's own preview isn't in the way:
    previewOnlyJsonItemIds: selectPreviewOnlyJsonItemIds(
      storeState,
      roomState.id,
    ),
  });
  const candidates =
    item.type === "door" ?
      [putDownBlockPosition]
    : nearestCandidatesFirst(
        candidatesAround(
          putDownBlockPosition,
          snapGridResolution(storeState.levelEditor.gridResolution, [
            item.type,
          ]),
          placementReachBlocks,
        ),
        putDownBlockPosition,
        cameraAngle,
      );
  const walls = roomWallBounds(roomState.roomJson, subRoomId);
  const times = completeTimesXy(
    ("times" in toolItem.config ? toolItem.config.times : undefined) ?? {},
  );
  const isInsideWalls = ({ x, y }: Xyz) =>
    x >= walls.from.x &&
    x + times.x <= walls.to.x &&
    y >= walls.from.y &&
    y + times.y <= walls.to.y;
  const blockPosition = candidates.find(
    (candidate) =>
      // doors go in the walls themselves:
      (item.type === "door" || isInsideWalls(candidate)) &&
      !wouldCollideAt(candidate),
  );
  if (blockPosition === undefined) {
    return undefined;
  }

  return {
    roomId: roomState.id,
    blockPosition,
    pointedAtItemJson: jsonItem,
    preview: true,
    timestamp: Date.now(),
  };
};

export class ItemToolHandler implements ToolHandler {
  handleMouseMove({
    openRoomId,
    pointingAtChanged,
    roomState,
    pointingAt,
  }: MouseMoveParams): EditorThunk {
    if (!pointingAtChanged) {
      return noopFunction;
    }
    return (dispatch, getState) => {
      // remove old previews
      dispatch(resetPreviewedEdits());

      const storeState = getState();
      const openRoom = maybeLayoutNode(
        storeState.levelEditor.layout,
        openRoomId,
      );
      // the open room may have been closed or replaced (its pane is going):
      if (openRoom === undefined) {
        return;
      }
      const placement = itemToolPlacement(
        storeState,
        roomState,
        pointingAt,
        openRoom,
      );
      if (placement !== undefined) {
        dispatch(applyItemTool(placement));
      }
    };
  }

  handleMouseUp({
    openRoomId,
    roomState,
    pointingAt,
    isClick,
  }: MouseUpParams): EditorThunk {
    if (!isClick) {
      return noopFunction;
    }
    return (dispatch, getState) => {
      if (pointingAt.world === undefined) {
        // if using item tool, clicking on nothing is a quick way to go back to
        // the pointer:
        dispatch(resetTool());
        return;
      }

      // checked afresh, rather than trusting a preview to still be right:
      const storeState = getState();
      const openRoom = maybeLayoutNode(
        storeState.levelEditor.layout,
        openRoomId,
      );
      // the open room may have been closed or replaced (its pane is going):
      if (openRoom === undefined) {
        return;
      }
      const placement = itemToolPlacement(
        storeState,
        roomState,
        pointingAt,
        openRoom,
      );
      if (placement !== undefined) {
        // eg a door adds the room beyond it, which its preview doesn't:
        dispatch(applyItemTool({ ...placement, preview: false }));
      }
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
