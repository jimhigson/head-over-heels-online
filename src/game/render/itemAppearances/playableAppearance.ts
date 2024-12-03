import { spriteSheet } from "@/sprites/spriteSheet";
import { createSprite } from "../createSprite";

import type { CharacterName } from "@/model/modelTypes";
import type { ItemAppearanceOptions } from "./appearanceUtils";

export const playableAppearance = <C extends CharacterName>({
  item: {
    type,
    state: { action, facing, teleporting },
  },
  currentlyRenderedProps,
}: ItemAppearanceOptions<C, string>) => {
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy4 !== facing ||
    currentlyRenderedProps.teleportingPhase !== (teleporting?.phase ?? null);

  if (!render) {
    return;
  }

  const renderSprite = () => {
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

  return {
    container: renderSprite(),
    renderProps: {
      action,
      facingXy4: facing,
      teleportingPhase: teleporting?.phase ?? null,
    },
  };
};
