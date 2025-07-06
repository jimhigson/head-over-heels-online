import type { SetRequired } from "type-fest";
import { isSolid } from "../../../game/physics/itemPredicates";
import { unprojectScreenXyToWorldXyzOnFace } from "../../../game/render/projections";
import {
  zEdges,
  sortByZPairs,
} from "../../../game/render/sortZ/sortItemsByDrawOrder";
import { iterateRoomItems } from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  type Xy,
  type Xyz,
  originXyz,
  addXyz,
  orthoPlaneForNormal,
} from "../../../utils/vectors/vectors";
import type {
  EditorUnionOfAllItemInPlayTypes,
  EditorRoomItemId,
  EditorRoomState,
} from "../../editorTypes";
import type { Tool } from "../../Tool";
import type { MaybePointingAtSomething } from "./PointingAt";
import { pointerIntersectionFace } from "./pointerIntersectionFace";
import { pointerIntersectionCorner } from "./pointerIntersectionCorner";
import { pointerIntersectionEdge } from "./pointerIntersectionEdge";
import { pointIntersectsItemAABB } from "./pointIntersectsItemAABB";

export const itemVisibleBounds = (
  item: EditorUnionOfAllItemInPlayTypes,
  tool: Tool,
): {
  position: Xyz;
  aabb: Xyz;
} => {
  if (tool.type === "item" && item.type === "wall") {
    // putting items on walls is a special case since we want to be able
    // to point high on walls, above where they render
    return {
      position: item.state.position,
      aabb: item.aabb,
    };
  }

  return {
    position: addXyz(item.state.position, item.renderAabbOffset ?? originXyz),
    aabb: item.renderAabb ?? item.aabb,
  };
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
    // this is how doors can get put on invisible walls, because they have fixed z-indexes
    // (but they prefer visible walls)
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

export const roundXyzProjection = (
  /** the world position to round */
  positionXyzPx: Xyz,

  /**
   * the plane projected onto to get the @see positionXyzPx -
   * applies rounding, but not in the direction of a normal to this plane
   */
  planeNormal: Xyz,
  tool: Tool,
  halfGridResolution: boolean,
) => {
  const noHalfSteps =
    !halfGridResolution ||
    // the tool placement granularity can change depending on the tool - doors can never be placed at half-steps:
    (tool.type === "item" && tool.item.type === "door");

  // potentially allow items to be positioned on half-blocks for x and y
  // (unlike original hoh)
  const incrementXy = noHalfSteps ? blockSizePx.w : blockSizePx.w / 2;
  const incrementZ = blockSizePx.h;

  const biasXy =
    noHalfSteps ?
      // not sure why, but feels more natural to have 0 here when doing whole blocks
      0
      // bias centres the position towards the bottom of the square while the pointer points to
      // the middle of it
    : incrementXy / 2;
  const biasZ = incrementZ / 2;

  const orthoPlane = orthoPlaneForNormal(planeNormal);

  return {
    x:
      orthoPlane === "yz" ?
        // normal to plane: snap to the nearest increment since could be placing based off an item that is
        // smaller than a full block (face pointer is on is not on a (half) grid boundary)
        Math.round(positionXyzPx.x / incrementXy) * incrementXy
        // tangent to plane: apply rounding to place on the surface in half-block increments:
      : Math.floor((positionXyzPx.x - biasXy) / incrementXy) * incrementXy,
    y:
      orthoPlane === "xz" ?
        Math.round(positionXyzPx.y / incrementXy) * incrementXy
      : Math.floor((positionXyzPx.y - biasXy) / incrementXy) * incrementXy,
    z:
      orthoPlane === "xy" ?
        Math.round(positionXyzPx.z / incrementZ) * incrementZ
      : Math.floor((positionXyzPx.z + biasZ) / incrementZ) * incrementZ,
  };
};

const worldPositionOnFaceForScreenPosition = (
  { state: { position }, aabb }: EditorUnionOfAllItemInPlayTypes,
  // vector pointing to the face, from the middle of the item.
  // the face we are projecting onto is described by all vectors at a normal to
  // this vector
  plane: Xyz,
  gameEngineXy: Xy,
  tool: Tool,
  halfGridResolution: boolean,
): Xyz => {
  const pointOnPlane = {
    x: position.x + (plane.x < 0 ? 0 : aabb.x),
    y: position.y + (plane.y < 0 ? 0 : aabb.y),
    z: position.z + (plane.z < 0 ? 0 : aabb.z),
  };

  const cursorWorldPosition = unprojectScreenXyToWorldXyzOnFace(
    pointOnPlane,
    plane,
    gameEngineXy,
  );

  // apply rounding: don't let the rounding take the xyz point
  // off the face, only allow it to snap to a new position on that face.
  const rounded = roundXyzProjection(
    cursorWorldPosition,
    plane,
    tool,
    halfGridResolution,
  );

  return rounded;
};
/** get what is considered a pointable item for the given tool. Ie, what
 * can be pointed at and interacted with by the tool */
const isPointableItemForTool =
  (tool: Tool) => (item: EditorUnionOfAllItemInPlayTypes) => {
    const basicPointability = isSolid(item) && !item.isCursorPreview;

    if (tool.type === "item" && tool.item.type === "door") {
      // when placing a door, we can only place it on (so only point at) walls
      return basicPointability && item.type === "wall";
    }

    // for everything else, no special rules
    return basicPointability;
  };
export const findPointerPointingAt = (
  scrXy: Xy,
  room: EditorRoomState,
  tool: Tool,
  halfGridResolution: boolean,
): MaybePointingAtSomething => {
  // find the item(s) that the mouse is over:
  const itemPointingTo = frontItem(
    Array.from(
      iterateRoomItems(room.items)
        .filter(isPointableItemForTool(tool))
        .filter(pointIntersectsItemAABB(scrXy, tool)),
    ),
  );

  const roomId = room.id;

  if (itemPointingTo) {
    const face = pointerIntersectionFace(itemPointingTo, scrXy, tool);

    return {
      roomId,
      scrXy,
      world: {
        itemId: itemPointingTo.id,
        onItem: {
          face,
          corner: pointerIntersectionCorner(itemPointingTo, scrXy, tool),
          edge: pointerIntersectionEdge(itemPointingTo, scrXy, face, tool),
        },
        position: worldPositionOnFaceForScreenPosition(
          itemPointingTo,
          face,
          scrXy,
          tool,
          halfGridResolution,
        ),
      },
    };
  } else {
    return {
      roomId,
      scrXy,
      world: undefined,
      // no world - did not find anything in the world that we were pointing at
    };
  }
};
