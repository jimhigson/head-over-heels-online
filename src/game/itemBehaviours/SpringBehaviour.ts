import { blockSizePx } from "../physics/mechanicsConstants";
import { shadowSmallRound } from "../render/shadows/shadowCastTextures";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

export class SpringBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowSmallRound,
      castsShadowWhileStoodOn: true,
      isPortable: true,
    });
  }

  // TODO: confirm that springs give one extra block of height for head - this is
  // correct for heels (from 1 to 2) but that could be a doubling
  override readonly jumpBoostPx = blockSizePx.z;
}
