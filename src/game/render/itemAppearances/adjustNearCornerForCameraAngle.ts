import { type Container } from "pixi.js";

import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { getItemInPlayTimes } from "../../../model/times";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXyOnContainer } from "../projections";

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
