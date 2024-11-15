import { spriteSheet } from "@/sprites/spriteSheet";
import { createSprite } from "../createSprite";

import type { ItemInPlay } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

export const playableAppearance = ({
  type,
  state: { action, facing, teleporting },
}: ItemInPlay<CharacterName>) => {
  if (action === "death") {
    return createSprite({
      frames: spriteSheet.animations[`${type}.fadeOut`],
    });
  }

  if (teleporting !== null) {
    if (teleporting.phase === "out") {
      return createSprite({
        frames: spriteSheet.animations[`${type}.fadeOut`],
      });
    }

    if (teleporting.phase === "in") {
      return createSprite({
        frames: spriteSheet.animations[`${type}.fadeOut`].toReversed(),
      });
    }
  }
  if (action === "moving") {
    return createSprite({
      frames: spriteSheet.animations[`${type}.walking.${facing}`],
    });
  } else if (
    action === "falling" &&
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
