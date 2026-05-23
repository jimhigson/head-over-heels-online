import { Sprite } from "pixi.js";
import { type EmptyObject } from "type-fest";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayConfig,
  type ItemInPlayType,
} from "../../../../model/ItemInPlay";
import { type MonsterJsonConfig } from "../../../../model/json/MonsterJsonConfig";
import { itemInPlayTimes } from "../../../../model/times";
import {
  type AnimationId,
  type TextureId,
} from "../../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { emptyObject } from "../../../../utils/empty";
import {
  maybeRenderContainerToSprite,
  renderContainerToSprite,
} from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultipliedXy";
import { tangentAxis } from "../../../../utils/vectors/vectors";
import { isMultipliedItem } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { type AppearanceReturn } from "../../appearance/Appearance";
import {
  createSprite,
  type SpecifiedTextureCreateSpriteOptions,
} from "../../createSprite";
import {
  type ItemAppearance,
  type ItemAppearanceOptions,
  itemAppearanceRenderOnce,
} from "../ItemAppearance";
import { springShadowMaskAppearance } from "../springAppearance";
import {
  directionalShadowMaskAppearanceXy4,
  playableShadowMaskAppearanceXy8,
} from "./directionalShadowMaskAppearance";
import { teleporterShadowMaskAppearance } from "./teleporterShadowMaskAppearance";

type ShadowMaskSpriteOptions = {
  textureId?: TextureId;
  animationId?: AnimationId;
  flipX?: boolean;
  y?: number;
};

const shadowMaskStaticAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: ShadowMaskSpriteOptions,
): ItemAppearance<T, EmptyObject, Sprite> =>
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: subject,
        general: { pixiRenderer, spritesheetVariants },
      },
    }) => {
      const options = {
        ...createSpriteOptions,
        spritesheet: spritesheetVariants.shadowSpritesheet,
      } as SpecifiedTextureCreateSpriteOptions;

      if (isMultipliedItem(subject)) {
        return maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(options, itemInPlayTimes(subject)),
        );
      }
      const container = createSprite(options);
      if (container instanceof Sprite) {
        return container;
      }
      return renderContainerToSprite(pixiRenderer, container);
    },
  );

/**
 * convenience for creating appearances for shadow masks. Works for
 * any item that needs a mask based off its config, and does not
 * late change the shadow mask based on its state or any other
 * factors.
 *
 * Also handles the case where the item is multiplied in x and y, but
 * not z (not needed for shadow masks). However, does move the sprite up
 * in z for items multiplied in z
 */
const shadowMaskFromConfigAppearance =
  <T extends ItemInPlayType>(
    spriteOptionsFromConfig: (
      config: ItemInPlayConfig<T, string, string>,
    ) => ShadowMaskSpriteOptions,
  ): ((
    options: ItemAppearanceOptions<T, EmptyObject, Sprite>,
  ) => AppearanceReturn<EmptyObject, Sprite>) =>
  ({
    renderContext: {
      general: { pixiRenderer, spritesheetVariants },
      item,
    },
    currentRendering,
  }) => {
    if (currentRendering === undefined) {
      const times = itemInPlayTimes(item);
      const baseOptions = spriteOptionsFromConfig(
        item.config as ItemInPlayConfig<T, string, string>,
      );
      const options = {
        ...baseOptions,
        spritesheet: spritesheetVariants.shadowSpritesheet,
      } as SpecifiedTextureCreateSpriteOptions;

      const appearanceReturn = {
        output: maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(options, times),
        ),
        renderProps: emptyObject,
      };

      if (times) {
        // move the shadow mast up if the item is multiplied in z:
        appearanceReturn.output.y -= ((times.z ?? 1) - 1) * blockSizePx.z;
      }

      return appearanceReturn;
    }
    return "no-update";
  };

export type ItemShadowAppearanceOutsideView<T extends ItemInPlayType> =
  ItemAppearance<
    T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Sprite
  >;

