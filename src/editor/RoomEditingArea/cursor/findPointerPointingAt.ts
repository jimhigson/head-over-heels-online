import { isSolid } from "../../../game/physics/itemPredicates";
import { unprojectScreenXyToWorldXyzOnFace } from "../../../game/render/projections";
import { iterateRoomItems } from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  type Xy,
  type Xyz,
  orthoPlaneForNormal,
} from "../../../utils/vectors/vectors";
import type {
  EditorUnionOfAllItemInPlayTypes,
  EditorRoomState,
} from "../../editorTypes";
import type { Tool } from "../../Tool";
import type { MaybePointingAtSomething, PointingAtNothing } from "./PointingAt";
import { pointerIntersectionFace } from "./pointerIntersectionFace";
import { pointerIntersectionCorner } from "./pointerIntersectionCorner";
import { pointerIntersectionEdge } from "./pointerIntersectionEdge";
import type {
  PointerItemIntersection,
  PointerItemMaybeIntersection,
} from "./pointIntersectsItemAABB";
import { pointIntersectsItemAABB } from "./pointIntersectsItemAABB";
import { frontItemFromPointerIntersections } from "./frontItemFromPointerIntersections";

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
    const itemIsSolid = isSolid(item);

    if (tool.type === "item" && tool.item.type === "door") {
      // when placing a door, we can only place it on (so only point at) walls
      return itemIsSolid && item.type === "wall";
    }

    // for everything else, no special rules
    return itemIsSolid;
  };
export const findPointerPointingAt = (
  scrXy: Xy,
  room: EditorRoomState,
  tool: Tool,
  halfGridResolution: boolean,
): MaybePointingAtSomething => {
  const intersections = iterateRoomItems(room.items)
    .filter(isPointableItemForTool(tool))
    .map((item): [typeof item, PointerItemMaybeIntersection] => [
      item,
      pointIntersectsItemAABB(scrXy, tool, item),
    ])
    .filter(
      (tup): tup is [(typeof tup)[0], PointerItemIntersection] =>
        tup[1] !== "non-intersecting",
    );

  // find the item(s) that the mouse is over:
  const itemPointingTo = frontItemFromPointerIntersections(
    Array.from(intersections),
  );

  const roomId = room.id;

  if (itemPointingTo) {
    const face = pointerIntersectionFace(itemPointingTo, scrXy, tool);

    // special case - some items get an immutable empty object for their stoodOnBy
    // because they are impossible to stand on in-game. Detect this and skip them.
    // (eg, the tops of walls)
    const skipDueToImpossibleToStandOn =
      face.z > 0 && !Object.isExtensible(itemPointingTo.state.stoodOnBy);

    if (!skipDueToImpossibleToStandOn) {
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
    }
  }

  return {
    roomId,
    scrXy,
    world: undefined,
    // no world - did not find anything in the world that we were pointing at
  } satisfies PointingAtNothing;
};
