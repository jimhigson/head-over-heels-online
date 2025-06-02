import { iterateRoomItems } from "../../model/RoomState";
import { projectAabbToHexagonCorners } from "../../game/render/sortZ/projectAabbToHexagonCorners";
import type { EditorRoomState } from "../EditorRoomId";
import {
  type EditorRoomItemId,
  type EditorUnionOfAllItemInPlayTypes,
} from "../EditorRoomId";
import type { Xyz } from "../../utils/vectors/vectors";
import { type Xy } from "../../utils/vectors/vectors";
import {
  sortByZPairs,
  zEdges,
} from "../../game/render/sortZ/sortItemsByDrawOrder";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Upscale } from "../../store/slices/upscale/upscaleSlice";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import type { SetRequired } from "type-fest";
import { unprojectScreenXyToWorldXyzOnFace } from "../../game/render/projections";
import { blockSizePx } from "../../sprites/spritePivots";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import type { PointingAt } from "./cursor/PointingAt";
import { applyToolAtPosition, selectTool } from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import {
  mutateRoomRemoveCursorPreviews,
  mutateRoomAddCursorItems,
} from "./cursor/mutateRoomWithCursorPointingAt";
import {
  previewItemsForCursor,
  itemToolPutDownLocation,
} from "./cursor/itemToolPutDownLocation";
import { emptyArray } from "../../utils/empty";
import { isSolid } from "../../game/physics/itemPredicates";
import nanoEqual from "nano-equal";
import type { Tool } from "../Tool";

// allow items to be positioned on half-blocks for x and y (unlike original hoh)
const incrementXy = blockSizePx.w / 2;
const incrementZ = blockSizePx.h;
// bias centres the position towards the bottom of the square while the pointer points to
// the middle of it
const biasXy = incrementXy / 2;
const biasZ = incrementZ / 2;

