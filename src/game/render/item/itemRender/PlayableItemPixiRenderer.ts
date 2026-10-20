import { type AnimatedSprite, Container, type Filter } from "pixi.js";

import { type PlayableItem } from "../../../../model/ItemInPlayNarrowedUnions";
import { type PlayableActionState } from "../../../../model/ItemStateMap";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../model/modelTypes";
import { type ZxSpectrumRoomColour } from "../../../../originalGame";
import {
  isAnimationId,
  isTextureId,
} from "../../../../sprites/assertIsTextureId";
import { effectPixiColour } from "../../../../sprites/palette/pixiPalette";
import { type AppSpritesheetWithVariants } from "../../../../sprites/spritesheet/AppSpritesheet";
import { type SpritesheetMetadata } from "../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { variantTextureId } from "../../../../sprites/spritesheet/variantTextureId";
import { type SpriteOption } from "../../../../store/slices/userSettings/userSettingsSlice";
import { isEmptyObject } from "../../../../utils/empty";
import {
  resolveSpriteDirectionIndexXy8,
  spriteFlipXAtAngle,
} from "../../../../utils/vectors/resolveCameraRelativeVector";
import {
  type DirectionIndexXy8,
  directionsXy8Octants,
} from "../../../../utils/vectors/vectors";
import { playerDiedRecently } from "../../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../../gameState/gameStateSelectors/selectPickupAbilities";
import {
  afterDeathInvulnerabilityFlashPeriod,
  afterDeathInvulnerabilityFlashPhaseDuration,
} from "../../../physics/mechanicsConstants";
import { createSprite, type CreateSpriteOptions } from "../../createSprite";
import { type FilterCache } from "../../filters/FilterCache";
import { OneColourFilter } from "../../filters/OneColourFilter";
import { OutlineFilter } from "../../filters/OutlineFilter";
import { stackSprites } from "../../itemAppearances/createStackedSprites";
import { characterAction } from "../../itemAppearances/playable/characterAction";
import { isHighlightedPlayableItem } from "../../itemAppearances/playable/isHighlightedPlayableItem";
import { type ItemLeafRenderContext } from "../../ItemRenderContexts";
import { zxSpectrumPixiColor } from "../../palette/zxSpectrumPixiColours";
import { type ItemLeafPixiRenderer } from "./ItemPixiRenderer";

