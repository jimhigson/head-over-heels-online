import { Sprite } from "pixi.js";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayConfig,
  type ItemInPlayType,
} from "../../../../model/ItemInPlay";
import { type MonsterJsonConfig } from "../../../../model/json/MonsterJsonConfig";
import { itemInPlayTimes } from "../../../../model/times";
import {
  type BaseAnimationIdWithPrefix,
  type BaseTextureIdWithPrefix,
} from "../../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import {
  maybeRenderContainerToSprite,
  renderContainerToSprite,
} from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultipliedXy";
import { octantIndexOfDirection } from "../../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { nearestQuarterAngle } from "../../../../utils/vectors/rotateXy";
import {
  dominantAxisXy,
  rotateAxisXyByCameraAngle,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { isMultipliedItem } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { type AppearanceReturn } from "../../appearance/Appearance";
import {
  createSprite,
  type SpecifiedTextureCreateSpriteOptions,
} from "../../createSprite";
import { isDoorPartInHiddenWall } from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  cameraQuarterAngleEqual,
  type ItemAppearance,
  type ItemAppearanceOptions,
  itemAppearanceRenderMemoised,
  multipliedLayoutAngle,
  type RenderOnceProps,
} from "../ItemAppearance";
import { springShadowMaskAppearance } from "../springAppearance";
import {
  directionalShadowMaskAppearanceXy4,
  playableShadowMaskAppearanceXy8,
} from "./directionalShadowMaskAppearance";
import { teleporterShadowMaskAppearance } from "./teleporterShadowMaskAppearance";

type ShadowMaskSpriteOptions = {
  /** `blank` masks out everything - for items that cast no shadow at all */
  textureId?: "blank" | BaseTextureIdWithPrefix<"shadowMask">;
  animationId?: BaseAnimationIdWithPrefix<"shadowMask">;
  flipX?: boolean;
  y?: number;
};

const shadowMaskStaticAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: ShadowMaskSpriteOptions,
): ItemAppearance<T, RenderOnceProps, Sprite> =>
  itemAppearanceRenderMemoised(
    ({
      renderContext: {
        item: subject,
        general: { pixiRenderer, spritesheets, cameraAngle },
      },
    }) => {
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const options = {
        ...createSpriteOptions,
        // multiplied masks tile along their world axes, which the projection
        // rotates on screen:
        cameraQuarterAngle,
        spritesheet: spritesheets.shadowSpritesheet,
      } as SpecifiedTextureCreateSpriteOptions;

      const times = itemInPlayTimes(subject);

      const createMaskSprite = (): Sprite => {
        if (isMultipliedItem(subject)) {
          return maybeRenderContainerToSprite(
            pixiRenderer,
            renderMultipliedXy(options, times),
          );
        }
        const container = createSprite(options);
        if (container instanceof Sprite) {
          return container;
        }
        return renderContainerToSprite(pixiRenderer, container);
      };

      const sprite = createMaskSprite();
      // move the shadow mask up to the item's top face if multiplied in z:
      if (times) {
        sprite.y -= ((times.z ?? 1) - 1) * blockSizePx.z;
      }
      return sprite;
    },
    multipliedLayoutAngle,
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
      cameraQuarterAngle: Xy,
    ) => ShadowMaskSpriteOptions,
  ): ((
    options: ItemAppearanceOptions<T, RenderOnceProps, Sprite>,
  ) => AppearanceReturn<RenderOnceProps, Sprite>) =>
  ({
    renderContext: {
      general: { pixiRenderer, spritesheets, cameraAngle },
      item,
    },
    currentRendering,
  }) => {
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    // the mask resolves per camera angle (directional art + multiplied tiling):
    if (
      currentRendering === undefined ||
      !cameraQuarterAngleEqual(
        currentRendering.renderProps.cameraQuarterAngle,
        cameraQuarterAngle,
      )
    ) {
      const times = itemInPlayTimes(item);
      const baseOptions = spriteOptionsFromConfig(
        item.config as ItemInPlayConfig<T, string, string>,
        cameraQuarterAngle,
      );
      const options = {
        ...baseOptions,
        // multiplied masks tile along their world axes, which the projection
        // rotates on screen:
        cameraQuarterAngle,
        spritesheet: spritesheets.shadowSpritesheet,
      } as SpecifiedTextureCreateSpriteOptions;

      const appearanceReturn = {
        output: maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(options, times),
        ),
        renderProps: { cameraQuarterAngle },
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
  conveyor: shadowMaskFromConfigAppearance(
    ({ direction }, cameraQuarterAngle) => ({
      textureId: "shadowMask.conveyor",
      flipX:
        rotateAxisXyByCameraAngle(
          dominantAxisXy(direction),
          cameraQuarterAngle,
        ) === "x",
    }),
  ),

  doorLegs: shadowMaskFromConfigAppearance((config, cameraQuarterAngle) => {
    const { direction } = config;
    return {
      textureId:
        // matches whether the legs render the floating threshold (hidden
        // wall) or the full legs at this angle:
        isDoorPartInHiddenWall(config, cameraQuarterAngle) ?
          `shadowMask.door.floatingThreshold.double.d${octantIndexOfDirection(
            "away",
          )}`
        : `shadowMask.door.legs.threshold.double.d${octantIndexOfDirection(
            "away",
          )}`,
      flipX:
        rotateAxisXyByCameraAngle(
          dominantAxisXy(direction),
          cameraQuarterAngle,
        ) === "y",
    };
  }),

  teleporter: teleporterShadowMaskAppearance,
  portableTeleporter: teleporterShadowMaskAppearance,

  // no shadow mast for the floor
  floor: "no-mask",

  barrier: shadowMaskFromConfigAppearance(({ axis }, cameraQuarterAngle) => ({
    textureId: `shadowMask.barrier.d${octantIndexOfDirection("away")}`,
    flipX: rotateAxisXyByCameraAngle(axis, cameraQuarterAngle) === "x",
    // needs this to line up with the sprite - not sure why
    y: -1,
  })),

  spring: springShadowMaskAppearance,

  block: shadowMaskFromConfigAppearance(({ style }) => ({
    textureId: `shadowMask.${style}`,
  })),
  lamp: shadowMaskStaticAppearance({
    textureId: "shadowMask.lamp",
  }),
  // mirrors are full blocks, so reuse the full-block top mask:
  mirror: shadowMaskStaticAppearance({
    textureId: "shadowMask.artificial",
  }),
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
        ItemShadowAppearanceOutsideView<T> | undefined;
    case "floor":
      // no shadows on 'none' floors since there is nothing to cast on
      return item.config.floorType === "none" ? undefined : "no-mask";
    default:
      return itemShadowMaskAppearances[item.type as T] as
        ItemShadowAppearanceOutsideView<T> | undefined;
  }
};
