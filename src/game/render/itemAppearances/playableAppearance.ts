import { spriteSheet } from "@/sprites/spriteSheet";
import { createSprite } from "../createSprite";

import type { CharacterName } from "@/model/modelTypes";
import { applyAppearance, type ItemAppearance } from "./appearanceUtils";

export const playableAppearance: ItemAppearance<CharacterName> = ({
  type,
  state: { action, facing, teleporting },
  stateLastFrame: lastRenderedState,
  renderContainer,
}): undefined => {
  const shouldRender =
    lastRenderedState === undefined ||
    facing !== lastRenderedState.facing ||
    action !== lastRenderedState.action ||
    teleporting?.phase !== lastRenderedState.teleporting?.phase;

  if (!shouldRender) {
    return;
  }

  const render = () => {
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

  applyAppearance(renderContainer!, render());
};
