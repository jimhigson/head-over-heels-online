import { Container } from "pixi.js";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { doorFrameAppearance, doorLegsAppearance } from "./door/doorAppearance";
import { playableAppearance, shineFilterForHeels } from "./playableAppearance";
import {
  itemAppearanceRenderOnce,
  itemStaticAppearance,
} from "./ItemAppearance";
import { floorAppearance } from "./floorAppearance/floorAppearance";
import {
  bookPaletteSwapFilter,
  mainPaletteSwapFilter,
  noFilters,
} from "../filters/standardFilters";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/textureSizes";

import { monsterAppearance } from "./monsterAppearance";
import { floatingTextAppearance } from "./floatingTextAppearance";
import type { ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";
import { conveyorAppearance } from "./conveyorAppearance";
import { teleporterAppearance } from "./teleporterAppearance";
import { charlesAppearance } from "./charlesAppearance";
import { springAppearance } from "./springAppearance";
import { sceneryPlayerAppearance } from "./sceneryPlayer";
import { spikyBallAppearance } from "./spikyBallAppearance";
import { farWallAppearance } from "./wallAppearance";
import { switchAppearance } from "./switchAppearance";
import { blockAppearance } from "./blockAppearance";
import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { toasterAppearance } from "./toasterAppearance";
import {
  makeTextContainer,
  showTextInContainer,
} from "../hud/showNumberInContainer";

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
        item: { config },
        room,
      },
    }) => {
      switch (config.style) {
        case "volcano":
          return createSprite({
            animationId: "volcano",
            filter: mainPaletteSwapFilter(room),
            times: config.times,
            randomiseStartFrame: true,
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

  conveyor: conveyorAppearance,

  lift: itemAppearanceRenderOnce(
    ({
      renderContext: {
        general: { paused },
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
        general: { paused, editor },
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
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      const sprite = createSprite(createSpriteOptions);

      if (editor && createSpriteOptions === "whiteRabbit") {
        // in-game, the 'gives' of the white rabbit is not shown, but in-editor
        // let the editor know this
        const explainingText = {
          shield: "🛡",
          jumps: "♨",
          fast: "⚡",
          "extra-life": "+2",
        };

        const explainingIcon = showTextInContainer(
          makeTextContainer({
            outline: true,
          }),
          explainingText[config.gives as keyof typeof explainingText],
        );
        explainingIcon.y = -16;
        return new Container({
          children: [sprite, explainingIcon],
        });
      } else {
        return sprite;
      }
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
          config: { style },
        },
        general: { paused },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.${style}`,
        paused,
      });
    },
  ),
  firedDoughnut: itemStaticAppearance({
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
      },
    }) => {
      return createSprite({
        animationId: "particle.fade",
        anchor: { x: 0.5, y: 0.5 },
        filter: forCharacter === "heels" ? shineFilterForHeels : noFilters,
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
