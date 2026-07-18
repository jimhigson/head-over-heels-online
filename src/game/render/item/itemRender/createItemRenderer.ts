import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { createSoundRenderer } from "../../../../sound/createSoundRenderer";
import { SoundPanRenderer } from "../../../../sound/SoundPanRenderer";
import { defaultUserSettings } from "../../../../store/slices/userSettings/defaultUserSettings";
import { type ItemRenderContext } from "../../ItemRenderContexts";
import { CompositeItemGraphicsRenderer } from "./CompositeItemGraphicsRenderer";
import { conveyorBobDecorateItemRenderer } from "./ConveyorBobRenderer";
import { createItemLeafPixiRenderer } from "./createItemLeafPixiRenderer";
import { type DecorateItemMaybeRenderer } from "./DecorateItemRenderer";
import { flashOnSwitchedDecorateItemRenderer } from "./ItemFlashOnSwitchedRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { maybeCreateItemShadowRenderer } from "./ItemShadowRenderer";
import { ItemSoundAndGraphicsRenderer } from "./ItemSoundAndGraphicsRenderer";
import { NearCornerOffsetRenderer } from "./NearCornerOffsetRenderer";
import { portableItemPickHighlightDecorateItemRenderer } from "./PortableItemPickUpNextHighlightRenderer";
import { TransitionSurfaceRenderer } from "./TransitionSurfaceRenderer";

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

  // a hook into the sub-renderer that renders the item itself - without shadows,
  // sound or decorators - eg for using an item's art as a mask
  itemPixiRenderer?: ItemChainPixiRenderer<T>;
};

const maybeWrapWithInjected = <T extends ItemInPlayType>(
  injectedDecorators: DecorateItemMaybeRenderer[][],
  itemRenderContext: ItemRenderContext<T>,
  childRenderer?: ItemChainPixiRenderer<T>,
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

  const siblingPixiRenderers: ItemChainPixiRenderer<T>[] = [];

  const itemPixiRenderer = createItemLeafPixiRenderer(itemRenderContext);

  const mainRenderChain = maybeWrapWithInjected(
    injectedDecorators,
    itemRenderContext,
    itemPixiRenderer === undefined ? undefined : (
      conveyorBobDecorateItemRenderer(
        itemRenderContext,
        portableItemPickHighlightDecorateItemRenderer(
          itemRenderContext,
          flashOnSwitchedDecorateItemRenderer(
            itemRenderContext,
            itemPixiRenderer,
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

  let graphics: ItemChainPixiRenderer<T> | undefined;
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

    // the item's graphics chain, inner → outer: art → near-corner offset →
    // (cyclic mask + cuboid warp + wall fade) → screen positioning:
    graphics = new ItemPositionRenderer(
      itemRenderContext,
      new TransitionSurfaceRenderer(
        itemRenderContext,
        new NearCornerOffsetRenderer(itemRenderContext, compositeRenderer),
      ),
    );
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
    itemPixiRenderer,
  };
};
