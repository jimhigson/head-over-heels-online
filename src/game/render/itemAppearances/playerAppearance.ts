import { pixiSpriteSheet } from "@/sprites/pixiSpriteSheet";
import { createSprite } from "../createSprite";
import { ItemAppearance } from "./ItemAppearances";
import {
  headBlinkAnimationSpeed,
  headWalkAnimationSpeed,
} from "./animationSpeeds";
import { ItemInPlay } from "@/model/ItemInPlay";

export const playerAppearance: ItemAppearance<"head" | "heels"> = ({
  type,
  state: { movement, facing },
}: ItemInPlay<"head" | "heels">) => {
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
