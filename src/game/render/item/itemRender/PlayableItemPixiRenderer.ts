import { type AnimatedSprite, Container, type Filter } from "pixi.js";

import { type PlayableActionState } from "../../../../model/ItemStateMap";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../model/modelTypes";
import {
  zxSpectrumColor,
  type ZxSpectrumRoomColour,
} from "../../../../originalGame";
import {
  isAnimationId,
  isTextureId,
} from "../../../../sprites/assertIsTextureId";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
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
import { type PlayableItem } from "../../../physics/itemPredicates";
import {
  afterDeathInvulnerabilityFlashPeriod,
  afterDeathInvulnerabilityFlashPhaseDuration,
} from "../../../physics/mechanicsConstants";
import { createSprite, type CreateSpriteOptions } from "../../createSprite";
import { OneColourFilter } from "../../filters/OneColourFilter";
import { OutlineFilter } from "../../filters/OutlineFilter";
import { stackSprites } from "../../itemAppearances/createStackedSprites";
import { isHighlightedPlayableItem } from "../../itemAppearances/playable/isHighlightedPlayableItem";
import { type ItemLeafRenderContext } from "../../ItemRenderContexts";
import { type FilterCache } from "../../room/RoomRenderer";
import { type ItemLeafPixiRenderer } from "./ItemPixiRenderer";

type PlayableRenderProps = {
  /** the directional sprite-variant index drawn */
  resolvedFacingArtIndexXy8: DirectionIndexXy8;
  /** whether the directional sprite is drawn horizontally flipped */
  flipX: boolean;
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
  resolvedFacingArtIndexXy8,
  flipX,
  teleportingPhase,
  gravityZ,
  paused,
  spritesheet,
  isStoodOn,
  isInSymbiosis,
  isReflection,
}: PlayableRenderProps & {
  name: IndividualCharacterName;
  paused: boolean;
  spritesheet: AppSpritesheetWithVariants;
  isInSymbiosis: boolean;
  isReflection: boolean;
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
          false,
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
          false,
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
        false,
      ),
      flipX,
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
      false,
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
  ) {
    this.#name = name;
    this.#isInSymbiosis = isInSymbiosis;
    this.#isReflection = isReflection;

    this.container.addChild(this.#bodySpriteContainer);

    const isDim = roomColour.shade === "dimmed";
    const accentColour =
      spriteOption.uncolourised ?
        zxSpectrumColor(roomColour)
      : effectColour(spritesheetMeta, isDim, name);
    const invulnerableColour =
      spriteOption.uncolourised ?
        zxSpectrumColor(roomColour)
      : effectColour(spritesheetMeta, isDim, "invulnerable");

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

  #refreshBodySprite(
    renderProps: PlayableRenderProps,
    paused: boolean,
    spritesheet: AppSpritesheetWithVariants,
  ) {
    this.#bodySpriteContainer.removeChildren();
    this.#bodySpriteContainer.addChild(
      createSprite(
        playableCreateSpriteOptions({
          name: this.#name,
          ...renderProps,
          paused,
          spritesheet,
          isInSymbiosis: this.#isInSymbiosis,
          isReflection: this.#isReflection,
        }),
      ),
    );
  }

  #applyFilters({ highlighted, flashing, shining }: PlayableRenderProps) {
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

  update(
    refreshSprites: boolean,
    renderProps: PlayableRenderProps,
    paused: boolean,
    spritesheet: AppSpritesheetWithVariants,
  ) {
    if (refreshSprites) {
      this.#refreshBodySprite(renderProps, paused, spritesheet);
    }
    this.#applyFilters(renderProps);
    this.#shineSprite.visible = renderProps.shining;
  }
}

/**
 * renders a playable character (head, heels, or the head-over-heels symbiosis),
 * holding its per-character rendering state (sprite, shine, filters + the
 * change-detection memos) as private fields.
 */
