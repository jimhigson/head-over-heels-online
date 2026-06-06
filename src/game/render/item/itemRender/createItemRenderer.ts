import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { createSoundRenderer } from "../../../../sound/createSoundRenderer";
import { SoundPanRenderer } from "../../../../sound/SoundPanRenderer";
import { defaultUserSettings } from "../../../../store/slices/userSettings/defaultUserSettings";
import { appearanceForItem } from "../../itemAppearances/appearanceForItem";
import { type ItemAppearanceOutsideView } from "../../itemAppearances/itemAppearanceOutsideView";
import { type ItemRenderContext } from "../../ItemRenderContexts";
import { CompositeItemGraphicsRenderer } from "./CompositeItemGraphicsRenderer";
import { conveyorBobDecorateItemRenderer } from "./ConveyorBobRenderer";
import { type DecorateItemMaybeRenderer } from "./DecorateItemRenderer";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { flashOnSwitchedDecorateItemRenderer } from "./ItemFlashOnSwitchedRenderer";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { maybeCreateItemShadowRenderer } from "./ItemShadowRenderer";
import { ItemSoundAndGraphicsRenderer } from "./ItemSoundAndGraphicsRenderer";
import { portableItemPickHighlightDecorateItemRenderer } from "./PortableItemPickUpNextHighlightRenderer";

/**
 * creating an item renderer creates one special 'top' property which is the "render this item
 * in every way it needs to be rendered" machine. However, there are also hooks into the pipeline
 * available to get access to some of the sub-renderers.
 *
 * Eg, if masking against an item's appearance,
 * we don't need to get its shadows, sounds, annotations, etc, just its basic item appearance
 * renderer output
 */
export type ItemRenderPipeline<T extends ItemInPlayType> = {
  /** the top-level, chained renderer that was created for this item. Tick this to tick the item */
  top: ItemSoundAndGraphicsRenderer<T>;

  // a hook into the sub-renderer that makes the actual appearance - more could be added later if needed
  itemAppearanceRenderer?: ItemAppearancePixiRenderer<T, object, Container>;
};

const maybeWrapWithInjected = <T extends ItemInPlayType>(
  injectedDecorators: DecorateItemMaybeRenderer[][],
  itemRenderContext: ItemRenderContext<T>,
  childRenderer?: ItemPixiRenderer<T>,
) => {
  if (injectedDecorators.length === 0) {
    return childRenderer;
  }

  let composed = childRenderer;
  for (const group of injectedDecorators) {
    for (const decorator of group) {
      composed = decorator(itemRenderContext, composed);
    }
  }
  return composed;
};

/** factory to create the correct combinations of renderer(s) for any item */
export const createItemRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
  injectedDecorators: DecorateItemMaybeRenderer[][],
): ItemRenderPipeline<T> => {
  const {
    general: { paused },
  } = itemRenderContext;

  const { item } = itemRenderContext;

  const siblingPixiRenderers: ItemPixiRenderer<T>[] = [];

  const appearance = appearanceForItem(item) as ItemAppearanceOutsideView<T>;
  let itemAppearanceRenderer:
    | ItemRenderPipeline<T>["itemAppearanceRenderer"]
    | undefined = undefined;

  const mainRenderChain = maybeWrapWithInjected(
    injectedDecorators,
    itemRenderContext,
    appearance === undefined ? undefined : (
      conveyorBobDecorateItemRenderer(
        itemRenderContext,
        portableItemPickHighlightDecorateItemRenderer(
          itemRenderContext,
          flashOnSwitchedDecorateItemRenderer(
            itemRenderContext,
            (itemAppearanceRenderer = new ItemAppearancePixiRenderer(
              itemRenderContext,
              appearance,
            )),
          ),
        ),
      )
    ),
  );

  if (mainRenderChain !== undefined) {
    siblingPixiRenderers.push(mainRenderChain);
  }

  // the container holding the item's graphics siblings (appearance + shadows). It is the
  // tint target for whole-item shadows, so it is created here and injected into both the
  // shadow renderer (which tints it) and the composite (which uses it as its container)
  const graphicsContainer = new Container({
    label: `itemGraphics ${item.id}`,
  });

  // whole-item shadow tinting is colourised-only: in uncolourised mode cast shadows are
  // hard black, so darkening a whole item toward black would erase it into its silhouette
  const maybeItemShadowRenderer = maybeCreateItemShadowRenderer(
    itemRenderContext,
    graphicsContainer,
  );
  if (maybeItemShadowRenderer !== undefined) {
    siblingPixiRenderers.push(maybeItemShadowRenderer);
  }

  let graphics: ItemPixiRenderer<T> | undefined;
  if (siblingPixiRenderers.length === 0) {
    graphics = undefined;
  } else {
    const compositeRenderer =
      siblingPixiRenderers.length === 1 ?
        siblingPixiRenderers[0]
      : new CompositeItemGraphicsRenderer(
          siblingPixiRenderers,
          itemRenderContext,
          graphicsContainer,
        );

    graphics = new ItemPositionRenderer(itemRenderContext, compositeRenderer);
  }

  const mute =
    itemRenderContext.general.soundSettings.mute ??
    defaultUserSettings.soundSettings.mute;

  const soundRenderer =
    paused || mute ?
      // no items are allowed to make sound while paused:
      undefined
    : createSoundRenderer(itemRenderContext);
  const sound =
    soundRenderer === undefined ? undefined
    : item.noSoundPan ? soundRenderer
    : new SoundPanRenderer(itemRenderContext, soundRenderer);

  return {
    top: new ItemSoundAndGraphicsRenderer(itemRenderContext, {
      graphics,
      sound,
    }),
    itemAppearanceRenderer,
  };
};
