import { Container } from "pixi.js";
import { AnimatedSprite } from "pixi.js";

import type { PlayableActionState } from "../../../model/ItemStateMap";
import type { AppSpritesheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import type { SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
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
import { effectColour } from "../../../sprites/palette/spritesheetPalette";
import { playableWalkAnimationSpeed } from "../../../sprites/spritesheet/spritesheetData/playableSpritesheetData";
import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { isEmptyObject } from "../../../utils/empty";
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
  isStoodOn: boolean;

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
  spritesheet,
  isStoodOn,
}: PlayableRenderProps & {
  name: IndividualCharacterName;
  paused: boolean;
  spritesheet: AppSpritesheet;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheet,
    };
  }

  if (teleportingPhase === "out") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheet,
    };
  }

  if (teleportingPhase === "in") {
    return {
      animationId: `${name}.fadeOut`,
      paused,
      spritesheet,
    };
  }

  if (action === "moving") {
    return {
      animationId: `${name}.walking.${facingXy8}`,
      paused,
      spritesheet,
    };
  }

  if (action === "jumping") {
    return {
      textureId:
        gravityZ < jumpSpriteGravityZThreshold ?
          `${name}.walking.${facingXy8}.2`
        : `${name}.walking.${facingXy8}.1`,
      spritesheet,
    };
  }

  if (action === "falling") {
    const fallingTextureName = `${name}.falling.${facingXy8}`;

    if (isTextureId(fallingTextureName, spritesheet.data))
      return { textureId: fallingTextureName, spritesheet };
  }

  if (name === "head" && isStoodOn) {
    // head (or head component of head-over-heels) - show with eyes closed
    const blinkingTextureId = `${name}.blinking.${facingXy8}`;
    if (isTextureId(blinkingTextureId, spritesheet.data)) {
      return {
        textureId: blinkingTextureId,
        spritesheet,
      };
    }
  }

  const idleAnimationId = `${name}.idle.${facingXy8}` as const;
  if (isAnimationId(idleAnimationId, spritesheet.data)) {
    // we have an idle anim for this character/direction
    return {
      animationId: idleAnimationId,
      paused,
      spritesheet,
    };
  }
  // no idle animation:
  return { textureId: `${name}.walking.${facingXy8}.2`, spritesheet };
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
    spritesheet: AppSpritesheet;
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

const createOutputContainer = <PaletteColourName extends string>(
  name: IndividualCharacterName,
  inSymbio: boolean,
  paused: boolean,
  spriteOption: SpriteOption,
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  roomColour: ZxSpectrumRoomColour,
): IndividualPlayableRenderingContainer => {
  const isDim = roomColour.shade === "dimmed";
  const accentColour =
    spriteOption.uncolourised ?
      zxSpectrumColor(roomColour)
    : effectColour(spritesheetMeta, isDim, name);

  const container = new Container() as IndividualPlayableRenderingContainer;
  const playableSpriteContainer = new Container();
  container[playableSpriteContainerSymbol] = playableSpriteContainer;
  container.addChild(playableSpriteContainer);

  const shineSprite = createSprite({
    animationId: inSymbio ? `shine.${name}InSymbio` : `shine.${name}`,
    paused,
    flipX: name === "heels",
    spritesheetVariant:
      spriteOption.uncolourised ? "uncolourised" : "for-current-room",
  }) as AnimatedSprite;

  container.addChild(shineSprite);
  container[shineSpriteSymbol] = shineSprite;
  container.filters = [
    //switchedToHighlightOutline: OutlineFilter,
    // don't use the singleton per-colour outline filters since we set .enabled on these
    // and would change the enabled status for all containers that are using it
    new OutlineFilter({ color: accentColour }),
    //invulnerableOutline: OutlineFilter,
    new OutlineFilter({
      color:
        spriteOption.uncolourised ?
          zxSpectrumColor(roomColour)
        : effectColour(spritesheetMeta, isDim, "invulnerable"),
    }),
    //invulnerableFlashAfterDeathFilter: OneColourFilter,
    new OneColourFilter(accentColour),
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
  spritesheet: AppSpritesheet,
) => {
  if (refreshSprites) {
    updateIndividualPlayableSprite(individualContainer, {
      name: individualCharacterName,
      ...renderProps,
      paused,
      spritesheet,
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
    general: { gameState, paused, spriteOption, spritesheetMeta },
    room: { roomTime, color: roomColor },
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
  const isStoodOn =
    type !== "heels" &&
    (!isEmptyObject(subject.state.stoodOnBy) ||
      // keep eyes closed for a short time after being stepped off of, so that instantaneous
      // jumps off head still get this effect:
      subject.state.stoodOnUntilRoomTime + 300 > roomTime);

  const renderProps: PlayableRenderProps = {
    action,
    facingXy8,
    teleportingPhase,
    flashing,
    highlighted,
    shining,
    gravityZ,
    isStoodOn,
  };

  const refreshSprites =
    // note: not all props are used here!
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.action !== action ||
    currentlyRenderedProps.facingXy8 !== facingXy8 ||
    currentlyRenderedProps.teleportingPhase !== teleportingPhase ||
    currentlyRenderedProps?.gravityZ > jumpSpriteGravityZThreshold !==
      gravityZ > jumpSpriteGravityZThreshold ||
    currentlyRenderedProps.isStoodOn !== isStoodOn;

  let outputContainer: PlayableRenderOutput;

  const spritesheetVariant =
    spriteOption.uncolourised ? "uncolourised" : "for-current-room";
  const spritesheet = getSpriteSheetVariant(spritesheetVariant);

  if (type === "headOverHeels") {
    outputContainer =
      previousRendering ??
      stackSprites({
        top: createOutputContainer(
          "head",
          true,
          paused,
          spriteOption,
          spritesheetMeta,
          roomColor,
        ),
        bottom: createOutputContainer(
          "heels",
          true,
          paused,
          spriteOption,
          spritesheetMeta,
          roomColor,
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
      spritesheet,
    );
    updateIndividualsRendering(
      "heels",
      stackedContainer[stackedBottomSymbol],
      refreshSprites,
      renderProps,
      paused,
      spritesheet,
    );
  } else {
    outputContainer =
      previousRendering ??
      createOutputContainer(
        type,
        false,
        paused,
        spriteOption,
        spritesheetMeta,
        roomColor,
      );

    updateIndividualsRendering(
      type,
      outputContainer as IndividualPlayableRenderingContainer,
      refreshSprites,
      renderProps,
      paused,
      spritesheet,
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
