import { AnimatedSprite, Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";

import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../createSprite";
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
import { joystickAppearance } from "./joystickAppearance";
import { monsterAppearance } from "./monsterAppearance";
import { playableAppearance } from "./playableAppearance";
import { sceneryPlayerAppearance } from "./sceneryPlayerAppearance";
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
          config: { axis, times, disappearing },
        },
        general: { colourised },
      },
    }) => {
      return createSprite({
        textureId: `barrier.${axis}${disappearing ? ".disappearing" : ""}`,
        times,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
      });
    },
  ),

  deadlyBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config, id },
        general: { paused, colourised, pixiRenderer },
      },
    }) => {
      switch (config.style) {
        case "volcano": {
          const rendering = createSprite({
            animationId: "volcano",
            times: config.times,
            randomiseStartFrame: id,
            paused,
            spritesheetVariant:
              colourised ? "for-current-room" : "uncolourised",
          });

          if (rendering instanceof AnimatedSprite) {
            return rendering;
          } else {
            return maybeRenderContainerToAnimatedSprite(
              pixiRenderer,
              rendering,
              "volcano",
            );
          }
        }
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
        general: { colourised },
      },
    }) => {
      const spritesheetVariant =
        colourised ? "for-current-room" : "uncolourised";
      return createSprite(
        style === "book" ?
          { textureId: "book.y", spritesheetVariant }
        : { textureId: style, spritesheetVariant },
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
        general: { paused, colourised },
      },
    }) => {
      const rendering = new Container();
      const spritesheetVariant =
        colourised ? "for-current-room" : "uncolourised";

      const pivot = {
        x: smallItemTextureSize.w / 2,
        y: smallItemTextureSize.h,
      };
      rendering.addChild(
        createSprite({
          animationId: "lift",
          pivot,
          paused,
          spritesheetVariant,
        }),
      );

      rendering.addChild(
        createSprite({ textureId: "lift.static", pivot, spritesheetVariant }),
      );

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
        general: { colourised },
      },
    }) => {
      return createSprite({
        textureId: `crown.${planet}`,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
      });
    },
  ),

  pickup: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config },
        general: { paused, colourised },
      },
    }) => {
      const spritesheetVariant =
        colourised ? "for-current-room" : "uncolourised";

      if (config.gives === "crown") {
        return createSprite({
          textureId: `crown.${config.planet}`,
          spritesheetVariant,
        });
      }

      const pickupSpriteOptions: Record<
        (typeof config)["gives"],
        CreateSpriteOptions
      > = {
        shield: { textureId: "whiteRabbit", spritesheetVariant },
        jumps: { textureId: "whiteRabbit", spritesheetVariant },
        fast: { textureId: "whiteRabbit", spritesheetVariant },
        "extra-life": { textureId: "whiteRabbit", spritesheetVariant },
        bag: { textureId: "bag", spritesheetVariant },
        doughnuts: { textureId: "doughnuts", spritesheetVariant },
        hooter: { textureId: "hooter", spritesheetVariant },
        scroll: { textureId: "scroll", spritesheetVariant },
        reincarnation: {
          animationId: "fish",
          paused,
          spritesheetVariant,
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      return createSprite(createSpriteOptions);
    },
  ),

  // these are always dead fish:
  moveableDeadly: itemStaticAppearance("fish.1"),

  charles: charlesAppearance,

  joystick: joystickAppearance,

  movingPlatform: itemStaticAppearance("sandwich"),
  pushableBlock: itemStaticAppearance("stepStool"),

  portableBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
        general: { colourised },
      },
    }) =>
      createSprite({
        textureId: style,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
      }),
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
        general: { paused, colourised },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.bounce.${style}`,
        paused,
        randomiseStartFrame: id,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
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
        general: { paused, colourised },
      },
    }) => {
      const characterEquivalent = forCharacter === "head" ? "head" : "heels";

      return createSprite({
        animationId: `particle.${characterEquivalent}.fade`,
        anchor: { x: 0.5, y: 0.5 },
        paused,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
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
