import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  shadowBarrier,
  shadowBarrierFlipX,
} from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class BarrierBehaviour extends ItemBehaviour {
  constructor() {
    super({
      isCuboidWarped: true,
    });
  }

  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    barrier: ItemTypeUnion<"barrier", RoomId, RoomItemId>,
  ) {
    return barrier.config.axis === "x" ? shadowBarrierFlipX : shadowBarrier;
  }
}