export class PlayableItemPixiRenderer implements ItemLeafPixiRenderer<CharacterName> {
  readonly output = new Container({ label: "PlayableItemPixiRenderer" });
  readonly renderContext: ItemLeafRenderContext<CharacterName>;

  /** one for an individual character, two ([head, heels]) in symbiosis */
  readonly #individuals: readonly IndividualPlayableRendering[];

  /** false until the first tick has picked the body sprite(s) at least once */
  #hasRenderedOnce = false;
  // the previous tick's values of the render props that gate a body-sprite
  // refresh, to decide whether this tick needs one:
  #prevAction: PlayableActionState | undefined;
  #prevFacingArtIndexXy8: DirectionIndexXy8 | undefined;
  #prevFlipX: boolean | undefined;
  #prevTeleportingPhase: "in" | "out" | null | undefined;
  #prevGravityAboveThreshold: boolean | undefined;
  #prevIsStoodOn: boolean | undefined;

  constructor(renderContext: ItemLeafRenderContext<CharacterName>) {
    this.renderContext = renderContext;
    const {
      general: { paused, spriteOption, spritesheetMeta, spritesheets },
      room: { color: roomColour },
      filterCache,
      isReflection,
      item,
    } = renderContext;

    // the filter cache is optional on the appearance context (standalone
    // contexts like the hud's carried-item render have none), but playables are
    // only ever rendered in-room, where the room renderer supplies one:
    if (filterCache === undefined) {
      throw new Error("PlayableItemPixiRenderer requires a filterCache");
    }

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
      );

    if (item.type === "headOverHeels") {
      const head = makeIndividualRendering("head", true);
      const heels = makeIndividualRendering("heels", true);
      this.#individuals = [head, heels];
      this.output.addChild(
        stackSprites({ top: head.container, bottom: heels.container }),
      );
    } else {
      const individual = makeIndividualRendering(item.type, false);
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

    // resolve the facing vector against the continuous camera angle to the
    // sprite-variant index with its paired flip (keeping the painted shading
    // on the character's world faces - the light source stays fixed in the
    // world) - it steps through the intermediate facings along θ(t) mid-turn
    // rather than snapping old->new. Rounding happens only here, at the final
    // sprite-name pick:
    const resolvedFacingArtIndexXy8 = resolveSpriteDirectionIndexXy8(
      visualFacingVector ?? facing,
      cameraAngle,
      isReflection,
    );
    const flipX = spriteFlipXAtAngle(cameraAngle);

    const highlighted = isHighlightedPlayableItem(gameState, subject);
    const flashing = isFlashing(subject);
    const shining = playableHasShield(subject);
    const teleportingPhase = teleporting?.phase ?? null;
    const isStoodOn =
      type !== "heels" &&
      (!isEmptyObject(subject.state.stoodOnBy) ||
        // keep eyes closed for a short time after being stepped off of, so that
        // instantaneous jumps off head still get this effect:
        subject.state.stoodOnUntilRoomTime + 300 > roomTime);

    const renderProps: PlayableRenderProps = {
      action,
      resolvedFacingArtIndexXy8,
      flipX,
      teleportingPhase,
      flashing,
      highlighted,
      shining,
      gravityZ,
      isStoodOn,
    };

    const gravityAboveThreshold = gravityZ > jumpSpriteGravityZThreshold;
    const refreshSprites =
      // note: not all props are used here!
      !this.#hasRenderedOnce ||
      this.#prevAction !== action ||
      this.#prevFacingArtIndexXy8 !== resolvedFacingArtIndexXy8 ||
      this.#prevFlipX !== flipX ||
      this.#prevTeleportingPhase !== teleportingPhase ||
      this.#prevGravityAboveThreshold !== gravityAboveThreshold ||
      this.#prevIsStoodOn !== isStoodOn;

    for (let i = 0; i < this.#individuals.length; i++) {
      this.#individuals[i].update(
        refreshSprites,
        renderProps,
        paused,
        spritesheets.spritesheetForCurrentRoom,
      );
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
