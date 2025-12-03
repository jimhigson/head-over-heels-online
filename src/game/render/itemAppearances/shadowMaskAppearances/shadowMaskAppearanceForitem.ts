import type { Sprite } from "pixi.js";

import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { MonsterJsonConfig } from "../../../../model/json/MonsterJsonConfig";
import type { ItemAppearance } from "../ItemAppearance";

import { tangentAxis } from "../../../../utils/vectors/vectors";
import {
  itemAppearanceShadowMaskFromConfig,
  itemStaticSpriteAppearance,
} from "../ItemAppearance";
import { springShadowMaskAppearance } from "../springAppearance";
import {
  directionalShadowMaskAppearanceXy4,
  directionalShadowMaskAppearanceXy8,
} from "./directionalShadowMaskAppearance";
import { teleporterShadowMaskAppearance } from "./teleporterShadowMaskAppearance";

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
  lift: itemStaticSpriteAppearance({
    textureId: "shadowMask.smallBlock",
    spritesheetVariant: "original",
  }),
  conveyor: itemAppearanceShadowMaskFromConfig(({ direction }) => ({
    textureId: "shadowMask.conveyor",
    flipX: tangentAxis(direction) === "x",
    spritesheetVariant: "original",
  })),

  doorLegs: itemAppearanceShadowMaskFromConfig(({ direction }) => {
    const floating = direction === "right" || direction === "towards";

    return {
      textureId:
        floating ?
          "shadowMask.door.floatingThreshold.double.y"
        : "shadowMask.door.legs.threshold.double.y",
      flipX: tangentAxis(direction) === "y",
      spritesheetVariant: "original",
    };
  }),

  teleporter: teleporterShadowMaskAppearance,

  // no shadow mast for the floor
  floor: "no-mask",

  barrier: itemAppearanceShadowMaskFromConfig(({ axis }) => ({
    textureId: "shadowMask.barrier.y",
    flipX: axis === "x",
    // needs this to line up with the sprite - not sure why
    y: -1,
    spritesheetVariant: "original",
  })),

  spring: springShadowMaskAppearance,

  block: itemAppearanceShadowMaskFromConfig(({ style }) => ({
    textureId: `shadowMask.${style}`,
    spritesheetVariant: "original",
  })),
  pushableBlock: itemStaticSpriteAppearance({
    textureId: "shadowMask.stepStool",
    spritesheetVariant: "original",
  }),
  movingPlatform: itemStaticSpriteAppearance({
    textureId: "shadowMask.sandwich",
    spritesheetVariant: "original",
  }),
  hushPuppy: itemStaticSpriteAppearance({
    textureId: "shadowMask.hushPuppy",
    spritesheetVariant: "original",
  }),

  portableBlock: itemAppearanceShadowMaskFromConfig(({ style }) => ({
    textureId: style === "drum" ? "shadowMask.drum" : "shadowMask.smallBlock",
    spritesheetVariant: "original",
  })),
  slidingBlock: itemAppearanceShadowMaskFromConfig(({ style }) =>
    style === "book" ?
      {
        textureId: "shadowMask.book",
        flipX: true,
        spritesheetVariant: "original",
      }
    : { textureId: "shadowMask.smallRound", spritesheetVariant: "original" },
  ),
  deadlyBlock: itemAppearanceShadowMaskFromConfig(({ style }) => ({
    textureId:
      style === "volcano" ? "shadowMask.volcano" : "shadowMask.toaster",
    spritesheetVariant: "original",
  })),
  spikes: itemStaticSpriteAppearance({
    textureId: "shadowMask.spikes",
    spritesheetVariant: "original",
  }),
  switch: itemStaticSpriteAppearance({
    textureId: "shadowMask.switch",
    spritesheetVariant: "original",
  }),
  button: itemStaticSpriteAppearance({
    textureId: "shadowMask.buttonInGame",
    spritesheetVariant: "original",
  }),
  pickup: itemAppearanceShadowMaskFromConfig(({ gives }) => {
    switch (gives) {
      case "scroll":
        return {
          textureId: "shadowMask.scroll",
          spritesheetVariant: "original",
        };
      case "doughnuts":
        return {
          textureId: "shadowMask.doughnuts",
          spritesheetVariant: "original",
        };
      case "fast":
      case "extra-life":
      case "jumps":
      case "shield":
        return {
          textureId: "shadowMask.whiteRabbit",
          spritesheetVariant: "original",
        };
      default:
        // cheaply have no shadows cast on them
        return { textureId: "blank", spritesheetVariant: "original" };
    }
  }),
  slidingDeadly: itemStaticSpriteAppearance({
    textureId: "shadowMask.smallRound",
    spritesheetVariant: "original",
  }),
  ball: itemStaticSpriteAppearance({
    textureId: "shadowMask.ball",
    spritesheetVariant: "original",
  }),

  "monster.dalek": itemStaticSpriteAppearance({
    textureId: "shadowMask.dalek",
    spritesheetVariant: "original",
  }),
  "monster.turtle": directionalShadowMaskAppearanceXy4("turtle"),
  "monster.skiHead": directionalShadowMaskAppearanceXy4("skiHead"),
  "monster.homingBot": itemStaticSpriteAppearance({
    textureId: "shadowMask.smallRound",
    spritesheetVariant: "original",
  }),

  joystick: itemStaticSpriteAppearance({
    textureId: "shadowMask.joystick",
    spritesheetVariant: "original",
  }),

  charles: directionalShadowMaskAppearanceXy4("charles", 2),

  head: directionalShadowMaskAppearanceXy8("head"),
  heels: directionalShadowMaskAppearanceXy8("heels"),
  headOverHeels: directionalShadowMaskAppearanceXy8("head", 2),
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
