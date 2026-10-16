import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";
import { TeleporterMixin } from "./TeleporterMixin";

export class PortableTeleporterBehaviour extends TeleporterMixin(
  FreeItemBehaviour,
) {
  constructor() {
    super({
      isPortable: true,
    });
  }
}
