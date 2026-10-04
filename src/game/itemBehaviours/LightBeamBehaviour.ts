import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * a beam of light emitted from a lamp - recast by its lamp every tick:
 * emitted from the lamp, reflected by mirrors, and stopped by solid items
 */
export class LightBeamBehaviour extends ItemBehaviour {
  constructor() {
    super({
      // light beams lay out their tile sprites at world offsets themselves, and
      // their aabb changes length in-life as the beam recasts - a once-applied
      // container offset would go stale. They receive no shadows, so lose
      // nothing by being outside the offset container:
      isExemptFromNearCornerOffset: true,
      isCuboidWarped: true,
    });
  }

  /**
   * light beams are solid only to monsters - monsters will not walk into
   * light. Everything else (players included) passes straight through,
   * blocking the beam with their body as they do
   */
  override isNonSolid<RoomId extends string, RoomItemId extends string>(
    _lightBeam: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    toucher?: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return toucher === undefined || toucher.type !== "monster";
  }

  /**
   * nothing can stand on light
   */
  override isStandable(): boolean {
    return false;
  }
}