/** the character's current state that a body sprite is picked from */
type BodySpriteOptions = {
  /** the directional sprite-variant index drawn */
  resolvedFacingArtIndexXy8: DirectionIndexXy8;
  /** whether the directional sprite is drawn horizontally flipped */
  flipX: boolean;
  action: PlayableActionState;
  teleportingPhase: "in" | "out" | null;
  gravityZ: number;
  isStoodOn: boolean;
  paused: boolean;
  spritesheet: AppSpritesheetWithVariants;
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
  resolvedFacingArtIndexXy8,
  flipX,
  teleportingPhase,
  gravityZ,
  paused,
  spritesheet,
  isStoodOn,
  isSceneryPlayer,
  idleStartFramePhase,
  isInSymbiosis,
  isReflection,
}: BodySpriteOptions & {
  name: IndividualCharacterName;
  isInSymbiosis: boolean;
  isReflection: boolean;
  /** drawn in the citizen-of-Freedom recolour */
  isSceneryPlayer: boolean;
  /** where in its cycle the idle animation starts */
  idleStartFramePhase: number | undefined;
}): CreateSpriteOptions => {
  if (action === "death") {
    return {
      animationId: variantTextureId(
        `${name}.fadeOut`,
        isReflection,
        false,
        false,
        false,
      ),
      paused,
      spritesheet,
    };
  }

  if (teleportingPhase === "out") {
    return {
      animationId: variantTextureId(
        `${name}.fadeOut`,
        isReflection,
        false,
        false,
        false,
      ),
      paused,
      spritesheet,
    };
  }

  if (teleportingPhase === "in") {
    return {
      animationId: variantTextureId(
        `${name}.fadeOut`,
        isReflection,
        false,
        false,
        false,
      ),
      paused,
      spritesheet,
    };
  }

  if (
    action === "moving" &&
    !(
      // head along for the ride:
      isInSymbiosis && name === "head"
    )
  ) {
    return {
      animationId: variantTextureId(
        `${name}.walking.d${resolvedFacingArtIndexXy8}`,
        isReflection,
        false,
        false,
        false,
      ),
      flipX,
      paused,
      spritesheet,
    };
  }

  if (action === "jumping") {
    if (gravityZ < jumpSpriteGravityZThreshold) {
      return {
        textureId: variantTextureId(
          `${name}.walking.d${resolvedFacingArtIndexXy8}.2`,
          isReflection,
          false,
          false,
          false,
        ),
        flipX,
        spritesheet,
      };
    }

    // the per-direction meta stays keyed by the art's direction name:
    const jumpAscentWalkTextureNo =
      spritesheet.spritesheetMeta.playable[name][
        directionsXy8Octants[resolvedFacingArtIndexXy8]
      ]?.jumpAscent ?? 1;

    return {
      textureId: variantTextureId(
        `${name}.walking.d${resolvedFacingArtIndexXy8}.${jumpAscentWalkTextureNo}`,
        isReflection,
        false,
        false,
        false,
      ),
      flipX,
      spritesheet,
    };
  }

  if (action === "falling") {
    const fallingTextureName =
      `${name}.falling.d${resolvedFacingArtIndexXy8}` as const;

    if (isTextureId(fallingTextureName, spritesheet.data)) {
      return {
        textureId: variantTextureId(
          fallingTextureName,
          isReflection,
          false,
          false,
          isSceneryPlayer,
        ),
        flipX,
        spritesheet,
      };
    }
  }

  if (name === "head" && isStoodOn) {
    // head (or head component of head-over-heels) - show with eyes closed
    const blinkingTextureId =
      `${name}.blinking.d${resolvedFacingArtIndexXy8}` as const;
    if (isTextureId(blinkingTextureId, spritesheet.data)) {
      return {
        textureId: variantTextureId(
          blinkingTextureId,
          isReflection,
          false,
          false,
          isSceneryPlayer,
        ),
        flipX,
        spritesheet,
      };
    }
  }

  const idleAnimationId = `${name}.idle.d${resolvedFacingArtIndexXy8}` as const;
  if (isAnimationId(idleAnimationId, spritesheet.data)) {
    // we have an idle anim for this character/direction
    return {
      animationId: variantTextureId(
        idleAnimationId,
        isReflection,
        false,
        false,
        isSceneryPlayer,
      ),
      flipX,
      startFramePhase: idleStartFramePhase,
      paused,
      spritesheet,
    };
  }
  // no idle animation:
  return {
    textureId: variantTextureId(
      `${name}.walking.d${resolvedFacingArtIndexXy8}.2`,
      isReflection,
      false,
      false,
      isSceneryPlayer,
    ),
    flipX,
    spritesheet,
  };
};

/** should player have the flashing effect after losing a life */
const isFlashing = (playableItem: PlayableItem): boolean => {
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

  const flashPhaseDuration =
    afterDeathInvulnerabilityFlashPeriod *
    afterDeathInvulnerabilityFlashPhaseDuration;

  return (
    (timeSinceLastDied + flashPhaseDuration) %
      afterDeathInvulnerabilityFlashPeriod <
    flashPhaseDuration
  );
};

/**
 * one character body's rendering - its sprite, shine overlay and the shared
 * filters it can attach. Playables keep their full set of available filters
 * (shared, via the room renderer's filter cache) and attach/detach them as
 * needed - never mutating the filters themselves, since other containers share
 * them.
 */
class IndividualPlayableRendering {
  readonly container = new Container();
  readonly #bodySpriteContainer = new Container();
  readonly #shineSprite: AnimatedSprite;

  readonly #switchedToHighlightOutline: OutlineFilter;
  readonly #invulnerableOutline: OutlineFilter;
  readonly #invulnerableFlashAfterDeathFilter: OneColourFilter;
  /**
   * which combination is currently attached, to skip rebuilding the container's
   * filters array on ticks where nothing changed
   */
  #appliedFiltersKey = "";

  readonly #name: IndividualCharacterName;
  readonly #isInSymbiosis: boolean;
  readonly #isReflection: boolean;
  readonly #isSceneryPlayer: boolean;
  readonly #idleStartFramePhase: number | undefined;

