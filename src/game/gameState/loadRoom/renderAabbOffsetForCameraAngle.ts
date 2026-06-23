import { type Aabb, originXyz, type Xy } from "../../../utils/vectors/vectors";

type WithRenderAabb = {
  aabb: Aabb;
  renderAabb?: Aabb;
  baseRenderAabbOffset?: Aabb;
};

/**
 * The camera-current renderAabbOffset, derived from the base-angle offset.
 *
 * The render box is larger than the collision aabb (it covers the sprite's overdraw).
 * Its near (camera-closest) corner must sit on the item's true aabb near corner - the
 * same corner the footprint sprite is anchored to - with the overdraw spilling out the
 * far side. On a reversed axis that means offsetting the box by `aabb - renderAabb` (a
 * negative - minus the overdraw); on a non-reversed axis the box's min corner already is
 * the near corner, so there is no offset. The authored base offset is added on top.
 *
 * Returns {} when the item has no render box, so it can be spread into an item literal at
 * load or assigned onto the item at rotation.
 */
export const renderAabbOffsetForCameraAngle = (
  { aabb, renderAabb, baseRenderAabbOffset }: WithRenderAabb,
  cameraAngle: Xy,
): { renderAabbOffset?: Aabb } => {
  if (renderAabb === undefined) {
    return {};
  }
  const base = baseRenderAabbOffset ?? originXyz;
  return {
    renderAabbOffset: {
      x:
        base.x +
        (cameraAngle.x + cameraAngle.y < 0 ? aabb.x - renderAabb.x : 0),
      y:
        base.y +
        (cameraAngle.x - cameraAngle.y < 0 ? aabb.y - renderAabb.y : 0),
      z: base.z,
    },
  };
};
