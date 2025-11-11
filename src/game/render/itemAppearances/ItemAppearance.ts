import type { Container } from "pixi.js";
import type { EmptyObject } from "type-fest";

import { Sprite } from "pixi.js";

import type {
  ItemInPlayConfig,
  ItemInPlayType,
} from "../../../model/ItemInPlay";
import type {
  AppearanceOptions,
  AppearanceReturn,
} from "../appearance/Appearance";
import type {
  AnimatedCreateSpriteOptions,
  CreateSpriteOptions,
} from "../createSprite";
import type { ItemRenderContext, ItemTickContext } from "../ItemRenderContexts";

import { itemInPlayTimes } from "../../../model/times";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import {
  maybeRenderContainerToSprite,
  renderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../utils/pixi/renderMultpliedXy";
import { isMultipliedItem } from "../../physics/itemPredicates";
import { createSprite } from "../createSprite";

export type ItemAppearanceOptions<
  T extends ItemInPlayType,
  RenderProps extends object = EmptyObject,
  Output extends Container = Container,
> = AppearanceOptions<
  ItemRenderContext<T>,
  ItemTickContext,
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
  createSpriteOptions: CreateSpriteOptions,
): ItemAppearance<T> =>
  itemAppearanceRenderOnce(({ renderContext: { item: subject } }) => {
    if (isMultipliedItem(subject)) {
      return createSprite({
        ...(typeof createSpriteOptions === "string" ?
          { textureId: createSpriteOptions }
        : createSpriteOptions),
        times: itemInPlayTimes(subject),
      });
    } else {
      return createSprite(createSpriteOptions);
    }
  });

export const itemStaticAnimatedAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: Omit<
    AnimatedCreateSpriteOptions,
    "gameSpeed" | "paused"
  >,
): ItemAppearance<T> =>
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: subject,
        general: { paused },
      },
    }) => {
      if (isMultipliedItem(subject)) {
        return createSprite({
          ...createSpriteOptions,
          times: itemInPlayTimes(subject),
          paused,
        });
      } else {
        return createSprite({
          ...createSpriteOptions,
          paused,
        });
      }
    },
  );

/**
 * A static appearance, but renders only to Sprite, via rendertextures
 * if needed. This is mostly for shadow masks, since they need to be sprites
 */
export const itemStaticSpriteAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: CreateSpriteOptions,
): ItemAppearance<T, EmptyObject, Sprite> =>
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: subject,
        general: { pixiRenderer },
      },
    }) => {
      if (isMultipliedItem(subject)) {
        return maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(createSpriteOptions, itemInPlayTimes(subject)),
        );
      } else {
        const container = createSprite(createSpriteOptions);
        if (container instanceof Sprite) {
          return container;
        } else {
          return renderContainerToSprite(pixiRenderer, container);
        }
      }
    },
  );

/**
 * plenty of items never need to be re-rendered and have no render props - convenience for that case
 * that handles not rendering again after the first render
 */
export const itemAppearanceRenderOnce =
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
        ItemAppearanceOptions<T, EmptyObject, Output>,
        "currentlyRenderedProps"
      >,
    ) => Output,
  ): ((
    options: ItemAppearanceOptions<T, EmptyObject, Output>,
  ) => AppearanceReturn<EmptyObject, Output>) =>
  // inner function - calls renderWith
  ({ renderContext, currentRendering, tickContext }) => {
    if (currentRendering === undefined) {
      return {
        output: renderWith({
          renderContext,
          // this only renders once, so we know it has never been rendered before:
          currentRendering: undefined,
          tickContext,
        }),
        renderProps: emptyObject,
      };
    } else {
      return "no-update";
    }
  };

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
export const itemAppearanceShadowMaskFromConfig =
  <T extends ItemInPlayType>(
    spriteOptionsFromConfig: (
      config: ItemInPlayConfig<T, string, string>,
    ) => CreateSpriteOptions,
  ): ((
    options: ItemAppearanceOptions<T, EmptyObject, Sprite>,
  ) => AppearanceReturn<EmptyObject, Sprite>) =>
  // inner function - calls renderWith
  ({
    renderContext: {
      general: { pixiRenderer },
      item,
    },
    currentRendering,
  }) => {
    if (currentRendering === undefined) {
      const times = itemInPlayTimes(item);

      const appearanceReturn = {
        output: maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(
            spriteOptionsFromConfig(
              item.config as ItemInPlayConfig<T, string, string>,
            ),
            times,
          ),
        ),
        renderProps: emptyObject,
      };

      if (times) {
        // move the shadow mast up if the item is multiplied in z:
        appearanceReturn.output.y -= ((times.z ?? 1) - 1) * blockSizePx.h;
      }

      return appearanceReturn;
    } else {
      return "no-update";
    }
  };
