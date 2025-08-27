import { Container } from "pixi.js";

import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import type { ItemAppearanceOutsideView } from "../../itemAppearances/itemAppearanceOutsideView";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { createSoundRenderer } from "../../../../sound/createSoundRenderer";
import { SoundPanRenderer } from "../../../../sound/SoundPanRenderer";
import { defaultUserSettings } from "../../../../store/defaultUserSettings";
import {
  selectIsUncolourised,
  selectShowBoundingBoxes,
} from "../../../../store/selectors";
import { debugItemClicked } from "../../../../store/slices/gameMenusSlice";
import { store } from "../../../../store/store";
import { appearanceForItem } from "../../itemAppearances/appearanceForItem";
import { maybeWrapInEditorSelectedRenderer } from "./EditorAnnotationsRenderer";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemFlashOnSwitchedRenderer } from "./ItemFlashOnSwitchedRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { maybeCreateItemShadowRenderer } from "./ItemShadowRenderer";
import { ItemSoundAndGraphicsRenderer } from "./ItemSoundAndGraphicsRenderer";
import { maybeWrapInPortableItemPickUpNextHighlightRenderer } from "./PortableItemPickUpNextHighlightRenderer";

/** for debugging */
const assignPointerActions = <RoomId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId>,
  container: Container,
) => {
  if (container !== undefined && store.getState().gameMenus.cheatsOn) {
    container.eventMode = "static";
    container.on("pointertap", () => {
      store.dispatch(debugItemClicked({ item, pixiContainer: container }));
    });
  }
};

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

  // hooks into sub-renderers - more could be added later if needed
  itemAppearanceRenderer?: ItemAppearancePixiRenderer<T, object, Container>;
};

/** factory to create the correct combinations of renderer(s) for any item */
export const createItemRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
): ItemRenderPipeline<T> => {
  const state = store.getState();
  const showBoundingBoxes = selectShowBoundingBoxes(state);
  const colourise = !selectIsUncolourised(state);

  const { item } = itemRenderContext;

  const renderBoundingBoxes =
    showBoundingBoxes === "all" ||
    (showBoundingBoxes === "non-wall" &&
      itemRenderContext.item.type !== "wall");

  const siblingPixiRenderers: ItemPixiRenderer<T>[] = [];

  const appearance = appearanceForItem(item) as ItemAppearanceOutsideView<T>;
  let itemAppearanceRenderer:
    | ItemRenderPipeline<T>["itemAppearanceRenderer"]
    | undefined = undefined;

  if (appearance !== undefined) {
    itemAppearanceRenderer = new ItemAppearancePixiRenderer(
      itemRenderContext,
      appearance,
    );
    const rendererWithSwitchFlashing = new ItemFlashOnSwitchedRenderer(
      itemRenderContext,
      itemAppearanceRenderer,
    );
    siblingPixiRenderers.push(
      maybeWrapInEditorSelectedRenderer(
        item,
        itemRenderContext,
        maybeWrapInPortableItemPickUpNextHighlightRenderer(
          item,
          itemRenderContext,
          rendererWithSwitchFlashing,
        ),
      ),
    );
  }

  // non-colourised rendering doesn't have shadows (yet) since it prevents
  // the colour revert shader from properly identifying black/non-black pixels
  if (colourise) {
    const maybeItemShadowRenderer =
      maybeCreateItemShadowRenderer(itemRenderContext);
    if (maybeItemShadowRenderer !== undefined) {
      siblingPixiRenderers.push(maybeItemShadowRenderer);
    }
  }

  if (renderBoundingBoxes) {
    siblingPixiRenderers.push(new ItemBoundingBoxRenderer(itemRenderContext));
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
        );

    graphics = new ItemPositionRenderer(itemRenderContext, compositeRenderer);

    assignPointerActions(item, graphics.output);
  }

  const mute =
    itemRenderContext.general.soundSettings.mute ??
    defaultUserSettings.soundSettings.mute;

  const soundRenderer =
    itemRenderContext.general.paused || mute ?
      // no items are allowed to make sound while paused:
      undefined
    : createSoundRenderer(itemRenderContext);
  const sound =
    soundRenderer === undefined ? undefined : (
      new SoundPanRenderer(itemRenderContext, soundRenderer)
    );

  return {
    top: new ItemSoundAndGraphicsRenderer(itemRenderContext, {
      graphics,
      sound,
    }),
    itemAppearanceRenderer,
  };
};

class CompositeItemGraphicsRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #componentRenderers: ItemPixiRenderer<T>[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(
    componentRenderers: ItemPixiRenderer<T>[],
    /* the composite renderer doesn't actually use the render context, but it's needed 
       to implement the interface */
    public readonly renderContext: ItemRenderContext<T>,
  ) {
    this.#componentRenderers = componentRenderers;
    this.#container.addChild(...componentRenderers.map((r) => r.output));
  }
  tick(tickContext: ItemTickContext) {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.tick(tickContext);
    }
  }
  destroy() {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.destroy();
    }
  }
  get output() {
    return this.#container;
  }
}