const itemShadowMaskAppearances: {
  // only sprites can be used as masks in pixi, so these appearances must return a single sprite (no containers etc)
  // monster is a special case, since they all need their own, different masks.
  [T in `monster.${MonsterJsonConfig["which"]}` | ItemInPlayType]?:
    | ItemShadowAppearanceOutsideView<
        T extends `monster.${string}` ? "monster" : T
      >
    /** shadows are cast, but explicitly no mask - ie, the floor does not need a mask*/
    | "no-mask";
} = {
  lift: shadowMaskStaticAppearance({
    textureId: "shadowMask.smallBlock",
  }),
  conveyor: shadowMaskFromConfigAppearance(({ direction }) => ({
    textureId: "shadowMask.conveyor",
    flipX: tangentAxis(direction) === "x",
  })),

  doorLegs: shadowMaskFromConfigAppearance(({ direction }) => {
    const floating = direction === "right" || direction === "towards";

    return {
      textureId:
        floating ?
          "shadowMask.door.floatingThreshold.double.y"
        : "shadowMask.door.legs.threshold.double.y",
      flipX: tangentAxis(direction) === "y",
    };
  }),

  teleporter: teleporterShadowMaskAppearance,
  portableTeleporter: teleporterShadowMaskAppearance,

  // no shadow mast for the floor
  floor: "no-mask",

  barrier: shadowMaskFromConfigAppearance(({ axis }) => ({
    textureId: "shadowMask.barrier.y",
    flipX: axis === "x",
    // needs this to line up with the sprite - not sure why
    y: -1,
  })),

  spring: springShadowMaskAppearance,

  block: shadowMaskFromConfigAppearance(({ style }) => ({
    textureId: `shadowMask.${style}`,
  })),
  pushableBlock: shadowMaskStaticAppearance({
    textureId: "shadowMask.stepStool",
  }),
  movingPlatform: shadowMaskStaticAppearance({
    textureId: "shadowMask.sandwich",
  }),
  hushPuppy: shadowMaskStaticAppearance({
    textureId: "shadowMask.hushPuppy",
  }),

  portableBlock: shadowMaskFromConfigAppearance(({ style }) => ({
    textureId: style === "drum" ? "shadowMask.drum" : "shadowMask.smallBlock",
  })),
  slidingBlock: shadowMaskFromConfigAppearance(({ style }) =>
    style === "book" ?
      {
        textureId: "shadowMask.book",
        flipX: true,
      }
    : { textureId: "shadowMask.smallRound" },
  ),
  deadlyBlock: shadowMaskFromConfigAppearance(({ style }) => ({
    textureId:
      style === "volcano" ? "shadowMask.volcano" : "shadowMask.toaster",
  })),
  spikes: shadowMaskStaticAppearance({
    textureId: "shadowMask.spikes",
  }),
  switch: shadowMaskStaticAppearance({
    textureId: "shadowMask.switch",
  }),
  button: shadowMaskStaticAppearance({
    textureId: "shadowMask.buttonInGame",
  }),
  pickup: shadowMaskFromConfigAppearance(({ gives }) => {
    switch (gives) {
      case "scroll":
        return {
          textureId: "shadowMask.scroll",
        };
      case "doughnuts":
        return {
          textureId: "shadowMask.doughnuts",
        };
      case "fast":
      case "extra-life":
      case "jumps":
      case "shield":
        return {
          textureId: "shadowMask.whiteRabbit",
        };
      default:
        // cheaply have no shadows cast on them
        return { textureId: "blank" };
    }
  }),
  slidingDeadly: shadowMaskStaticAppearance({
    textureId: "shadowMask.smallRound",
  }),
  ball: shadowMaskStaticAppearance({
    textureId: "shadowMask.ball",
  }),

  "monster.dalek": shadowMaskStaticAppearance({
    textureId: "shadowMask.dalek",
  }),
  "monster.turtle": directionalShadowMaskAppearanceXy4("turtle"),
  "monster.skiHead": directionalShadowMaskAppearanceXy4("skiHead"),
  "monster.homingBot": shadowMaskStaticAppearance({
    textureId: "shadowMask.smallRound",
  }),

  joystick: shadowMaskStaticAppearance({
    textureId: "shadowMask.joystick",
  }),

  charles: directionalShadowMaskAppearanceXy4("charles", 2),

  head: playableShadowMaskAppearanceXy8("head"),
  heels: playableShadowMaskAppearanceXy8("heels"),
  headOverHeels: playableShadowMaskAppearanceXy8("head", 2),
};

export const itemShadowMaskAppearanceForItem = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
):
  | ItemShadowAppearanceOutsideView<T>
  /** explicity no mask (but will show shadows) */
  | "no-mask"
  /** no shadows cast on this item */
  | undefined => {
  switch (item.type) {
    case "sceneryPlayer":
      return itemShadowMaskAppearances[
        item.config.which
      ] as ItemShadowAppearanceOutsideView<T>;
    case "monster":
      return itemShadowMaskAppearances[`monster.${item.config.which}`] as
        | ItemShadowAppearanceOutsideView<T>
        | undefined;
    case "floor":
      // no shadows on 'none' floors since there is nothing to cast on
      return item.config.floorType === "none" ? undefined : "no-mask";
    default:
      return itemShadowMaskAppearances[item.type as T] as
        | ItemShadowAppearanceOutsideView<T>
        | undefined;
  }
};
