import { Container } from "pixi.js";
import { AnimatedSprite } from "pixi.js";

import type { PlayableActionState } from "../../../model/ItemStateMap";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { PlayableItem } from "../../physics/itemPredicates";
import type { CreateSpriteOptions } from "../createSprite";
import type { StackedSpritesContainer } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../model/modelTypes";
import {
  zxSpectrumColor,
  type ZxSpectrumRoomColour,
} from "../../../originalGame";
import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import { playableWalkAnimationSpeed } from "../../../sprites/spritesheet/spritesheetData/playableSpritesheetData";
import { getAmbientSwoppedColour } from "../../../sprites/spritesheet/variants/currentRoomSpritesheetVariant";
import {
  lengthXyz,
  vectorClosestDirectionXy8,
} from "../../../utils/vectors/vectors";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import {
  afterDeathInvulnerabilityFlashPeriod,
  afterDeathInvulnerabilityFlashPhaseDuration,
  switchCharacterHighlightTime,
} from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { OneColourFilter } from "../filters/oneColourFilter";
import { OutlineFilter } from "../filters/outlineFilter";
import { playableAccentColours } from "../gameColours/colourScheme";
import {
  stackedBottomSymbol,
  stackedTopSymbol,
  stackSprites,
} from "./createStackedSprites";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";

// playables keep their full set of available filter, they just get enabled
// and disabled as needed
type PlayableFilters = [
  switchedToHighlightOutline: OutlineFilter,
  invulnerableOutline: OutlineFilter,
  invulnerableFlashAfterDeathFilter: OneColourFilter,
];

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
  spritesheetVariant,
}: PlayableRenderProps & {
  name: IndividualCharacterName;
  paused: boolean;
  spritesheetVariant: SpritesheetVariant;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheetVariant,
    };
  }

  if (teleportingPhase === "out") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheetVariant,
    };
  }

  if (teleportingPhase === "in") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheetVariant,
    };
  }

  if (action === "moving") {
    return {
      animationId: `${name}.walking.${facingXy8}`,
      paused,
      spritesheetVariant,
    };
  }

  if (action === "jumping") {
    return {
      textureId:
        gravityZ < jumpSpriteGravityZThreshold ?
          `${name}.walking.${facingXy8}.2`
        : `${name}.walking.${facingXy8}.1`,
      spritesheetVariant,
    };
  }

  if (action === "falling") {
    const fallingTextureName = `${name}.falling.${facingXy8}`;

    if (isTextureId(fallingTextureName))
      return { textureId: fallingTextureName, spritesheetVariant };
  }

  const idleAnimationId = `${name}.idle.${facingXy8}` as const;
  if (isAnimationId(idleAnimationId)) {
    // we have an idle anim for this character/direction
    return {
      animationId: idleAnimationId,
      paused,
      spritesheetVariant,
    };
  }
  return { textureId: `${name}.walking.${facingXy8}.2`, spritesheetVariant };
};

const playableSpriteContainerSymbol: unique symbol = Symbol();
const shineSpriteSymbol: unique symbol = Symbol();
type IndividualPlayableRenderingContainer = Container & {
  [playableSpriteContainerSymbol]: Container;
  [shineSpriteSymbol]: AnimatedSprite;
  filters: PlayableFilters;
};

const updateIndividualPlayableSprite = (
  container: IndividualPlayableRenderingContainer,
  renderPropsWithNameAndPause: PlayableRenderProps & {
    name: IndividualCharacterName;
    paused: boolean;
    spritesheetVariant: SpritesheetVariant;
  },
) => {
  container[playableSpriteContainerSymbol].removeChildren();
  container[playableSpriteContainerSymbol].addChild(
    createSprite(playableCreateSpriteOptions(renderPropsWithNameAndPause)),
  );
};

/** the shine on the spritesheet has a blue glow - convert to pink for heels */
// export const shineFilterForHeels = getPaletteSwapFilter({
//   pastelBlue: spritesheetPalette.pink,
// });

