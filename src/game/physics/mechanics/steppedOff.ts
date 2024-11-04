import { FallingItemTypes, ItemInPlay } from "@/model/ItemInPlay";
import { MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { originXyz } from "@/utils/vectors";

/**
 * mechanic applied after walking = checks item has
 * stepped off the item it was standing on
 */
export function steppedOff(
  playableItem: ItemInPlay<FallingItemTypes>,
): MechanicResult<FallingItemTypes> {
  const {
    state: { standingOn },
    position: pos,
    aabb: bb,
  } = playableItem;

  if (standingOn === null) {
    return unitMechanicalResult;
  }

  const { position: onPos, aabb: onBB } = standingOn;

  const steppedOff =
    pos.x > onPos.x + onBB.x ||
    pos.x + bb.x < onPos.x ||
    pos.y > onPos.y + onBB.y ||
    pos.y + bb.y < onPos.y;

  if (steppedOff) {
    return {
      stateDelta: {
        standingOn: null,
      },
      // we don't update the poston with the falling since the falling mechanic
      // should do that
      positionDelta: originXyz,
    };
  }

  return unitMechanicalResult;
}
