import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { isWallDirectionHiddenAtAngle } from "../../../model/json/WallJsonConfig";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";

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
 * the item's fixed z-index at this camera angle: its own fixed index, or the
 * non-rendering index for a wall on a hidden (camera-facing) side. Undefined
 * means the item participates in draw-ordering
 */
export const effectiveFixedZIndex = (
  item: {
    fixedZIndex?: number;
    type?: ItemInPlayType;
    config?: unknown;
  },
  cameraAngle: Xy,
): number | undefined =>
  (
    (item.fixedZIndex ??
    (item.type === "wall" &&
      isWallDirectionHiddenAtAngle(
        (item.config as { direction: Xyz }).direction,
        cameraAngle,
      )))
  ) ?
    nonRenderingItemFixedZIndex
  : undefined;

/**
 * whether the item takes part in draw-order sorting at this camera angle.
 * Items with a fixed z-index (including walls on hidden, camera-facing sides)
 * never do: they are excluded from the z index computation (at the broad phase)
 * and never compared
 */
export const participatesInDrawOrder = (
  item: Parameters<typeof effectiveFixedZIndex>[0],
  cameraAngle: Xy,
): boolean => effectiveFixedZIndex(item, cameraAngle) === undefined;
