import { type Container } from "pixi.js";

import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { getItemInPlayTimes } from "../../../model/times";
import { originXy, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { itemTypesExemptFromNearCornerOffset } from "../item/itemRender/itemTypesExemptFromNearCornerOffset";
import {
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenXyOnContainer,
  projectWorldXyzToScreenY,
} from "../projections";

/**
 * the world-space vector from an item's origin to the (camera-closest) corner its
 * footprint sprite anchors at: one base cell (`aabb/times` per axis) from the origin,
 * on whichever axes the camera has reversed (`cos+sin<0` for x, `cos-sin<0` for y).
 * Zero at the base angle, where the near corner is the origin.
 */
export const nearCornerOffsetWorldXyz = (
  item: UnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
  /**
   * the box whose footprint the anchored art covers - the physics aabb for
   * most art, but callers whose art follows a different box (eg shadow casts
   * matching a rendered box smaller than the physics box) pass that instead
   */
  box: Xyz = item.aabb,
): Xyz => {
  const times = getItemInPlayTimes(item);
  return {
    x: cameraAngle.x + cameraAngle.y < 0 ? box.x / times.x : 0,
    y: cameraAngle.x - cameraAngle.y < 0 ? box.y / times.y : 0,
    z: 0,
  };
};

/**
 * the projected (screen px) near-corner offset at a point part-way through a
 * camera rotation: eased between the from-angle's offset and the to-angle's.
 * Every renderer that anchors to - or registers against - a non-warp item's
 * drawn art mid-turn must use this SAME shared offset (the art's own anchor,
 * and any cyclic-render carve baked from that art), or they drift apart by up
 * to a base cell through the turn
 */
export const transitionNearCornerOffsetXy = (
  item: UnionOfAllItemInPlayTypes,
  /**
   * the continuous angle the turn started from (not necessarily a quarter -
   * a mid-turn retarget re-anchors it)
   */
  fromAngle: Xy,
  /** the quarter angle the turn eases towards */
  toAngle: Xy,
  /** eased progress 0..1 (hermiteEase of the transition's linear progress) */
  eased: number,
): Xy => {
  if (itemTypesExemptFromNearCornerOffset.has(item.type)) {
    return originXy;
  }
  const fromWorld = nearCornerOffsetWorldXyz(item, fromAngle);
  const toWorld = nearCornerOffsetWorldXyz(item, toAngle);
  const fromX = projectWorldXyzToScreenX(fromWorld, fromAngle);
  const fromY = projectWorldXyzToScreenY(fromWorld, fromAngle);
  const toX = projectWorldXyzToScreenX(toWorld, toAngle);
  const toY = projectWorldXyzToScreenY(toWorld, toAngle);
  return {
    x: fromX + (toX - fromX) * eased,
    y: fromY + (toY - fromY) * eased,
  };
};

/**
 * A sprite depicts its item's footprint anchored at the item's near (camera-closest)
 * corner - the visual bottom of the drawn sprite. The item container is placed at the
 * item's projected world origin (local 0,0), so to put a footprint sprite where it
 * belongs it is offset by the projected vector from the origin to that near corner
 * ({@link nearCornerOffsetWorldXyz}). The wireframe bounding box is drawn at true
 * projected positions (no offset), so a sprite placed here coincides with its box.
 */
export const adjustNearCornerForCameraAngle = (
  item: UnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
  container: Container,
): void => {
  projectWorldXyzToScreenXyOnContainer(
    nearCornerOffsetWorldXyz(item, cameraAngle),
    cameraAngle,
    container,
  );
};
