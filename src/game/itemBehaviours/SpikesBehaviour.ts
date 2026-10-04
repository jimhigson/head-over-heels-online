import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class SpikesBehaviour extends ItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  /**
   * deadly only from above
   */
  override isDeadlyToStandOn(): boolean {
    return true;
  }
}
