import { getRoomItem, iterateRoomItems } from "../../model/RoomState";
import { projectAabbToHexagonCorners } from "../../game/render/sortZ/projectAabbToHexagonCorners";
import type { EditorRoomState } from "../EditorRoomId";
import {
  cursorId,
  type EditorRoomItemId,
  type EditorUnionOfAllItemInPlayTypes,
} from "../EditorRoomId";
import type { Xyz } from "../../utils/vectors/vectors";
import { addXyz, subXy, type Xy } from "../../utils/vectors/vectors";
import {
  sortByZPairs,
  zEdges,
} from "../../game/render/sortZ/sortItemsByDrawOrder";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import type { SetRequired } from "type-fest";
import {
  projectScreenXyToWorldXyz,
  projectWorldXyzToScreenXy,
} from "../../game/render/projections";
import { blockSizePx } from "../../sprites/spritePivots";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { defaultBaseState } from "../../game/gameState/loadRoom/itemDefaultStates";
import { largeItemAabb } from "../../game/collision/boundingBoxes";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type { Tool } from "../Tool";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { selectTool } from "../slice/levelEditorSlice";
import { store } from "../../store/store";

// allow items to be positioned on half-blocks for x and y (unlike original hoh)
const incrementXy = blockSizePx.w / 2;
// bias centres the position towards the bottom of the square while the pointer points to
// the middle of it
const biasXy = incrementXy / 2;

const pointIntersectsItemAABB =
  ({ x, y }: Xy) =>
  (item: EditorUnionOfAllItemInPlayTypes) => {
    const { bottomCentre, topLeft, topRight } = projectAabbToHexagonCorners(
      item.state.position,
      item.renderAabb ?? item.aabb,
    );

    /*
     * check against each of 6 lines based on 3 [corners]:
     *
     *       /\
     *   y1 /  \ x2
     *[tl] /    \ [tr]
     *    |      |
     * z1 |      | z2
     *    |      |
     *     \    /
     *   x1 \  / y2
     *       \/
     *      [bc]
     */

    if (x < topLeft.x) {
      // z1
      return false;
    }
    if (x > topRight.x) {
      // z2
      return false;
    }
    if (y < topRight.y - (topRight.x - x) / 2) {
      // x2
      return false;
    }
    if (y < topLeft.y - (x - topLeft.x) / 2) {
      // y1
      return false;
    }
    if (y > bottomCentre.y - (x - bottomCentre.x) / 2) {
      // y2
      return false;
    }
    if (y > bottomCentre.y - (bottomCentre.x - x) / 2) {
      // x1
      return false;
    }
    return true;
  };

/**
 * if we already know that the pointer intersects an item, get the face the pointer is over
 */
const pointerIntersectionFace = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
): "top" | "towards" | "right" => {
  const { bottomCentre, topLeft, topRight } = projectAabbToHexagonCorners(
    item.state.position,
    item.renderAabb ?? item.aabb,
  );

  /*
   * find <face> by finding the side on each of 3 lines based on 3 [corners]:
   *            .
   *           / \
   *          /   \
   *         /     \
   *        /       \
   *  [tl] /  <Top>  \ [tr]
   *      |\         /|
   *      | \       / |
   *      |  \x   y/  |
   *      |   \   /   |
   *      |<Tw>\ /<Rt>|
   *       \    V    /
   *        \   |z  /
   *         \  |  /
   *          \ | /
   *           \|/
   *            V
   *           [bc]
   */
  const aboveXLine = y < topLeft.y - (topLeft.x - x) / 2;

  if (aboveXLine) {
    const aboveYLine = y < topRight.y - (x - topRight.x) / 2;

    return aboveYLine ? "top" : "right";
  } else {
    const leftOfZLine = x < bottomCentre.x;

    return leftOfZLine ? "towards" : "right";
  }
};

const isFixedZIndexItem = (
  i: EditorUnionOfAllItemInPlayTypes,
): i is SetRequired<EditorUnionOfAllItemInPlayTypes, "fixedZIndex"> =>
  i.fixedZIndex !== undefined;

const frontItem = (
  items: Array<EditorUnionOfAllItemInPlayTypes>,
): EditorUnionOfAllItemInPlayTypes | undefined => {
  if (items.every(isFixedZIndexItem)) {
    // all items have fixed z-index (don't work in topographic sort) - return
    // the highest from them:
    return items.toSorted((ia, ib) => ib.fixedZIndex - ia.fixedZIndex).at(0);
  }

  const topographicallySortableItems = items.filter(
    (i) => !isFixedZIndexItem(i),
  );

  if (topographicallySortableItems.length === 0) {
    return undefined;
  }

  if (topographicallySortableItems.length === 1) {
    return topographicallySortableItems[0];
  }

  const topographicallySortableItemsMap = Object.fromEntries(
    topographicallySortableItems.map((i) => [i.id, i]),
  ) as Record<EditorRoomItemId, EditorUnionOfAllItemInPlayTypes>;

  /**
   * note: zEdges will not include ids of items with fixed z order
   */
  const ze = zEdges(topographicallySortableItemsMap);
  const { order } = sortByZPairs(ze, topographicallySortableItemsMap);

  return topographicallySortableItemsMap[order[0]];
};

