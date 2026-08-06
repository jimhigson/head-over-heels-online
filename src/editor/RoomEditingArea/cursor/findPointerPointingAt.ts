import { isSolid } from "../../../game/physics/itemPredicates";
import { blockSizePx } from "../../../game/physics/mechanicsConstants";
import { unprojectScreenXyToWorldXyzOnFace } from "../../../game/render/projections";
import { roomItemsIterable } from "../../../model/RoomState";
import { orthoPlaneForNormal } from "../../../utils/vectors/orthoPlane";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomRenderer,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import { type GridResolution } from "../../slice/levelEditorSlice";
import { type Tool } from "../interactivity/Tool";
import { frontItemFromPointerIntersections } from "./frontItemFromPointerIntersections";
import { pointerIntersectionCorner } from "./pointerIntersectionCorner";
import { pointerIntersectionEdge } from "./pointerIntersectionEdge";
import { pointerIntersectionFace } from "./pointerIntersectionFace";
import {
  type MaybePointingAtSomething,
  type PointingAtNothing,
} from "./PointingAt";
import {
  type PointerItemIntersection,
  type PointerItemMaybeIntersection,
  pointIntersectsItemAABB,
} from "./pointIntersectsItemAABB";

export const roundXyzProjection = (
  /** the world position to round */
  positionXyzPx: Xyz,

  /**
   * the plane projected onto to get the @see positionXyzPx -
   * applies rounding, but not in the direction of a normal to this plane
   */
  planeNormal: Xyz,
  tool: Tool,
  gridResolutionParam: GridResolution,
) => {
  const gridResolution: GridResolution =
    // the tool placement granularity can change depending on the tool - doors can never be placed at half-steps:
    tool.type === "item" && tool.item.type === "door" ? 1 : gridResolutionParam;

  // potentially allow items to be positioned on half-blocks for x and y
  // (unlike original hoh)
  const incrementXy = blockSizePx.x * gridResolution;
  const incrementZ = blockSizePx.z;

  const biasXy =
    gridResolution === 1 ?
      // not sure why, but for full blocks it feels more natural to have no bias
      0
      // bias centres the position towards the bottom of the square while the pointer points to
      // the middle of it
    : blockSizePx.x / 2;
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
  { state: { box } }: EditorUnionOfAllItemInPlayTypes,
  // vector pointing to the face, from the middle of the item.
  // the face we are projecting onto is described by all vectors at a normal to
  // this vector
  plane: Xyz,
  gameEngineXy: Xy,
  tool: Tool,
  gridResolution: GridResolution,
  cameraAngle: Xy,
): Xyz => {
  const pointOnPlane = {
    x: box.x + (plane.x < 0 ? 0 : box.xd),
    y: box.y + (plane.y < 0 ? 0 : box.yd),
    z: box.z + (plane.z < 0 ? 0 : box.zd),
  };

  const cursorWorldPosition = unprojectScreenXyToWorldXyzOnFace(
    pointOnPlane,
    plane,
    gameEngineXy,
    cameraAngle,
  );

  // apply rounding: don't let the rounding take the xyz point
  // off the face, only allow it to snap to a new position on that face.
  const rounded = roundXyzProjection(
    cursorWorldPosition,
    plane,
    tool,
    gridResolution,
  );

  return rounded;
};
/** get what is considered a pointable item for the given tool. Ie, what
 * can be pointed at and interacted with by the tool */
const isPointableItemForTool =
  (tool: Tool, previewOnlyJsonItemIds: ReadonlySet<EditorRoomItemId>) =>
  (item: EditorUnionOfAllItemInPlayTypes) => {
    if (
      item.jsonItemId !== undefined &&
      previewOnlyJsonItemIds.has(item.jsonItemId)
    ) {
      // the tool's own preview is not a surface in the room - the pointer goes
      // through it, onto whatever it is being previewed against
      return false;
    }

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
  gridResolution: GridResolution,
  cameraAngle: Xy,
  /**
   * the editor's current room renderer, whose render boxes (drawn extents)
   * picking selects by. Undefined = no renderer exists yet (first load, or
   * between renderer swaps), so nothing has been drawn and there is nothing
   * to point at
   */
  roomRenderer: Pick<EditorRoomRenderer, "renderBoxes"> | undefined,
  /**
   * items that are in the room only because they are being previewed as an
   * addition - they are drawn, but can't be pointed at
   */
  previewOnlyJsonItemIds: ReadonlySet<EditorRoomItemId>,
): MaybePointingAtSomething => {
  if (roomRenderer === undefined) {
    return { roomId: room.id, scrXy, world: undefined };
  }
  const { renderBoxes } = roomRenderer;

  type IntersectionsArray = Array<
    [EditorUnionOfAllItemInPlayTypes, PointerItemIntersection]
  >;

  const intersectionsArray: IntersectionsArray = roomItemsIterable(room.items)
    .filter(isPointableItemForTool(tool, previewOnlyJsonItemIds))
    .map((item): [typeof item, PointerItemMaybeIntersection] => [
      item,
      pointIntersectsItemAABB(scrXy, tool, item, cameraAngle, renderBoxes),
    ])
    .filter(
      // remove non-intersecting from the tuple array
      (tup): tup is [(typeof tup)[0], PointerItemIntersection] =>
        tup[1] !== "non-intersecting",
    )
    .toArray();

  // find the item(s) that the mouse is over:
  const itemPointingTo: EditorUnionOfAllItemInPlayTypes | undefined =
    frontItemFromPointerIntersections(
      intersectionsArray,
      cameraAngle,
      renderBoxes,
    );

  const roomId = room.id;

  if (itemPointingTo) {
    const face = pointerIntersectionFace(
      itemPointingTo,
      scrXy,
      tool,
      cameraAngle,
    );

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
            corner: pointerIntersectionCorner(
              itemPointingTo,
              scrXy,
              tool,
              cameraAngle,
            ),
            edge: pointerIntersectionEdge(
              itemPointingTo,
              scrXy,
              face,
              tool,
              cameraAngle,
            ),
          },
          position: worldPositionOnFaceForScreenPosition(
            itemPointingTo,
            face,
            scrXy,
            tool,
            gridResolution,
            cameraAngle,
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
