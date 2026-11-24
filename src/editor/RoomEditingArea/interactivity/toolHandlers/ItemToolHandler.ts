import { produce } from "immer";

import type { DoorConfig } from "../../../../model/json/ItemConfigMap";
import {
  isXyRectInFootprints,
  roomFootprints,
} from "../../../../model/roomFootprints";
import { completeTimesXy } from "../../../../model/times";
import type { EditorRootState, EditorThunk } from "../../../../store/store";
import { noopFunction } from "../../../../utils/empty";
import {
  addXyz,
  nonZeroVectorClosestDirectionXy4,
  originXyz,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import type {
  EditorItemInPlayUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../../editorTypes";
import { selectPreviewOnlyJsonItemIds } from "../../../slice/levelEditorSelectors";
import {
  applyItemTool,
  resetPreviewedEdits,
  resetTool,
  selectTool,
} from "../../../slice/levelEditorSlice";
import type { OpenRoom } from "../../../slice/OpenRoom";
import { maybeLayoutNode } from "../../../slice/PaneLayout";
import type { ApplyToolToRoomJsonPayload } from "../../../slice/reducers/applyItemToolReducers";
import { snapGridResolution } from "../../../snapGridResolution";
import { addingItemCollisionCheck } from "../../cursor/editWouldCollide";
import { itemToolPutDownLocation } from "../../cursor/itemToolPutDownLocation";
import type { MaybePointingAtSomething } from "../../cursor/PointingAt";
import { isDoorToolItems } from "../isDoorToolItems";
import { jsonItemAndIdForInPlayItem } from "../jsonItemAndIdForInPlayItem";
import {
  candidatesAround,
  nearestCandidatesFirst,
  placementReachBlocks,
} from "../nearestCandidatesFirst";
import type { ItemToolItem, ItemToolItems, Tool } from "../Tool";
import type {
  MouseDownParams,
  MouseLeaveParams,
  MouseMoveParams,
  MouseUpParams,
  ToolHandler,
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
 * where the item tool would put its items down with the pointer here, and the
 * item pointed at - or undefined if pointing at nothing it can go on, or if it
 * would collide everywhere near there. Searches around where it is pointed,
 * on the same level, for the nearest spot where all of the items fit - except
 * doors, which only go where they are pointed, on the wall
 */
const itemToolPlacement = (
  storeState: EditorRootState,
  roomState: EditorRoomState,
  pointingAt: MaybePointingAtSomething,
  /**
   * the open room being pointed into, for its camera angle
   */
  { cameraAngle }: OpenRoom,
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

  const { items: toolItems } = tool;
  const [firstItem] = toolItems;
  const putDownBlockPosition = itemToolPutDownLocation(
    pointingAt,
    pointingAtItem,
    firstItem,
  );
  if (putDownBlockPosition === undefined) {
    return undefined;
  }

  const isDoor = isDoorToolItems(toolItems);
  // if tool is a door, need to switch it to the side of the wall it is on.
  // otherwise, the collision detection will fail to detect properly because
  // different door directions would protrude differently
  const itemsToPlace: ItemToolItems =
    isDoor ?
      [
        produce(toolItems[0], (draft) => {
          const wall = pointingAtItem as EditorItemInPlayUnion<"wall">;
          (draft.config as DoorConfig<EditorRoomId>).direction =
            nonZeroVectorClosestDirectionXy4(wall.config.direction);
        }),
      ]
      // otherwise, can use as-is
    : toolItems;

  const previewOnlyJsonItemIds = selectPreviewOnlyJsonItemIds(
    storeState,
    roomState.id,
  );
  const wouldCollideChecks = itemsToPlace.map((itemToPlace) =>
    addingItemCollisionCheck({
      roomState,
      itemTool: itemToPlace,
      // the tool's own preview isn't in the way:
      previewOnlyJsonItemIds,
    }),
  );
  const candidates =
    isDoor ?
      [putDownBlockPosition]
    : nearestCandidatesFirst(
        candidatesAround(
          putDownBlockPosition,
          snapGridResolution(
            storeState.levelEditor.gridResolution,
            itemsToPlace.map((itemToPlace) => itemToPlace.type),
          ),
          placementReachBlocks,
        ),
        putDownBlockPosition,
        cameraAngle,
      );
  const footprints = roomFootprints(roomState.roomJson);
  const isInRoom = (itemToPlace: ItemToolItem, candidate: Xyz) => {
    const { x, y } = addXyz(candidate, itemToPlace.position ?? originXyz);
    const times = completeTimesXy(
      ("times" in itemToPlace.config ? itemToPlace.config.times : undefined) ??
        {},
    );
    return isXyRectInFootprints(
      footprints,
      { x, y },
      { x: x + times.x, y: y + times.y },
    );
  };
  const blockPosition = candidates.find((candidate) =>
    itemsToPlace.every(
      (itemToPlace, i) =>
        // doors go in the walls themselves:
        (isDoor || isInRoom(itemToPlace, candidate)) &&
        !wouldCollideChecks[i](
          addXyz(candidate, itemToPlace.position ?? originXyz),
        ),
    ),
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
