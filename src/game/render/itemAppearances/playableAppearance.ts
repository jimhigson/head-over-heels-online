import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemAppearanceOptions,
  ItemAppearanceReturn,
} from "./appearanceUtils";
import { stackedSprites } from "./stackedSprites";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { OutlineFilter } from "../../../filters/colorReplace/outlineFilter";
import type {
  PlayableActionState,
  PlayableTeleportingState,
} from "../../../model/ItemStateMap";
import type {
  IndividualCharacterName,
  CharacterName,
} from "../../../model/modelTypes";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import { vectorClosestDirectionXy4 } from "../../../utils/vectors/vectors";
import type { PlayableItem } from "../../physics/itemPredicates";
import { store } from "../../../store/store";

const renderSprite = ({
  name,
  action,
  facingXy4,
  teleporting,
  highlighted,
}: {
  name: IndividualCharacterName;
  action: PlayableActionState;
  facingXy4: DirectionXy4;
  teleporting: PlayableTeleportingState | null;
  highlighted: boolean;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: `${name}.fadeOut`,
    };
  }

  if (teleporting !== null) {
    if (teleporting.phase === "out") {
      return {
        animationId: `${name}.fadeOut`,
      };
    }

    if (teleporting.phase === "in") {
      return {
        animationId: `${name}.fadeOut`,
      };
    }
  }

  const filter =
    highlighted ?
      new OutlineFilter(
        name === "head" ?
          spritesheetPalette.metallicBlue
        : spritesheetPalette.pink,
        store.getState().upscale.gameEngineUpscale,
      )
    : undefined;

  if (action === "moving") {
    return {
      animationId: `${name}.walking.${facingXy4}`,
      filter,
    };
  } else if (
    action === "falling" &&
    name === "head" &&
    (facingXy4 === "towards" || facingXy4 === "right")
  ) {
    return { texture: `head.falling.${facingXy4}`, filter };
  } else {
    if (name === "head" && (facingXy4 === "towards" || facingXy4 === "right")) {
      return {
        animationId: `head.idle.${facingXy4}`,
        filter,
      };
    }
    return { texture: `${name}.walking.${facingXy4}.2`, filter };
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
}: ItemAppearanceOptions<C, string>): ItemAppearanceReturn<CharacterName> => {
  const {
    type,
    state: { action, facing, teleporting },
  } = item;

  const facingXy4 = vectorClosestDirectionXy4(facing);

  const highlighted =
    item.type === "headOverHeels" ?
      // cheat by just looking if head is highlighted inside the symbiosis and use that result for both
      // characters - they were switched to at the same time so it doesn't matter:
      isHighlighted((item as PlayableItem<"headOverHeels">).state.head)
    : isHighlighted((item as PlayableItem<"head" | "heels">).state);

  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy4 !== facingXy4 ||
    currentlyRenderedProps.teleportingPhase !== (teleporting?.phase ?? null) ||
    currentlyRenderedProps.highlighted !== highlighted;

  if (!render) {
    return "no-update";
  }

  return {
    container:
      type === "headOverHeels" ?
        stackedSprites({
          top: renderSprite({
            name: "head",
            action,
            facingXy4,
            teleporting,
            highlighted,
          }),
          bottom: renderSprite({
            name: "heels",
            action,
            facingXy4,
            teleporting,
            highlighted,
          }),
        })
      : createSprite(
          renderSprite({
            name: type,
            action,
            facingXy4,
            teleporting,
            highlighted,
          }),
        ),
    renderProps: {
      action,
      facingXy4,
      teleportingPhase: teleporting?.phase ?? null,
      highlighted,
    },
  };
};
