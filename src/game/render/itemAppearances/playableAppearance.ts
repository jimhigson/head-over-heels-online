import type { Filter } from "pixi.js";

import { Container } from "pixi.js";
import { AnimatedSprite } from "pixi.js";

import type { SpritesheetPaletteColourName } from "../../../../gfx/spritesheetPalette";
import type { PlayableActionState } from "../../../model/ItemStateMap";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { PlayableItem } from "../../physics/itemPredicates";
import type { CreateSpriteOptions } from "../createSprite";
import type { StackedSpritesContainer } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../model/modelTypes";
import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import { playableWalkAnimationSpeed } from "../../../sprites/playableSpritesheetData";
import {
  lengthXyz,
  vectorClosestDirectionXy8,
} from "../../../utils/vectors/vectors";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { accentColours } from "../../hintColours";
import {
  afterDeathInvulnerabilityFlashPeriod,
  afterDeathInvulnerabilityFlashPhaseDuration,
  switchCharacterHighlightTime,
} from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { OneColourFilter } from "../filters/oneColourFilter";
import { OutlineFilter, outlineFilters } from "../filters/outlineFilter";
import { getPaletteSwapFilter } from "../filters/PaletteSwapFilter";
import { noFilters } from "../filters/standardFilters";
import {
  stackedBottomSymbol,
  stackedTopSymbol,
  stackSprites,
} from "./createStackedSprites";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";

type PlayableRenderProps = {
  facingXy8: DirectionXy8;
  action: PlayableActionState;
  teleportingPhase: "in" | "out" | null;
  gravityZ: number;

  highlighted: boolean;
  flashing: boolean;
  shining: boolean;
};

/*
  if the ascent speed while jumping is less than this,
  show the walking sprite with feet together instead of
  jumping sprite - this creates a transition at the top of
  the jump towards the falling sprite
*/
const jumpSpriteGravityZThreshold = 0.02;

const playableCreateSpriteOptions = ({
  name,
  action,
  facingXy8,
  teleportingPhase,
  gravityZ,
  paused,
}: PlayableRenderProps & {
  name: IndividualCharacterName;
  paused: boolean;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
    };
  }

  if (teleportingPhase === "out") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
    };
  }

  if (teleportingPhase === "in") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
    };
  }

  if (action === "moving") {
    return {
      animationId: `${name}.walking.${facingXy8}`,
      paused,
    };
  }

  if (action === "jumping") {
    return {
      textureId:
        gravityZ < jumpSpriteGravityZThreshold ?
          `${name}.walking.${facingXy8}.2`
        : `${name}.walking.${facingXy8}.1`,
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
      paused,
    };
  }
  return { textureId: `${name}.walking.${facingXy8}.2` };
};

const playableSpriteContainerSymbol: unique symbol = Symbol();
const shineSpriteSymbol: unique symbol = Symbol();
type IndividualPlayableRenderingContainer = Container & {
  [playableSpriteContainerSymbol]: Container;
  [shineSpriteSymbol]: AnimatedSprite;
};

const updateIndividualPlayableSprite = (
  container: IndividualPlayableRenderingContainer,
  renderPropsWithNameAndPause: PlayableRenderProps & {
    name: IndividualCharacterName;
    paused: boolean;
  },
) => {
  container[playableSpriteContainerSymbol].removeChildren();
  container[playableSpriteContainerSymbol].addChild(
    createSprite(playableCreateSpriteOptions(renderPropsWithNameAndPause)),
  );
};

/** the shine on the spritesheet has a blue glow - convert to pink for heels */
export const shineFilterForHeels = getPaletteSwapFilter({
  pastelBlue: spritesheetPalette.pink,
});

const createOutputContainer = (
  name: IndividualCharacterName,
  inSymbio: boolean,
  paused: boolean,
): IndividualPlayableRenderingContainer => {
  const container = new Container() as IndividualPlayableRenderingContainer;
  const playableSpriteContainer = new Container();
  container[playableSpriteContainerSymbol] = playableSpriteContainer;
  container.addChild(playableSpriteContainer);
  const shineSprite = createSprite({
    animationId: inSymbio ? `shine.${name}InSymbio` : "shine",
    paused,
    filter: name === "heels" ? shineFilterForHeels : noFilters,
    flipX: name === "heels",
  }) as AnimatedSprite;
  container[shineSpriteSymbol] = shineSprite;
  return container;
};

export const isHighlighted = (
  {
    gameTime,
    switchedToAt,
  }: {
    switchedToAt: number;
    gameTime: number;
  },
  characterName: CharacterName,
  currentCharacterName: CharacterName,
): boolean => {
  return (
    (characterName === "headOverHeels" ||
      characterName === currentCharacterName) &&
    switchedToAt + switchCharacterHighlightTime > gameTime
  );
};