const cursorBlockPosition = (
  itemPointingTo: EditorUnionOfAllItemInPlayTypes,
  gameEngineXy: Xy,
) => {
  // for now, we're assuming the cursor is always on the top face of the item
  // - TODO: detect which face
  // TODO: this can probably be optimised, but is probably also fast enough 🤷‍♂️
  const topSurfaceOriginWorldXyz = addXyz(itemPointingTo.state.position, {
    z: itemPointingTo.aabb.z,
  });
  const topSurfaceOriginScreenXy = projectWorldXyzToScreenXy(
    topSurfaceOriginWorldXyz,
  );
  const offsetFromSurfaceOriginScreenXy = subXy(
    gameEngineXy,
    topSurfaceOriginScreenXy,
  );
  const offsetFromSurfaceOriginWorldXy = projectScreenXyToWorldXyz(
    offsetFromSurfaceOriginScreenXy,
  );
  const cursorWorldPosition = addXyz(
    topSurfaceOriginWorldXyz,
    offsetFromSurfaceOriginWorldXy,
  );

  const cursorWorldPositionRounded = {
    x: Math.floor((cursorWorldPosition.x - biasXy) / incrementXy) * incrementXy,
    y: Math.floor((cursorWorldPosition.y - biasXy) / incrementXy) * incrementXy,
    // no need to round in z:
    z: cursorWorldPosition.z,
  };

  return cursorWorldPositionRounded;
};

const mutateRoomWithCursorPosition = (
  room: EditorRoomState,
  cursorPayload: {
    position: Xyz;
    pointingToItemId: EditorRoomItemId;
  },
  tool: Tool | undefined,
) => {
  console.log("moving cursor to", cursorPayload);

  const { pointingToItemId, position } = cursorPayload;
  const existingCursor = getRoomItem(cursorId, room.items);

  if (existingCursor) {
    existingCursor.state.position = position;
    existingCursor.state.pointingToItemId = pointingToItemId;
    existingCursor.state.tool = tool;
  } else {
    room.items[cursorId] = {
      type: "cursor",
      id: cursorId,
      state: {
        ...defaultBaseState(),
        position,
        pointingToItemId,
        tool,
      },
      config: {},
      aabb: largeItemAabb,
    };
  }
};
const mutateRoomRemoveCursor = (room: EditorRoomState) => {
  delete room.items[cursorId];
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();

  const upscale = useAppSelector(selectUpscale);
  const dispatch = useAppDispatch();
  const currentEditingRoomState = useEditorRoomState();

  useEffect(() => {
    application.stage.eventMode = "none";
    if (renderArea === null) {
      return;
    }

    const handlePointerMove = (event: MouseEvent) => {
      const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;
      //const totalUpscale = upscale.gameEngineUpscale * upscale.cssUpscale;
      const gameEngineXy: Xy = {
        x: event.x / totalUpscale - upscale.gameEngineScreenSize.x / 2,
        y: event.y / totalUpscale - upscale.gameEngineScreenSize.y + 16,
      };

      // find the item(s) that the mouse is over:
      const itemPointingTo = frontItem(
        Array.from(
          iterateRoomItems(currentEditingRoomState.items)
            .filter((item) => item.type !== "cursor")
            .filter(pointIntersectsItemAABB(gameEngineXy)),
        ),
      );

      if (itemPointingTo) {
        const face = pointerIntersectionFace(itemPointingTo, gameEngineXy);
        if (face === "top") {
          const cursorWorldBlockPositionRounded = cursorBlockPosition(
            itemPointingTo,
            gameEngineXy,
          );

          mutateRoomWithCursorPosition(
            currentEditingRoomState,
            {
              position: cursorWorldBlockPositionRounded,
              pointingToItemId: itemPointingTo.id,
            },
            selectTool(store.getState() as RootStateWithLevelEditorSlice),
          );
        } else {
          mutateRoomRemoveCursor(currentEditingRoomState);
        }
      } else {
        mutateRoomRemoveCursor(currentEditingRoomState);
      }
    };

    renderArea.addEventListener("mousemove", handlePointerMove);

    return () => {
      renderArea.removeEventListener("mousemove", handlePointerMove);
    };
  }, [
    application.stage,
    upscale,
    renderArea,
    dispatch,
    currentEditingRoomState,
  ]);
};
