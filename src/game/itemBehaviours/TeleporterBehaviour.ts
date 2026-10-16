import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";
import { TeleporterMixin } from "./TeleporterMixin";

export class TeleporterBehaviour extends TeleporterMixin(ItemBehaviour) {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }
}
