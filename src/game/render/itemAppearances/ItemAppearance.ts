import { type Container } from "pixi.js";
import { type EmptyObject } from "type-fest";

import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { itemInPlayTimes } from "../../../model/times";
import { type TextureId } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { emptyObject } from "../../../utils/empty";
import { isMultipliedItem } from "../../physics/itemPredicates";
import {
  type AppearanceOptions,
  type AppearanceReturn,
} from "../appearance/Appearance";
import {
  type AnimatedCreateSpriteOptions,
  createSprite,
  type SpecifiedTextureCreateSpriteOptions,
} from "../createSprite";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../ItemRenderContexts";

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
  createSpriteOptions: SpecifiedTextureCreateSpriteOptions | TextureId,
): ItemAppearance<T> =>
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: subject,
        general: { spriteOption },
      },
    }) => {
      if (isMultipliedItem(subject)) {
        return createSprite({
          ...(typeof createSpriteOptions === "string" ?
            { textureId: createSpriteOptions }
          : createSpriteOptions),
          times: itemInPlayTimes(subject),
          spritesheetVariant:
            spriteOption.uncolourised ? "uncolourised" : "for-current-room",
        });
      }
      return createSprite({
        ...(typeof createSpriteOptions === "string" ?
          { textureId: createSpriteOptions }
        : createSpriteOptions),
        spritesheetVariant:
          spriteOption.uncolourised ? "uncolourised" : "for-current-room",
      });
    },
  );

export const itemStaticAnimatedAppearance = <T extends ItemInPlayType>(
  createSpriteOptions: Omit<
    AnimatedCreateSpriteOptions,
    "gameSpeed" | "paused" | "spritesheetVariant"
  >,
): ItemAppearance<T> =>
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: subject,
        general: { paused, spriteOption },
      },
    }) => {
      if (isMultipliedItem(subject)) {
        return createSprite({
          ...createSpriteOptions,
          times: itemInPlayTimes(subject),
          paused,
          spritesheetVariant:
            spriteOption.uncolourised ? "uncolourised" : "for-current-room",
        });
      }
      return createSprite({
        ...createSpriteOptions,
        paused,
        spritesheetVariant:
          spriteOption.uncolourised ? "uncolourised" : "for-current-room",
      });
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
    }
    return "no-update";
  };
