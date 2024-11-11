import { spriteSheet } from "@/sprites/spriteSheet";
import { createSprite } from "../createSprite";

import type { ItemInPlay } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

export const playerAppearance = ({
  type,
  state: { movement, facing, teleporting },
}: ItemInPlay<CharacterName>) => {
  if (teleporting !== null) {
    if (teleporting.phase === "out") {
      return createSprite({
        frames: spriteSheet.animations[`${type}.teleport`],
      });
    }

    if (teleporting.phase === "in") {
      return createSprite({
        frames: spriteSheet.animations[`${type}.teleport`].toReversed(),
      });
    }
  }
  if (movement === "moving") {
    return createSprite({
      frames: spriteSheet.animations[`${type}.walking.${facing}`],
    });
  } else if (
    movement === "falling" &&
    type === "head" &&
    (facing === "towards" || facing === "right")
  ) {
    return createSprite(`head.falling.${facing}`);
  } else {
    if (type === "head" && (facing === "towards" || facing === "right")) {
      return createSprite({
        frames: spriteSheet.animations[`head.idle.${facing}`],
      });
    }
    return createSprite(`${type}.walking.${facing}.2`);
  }
};
