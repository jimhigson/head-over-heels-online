import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemAppearanceOptions,
  ItemAppearanceReturn,
} from "./appearanceUtils";
import { stackSprites } from "./createStackedSprites";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { OutlineFilter } from "../filters/outlineFilter";
import type {
  IndividualCharacterName,
  CharacterName,
} from "../../../model/modelTypes";
import {
  lengthXyz,
  vectorClosestDirectionXy8,
} from "../../../utils/vectors/vectors";
import type { PlayableItem } from "../../physics/itemPredicates";
import { store } from "../../../store/store";
import type { Container, Filter } from "pixi.js";
import { AnimatedSprite } from "pixi.js";
import { playableWalkAnimationSpeed } from "../../../sprites/playableSpritesheetData";
import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import type { ItemRenderProps } from "./ItemRenderProps";
import { noFilters } from "../filters/paletteSwapFilters";
import { OneColourFilter } from "../filters/oneColourFilter";
import {
  afterDeathInvulnerabilityFlashPeriod,
  switchCharacterHighlightTime,
} from "../../physics/mechanicsConstants";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";

const playableCreateSpriteOptions = ({
  name,
  action,
  facingXy8,
  teleportingPhase,
}: ItemRenderProps<CharacterName> & {
  name: IndividualCharacterName;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: `${name}.fadeOut`,
    };
  }

  if (teleportingPhase === "out") {
    return {
      animationId: `${name}.fadeOut`,
    };
  }

  if (teleportingPhase === "in") {
    return {
      animationId: `${name}.fadeOut`,
    };
  }

  if (action === "moving") {
    return {
      animationId: `${name}.walking.${facingXy8}`,
    };
  }

  if (action === "falling") {
    const fallingTextureName = `${name}.falling.${facingXy8}`;

    if (isTextureId(fallingTextureName))
      return { textureId: fallingTextureName };
  }

  const idleAnimationId = `${name}.idle.${facingXy8}` as const;
  if (isAnimationId(idleAnimationId)) {
    // we have an idle anim for this character/direction
    return {
      animationId: idleAnimationId,
    };
  }
  return { textureId: `${name}.walking.${facingXy8}.2` };
};

export const isHighlighted = ({
  gameTime,
  switchedToAt,
}: {
  switchedToAt: number;
  gameTime: number;
}): boolean => switchedToAt + switchCharacterHighlightTime > gameTime;

export const isFlashing = (playableItem: PlayableItem): boolean => {
  if (!playerDiedRecently(playableItem)) {
    return false;
  }

  const { gameTime, lastDiedAt } =
    playableItem.type === "headOverHeels" ?
      // in this case, both playables in symbiosis should have the same shield
      // left, so arbitrarily choose head:
      playableItem.state.head
    : playableItem.state;

  const timeSinceLastDied = gameTime - lastDiedAt;

  return (
    timeSinceLastDied % afterDeathInvulnerabilityFlashPeriod <
    afterDeathInvulnerabilityFlashPeriod * 0.15
  );
};

const highlightColours = {
  head: spritesheetPalette.metallicBlue,
  heels: spritesheetPalette.pink,
};

const addFilterToContainer = (container: Container, newFilter: Filter) => {
  if (!container.filters) {
    // If no filters exist, assign the new filter directly
    container.filters = newFilter;
  } else if (Array.isArray(container.filters)) {
    // If filters exist as an array, append the new filter
    container.filters = [...container.filters, newFilter];
  } else {
    // If a single filter exists, convert to an array and append
    container.filters = [container.filters, newFilter];
  }
};

const removeFilterFromContainer = (
  container: Container,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterClass: new (...args: any[]) => Filter,
): void => {
  container.filters =
    Array.isArray(container.filters) ?
      container.filters.filter((f): f is Filter => !(f instanceof filterClass))
    : container.filters instanceof filterClass ? noFilters
    : container.filters;
};

const applyFilters = (
  name: IndividualCharacterName,
  { highlighted, flashing }: ItemRenderProps<CharacterName>,
  currentlyRenderedProps: ItemRenderProps<CharacterName> | undefined,
  container: Container,
) => {
  const currentlyHighlighted = currentlyRenderedProps?.highlighted ?? false;
  if (highlighted && !currentlyHighlighted) {
    addFilterToContainer(
      container,
      new OutlineFilter(
        highlightColours[name],
        store.getState().upscale.gameEngineUpscale,
      ),
    );
  } else if (!highlighted && currentlyHighlighted) {
    removeFilterFromContainer(container, OutlineFilter);
  }

  const currentlyFlashing = currentlyRenderedProps?.flashing ?? false;
  if (flashing && !currentlyFlashing) {
    addFilterToContainer(
      container,
      new OneColourFilter(highlightColours[name]),
    );
  } else if (!flashing && currentlyFlashing) {
    removeFilterFromContainer(container, OneColourFilter);
  }
};

export const playableAppearance = <C extends CharacterName>({
  item,
  currentlyRenderedProps,
  previousRendering,
}: ItemAppearanceOptions<C, string>): ItemAppearanceReturn<CharacterName> => {
  const {
    type,
    state: { action, facing, teleporting },
  } = item;

  const facingXy8 = vectorClosestDirectionXy8(facing);

  const highlighted =
    item.type === "headOverHeels" ?
      // cheat by just looking if head is highlighted inside the symbiosis and use that result for both
      // characters - they were switched to at the same time so it doesn't matter:
      isHighlighted((item as PlayableItem<"headOverHeels">).state.head)
    : isHighlighted((item as PlayableItem<"head" | "heels">).state);

  const flashing = isFlashing(item as PlayableItem);

  const walkSpeed = lengthXyz(facing);

  const teleportingPhase = teleporting?.phase ?? null;

  const renderProps: ItemRenderProps<CharacterName> = {
    action,
    facingXy8,
    teleportingPhase,
    flashing,
    highlighted,
  };

  const needNewSprites =
    // note: not all props are used here!
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy8 !== facingXy8 ||
    currentlyRenderedProps.teleportingPhase !== teleportingPhase;

  const outputContainer: Container =
    !needNewSprites ? previousRendering!
    : type === "headOverHeels" ?
      stackSprites({
        top: createSprite(
          playableCreateSpriteOptions({
            name: "head",
            ...renderProps,
          }),
        ),
        bottom: createSprite(
          playableCreateSpriteOptions({
            name: "heels",
            ...renderProps,
          }),
        ),
      })
    : createSprite(
        playableCreateSpriteOptions({
          name: type,
          ...renderProps,
        }),
      );

  if (type === "headOverHeels") {
    applyFilters(
      "head",
      renderProps,
      needNewSprites ? undefined : currentlyRenderedProps,
      outputContainer.getChildAt(0),
    );
    applyFilters(
      "heels",
      renderProps,
      needNewSprites ? undefined : currentlyRenderedProps,
      outputContainer.getChildAt(1),
    );
  } else {
    applyFilters(
      type,
      renderProps,
      needNewSprites ? undefined : currentlyRenderedProps,
      outputContainer,
    );
  }

  // update the animated sprite's speed:
  if (action === "moving" && previousRendering instanceof AnimatedSprite) {
    previousRendering.animationSpeed = walkSpeed * playableWalkAnimationSpeed;
  }

  return {
    container: outputContainer,
    renderProps,
  };
};
