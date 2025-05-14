import { Container } from "pixi.js";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { store } from "../../../../store/store";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { maybeCreateItemShadowRenderer } from "./ItemShadowRenderer";
import {
  selectIsUncolourised,
  selectShowBoundingBoxes,
} from "../../../../store/selectors";
import type { ItemPixiRenderer } from "./ItemRenderer";
import { ItemSoundAndGraphicsRenderer } from "./ItemSoundAndGraphicsRenderer";
import { createSoundRenderer } from "../../../../sound/createSoundRenderer";
import { SoundPanRenderer } from "../../../../sound/SoundPanRenderer";
import { defaultUserSettings } from "../../../../store/defaultUserSettings";
import { ItemFlashOnSwitchedRenderer } from "./ItemFlashOnSwitchedRenderer";
import type { ItemAppearanceOutsideView } from "../../itemAppearances/itemAppearanceOutsideView";
import { appearanceForItem } from "../../itemAppearances/appearanceForItem";
import { maybeWrapInPortableItemPickUpNextHighlightRenderer } from "./PortableItemPickUpNextHighlightRenderer";
import { debugItemClicked } from "../../../../store/slices/gameMenusSlice";

/** for debugging */
const assignPointerActions = <RoomId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId>,
  container: Container,
) => {
  if (container !== undefined) {
    container.eventMode = "static";
    container.on("pointertap", () => {
      store.dispatch(debugItemClicked({ item }));
    });
  }
};

/** factory to create the correct combinations of renderer(s) for any item */
export const createItemRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
): ItemSoundAndGraphicsRenderer<T> => {
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

  if (appearance !== undefined) {
    const itemAppearanceRenderer = new ItemAppearancePixiRenderer(
      itemRenderContext,
      appearance,
    );
    const rendererWithFlashing = new ItemFlashOnSwitchedRenderer(
      itemRenderContext,
      itemAppearanceRenderer,
    );
    siblingPixiRenderers.push(
      maybeWrapInPortableItemPickUpNextHighlightRenderer(
        item,
        itemRenderContext,
        rendererWithFlashing,
      ),
    );
    if (renderBoundingBoxes) {
      rendererWithFlashing.output.alpha = 0.66;
    }
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

    assignPointerActions(item, compositeRenderer.output);

    graphics = new ItemPositionRenderer(itemRenderContext, compositeRenderer);
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

  return new ItemSoundAndGraphicsRenderer(itemRenderContext, {
    graphics,
    sound,
  });
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
