import { Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";

import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import {
  maybeRenderContainerToAnimatedSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
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
        general: { spriteOption, pixiRenderer },
      },
    }) => {
      return maybeRenderContainerToSprite(
        pixiRenderer,
        createSprite({
          textureId: `barrier.${axis}${disappearing ? ".disappearing" : ""}`,
          times,
          spritesheetVariant:
            spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
        }),
      );
    },
  ),

  deadlyBlock: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config, id },
        general: { paused, spriteOption, pixiRenderer },
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
              spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
          });

          return maybeRenderContainerToAnimatedSprite(
            pixiRenderer,
            rendering,
            "volcano",
          );
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
        general: { spriteOption },
      },
    }) => {
      const spritesheetVariant =
        spriteOption === "Speccy" ? "uncolourised" : "for-current-room";
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
        general: { paused, spriteOption },
      },
    }) => {
      const rendering = new Container();
      const spritesheetVariant =
        spriteOption === "Speccy" ? "uncolourised" : "for-current-room";

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
  portableTeleporter: teleporterAppearance,

  sceneryCrown: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { planet },
        },
        general: { spriteOption },
      },
    }) => {
      return createSprite({
        textureId: `crown.${planet}`,
        spritesheetVariant:
          spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
      });
    },
  ),

  pickup: itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: { config },
        general: { paused, spriteOption },
      },
    }) => {
      const spritesheetVariant =
        spriteOption === "Speccy" ? "uncolourised" : "for-current-room";

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
        shield: {
          textureId: "whiteRabbit.shield",
          spritesheetVariant,
        },
        jumps: {
          textureId: "whiteRabbit.jumps",
          spritesheetVariant,
        },
        fast: {
          textureId: "whiteRabbit.fast",
          spritesheetVariant,
        },
        "extra-life": {
          textureId: "whiteRabbit.extra-life",
          spritesheetVariant,
        },
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
  moveableDeadly: itemStaticAppearance("fish.dead"),

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
        general: { spriteOption },
      },
    }) =>
      createSprite({
        textureId: style,
        spritesheetVariant:
          spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
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
        general: { paused, spriteOption },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.bounce.${style}`,
        paused,
        randomiseStartFrame: id,
        spritesheetVariant:
          spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
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
        general: { paused, spriteOption },
      },
    }) => {
      const characterEquivalent = forCharacter === "head" ? "head" : "heels";

      return createSprite({
        animationId: `particle.${characterEquivalent}.fade`,
        anchor: { x: 0.5, y: 0.5 },
        paused,
        spritesheetVariant:
          spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
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