  constructor(
    name: IndividualCharacterName,
    isInSymbiosis: boolean,
    paused: boolean,
    spriteOption: SpriteOption,
    spritesheetMeta: SpritesheetMetadata,
    roomColour: ZxSpectrumRoomColour,
    shineSpritesheet: AppSpritesheetWithVariants,
    filterCache: FilterCache,
    isReflection: boolean,
    isSceneryPlayer: boolean,
    idleStartFramePhase: number | undefined,
  ) {
    this.#name = name;
    this.#isInSymbiosis = isInSymbiosis;
    this.#isReflection = isReflection;
    this.#isSceneryPlayer = isSceneryPlayer;
    this.#idleStartFramePhase = idleStartFramePhase;

    this.container.addChild(this.#bodySpriteContainer);

    const isDim = roomColour.shade === "dimmed";
    const accentColour =
      spriteOption.uncolourised ?
        zxSpectrumPixiColor(roomColour)
      : effectPixiColour(spritesheetMeta, isDim, name);
    const invulnerableColour =
      spriteOption.uncolourised ?
        zxSpectrumPixiColor(roomColour)
      : effectPixiColour(spritesheetMeta, isDim, "invulnerable");

    this.#shineSprite = createSprite({
      animationId: variantTextureId(
        isInSymbiosis ? `shine.${name}InSymbio` : `shine.${name}`,
        isReflection,
        false,
        false,
        false,
      ),
      paused,
      flipX: name === "heels",
      spritesheet: shineSpritesheet,
    }) as AnimatedSprite;
    this.container.addChild(this.#shineSprite);

    this.#switchedToHighlightOutline = filterCache.getOrInsertComputed(
      `outline(${accentColour.toHex()})`,
      () => new OutlineFilter({ color: accentColour }),
    ) as OutlineFilter;
    this.#invulnerableOutline = filterCache.getOrInsertComputed(
      `outline(${invulnerableColour.toHex()})`,
      () => new OutlineFilter({ color: invulnerableColour }),
    ) as OutlineFilter;
    this.#invulnerableFlashAfterDeathFilter = filterCache.getOrInsertComputed(
      `oneColour(${accentColour.toHex()})`,
      () => new OneColourFilter(accentColour),
    ) as OneColourFilter;
  }

  refreshBodySprite(bodySpriteOptions: BodySpriteOptions) {
    this.#bodySpriteContainer.removeChildren();
    this.#bodySpriteContainer.addChild(
      createSprite(
        playableCreateSpriteOptions({
          ...bodySpriteOptions,
          name: this.#name,
          isInSymbiosis: this.#isInSymbiosis,
          isReflection: this.#isReflection,
          isSceneryPlayer: this.#isSceneryPlayer,
          idleStartFramePhase: this.#idleStartFramePhase,
        }),
      ),
    );
  }

  updateEffects(highlighted: boolean, flashing: boolean, shining: boolean) {
    this.#applyFilters(highlighted, flashing, shining);
    this.#shineSprite.visible = shining;
  }

  #applyFilters(highlighted: boolean, flashing: boolean, shining: boolean) {
    const outlining = highlighted;
    const shieldOutlining = !highlighted && shining;

    const applyingFiltersKey = `${outlining},${shieldOutlining},${flashing}`;
    if (applyingFiltersKey === this.#appliedFiltersKey) {
      return;
    }
    this.#appliedFiltersKey = applyingFiltersKey;

    const activeFilters: Filter[] = [];
    if (outlining) {
      activeFilters.push(this.#switchedToHighlightOutline);
    }
    if (shieldOutlining) {
      activeFilters.push(this.#invulnerableOutline);
    }
    if (flashing) {
      activeFilters.push(this.#invulnerableFlashAfterDeathFilter);
    }
    this.container.filters = activeFilters;
  }
}

/** the item types drawn as characters */
export type PlayableRenderedType = "sceneryPlayer" | CharacterName;

/** whether a playable character is being stood on, so head shuts its eyes */
const isPlayerStoodOn = (playableItem: PlayableItem, roomTime: number) =>
  playableItem.type !== "heels" &&
  (!isEmptyObject(playableItem.state.stoodOnBy) ||
    // keep eyes closed for a short time after being stepped off of, so that
    // instantaneous jumps off head still get this effect:
    playableItem.state.stoodOnUntilRoomTime + 300 > roomTime);

/**
 * renders a character (head, heels, or the head-over-heels symbiosis), either
 * playable or scenery, holding its per-character rendering state (sprite,
 * shine, filters + the change-detection memos) as private fields.
 */
export class PlayableItemPixiRenderer implements ItemLeafPixiRenderer<PlayableRenderedType> {
  readonly output = new Container({ label: "PlayableItemPixiRenderer" });
  readonly renderContext: ItemLeafRenderContext<PlayableRenderedType>;

  /** one for an individual character, two ([head, heels]) in symbiosis */
  readonly #individuals: readonly IndividualPlayableRendering[];

  /** false until the first tick has picked the body sprite(s) at least once */
  #hasRenderedOnce = false;
  // the previous tick's values of the state that gates a body-sprite
  // refresh, to decide whether this tick needs one:
  #prevAction: PlayableActionState | undefined;
  #prevFacingArtIndexXy8: DirectionIndexXy8 | undefined;
  #prevFlipX: boolean | undefined;
  #prevTeleportingPhase: "in" | "out" | null | undefined;
  #prevGravityAboveThreshold: boolean | undefined;
  #prevIsStoodOn: boolean | undefined;

  constructor(renderContext: ItemLeafRenderContext<PlayableRenderedType>) {
    this.renderContext = renderContext;
    const {
      general: { paused, spriteOption, spritesheetMeta, spritesheets },
      room: { color: roomColour },
      filterCache,
      isReflection,
      item,
    } = renderContext;

    const characterName =
      item.type === "sceneryPlayer" ? item.config.which : item.type;

    const isSceneryPlayer = item.type === "sceneryPlayer";
    // so a room of scenery players don't all animate in step:
    const idleStartFramePhase = isSceneryPlayer ? item.hash : undefined;

    const makeIndividualRendering = (
      name: IndividualCharacterName,
      isInSymbiosis: boolean,
    ) =>
      new IndividualPlayableRendering(
        name,
        isInSymbiosis,
        paused,
        spriteOption,
        spritesheetMeta,
        roomColour,
        spritesheets.spritesheetForCurrentRoom,
        filterCache,
        isReflection,
        isSceneryPlayer,
        idleStartFramePhase,
      );

    if (characterName === "headOverHeels") {
      const head = makeIndividualRendering("head", true);
      const heels = makeIndividualRendering("heels", true);
      this.#individuals = [head, heels];
      this.output.addChild(
        stackSprites({ top: head.container, bottom: heels.container }),
      );
    } else {
      const individual = makeIndividualRendering(characterName, false);
      this.#individuals = [individual];
      this.output.addChild(individual.container);
    }
  }

  tick() {
    const {
      general: { gameState, paused, spritesheets, cameraAngle },
      room: { roomTime },
      isReflection,
      item: subject,
    } = this.renderContext;

    // resolve the facing vector against the continuous camera angle to the
    // sprite-variant index with its paired flip (keeping the painted shading
    // on the character's world faces - the light source stays fixed in the
    // world) - it steps through the intermediate facings along θ(t) mid-turn
    // rather than snapping old->new. Rounding happens only here, at the final
    // sprite-name pick:
    const resolvedFacingArtIndexXy8 = resolveSpriteDirectionIndexXy8(
      subject.state.visualFacingVector,
      cameraAngle,
      isReflection,
    );
    const flipX = spriteFlipXAtAngle(cameraAngle);

    const isSceneryPlayer = subject.type === "sceneryPlayer";
    const action = characterAction(subject);
    const teleportingPhase =
      isSceneryPlayer ? null : (subject.state.teleporting?.phase ?? null);
    const gravityZ = subject.state.vels.gravity.z;
    const isStoodOn =
      isSceneryPlayer ?
        subject.config.which !== "heels" &&
        !isEmptyObject(subject.state.stoodOnBy)
      : isPlayerStoodOn(subject, roomTime);

    const gravityAboveThreshold = gravityZ > jumpSpriteGravityZThreshold;
    const refreshSprites =
      !this.#hasRenderedOnce ||
      this.#prevAction !== action ||
      this.#prevFacingArtIndexXy8 !== resolvedFacingArtIndexXy8 ||
      this.#prevFlipX !== flipX ||
      this.#prevTeleportingPhase !== teleportingPhase ||
      this.#prevGravityAboveThreshold !== gravityAboveThreshold ||
      this.#prevIsStoodOn !== isStoodOn;

    const highlighted =
      !isSceneryPlayer && isHighlightedPlayableItem(gameState, subject);
    const flashing = !isSceneryPlayer && isFlashing(subject);
    const shining = !isSceneryPlayer && playableHasShield(subject);

    for (let i = 0; i < this.#individuals.length; i++) {
      const individual = this.#individuals[i];
      if (refreshSprites) {
        individual.refreshBodySprite({
          action,
          resolvedFacingArtIndexXy8,
          flipX,
          teleportingPhase,
          gravityZ,
          isStoodOn,
          paused,
          spritesheet: spritesheets.spritesheetForCurrentRoom,
        });
      }
      individual.updateEffects(highlighted, flashing, shining);
    }

    this.#hasRenderedOnce = true;
    this.#prevAction = action;
    this.#prevFacingArtIndexXy8 = resolvedFacingArtIndexXy8;
    this.#prevFlipX = flipX;
    this.#prevTeleportingPhase = teleportingPhase;
    this.#prevGravityAboveThreshold = gravityAboveThreshold;
    this.#prevIsStoodOn = isStoodOn;
  }

  destroy() {
    this.output.destroy({ children: true });
  }
}
