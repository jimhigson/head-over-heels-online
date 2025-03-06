import type { CarriedItem } from "../../../model/ItemStateMap";
import { createSprite } from "../createSprite";

export const createCarriedSprite = (carrying: CarriedItem<string>) => {
  return createSprite(
    carrying.type === "spring" ? "spring.released"
    : carrying.type === "sceneryPlayer" ?
      carrying.config.which === "head" ?
        "head.walking.towards.2"
      : "heels.walking.away.2"
    : carrying.config.style,
  );
};
