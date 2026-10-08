import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

/**
 * the metal step stools
 */
export class PushableBlockBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  override isHeavy(): boolean {
    return true;
  }

  override castsShadowWhileStoodOn(): boolean {
    // the stepstool sees its own shadow through the hole in it
    return true;
  }
}
