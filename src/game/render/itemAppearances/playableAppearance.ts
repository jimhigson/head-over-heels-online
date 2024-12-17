import { spriteSheet } from "@/sprites/spriteSheet";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";

import type {
  CharacterName,
  IndividualCharacterName,
} from "@/model/modelTypes";
import type { ItemAppearanceOptions } from "./appearanceUtils";

import type { Direction4Xy } from "@/utils/vectors/vectors";
import { stackedSprites } from "./stackedSprites";
import type {
  PlayableActionState,
  PlayableTeleportingState,
} from "@/model/ItemStateMap";

const renderSprite = (
  name: IndividualCharacterName,
  action: PlayableActionState,
  facing: Direction4Xy,
  teleporting: PlayableTeleportingState | null,
): CreateSpriteOptions => {
  if (action === "death") {
    return {
      frames: spriteSheet.animations[`${name}.fadeOut`],
    };
  }

  if (teleporting !== null) {
    if (teleporting.phase === "out") {
      return {
        frames: spriteSheet.animations[`${name}.fadeOut`],
      };
    }

    if (teleporting.phase === "in") {
      return {
        frames: spriteSheet.animations[`${name}.fadeOut`].toReversed(),
      };
    }
  }
  if (action === "moving") {
    return {
      frames: spriteSheet.animations[`${name}.walking.${facing}`],
    };
  } else if (
    action === "falling" &&
    name === "head" &&
    (facing === "towards" || facing === "right")
  ) {
    return `head.falling.${facing}`;
  } else {
    if (name === "head" && (facing === "towards" || facing === "right")) {
      return {
        frames: spriteSheet.animations[`head.idle.${facing}`],
      };
    }
    return `${name}.walking.${facing}.2`;
  }
};

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

  return {
    container:
      type === "headOverHeels" ?
        stackedSprites({
          top: renderSprite("head", action, facing, teleporting),
          bottom: renderSprite("heels", action, facing, teleporting),
        })
      : createSprite(renderSprite(type, action, facing, teleporting)),
    renderProps: {
      action,
      facingXy4: facing,
      teleportingPhase: teleporting?.phase ?? null,
    },
  };
};
