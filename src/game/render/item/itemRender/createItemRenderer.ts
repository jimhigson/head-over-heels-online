import type { GameState } from "../../../gameState/GameState";
import { Container } from "pixi.js";
import type {
  AnyItemInPlay,
  ItemInPlayType,
} from "../../../../model/ItemInPlay";
import { store } from "../../../../store/store";
import type { ItemRenderContext, ItemTickContext } from "../../Renderer";
import { ItemAppearanceRenderer } from "./ItemAppearanceRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import type { ItemRenderContextWithRequiredShadowMask } from "./ItemShadowRenderer";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import {
  selectIsColourised,
  selectShowBoundingBoxes,
} from "../../../../store/selectors";
import { itemAppearances } from "../../itemAppearances/ItemAppearances";
import type { ItemAppearanceWithKnownRoomId } from "../../itemAppearances/ItemAppearance";
import type { ItemPixiRenderer } from "./ItemRenderer";
import { ItemSoundAndGraphicsRenderer } from "./ItemSoundAndGraphicsRenderer";
import { createSoundRenderer } from "../../../../sound/createSoundRenderer";
import { SoundPanRenderer } from "../../../../sound/SoundPanRenderer";

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
  itemRenderContext: ItemRenderContext<T, RoomId, RoomItemId>,
): itemRenderContext is ItemRenderContextWithRequiredShadowMask<
  T,
  RoomId,
  RoomItemId
> => itemRenderContext.item.shadowMask !== undefined;

/** factory to create the correct combinations of renderer(s) for any item */
export const createItemRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  itemRenderContext: ItemRenderContext<T, RoomId, RoomItemId>,
): ItemSoundAndGraphicsRenderer<T, RoomId, RoomItemId> => {
  const state = store.getState();
  const showBoundingBoxes = selectShowBoundingBoxes(state);
  const colourise = selectIsColourised(state);

  const { item, gameState } = itemRenderContext;

  const renderBoundingBoxes =
    showBoundingBoxes === "all" ||
    (showBoundingBoxes === "non-wall" &&
      itemRenderContext.item.type !== "wall");

  const pixiRenderers: ItemPixiRenderer<T, RoomId, RoomItemId>[] = [];

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
    pixiRenderers.push(itemAppearanceRenderer);
    if (renderBoundingBoxes) {
      itemAppearanceRenderer.output.alpha = 0.66;
    }

    // non-colourised rendering doesn't have shadows (yet) since it prevents
    // the colour revert shader from properly identifying black/non-black pixels
    if (colourise && hasShadowMask(itemRenderContext)) {
      pixiRenderers.push(new ItemShadowRenderer(itemRenderContext));
    }
  }
  if (renderBoundingBoxes) {
    pixiRenderers.push(new ItemBoundingBoxRenderer(itemRenderContext));
  }

  let graphics: ItemPixiRenderer<T, RoomId, RoomItemId> | undefined;
  if (pixiRenderers.length === 0) {
    graphics = undefined;
  } else {
    const compositeRenderer =
      pixiRenderers.length === 1 ?
        pixiRenderers[0]
      : new CompositeItemRenderer(pixiRenderers, itemRenderContext);

    assignPointerActions(item, compositeRenderer.output, gameState);

    graphics = new ItemPositionRenderer(itemRenderContext, compositeRenderer);
  }

  const soundRenderer =
    itemRenderContext.paused ?
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

class CompositeItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemPixiRenderer<T, RoomId, RoomItemId>
{
  #componentRenderers: ItemPixiRenderer<T, RoomId, RoomItemId>[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(
    componentRenderers: ItemPixiRenderer<T, RoomId, RoomItemId>[],
    /* the composite renderer doesn't actually use the render context, but it's needed 
       to implement the interface */
    public readonly renderContext: ItemRenderContext<T, RoomId, RoomItemId>,
  ) {
    this.#componentRenderers = componentRenderers;
    this.#container.addChild(...componentRenderers.map((r) => r.output));
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
  get output() {
    return this.#container;
  }
}
