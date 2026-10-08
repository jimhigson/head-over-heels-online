import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { LocomotiveBehaviour } from "./locomotion/LocomotiveBehaviour";

/**
 * the sandwiches
 */
export class MovingPlatformBehaviour extends LocomotiveBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  override isHeavy(): boolean {
    return true;
  }
}
