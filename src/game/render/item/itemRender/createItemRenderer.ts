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
 * in every way it needs to be rendered" machine, plus a hook into the pipeline
 * for other items' renderers to work against.
 */
export type ItemRenderPipeline<T extends ItemInPlayType> = {
  /** the top-level, chained renderer that was created for this item. Tick this to tick the item */
  top: ItemSoundAndGraphicsRenderer<T>;

  /**
   * the item's position-free drawn content: everything it renders except the
   * screen positioning - art, near-corner offset, its own carves, any warp
   * mesh, and outer decoration (eg the pick-up-next highlight outline).
   * Cyclic masks bake the front item's silhouette from this, so a carve is
   * exactly the pixels the front actually draws
   */
  maskSourceGraphics?: Container;
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
        flashOnSwitchedDecorateItemRenderer(
          itemRenderContext,
          itemPixiRenderer,
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
  let positionFreeRenderer: ItemChainPixiRenderer<T> | undefined;
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
    // (cyclic mask + cuboid warp + wall fade) → pick-up highlight → screen
    // positioning. The highlight sits OUTSIDE the transition surface so its
    // outline (or any other filter) always is applied after any warping:
    positionFreeRenderer = portableItemPickHighlightDecorateItemRenderer(
      itemRenderContext,
      new TransitionSurfaceRenderer(
        itemRenderContext,
        new NearCornerOffsetRenderer(itemRenderContext, compositeRenderer),
      ),
    );
    graphics = new ItemPositionRenderer(
      itemRenderContext,
      positionFreeRenderer,
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
    maskSourceGraphics: positionFreeRenderer?.output,
  };
};
