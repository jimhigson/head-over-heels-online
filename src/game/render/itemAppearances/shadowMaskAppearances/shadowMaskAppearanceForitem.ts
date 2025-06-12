import type { Sprite } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { directionAxis } from "../../../../utils/vectors/vectors";
import type { ItemAppearance } from "../ItemAppearance";
import {
  itemAppearanceShadowMaskFromConfig,
  itemStaticSpriteAppearance,
} from "../ItemAppearance";
import { teleporterShadowMaskAppearance } from "./teleporterShadowMaskAppearance";
import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import { directionalShadowMaskAppearance } from "./directionalShadowMaskAppearance";
import type { MonsterJsonConfig } from "../../../../model/json/MonsterJsonConfig";

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
  [T in ItemInPlayType | `monster.${MonsterJsonConfig["which"]}`]?:
    | ItemShadowAppearanceOutsideView<
        T extends `monster.${string}` ? "monster" : T
      >
    /** shadows are cast, but explicitly no mask - ie, the floor does not need a mask*/
    | "no-mask";
} = {
  lift: itemStaticSpriteAppearance("shadowMask.smallBlock"),
  conveyor: itemAppearanceShadowMaskFromConfig(({ direction }) => ({
    textureId: "shadowMask.conveyor",
    flipX: directionAxis(direction) === "x",
  })),

  teleporter: teleporterShadowMaskAppearance,

  // no shadow mast for the floor
  floor: "no-mask",

  barrier: itemAppearanceShadowMaskFromConfig(({ axis }) => ({
    textureId: "shadowMask.barrier.y",
    flipX: axis === "x",
  })),

  spring: itemStaticSpriteAppearance("shadowMask.smallRound"),

  block: itemAppearanceShadowMaskFromConfig(({ style }) =>
    style === "tower" ? "shadowMask.tower" : "shadowMask.fullBlock",
  ),
  pushableBlock: itemStaticSpriteAppearance("shadowMask.stepStool"),
  movingPlatform: itemStaticSpriteAppearance("shadowMask.fullBlock"),
  hushPuppy: itemStaticSpriteAppearance("shadowMask.hushPuppy"),

  portableBlock: itemAppearanceShadowMaskFromConfig(({ style }) =>
    style === "drum" ? "shadowMask.smallRound" : "shadowMask.smallBlock",
  ),
  slidingBlock: itemAppearanceShadowMaskFromConfig(({ style }) =>
    style === "book" ? "shadowMask.fullBlock" : "shadowMask.smallRound",
  ),
  deadlyBlock: itemAppearanceShadowMaskFromConfig(({ style }) =>
    style === "volcano" ? "shadowMask.volcano" : "shadowMask.toaster",
  ),
  spikes: itemStaticSpriteAppearance("shadowMask.spikes"),
  switch: itemStaticSpriteAppearance("shadowMask.switch"),
  pickup: itemAppearanceShadowMaskFromConfig(({ gives }) => {
    switch (gives) {
      case "scroll":
        return "shadowMask.scroll";
      case "doughnuts":
        return "shadowMask.doughnuts";
      case "fast":
      case "extra-life":
      case "jumps":
      case "shield":
        return "shadowMask.whiteRabbit";
      default:
        // cheaply have no shadows
        return "blank";
    }
  }),
  slidingDeadly: itemStaticSpriteAppearance("shadowMask.smallRound"),
  ball: itemStaticSpriteAppearance("shadowMask.ball"),

  "monster.dalek": itemStaticSpriteAppearance("shadowMask.dalek"),
  "monster.turtle": directionalShadowMaskAppearance("turtle"),
  "monster.skiHead": directionalShadowMaskAppearance("skiHead"),
  "monster.homingBot": itemStaticSpriteAppearance("shadowMask.smallRound"),

  joystick: itemStaticSpriteAppearance("shadowMask.joystick"),

  charles: directionalShadowMaskAppearance("charles", 2),
};

export const itemShadowMaskAppearanceForItem = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
):
  | ItemShadowAppearanceOutsideView<T>
  /** explicity no mask (but will show shadows) */
  | "no-mask"
  /** no shadows cast on this item */
  | undefined => {
  return (
    item.type === "monster" ?
      itemShadowMaskAppearances[`monster.${item.config.which}`]
    : itemShadowMaskAppearances[item.type as T]) as
    | ItemShadowAppearanceOutsideView<T>
    | undefined;
};
