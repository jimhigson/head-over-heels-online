import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { type Xy } from "../../../utils/vectors/vectors";
import { itemTypesExemptFromNearCornerOffset } from "../../render/item/itemRender/itemTypesExemptFromNearCornerOffset";
import { renderAabbOffsetForCameraAngle } from "./renderAabbOffsetForCameraAngle";

/**
 * Re-derives every item's `renderAabbOffset` for the current camera angle.
 *
 * An item's footprint sprite is anchored at its near (camera-closest) corner, so the
 * render box it draws into has to follow the sprite by the near-corner offset - otherwise
 * the render box (used by the z-sort and the bounding-box overlay) lags behind where the
 * sprite actually is. That offset depends only on the camera angle (and the item's base
 * cell), not on the item's live position, so this runs once per rotation - a cold path -
 * rather than recomputing in the consumers per frame.
 *
 * Items whose sprites are not near-corner anchored (walls/doors/floors) don't follow this
 * formula at all - they position their own rendering and seed their offsets when
 * reloadStructureForCamera rebuilds them, so they are skipped here. The items that
 * actually need this are the non-reloaded ones (e.g. tower blocks).
 */
export const applyRenderAabbCameraShift = <RoomId extends string>(
  /** mutated in place: each item's renderAabbOffset is rewritten for the camera angle */
  room: RoomState<RoomId, string>,
  cameraAngle: Xy,
): void => {
  for (const item of roomItemsIterable(room.items)) {
    if (
      item.renderAabb === undefined ||
      itemTypesExemptFromNearCornerOffset.has(item.type)
    ) {
      continue;
    }
    const { renderAabbOffset } = renderAabbOffsetForCameraAngle(
      item,
      cameraAngle,
    );
    item.renderAabbOffset = renderAabbOffset;
  }
};
