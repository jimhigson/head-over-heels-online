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
  a.state.box[axis] < b.state.box[axis] + b.state.box[`${axis}d`] &&
  a.state.box[axis] + a.state.box[`${axis}d`] > b.state.box[axis];

/**
 * The test for if a moonbase wall should show a transparent window instead
 * of drawn scenery behind it:
 *
 * If the wall occludes a non-"none" floor behind it at
 * the current camera angle - ie there is more room to see through the wall's window.
 */
export const wallOccludesRoomFloorBehind = (
  wall: UnionOfAllItemInPlayTypes,
  alongAxis: AxisXy,
  zGraph: ItemZGraph,
): boolean =>
  zGraph.scanForEdgeToMatching(
    wall,
    (maybeBehindWall) =>
      isFloor(maybeBehindWall) &&
      maybeBehindWall.config.floorType !== "none" &&
      // not a floor this wall runs along the edge of (the floor it bounds):
      !overlapsOnAxis(wall, maybeBehindWall, alongAxis),
  );

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
