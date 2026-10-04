import { itemBehaviourKey } from "../../../model/ItemInPlay";
import { type Xy } from "../../../utils/vectors/vectors";
import { type DrawOrderComparable } from "./DrawOrderComparable";

/*
 * floating text appears above all 'normal' items. This number must be larger than the
 * number of items in the room to guarantee that.
 */
export const floatingTextFixedZIndex = 1_000;

/**
 * non-rendering items should be given this fixedZ. Since rendering items' zIndexes
 * when sorted start at 0, this will never intersect the rendering items.
 */
export const nonRenderingItemFixedZIndex = -2;

/**
 * whether the item takes part in draw-order sorting at this camera angle.
 * Items with a fixed z-index (including walls on hidden, camera-facing sides)
 * never do: they are excluded from the z index computation (at the broad phase)
 * and never compared
 */
export const participatesInDrawOrder = (
  item: DrawOrderComparable,
  cameraAngle: Xy,
): boolean =>
  item[itemBehaviourKey].fixedZIndexAtAngle(item, cameraAngle) === undefined;
