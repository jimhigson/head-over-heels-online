import { ItemBehaviour, type ItemBehaviourOptions } from "./ItemBehaviour";

/**
 * items that nothing collides with solidly, or stands on
 */
export class NonSolidBehaviour extends ItemBehaviour {
  constructor(options: ItemBehaviourOptions = {}) {
    super({
      isNonSolid: true,
      ...options,
    });
  }
}
