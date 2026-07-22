import { type Container } from "pixi.js";
import { type EmptyObject } from "type-fest";

import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { itemInPlayTimes } from "../../../model/times";
import {
  type BaseAnimationId,
  type BaseTextureId,
} from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type ReflectableId } from "../../../sprites/spritesheet/spritesheetData/variantSpritesheetData";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { type Xy, xyEqual } from "../../../utils/vectors/vectors";
import { isMultipliedItem } from "../../physics/itemPredicates";
import {
  type AppearanceOptions,
  type AppearanceReturn,
} from "../appearance/Appearance";
import {
  type AnimatedCreateSpriteOptions,
  createSprite,
} from "../createSprite";
import {
  type ItemLeafRenderContext,
  type ItemLeafTickContext,
} from "../ItemRenderContexts";

export type ItemAppearanceOptions<
  T extends ItemInPlayType,
  RenderProps extends object = EmptyObject,
  Output extends Container = Container,
> = AppearanceOptions<
  ItemLeafRenderContext<T>,
  ItemLeafTickContext,
  RenderProps,
  Output
>;

export type ItemAppearance<
  T extends ItemInPlayType,
  /**
   * render props for the appearance are stashed between renders and can be used to
   * determine if a new rendering is required. They can also be different, for example
   * between item renderer and item shadow mask renderer
   */
  RenderProps extends object = EmptyObject,
  Output extends Container = Container,
> = (
  options: ItemAppearanceOptions<T, RenderProps, Output>,
) => AppearanceReturn<RenderProps, Output>;

export const itemStaticAppearance = <T extends ItemInPlayType>(
  /** the reflection recolour suffix is applied to this base id at render time */
  baseTextureId: BaseTextureId & ReflectableId,
): ItemAppearance<T, RenderOnceProps> =>
  itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: subject,
        general: { pixiRenderer, spritesheets, cameraAngle },
      },
      currentRendering,
    }) => {
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
      const textureId = variantTextureId(
        baseTextureId,
        isReflection,
        false,
        false,
        false,
        undefined,
      );
      if (isMultipliedItem(subject)) {
        // reduce the multiple sprites down to one baked sprite; camera-angle
        // re-renders bake into the previous render texture (the multiplied
        // bake is the same size at every quarter turn):
        return maybeRenderContainerToSprite(
          pixiRenderer,
          createSprite({
            textureId,
            times: itemInPlayTimes(subject),
            cameraQuarterAngle,
            spritesheet,
          }),
          asReuseSprite(currentRendering?.output),
        );
      }
      return createSprite({
        textureId,
        spritesheet,
      });
    },
    multipliedLayoutAngle,
  );

export const itemStaticAnimatedAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: Omit<
    AnimatedCreateSpriteOptions,
    "animationId" | "gameSpeed" | "paused" | "spritesheet"
  > & { animationId: BaseAnimationId & ReflectableId },
): ItemAppearance<T, RenderOnceProps> =>
  itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: subject,
        general: { paused, spritesheets, cameraAngle },
      },
    }) => {
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
      const animationId = variantTextureId(
        createSpriteOptions.animationId,
        isReflection,
        false,
        false,
        false,
        undefined,
      );
      if (isMultipliedItem(subject)) {
        return createSprite({
          ...createSpriteOptions,
          animationId,
          times: itemInPlayTimes(subject),
          paused,
          cameraQuarterAngle,
          spritesheet,
        });
      }
      return createSprite({
        ...createSpriteOptions,
        animationId,
        paused,
        spritesheet,
      });
    },
    multipliedLayoutAngle,
  );

/**
 * plenty of items never need to be re-rendered and have no render props - convenience for that case
 * that handles not rendering again after the first render
 */

/**
 * equality over the nullable camera angle stored in renderProps: null means
 * "the camera angle does not affect this item's rendering"
 */
export const cameraQuarterAngleEqual = (a: null | Xy, b: null | Xy): boolean =>
  a === null || b === null ? a === b : xyEqual(a, b);

/**
 * the camera angle, but only where it affects the item's rendered layout: a
 * `times` multiplication along x/y tiles sprites along a world axis, which
 * rotates on screen with the camera. Null for anything else, so single items
 * never re-render for a camera rotation
 */
export const multipliedLayoutAngle = (
  item: Parameters<typeof isMultipliedItem>[0],
  cameraQuarterAngle: Xy,
): null | Xy => {
  if (!isMultipliedItem(item)) {
    return null;
  }
  const times = itemInPlayTimes(item);
  return (times?.x ?? 1) > 1 || (times?.y ?? 1) > 1 ? cameraQuarterAngle : null;
};

export type RenderOnceProps = {
  /** see {@link itemAppearanceRenderMemoised}'s cameraAngleRerenderGate */
  cameraQuarterAngle: null | Xy;
};

export const itemAppearanceRenderMemoised =
  <
    T extends ItemInPlayType,
    /**
     * what we expect to be rendering to. Ie, a Container or maybe constrained down to Sprite for
     * shadow masks
     */
    Output extends Container = Container,
  >(
    renderWith: (
      appearance: Omit<
        ItemAppearanceOptions<T, RenderOnceProps, Output>,
        "currentlyRenderedProps"
      >,
      /**
       * returning undefined means the appearance declines to render this frame -
       * any current rendering is removed. Used by walls after camera rotation
       * if moves to the hidden side, or initially if starting on a hidden side
       */
    ) => Output | undefined,
    /**
     * the camera angle the rendering resolves against, or null where it has
     * no effect: when it changes (the renderer's camera angle changed
     * mid-life) the appearance renders again. Omit for renderings with no
     * angle dependence at all, which render exactly once
     */
    cameraAngleRerenderGate?: (
      item: ItemTypeUnion<T, string, string>,
      cameraQuarterAngle: Xy,
    ) => null | Xy,
  ): ((
    options: ItemAppearanceOptions<T, RenderOnceProps, Output>,
  ) => AppearanceReturn<RenderOnceProps, Output>) =>
  // inner function - calls renderWith
  ({ renderContext, currentRendering, tickContext }) => {
    const cameraQuarterAngle =
      cameraAngleRerenderGate?.(
        renderContext.item,
        nearestQuarterAngle(renderContext.general.cameraAngle),
      ) ?? null;
    if (
      currentRendering === undefined ||
      !cameraQuarterAngleEqual(
        currentRendering.renderProps.cameraQuarterAngle,
        cameraQuarterAngle,
      )
    ) {
      return {
        // the previous rendering (if any) is passed through so renderWith can
        // reuse its output (eg re-bake into an existing sprite's render
        // texture) instead of building afresh:
        output: renderWith({
          renderContext,
          currentRendering,
          tickContext,
        }),
        renderProps: { cameraQuarterAngle },
      };
    }
    return "no-update";
  };
