import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { type SceneryName, type Wall } from "../../sprites/planets";
import { type AxisXy } from "../../utils/vectors/vectors";
import { isFloor } from "../physics/itemPredicates";
import { type ItemZGraph } from "./ItemRenderContexts";

/** whether two items' extents overlap on a single axis (touching does not count) */
const overlapsOnAxis = (
  a: UnionOfAllItemInPlayTypes,
  b: UnionOfAllItemInPlayTypes,
  axis: AxisXy,
): boolean =>
  a.state.position[axis] < b.state.position[axis] + b.aabb[axis] &&
  a.state.position[axis] + a.aabb[axis] > b.state.position[axis];

/**
 * Whether a wall occludes standable floor of its own room that lies behind it at
 * the current camera angle - ie there is more room to see through the wall to.
 *
 * Read straight from the resolved z-graph (ground truth for what is drawn in front
 * of what): the wall is in front of a same-room standable floor item that it does
 * not run along the edge of. A wall stands just outside the floor it bounds, so it
 * overlaps that floor along its own length axis (`alongAxis`); the floor of another
 * part of the room, occluded diagonally, does not. Excluding the floor the wall
 * bounds is what tells a genuinely occluding wall (concave floor plan) apart from
 * an ordinary far wall, whose only behind-floor is the one it bounds.
 */
export const wallOccludesRoomFloorBehind = (
  wall: UnionOfAllItemInPlayTypes,
  alongAxis: AxisXy,
  zEdges: ItemZGraph,
): boolean => {
  const n = zEdges.nodeCount;
  for (let i = 0; i < n; i++) {
    const behind = zEdges.nodeAt(i);
    if (
      isFloor(behind) &&
      behind.config.floorType === "standable" &&
      zEdges.hasEdge(behind, wall) &&
      // not a floor this wall runs along the edge of (the floor it bounds):
      !overlapsOnAxis(wall, behind, alongAxis)
    ) {
      return true;
    }
  }
  return false;
};

/**
 * the see-through (clear) variant of a moonscape window tile, used when the wall
 * looks onto more room rather than out to space. Only moonbase windows have a
 * clear variant; every other tile (incl. solid `coil`) has none, so is left as
 * authored. A moonscape (`window1/2/3`) pane cannot honestly sit in front of room
 * floor - "where is the moonscape" - so it becomes the clear cut-out instead.
 */
export const seeThroughWallTile = (
  planet: SceneryName,
  tile: Wall<SceneryName>,
): undefined | Wall<SceneryName> =>
  (
    planet === "moonbase" &&
    (tile === "window1" || tile === "window2" || tile === "window3")
  ) ?
    "window-clear"
  : undefined;
