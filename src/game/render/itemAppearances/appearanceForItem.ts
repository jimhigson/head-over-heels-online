import { Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";

import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/textureSizes";
import { createSprite } from "../createSprite";
import {
  bookPaletteSwapFilter,
  mainPaletteSwapFilter,
  noFilters,
} from "../filters/standardFilters";
import { blockAppearance } from "./blockAppearance";
import { buttonAppearance } from "./buttonAppearance";
import { charlesAppearance } from "./charlesAppearance";
import { conveyorAppearance } from "./conveyorAppearance";
import { doorFrameAppearance, doorLegsAppearance } from "./door/doorAppearance";
import { floatingTextAppearance } from "./floatingTextAppearance";
import { floorAppearance } from "./floorAppearance/floorAppearance";
import {
  itemAppearanceRenderOnce,
  itemStaticAnimatedAppearance,
  itemStaticAppearance,
} from "./ItemAppearance";
import { monsterAppearance } from "./monsterAppearance";
import { playableAppearance, shineFilterForHeels } from "./playableAppearance";
import { sceneryPlayerAppearance } from "./sceneryPlayer";
import { spikyBallAppearance } from "./spikyBallAppearance";
import { springAppearance } from "./springAppearance";
import { switchAppearance } from "./switchAppearance";
import { teleporterAppearance } from "./teleporterAppearance";
import { toasterAppearance } from "./toasterAppearance";
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
        item: {
          config: { axis, times },
        },
      },
    }) => {
      return createSprite({
        textureId: `barrier.${axis}`,
        times,
      });
    },
  ),

  deadlyBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config, id },
        room,
        general: { paused, gameState },
      },
    }) => {
      switch (config.style) {
        case "volcano":
          return createSprite({
            animationId: "volcano",
            filter: mainPaletteSwapFilter(room),
            times: config.times,
            randomiseStartFrame: id,
            paused,
            gameSpeed: gameState?.gameSpeed,
          });
        case "toaster":
          throw new Error("use the special toaster appearance instead");
        default:
          config.style satisfies never;
          throw new Error("unknown deadly block style");
      }
    },
  ),
  spikes: itemStaticAppearance("spikes"),

  slidingDeadly: spikyBallAppearance,

  slidingBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
        room,
      },
    }) =>
      createSprite(
        style === "book" ?
          { textureId: "book.y", filter: bookPaletteSwapFilter(room) }
        : style,
      ),
  ),

  block: blockAppearance,

  switch: switchAppearance,
  button: buttonAppearance,

  conveyor: conveyorAppearance,

  lift: itemAppearanceRenderOnce(
    ({
      renderContext: {
        general: { paused, gameState },
      },
    }) => {
      const rendering = new Container();

      const pivot = {
        x: smallItemTextureSize.w / 2,
        y: smallItemTextureSize.h,
      };
      rendering.addChild(
        createSprite({
          animationId: "lift",
          pivot,
          paused,
          gameSpeed: gameState?.gameSpeed,
        }),
      );

      rendering.addChild(createSprite({ textureId: "lift.static", pivot }));

      return rendering;
    },
  ),

  teleporter: teleporterAppearance,

  sceneryCrown: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { planet },
        },
      },
    }) => {
      return createSprite({
        textureId: `crown.${planet}`,
      });
    },
  ),

  pickup: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config },
        room,
        general: { paused, gameState },
      },
    }) => {
      if (config.gives === "crown") {
        return createSprite({
          textureId: `crown.${config.planet}`,
        });
      }

      const pickupSpriteOptions: Record<
        (typeof config)["gives"],
        CreateSpriteOptions
      > = {
        shield: "whiteRabbit",
        jumps: "whiteRabbit",
        fast: "whiteRabbit",
        "extra-life": "whiteRabbit",
        bag: "bag",
        doughnuts: "doughnuts",
        hooter: "hooter",
        scroll: { textureId: "scroll", filter: mainPaletteSwapFilter(room!) },
        reincarnation: {
          animationId: "fish",
          paused,
          gameSpeed: gameState?.gameSpeed,
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      return createSprite(createSpriteOptions);
    },
  ),

  // these are always dead fish:
  moveableDeadly: itemStaticAppearance("fish.1"),

  charles: charlesAppearance,

  joystick: itemStaticAppearance("joystick"),

  movingPlatform: itemStaticAppearance("sandwich"),
  pushableBlock: itemStaticAppearance("stepStool"),

  portableBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
      },
    }) => createSprite(style),
  ),

  spring: springAppearance,

  sceneryPlayer: sceneryPlayerAppearance,

  hushPuppy: itemStaticAppearance("hushPuppy"),

  bubbles: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          id,
          config: { style },
        },
        general: { paused, gameState },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.${style}`,
        paused,
        gameSpeed: gameState?.gameSpeed,
        randomiseStartFrame: id,
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
        item: {
          config: { forCharacter },
        },
        general: { paused, gameState },
      },
    }) => {
      return createSprite({
        animationId: "particle.fade",
        anchor: { x: 0.5, y: 0.5 },
        filter: forCharacter === "heels" ? shineFilterForHeels : noFilters,
        paused,
        gameSpeed: gameState?.gameSpeed,
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
    } else {
      return farWallAppearance as ItemAppearanceOutsideView<T>;
    }
  }

  if (item.type === "deadlyBlock" && item.config.style === "toaster") {
    return toasterAppearance as ItemAppearanceOutsideView<T>;
  }

  return itemAppearancesMap[item.type as T];
};
