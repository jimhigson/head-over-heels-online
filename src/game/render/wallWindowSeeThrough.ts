import type { UnionOfAllItemInPlayTypes } from "../../model/itemInPlay/ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import type { RoomState } from "../../model/RoomState";
import type { SceneryName, Wall } from "../../sprites/planets";
import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import {
  type AxisXy,
  boxMaxOnAxis,
  type Xy,
} from "../../utils/vectors/vectors";
import type { RenderBoxes } from "./renderBox/makeItemRenderBoxAtCameraAngle";
import { DrawOrderBroadPhase } from "./sortZ/DrawOrderBroadPhase";
import { zComparator } from "./sortZ/zComparator";

/** whether two items' extents overlap on a single axis (touching does not count) */
const overlapsOnAxis = (
  a: UnionOfAllItemInPlayTypes,
  b: UnionOfAllItemInPlayTypes,
  axis: AxisXy,
): boolean =>
  a.state.box[axis] < boxMaxOnAxis(b.state.box, axis) &&
  boxMaxOnAxis(a.state.box, axis) > b.state.box[axis];

/**
 * the wall and the floors it is compared against, projected at the quarter
 * angle. Reused across calls - only filled when a wall re-decides
 */
const comparedItems = new Set<UnionOfAllItemInPlayTypes>();
const quarterAngleBroadPhase = new DrawOrderBroadPhase(cameraAngleBase);

/**
 * floors the see-through test considers: real floor that this wall does not
 * run along the edge of (ie, not the floor it bounds)
 */
const isCandidateFloorBehind = (
  wall: UnionOfAllItemInPlayTypes,
  alongAxis: AxisXy,
  maybeFloor: UnionOfAllItemInPlayTypes,
): boolean =>
  maybeFloor.type === "floor" &&
  maybeFloor.config.floorType !== "none" &&
  !overlapsOnAxis(wall, maybeFloor, alongAxis);

/**
 * The test for if a moonbase wall should show a transparent window instead
 * of drawn scenery behind it:
 *
 * If the wall is drawn in front of a non-"none" floor at the settled quarter
 * angle - ie there is more room to see through the wall's window. Compared
 * pair-by-pair at the quarter angle, so the answer does not depend on the
 * part-way angle a camera turn happens to be at when the wall re-renders.
 */
export const wallOccludesRoomFloorBehind = (
  wall: UnionOfAllItemInPlayTypes,
  alongAxis: AxisXy,
  room: RoomState<string, string>,
  /** the drawn extents at the quarter angle, owned by the room renderer */
  renderBoxes: RenderBoxes<UnionOfAllItemInPlayTypes>,
  cameraQuarterAngle: Xy,
): boolean => {
  comparedItems.clear();
  comparedItems.add(wall);
  for (const item of roomItemsIterable(room.items)) {
    if (isCandidateFloorBehind(wall, alongAxis, item)) {
      comparedItems.add(item);
    }
  }
  if (comparedItems.size === 1) {
    return false;
  }

  quarterAngleBroadPhase.setQuarterAngle(cameraQuarterAngle);
  quarterAngleBroadPhase.updateManyItems(
    comparedItems,
    renderBoxes,
    cameraQuarterAngle,
  );

  for (const item of comparedItems) {
    if (
      item !== wall &&
      // >0: the wall is in front of the floor
      zComparator(wall, item, quarterAngleBroadPhase, renderBoxes) > 0
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
