import { Container } from "pixi.js";

import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { maybeRenderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { blockAppearance } from "./blockAppearance";
import { buttonAppearance } from "./buttonAppearance";
import { charlesAppearance } from "./charlesAppearance";
import { conveyorAppearance } from "./conveyorAppearance";
import { deadlyBlockAppearance } from "./deadlyBlockAppearance";
import { doorFrameAppearance, doorLegsAppearance } from "./door/doorAppearance";
import { floatingTextAppearance } from "./floatingTextAppearance";
import { floorAppearance } from "./floorAppearance/floorAppearance";
import {
  itemAppearanceRenderOnce,
  itemStaticAnimatedAppearance,
  itemStaticAppearance,
} from "./ItemAppearance";
import { type ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";
import { joystickAppearance } from "./joystickAppearance";
import { lampAppearance } from "./lampAppearance";
import { lightBeamAppearance } from "./lightBeamAppearance";
import { makeMirrorAppearance } from "./mirror/mirrorAppearance";
import { monsterAppearance } from "./monsterAppearance";
import { playableAppearance } from "./playableAppearance";
import { sceneryPlayerAppearance } from "./sceneryPlayerAppearance";
import { spikyBallAppearance } from "./spikyBallAppearance";
import { springAppearance } from "./springAppearance";
import { switchAppearance } from "./switchAppearance";
import { teleporterAppearance } from "./teleporterAppearance";
import { farWallAppearance } from "./wallAppearance";

const itemAppearancesMap: {
  [T in ItemInPlayType]?: ItemAppearanceOutsideView<T>;
} = {
  // casts allow these appearances to use Container specialisations as their output without
  // clashing with the `itemAppearances` types
  head: playableAppearance,
  heels: playableAppearance,
  headOverHeels: playableAppearance,
  doorFrame: doorFrameAppearance,
  doorLegs: doorLegsAppearance,
  monster: monsterAppearance,
  floatingText: floatingTextAppearance,

  barrier: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { axis, times, disappearing },
        },
        general: { spritesheetVariants, pixiRenderer },
      },
    }) => {
      return maybeRenderContainerToSprite(
        pixiRenderer,
        createSprite({
          textureId: `barrier.${axis}${disappearing ? ".disappearing" : ""}`,
          times,
          spritesheet: spritesheetVariants.currentMainSpritesheet(
            false,
            false,
            isReflection,
          ),
        }),
      );
    },
  ),

  deadlyBlock: deadlyBlockAppearance,
  spikes: itemStaticAppearance("spikes"),

  slidingDeadly: spikyBallAppearance,

  slidingBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { style },
        },
        general: { spritesheetVariants },
      },
    }) => {
      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );
      return createSprite(
        style === "book" ?
          { textureId: "book.y", spritesheet }
        : { textureId: style, spritesheet },
      );
    },
  ),

  block: blockAppearance,

  switch: switchAppearance,
  button: buttonAppearance,

  conveyor: conveyorAppearance,

  lift: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        general: { paused, spritesheetVariants },
      },
    }) => {
      const rendering = new Container();
      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );

      const pivot = {
        x: smallItemTextureSize.w / 2,
        y: smallItemTextureSize.h,
      };
      rendering.addChild(
        createSprite({
          animationId: "lift",
          pivot,
          paused,
          spritesheet,
        }),
      );

      rendering.addChild(
        createSprite({ textureId: "lift.static", pivot, spritesheet }),
      );

      return rendering;
    },
  ),

  teleporter: teleporterAppearance,
  portableTeleporter: teleporterAppearance,

  lamp: lampAppearance,
  // the mirror renders other items' reflections, so gets the lookup
  // injected (a direct import would be a circular dependency):
  mirror: makeMirrorAppearance((item) => appearanceForItem(item)),
  lightBeam: lightBeamAppearance,

  sceneryCrown: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { planet },
        },
        general: { spritesheetVariants },
      },
    }) => {
      return createSprite({
        textureId: `crown.${planet}`,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      });
    },
  ),

  pickup: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: { config },
        general: { paused, spritesheetVariants },
      },
    }) => {
      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );

      if (config.gives === "crown") {
        return createSprite({
          textureId: `crown.${config.planet}`,
          spritesheet,
        });
      }

      const pickupSpriteOptions: Record<
        (typeof config)["gives"],
        CreateSpriteOptions
      > = {
        shield: {
          textureId: "whiteRabbit.shield",
          spritesheet,
        },
        jumps: {
          textureId: "whiteRabbit.jumps",
          spritesheet,
        },
        fast: {
          textureId: "whiteRabbit.fast",
          spritesheet,
        },
        "extra-life": {
          textureId: "whiteRabbit.extra-life",
          spritesheet,
        },
        bag: { textureId: "bag", spritesheet },
        doughnuts: { textureId: "doughnuts", spritesheet },
        hooter: { textureId: "hooter", spritesheet },
        scroll: { textureId: "scroll", spritesheet },
        reincarnation: {
          animationId: "fish",
          paused,
          spritesheet,
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      return createSprite(createSpriteOptions);
    },
  ),

  // these are always dead fish:
  moveableDeadly: itemStaticAppearance("fish.dead"),

  charles: charlesAppearance,

  joystick: joystickAppearance,

  movingPlatform: itemStaticAppearance("sandwich"),
  pushableBlock: itemStaticAppearance("stepStool"),

  portableBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { style },
        },
        general: { spritesheetVariants },
      },
    }) =>
      createSprite({
        textureId: style,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      }),
  ),

  spring: springAppearance,

  sceneryPlayer: sceneryPlayerAppearance,

  hushPuppy: itemStaticAppearance("hushPuppy"),

  bubbles: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          hash,
          config: { style },
        },
        general: { paused, spritesheetVariants },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.bounce.${style}`,
        paused,
        startFramePhase: hash,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      });
    },
  ),
  firedDoughnut: itemStaticAnimatedAppearance({
    animationId: "bubbles.doughnut",
  }),

  ball: itemStaticAppearance("ball"),

  floor: floorAppearance,

  particle: itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { forCharacter },
        },
        general: { paused, spritesheetVariants },
      },
    }) => {
      const characterEquivalent = forCharacter === "head" ? "head" : "heels";

      return createSprite({
        animationId: `particle.${characterEquivalent}.fade`,
        anchor: { x: 0.5, y: 0.5 },
        paused,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      });
    },
  ),
};

/**
 * for any given item, return the appearance for that item, or undefined if we
 * have none
 */
export const appearanceForItem = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
): ItemAppearanceOutsideView<T> | undefined => {
  if (item.type === "wall") {
    // walls are a case where we only have an appearance in some directions,
    // otherwise they are invisible
    const { direction } = item.config;
    if (direction === "right" || direction === "towards") {
      return undefined;
    }
    return farWallAppearance as ItemAppearanceOutsideView<T>;
  }

  return itemAppearancesMap[item.type as T];
};
