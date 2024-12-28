import { spriteSheet } from "@/sprites/spriteSheet";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";

import type {
  CharacterName,
  IndividualCharacterName,
} from "@/model/modelTypes";
import type {
  ItemAppearanceOptions,
  ItemAppearanceReturn,
} from "./appearanceUtils";

import type { Direction4Xy } from "@/utils/vectors/vectors";
import { stackedSprites } from "./stackedSprites";
import type {
  PlayableActionState,
  PlayableTeleportingState,
} from "@/model/ItemStateMap";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import { OutlineFilter } from "@/filters/colorReplace/outlineFilter";
import { spritesheetPalette } from "gfx/spritesheetPalette";

const renderSprite = ({
  name,
  action,
  facing,
  teleporting,
  highlighted,
  scaleFactor,
}: {
  name: IndividualCharacterName;
  action: PlayableActionState;
  facing: Direction4Xy;
  teleporting: PlayableTeleportingState | null;
  highlighted: boolean;
  scaleFactor: number;
}): CreateSpriteOptions => {
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

  const filter =
    highlighted ?
      new OutlineFilter(
        name === "head" ?
          spritesheetPalette.metallicBlue
        : spritesheetPalette.pink,
        scaleFactor,
      )
    : undefined;

  if (action === "moving") {
    return {
      frames: spriteSheet.animations[`${name}.walking.${facing}`],
      filter,
    };
  } else if (
    action === "falling" &&
    name === "head" &&
    (facing === "towards" || facing === "right")
  ) {
    return { texture: `head.falling.${facing}`, filter };
  } else {
    if (name === "head" && (facing === "towards" || facing === "right")) {
      return {
        frames: spriteSheet.animations[`head.idle.${facing}`],
        filter,
      };
    }
    return { texture: `${name}.walking.${facing}.2`, filter };
  }
};

export const isHighlighted = ({
  gameTime,
  switchedToAt,
}: {
  switchedToAt: number;
  gameTime: number;
}) => switchedToAt + 500 > gameTime;

export const playableAppearance = <C extends CharacterName>({
  item,
  currentlyRenderedProps,
  renderOptions,
}: ItemAppearanceOptions<C, string>): ItemAppearanceReturn<CharacterName> => {
  const {
    type,
    state: { action, facing, teleporting },
  } = item;

  const highlighted =
    item.type === "headOverHeels" ?
      // cheat by just looking if head is highlighted inside the symbiosis and use that result for both
      // characters - they were switched to at the same time so it doesn't matter:
      isHighlighted((item as PlayableItem<"headOverHeels">).state.head)
    : isHighlighted((item as PlayableItem<"head" | "heels">).state);

  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy4 !== facing ||
    currentlyRenderedProps.teleportingPhase !== (teleporting?.phase ?? null) ||
    currentlyRenderedProps.highlighted !== highlighted;

  if (!render) {
    return;
  }

  return {
    container:
      type === "headOverHeels" ?
        stackedSprites({
          top: renderSprite({
            name: "head",
            action,
            facing,
            teleporting,
            highlighted,
            scaleFactor: renderOptions.scaleFactor,
          }),
          bottom: renderSprite({
            name: "heels",
            action,
            facing,
            teleporting,
            highlighted,
            scaleFactor: renderOptions.scaleFactor,
          }),
        })
      : createSprite(
          renderSprite({
            name: type,
            action,
            facing,
            teleporting,
            highlighted,
            scaleFactor: renderOptions.scaleFactor,
          }),
        ),
    renderProps: {
      action,
      facingXy4: facing,
      teleportingPhase: teleporting?.phase ?? null,
      highlighted,
    },
  };
};
