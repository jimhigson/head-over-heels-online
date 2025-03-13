import type { GameState } from "../../../gameState/GameState";
import { Container } from "pixi.js";
import type {
  AnyItemInPlay,
  ItemInPlay,
  ItemInPlayType,
} from "../../../../model/ItemInPlay";
import { store } from "../../../../store/store";
import type { ItemRenderContext, ItemTickContext } from "../../Renderer";
import { ItemAppearanceRenderer } from "./ItemAppearanceRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import {
  selectIsColourised,
  selectIsPaused,
  selectShowBoundingBoxes,
} from "../../../../store/selectors";
import { itemAppearances } from "../../itemAppearances/ItemAppearances";
import type { SetRequired } from "type-fest";
import type { ItemAppearanceWithKnownRoomId } from "../../itemAppearances/ItemAppearance";
import type { ItemRenderer } from "./ItemRenderer";

/** for debugging */
const assignPointerActions = <RoomId extends string>(
  item: AnyItemInPlay<RoomId>,
  container: Container,
  gameState: GameState<RoomId>,
) => {
  if (container !== undefined) {
    container.eventMode = "static";
    container.on("pointertap", () => {
      gameState.events.emit("itemClicked", { item, container });
    });
  }
};

const hasShadowMask = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemInPlay<T, RoomId, RoomItemId>,
): item is SetRequired<typeof item, "shadowMask"> =>
  item.shadowMask !== undefined;

/** factory to create the correct combinations of renderer(s) for any item */
export const createItemRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  itemRenderContext: ItemRenderContext<T, RoomId, RoomItemId>,
): ItemRenderer<T, RoomId, RoomItemId> | "not-needed" => {
  const state = store.getState();
  const showBoundingBoxes = selectShowBoundingBoxes(state);
  const colourise = selectIsColourised(state);

  const isPaused = selectIsPaused(state);

  const { item, gameState } = itemRenderContext;

  const renderBoundingBoxes =
    showBoundingBoxes === "all" ||
    (showBoundingBoxes === "non-wall" &&
      itemRenderContext.item.type !== "wall");

  const renderers: ItemRenderer<T, RoomId, RoomItemId>[] = [];

  if (itemRenderContext.item.renders) {
    const appearance = itemAppearances[
      item.type
    ] as /* narrow down ItemAppearance to the version that already has our RoomId/RoomItemId baked in */ ItemAppearanceWithKnownRoomId<
      T,
      RoomId,
      RoomItemId
    >;

    const itemAppearanceRenderer = new ItemAppearanceRenderer<
      T,
      RoomId,
      RoomItemId
    >(itemRenderContext, appearance);
    renderers.push(itemAppearanceRenderer);
    if (renderBoundingBoxes) {
      itemAppearanceRenderer.container.alpha = 0.66;
    }

    // non-colourised rendering doesn't have shadows (yet) since it prevents
    // the colour revert shader from properly identifying black/non-black pixels
    if (!isPaused && colourise && hasShadowMask(item)) {
      renderers.push(new ItemShadowRenderer(itemRenderContext));
    }
  }
  if (renderBoundingBoxes) {
    renderers.push(new ItemBoundingBoxRenderer(itemRenderContext));
  }

  if (renderers.length === 0) {
    // TODO: return a null renderer (that does nothing) instead of a special string?
    return "not-needed";
  }

  const compositeRenderer =
    renderers.length === 1 ?
      renderers[0]
    : new CompositeItemRenderer(renderers, itemRenderContext);

  assignPointerActions(item, compositeRenderer.container, gameState);

  return new ItemPositionRenderer(itemRenderContext, compositeRenderer);
};

class CompositeItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemRenderer<T, RoomId, RoomItemId>
{
  #componentRenderers: ItemRenderer<T, RoomId, RoomItemId>[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(
    componentRenderers: ItemRenderer<T, RoomId, RoomItemId>[],
    /* the composite renderer doesn't actually use the render context, but it's needed 
       to implement the interface */
    public readonly renderContext: ItemRenderContext<T, RoomId, RoomItemId>,
  ) {
    this.#componentRenderers = componentRenderers;
    this.#container.addChild(...componentRenderers.map((r) => r.container));
  }
  tick(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.tick(tickContext);
    }
  }
  destroy() {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.destroy();
    }
  }
  get container() {
    return this.#container;
  }
}
