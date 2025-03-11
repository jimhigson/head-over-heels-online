import type { GameState } from "../../gameState/GameState";
import type { Renderer as PixiRenderer } from "pixi.js";
import { Container } from "pixi.js";
import type {
  AnyItemInPlay,
  ItemInPlay,
  ItemInPlayType,
} from "../../../model/ItemInPlay";
import { store } from "../../../store/store";
import type { ItemRenderContext, Renderer } from "../Renderer";
import { ItemAppearanceRenderer } from "./ItemAppearanceRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import {
  selectIsColourised,
  selectIsPaused,
  selectShowBoundingBoxes,
} from "../../../store/selectors";
import { itemAppearances } from "../itemAppearances/ItemAppearances";
import type { SetRequired } from "type-fest";
import type { ItemAppearanceWithKnownRoomId } from "../itemAppearances/ItemAppearance";
import type { RoomState } from "../../../model/RoomState";

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

export const createItemRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>({
  item,
  room,
  gameState,
  pixiRenderer,
}: {
  item: ItemInPlay<T, RoomId, RoomItemId>;
  room: RoomState<RoomId, RoomItemId>;
  gameState: GameState<RoomId>;
  pixiRenderer: PixiRenderer;
}): Renderer<ItemRenderContext<RoomId, RoomItemId>> | "not-needed" => {
  const state = store.getState();
  const showBoundingBoxes = selectShowBoundingBoxes(state);
  const colourise = selectIsColourised(state);

  const isPaused = selectIsPaused(state);

  const renderBoundingBoxes =
    showBoundingBoxes === "all" ||
    (showBoundingBoxes === "non-wall" && item.type !== "wall");

  const renderers: Renderer<ItemRenderContext<RoomId, RoomItemId>>[] = [];

  if (item.renders) {
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
    >(item, gameState, appearance);
    renderers.push(itemAppearanceRenderer);
    if (renderBoundingBoxes) {
      itemAppearanceRenderer.container.alpha = 0.66;
    }

    // non-colourised rendering doesn't have shadows (yet) since it prevents
    // the colour revert shader from properly identifying black/non-black pixels
    if (!isPaused && colourise && hasShadowMask(item)) {
      renderers.push(new ItemShadowRenderer(item, room, pixiRenderer));
    }
  }
  if (renderBoundingBoxes) {
    renderers.push(new ItemBoundingBoxRenderer(item));
  }

  if (renderers.length === 0) {
    // TODO: return a null renderer (that does nothing) instead of a special string?
    return "not-needed";
  }

  const compositeRenderer =
    renderers.length === 1 ?
      renderers[0]
    : new CompositeItemRenderer(renderers);

  assignPointerActions(item, compositeRenderer.container, gameState);

  return new ItemPositionRenderer(item, compositeRenderer);
};

class CompositeItemRenderer<RoomId extends string, RoomItemId extends string>
  implements Renderer<ItemRenderContext<RoomId, RoomItemId>>
{
  #componentRenderers: Renderer<ItemRenderContext<RoomId, RoomItemId>>[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(
    componentRenderers: Renderer<ItemRenderContext<RoomId, RoomItemId>>[],
  ) {
    this.#componentRenderers = componentRenderers;
    this.#container.addChild(...componentRenderers.map((r) => r.container));
  }
  tick(renderContext: ItemRenderContext<RoomId, RoomItemId>) {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.tick(renderContext);
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