/** should player have the flashing effect after losing a life */
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
    afterDeathInvulnerabilityFlashPeriod *
      afterDeathInvulnerabilityFlashPhaseDuration
  );
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
    container.filters = [container.filters, newFilter].flat();
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
  { highlighted, flashing, shining }: PlayableRenderProps,
  currentlyRenderedProps: PlayableRenderProps | undefined,
  container: Container,
) => {
  const highlightColour: null | SpritesheetPaletteColourName =
    highlighted ? accentColours[name]
    : shining ? "midRed"
    : null;

  const currentHighlightColour: null | SpritesheetPaletteColourName =
    currentlyRenderedProps?.highlighted ? accentColours[name]
    : currentlyRenderedProps?.shining ? "midRed"
    : null;

  if (highlightColour !== currentHighlightColour) {
    removeFilterFromContainer(container, OutlineFilter);
    if (highlightColour !== null) {
      addFilterToContainer(container, outlineFilters[highlightColour]);
    }
  }

  const currentlyFlashing = currentlyRenderedProps?.flashing ?? false;
  if (flashing && !currentlyFlashing) {
    addFilterToContainer(
      container,
      new OneColourFilter(spritesheetPalette[accentColours[name]]),
    );
  } else if (!flashing && currentlyFlashing) {
    removeFilterFromContainer(container, OneColourFilter);
  }
};

const applyShine = (
  rendering: IndividualPlayableRenderingContainer,
  shining: boolean,
  wasShining: boolean,
) => {
  if (shining && !wasShining) {
    rendering.addChild(rendering[shineSpriteSymbol]);
  } else if (!shining && wasShining) {
    rendering.removeChild(rendering[shineSpriteSymbol]);
  }
};

const updateIndividualsRendering = (
  individualCharacterName: IndividualCharacterName,
  individualContainer: IndividualPlayableRenderingContainer,
  refreshSprites: boolean,
  renderProps: PlayableRenderProps,
  paused: boolean,
  currentlyRenderedProps?: PlayableRenderProps,
) => {
  if (refreshSprites) {
    updateIndividualPlayableSprite(individualContainer, {
      name: individualCharacterName,
      ...renderProps,
      paused,
    });
  }
  applyFilters(
    individualCharacterName,
    renderProps,
    currentlyRenderedProps,
    individualContainer,
  );
  applyShine(
    individualContainer,
    renderProps.shining,
    currentlyRenderedProps?.shining ?? false,
  );
};

type PlayableRenderOutput =
  | IndividualPlayableRenderingContainer
  | StackedSpritesContainer<IndividualPlayableRenderingContainer>;

const playableAppearanceImpl: ItemAppearance<
  CharacterName,
  PlayableRenderProps,
  PlayableRenderOutput
> = ({
  renderContext: {
    item: subject,
    general: { gameState, paused },
  },
  currentRendering,
}) => {
  const {
    type,
    state: {
      action,
      facing,
      teleporting,
      vels: {
        gravity: { z: gravityZ },
      },
    },
  } = subject;
  const currentlyRenderedProps = currentRendering?.renderProps;
  const previousRendering = currentRendering?.output;

  const facingXy8 = vectorClosestDirectionXy8(facing) ?? "towards";

  /**
   * show the outline highlight from when the player has just switched to the character?
   */
  const highlighted =
    // if no game state, there isn't any game (probably rendering for the level editor) so
    // do not highlight
    gameState !== undefined &&
    (subject.type === "headOverHeels" ?
      // cheat by just looking if head is highlighted inside the symbiosis and use that result for both
      // characters - they were switched to at the same time so it doesn't matter:
      isHighlighted(subject.state.head, "headOverHeels", "headOverHeels")
    : isHighlighted(
        subject.state,
        subject.type,
        gameState.currentCharacterName,
      ));

  const flashing = isFlashing(subject);
  const shining = playableHasShield(subject);

  const walkSpeed = lengthXyz(facing);

  const teleportingPhase = teleporting?.phase ?? null;

  const renderProps: PlayableRenderProps = {
    action,
    facingXy8,
    teleportingPhase,
    flashing,
    highlighted,
    shining,
    gravityZ,
  };

  const refreshSprites =
    // note: not all props are used here!
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy8 !== facingXy8 ||
    currentlyRenderedProps.teleportingPhase !== teleportingPhase ||
    currentlyRenderedProps?.gravityZ > jumpSpriteGravityZThreshold !==
      gravityZ > jumpSpriteGravityZThreshold;

  let outputContainer: PlayableRenderOutput;

  if (type === "headOverHeels") {
    outputContainer =
      previousRendering ??
      stackSprites({
        top: createOutputContainer("head", true, paused),
        bottom: createOutputContainer("heels", true, paused),
      });

    const stackedContainer =
      outputContainer as StackedSpritesContainer<IndividualPlayableRenderingContainer>;

    updateIndividualsRendering(
      "head",
      stackedContainer[stackedTopSymbol],
      refreshSprites,
      renderProps,
      paused,
      currentlyRenderedProps,
    );
    updateIndividualsRendering(
      "heels",
      stackedContainer[stackedBottomSymbol],
      refreshSprites,
      renderProps,
      paused,
      currentlyRenderedProps,
    );
  } else {
    outputContainer =
      previousRendering ?? createOutputContainer(type, false, paused);

    updateIndividualsRendering(
      type,
      outputContainer as IndividualPlayableRenderingContainer,
      refreshSprites,
      renderProps,
      paused,
      currentlyRenderedProps,
    );
  }

  // update the animated sprite's speed:
  if (action === "moving" && previousRendering instanceof AnimatedSprite) {
    // don't think this will work for hoh - would have to apply to two sprites
    // inside the container
    previousRendering.animationSpeed = walkSpeed * playableWalkAnimationSpeed;
  }

  return {
    output: outputContainer,
    renderProps,
  };
};

export const playableAppearance = itemAppearanceOutsideView(
  playableAppearanceImpl,
);