const createOutputContainer = (
  name: IndividualCharacterName,
  inSymbio: boolean,
  paused: boolean,
  colourised: boolean,
  // for if in uncolourised mode; use this colour for all outlines:
  overrideColour?: ZxSpectrumRoomColour,
): IndividualPlayableRenderingContainer => {
  const container = new Container() as IndividualPlayableRenderingContainer;
  const playableSpriteContainer = new Container();
  container[playableSpriteContainerSymbol] = playableSpriteContainer;
  container.addChild(playableSpriteContainer);

  const shineSprite = createSprite({
    animationId: inSymbio ? `shine.${name}InSymbio` : `shine.${name}`,
    paused,
    //filter: name === "heels" ? shineFilterForHeels : noFilters,
    flipX: name === "heels",
    spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
  }) as AnimatedSprite;

  container.addChild(shineSprite);
  container[shineSpriteSymbol] = shineSprite;
  container.filters = [
    //switchedToHighlightOutline: OutlineFilter,
    // don't use the singleton per-colour outline filters since we set .enabled on these
    // and would change the enabled status for all containers that are using it
    new OutlineFilter({
      color:
        overrideColour ?
          zxSpectrumColor(overrideColour)
        : getAmbientSwoppedColour(playableAccentColours[name]),
    }),
    //invulnerableOutline: OutlineFilter,
    new OutlineFilter({
      color:
        overrideColour ?
          zxSpectrumColor(overrideColour)
        : getAmbientSwoppedColour("midRed"),
    }),
    //invulnerableFlashAfterDeathFilter: OneColourFilter,
    new OneColourFilter(
      overrideColour ?
        zxSpectrumColor(overrideColour)
      : getAmbientSwoppedColour(playableAccentColours[name]),
    ),
  ];
  for (const f of container.filters) {
    f.enabled = false;
  }

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

const applyFilters = (
  { highlighted, flashing, shining }: PlayableRenderProps,
  container: IndividualPlayableRenderingContainer,
) => {
  const [
    switchedToHighlightOutline,
    invulnerableOutline,
    invulnerableFlashAfterDeathFilter,
  ] = container.filters;

  switchedToHighlightOutline.enabled = highlighted;
  invulnerableOutline.enabled = !highlighted && shining;
  invulnerableFlashAfterDeathFilter.enabled = flashing;
};

const applyShine = (
  rendering: IndividualPlayableRenderingContainer,
  shining: boolean,
) => {
  rendering[shineSpriteSymbol].visible = shining;
};

const updateIndividualsRendering = (
  individualCharacterName: IndividualCharacterName,
  individualContainer: IndividualPlayableRenderingContainer,
  refreshSprites: boolean,
  renderProps: PlayableRenderProps,
  paused: boolean,
  spritesheetVariant: SpritesheetVariant,
) => {
  if (refreshSprites) {
    updateIndividualPlayableSprite(individualContainer, {
      name: individualCharacterName,
      ...renderProps,
      paused,
      spritesheetVariant,
    });
  }
  applyFilters(renderProps, individualContainer);
  applyShine(individualContainer, renderProps.shining);
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
    general: { gameState, paused, colourised },
    room,
  },
  currentRendering,
}) => {
  const {
    type,
    state: {
      action,
      facing,
      visualFacingVector,
      teleporting,
      vels: {
        gravity: { z: gravityZ },
      },
    },
  } = subject;
  const currentlyRenderedProps = currentRendering?.renderProps;
  const previousRendering = currentRendering?.output;

  const facingXy8 =
    vectorClosestDirectionXy8(visualFacingVector ?? facing) ?? "towards";

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

  const spritesheetVariant = colourised ? "for-current-room" : "uncolourised";
  const effectsColourFromRoom = !colourised ? room.color : undefined;

  if (type === "headOverHeels") {
    outputContainer =
      previousRendering ??
      stackSprites({
        top: createOutputContainer(
          "head",
          true,
          paused,
          colourised,
          effectsColourFromRoom,
        ),
        bottom: createOutputContainer(
          "heels",
          true,
          paused,
          colourised,
          effectsColourFromRoom,
        ),
      });

    const stackedContainer =
      outputContainer as StackedSpritesContainer<IndividualPlayableRenderingContainer>;

    updateIndividualsRendering(
      "head",
      stackedContainer[stackedTopSymbol],
      refreshSprites,
      renderProps,
      paused,
      spritesheetVariant,
    );
    updateIndividualsRendering(
      "heels",
      stackedContainer[stackedBottomSymbol],
      refreshSprites,
      renderProps,
      paused,
      spritesheetVariant,
    );
  } else {
    outputContainer =
      previousRendering ??
      createOutputContainer(
        type,
        false,
        paused,
        colourised,
        effectsColourFromRoom,
      );

    updateIndividualsRendering(
      type,
      outputContainer as IndividualPlayableRenderingContainer,
      refreshSprites,
      renderProps,
      paused,
      spritesheetVariant,
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
