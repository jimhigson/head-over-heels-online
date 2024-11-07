import { pixiSpriteSheet } from "@/sprites/pixiSpriteSheet";
import { createSprite } from "../createSprite";
import { ItemAppearance } from "./ItemAppearances";
import {
  headBlinkAnimationSpeed,
  headWalkAnimationSpeed,
} from "./animationSpeeds";
import { ItemInPlay } from "@/model/ItemInPlay";
import { CharacterName } from "@/model/modelTypes";

export const playerAppearance: ItemAppearance<CharacterName> = ({
  type,
  state: { movement, facing, teleporting },
}: ItemInPlay<CharacterName>) => {
  if (teleporting !== null) {
    if (teleporting.phase === "out") {
      return createSprite({
        frames: pixiSpriteSheet.animations[`${type}.teleport`],
        animationSpeed: headWalkAnimationSpeed,
      });
    }

    if (teleporting.phase === "in") {
      return createSprite({
        frames: pixiSpriteSheet.animations[`${type}.teleport`].reverse(),
        animationSpeed: headWalkAnimationSpeed,
      });
    }
  }
  if (movement === "moving") {
    return createSprite({
      frames: pixiSpriteSheet.animations[`${type}.walking.${facing}`],
      animationSpeed: headWalkAnimationSpeed,
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
        frames: pixiSpriteSheet.animations[`head.idle.${facing}`],
        animationSpeed: headBlinkAnimationSpeed,
      });
    }
    return createSprite(`${type}.walking.${facing}.2`);
  }
};