const pointIntersectsItemAABB =
  ({ x, y }: Xy) =>
  (item: EditorUnionOfAllItemInPlayTypes) => {
    const { bottomCentre, topLeft, topRight } = projectAabbToHexagonCorners(
      item.state.position,
      // using aabb, not renderAabb, so doors can be placed on walls above where they render
      item.aabb,
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

type IntersectionFace = "top" | "towards" | "right";

/**
 * if we already know that the pointer intersects an item, get the face the pointer is over
 */
const pointerIntersectionFace = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
): IntersectionFace => {
  const { bottomCentre, topLeft, topRight } = projectAabbToHexagonCorners(
    item.state.position,
    // using aabb, not renderAabb, so doors can be placed on walls above where they render
    item.aabb,
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

const worldPositionOnFaceForScreenPosition = (
  { state: { position }, aabb }: EditorUnionOfAllItemInPlayTypes,
  face: IntersectionFace,
  gameEngineXy: Xy,
): Xyz => {
  const plane =
    face === "top" ? "xy"
    : face === "towards" ? "xz"
    : "yz";

  const cursorWorldPosition = unprojectScreenXyToWorldXyzOnFace(
    gameEngineXy,
    position,
    aabb,
    plane,
  );

  // apply rounding, but not in the direction of a normal to the face we
  // just unprojected onto. Ie, don't let the rounding take the xyz point
  // off the face, only allow it to snap to a new position on that face.
  return {
    x:
      plane === "yz" ?
        // normal to plane: snap to the nearest increment since could be placing based off an item that is
        // smaller than a full block (face pointer is on is not on a (half) grid boundary)
        Math.round(cursorWorldPosition.x / incrementXy) * incrementXy
        // tangent to plane: apply rounding to place on the surface in half-block increments:
      : Math.floor((cursorWorldPosition.x - biasXy) / incrementXy) *
        incrementXy,
    y:
      plane === "xz" ?
        Math.round(cursorWorldPosition.y / incrementXy) * incrementXy
      : Math.floor((cursorWorldPosition.y - biasXy) / incrementXy) *
        incrementXy,
    z:
      plane === "xy" ?
        Math.round(cursorWorldPosition.z / incrementZ) * incrementZ
      : Math.floor((cursorWorldPosition.z + biasZ) / incrementZ) * incrementZ,
  };
};

/** get what is considered a pointable item for the given tool. Ie, what
 * can be pointed at and interacted with by the tool */
const isPointableItemForTool =
  (tool: Tool) => (item: EditorUnionOfAllItemInPlayTypes) => {
    const basicPointability =
      isSolid(item) && item.type !== "cursor" && !item.isCursorPreview;

    if (tool.type === "item" && tool.item.type === "door") {
      // when placing a door, we can only place it on (so only point at) walls
      return basicPointability && item.type === "wall";
    }

    // for everything else, no special rules
    return basicPointability;
  };

const getPointerPointingAt = (
  pointerXy: Xy,
  room: EditorRoomState,
  tool: Tool,
): PointingAt | undefined => {
  // find the item(s) that the mouse is over:
  const itemPointingTo = frontItem(
    Array.from(
      iterateRoomItems(room.items)
        .filter(isPointableItemForTool(tool))
        .filter(pointIntersectsItemAABB(pointerXy)),
    ),
  );

  if (itemPointingTo) {
    const face = pointerIntersectionFace(itemPointingTo, pointerXy);

    return {
      itemId: itemPointingTo.id,
      face,
      position: worldPositionOnFaceForScreenPosition(
        itemPointingTo,
        face,
        pointerXy,
      ),
    };
  } else {
    return undefined;
  }
};

const upscaledMousePosition = (upscale: Upscale, event: MouseEvent): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;
  //const totalUpscale = upscale.gameEngineUpscale * upscale.cssUpscale;
  return {
    x: event.x / totalUpscale - upscale.gameEngineScreenSize.x / 2,
    y: event.y / totalUpscale - upscale.gameEngineScreenSize.y + 16,
  };
};

export const useRoomEditorInteractivity = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();

  const upscale = useAppSelector(selectUpscale);
  const dispatch = useAppDispatch();
  const roomState = useEditorRoomState();
  const pointingAtRef = useRef<PointingAt | undefined>(undefined);

  useEffect(() => {
    application.stage.eventMode = "none";
    if (renderArea === null) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const upscaledMouseXy = upscaledMousePosition(upscale, event);

      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(
        store.getState() as RootStateWithLevelEditorSlice,
      );

      const pointingAt = getPointerPointingAt(upscaledMouseXy, roomState, tool);

      if (nanoEqual(pointingAt, pointingAtRef.current)) {
        // no change - stop here
        return;
      }
      pointingAtRef.current = pointingAt;

      if (pointingAt !== undefined) {
        switch (tool.type) {
          case "item": {
            const previewItems = previewItemsForCursor(
              pointingAt,
              roomState,
              tool.item,
            );
            const valid = previewItems !== undefined;

            mutateRoomRemoveCursorPreviews(roomState);
            mutateRoomAddCursorItems({
              room: roomState,
              pointingAt,
              valid,
              includeCursor: !valid,
              previewItems: previewItems ?? emptyArray,
            });
            break;
          }
          case "pointer": {
            mutateRoomRemoveCursorPreviews(roomState);
            mutateRoomAddCursorItems({
              room: roomState,
              pointingAt,
              valid: true,
              includeCursor: true,
              previewItems: emptyArray,
            });
            break;
          }
          default:
            tool satisfies never;
        }
      } else {
        mutateRoomRemoveCursorPreviews(roomState);
      }
    };

    const handleMouseClick = (_event: MouseEvent) => {
      // no point in re-running this effect when it changes so select it 'live':
      const tool = selectTool(
        store.getState() as RootStateWithLevelEditorSlice,
      );

      switch (tool.type) {
        case "item": {
          const currentPointingAt = pointingAtRef.current;
          if (currentPointingAt === undefined) {
            return;
          }
          const putDownItems = previewItemsForCursor(
            currentPointingAt,
            roomState,
            tool.item,
          );
          if (putDownItems === undefined) {
            return;
          }
          dispatch(
            applyToolAtPosition({
              blockPosition: itemToolPutDownLocation(
                currentPointingAt,
                tool.item,
              )!,
            }),
          );
          break;
        }
        case "pointer": {
          // TODO: implement item selection
          break;
        }
        default:
          tool satisfies never;
      }
    };

    renderArea.addEventListener("mousemove", handleMouseMove);
    renderArea.addEventListener("click", handleMouseClick);

    return () => {
      renderArea.removeEventListener("mousemove", handleMouseMove);
      renderArea.removeEventListener("click", handleMouseClick);
    };
  }, [application.stage, upscale, renderArea, dispatch, roomState]);
};
