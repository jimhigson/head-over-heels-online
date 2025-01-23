import { Container } from "pixi.js";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { GameState } from "../../gameState/GameState";
import type { ItemAppearance } from "../itemAppearances/appearanceUtils";
import { itemAppearances } from "../itemAppearances/ItemAppearances";
import type { ItemRenderProps } from "../itemAppearances/ItemRenderProps";
import type { Renderer, RenderContext } from "../Renderer";
import { assignMouseActions } from "./createItemRenderer";

export class ItemAppearanceRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> implements Renderer
{
  #item: ItemInPlay<T, SceneryName, RoomId, ItemId>;
  #room: RoomState<SceneryName, RoomId, ItemId>;
  #currentlyRenderedProps: ItemRenderProps<T> | undefined = undefined;
  #container: Container;
  //#itemShadowRenderer: ItemShadowRenderer<T, RoomId, ItemId> | undefined;
  #appearance: ItemAppearance<T>;

  constructor(
    item: ItemInPlay<T, SceneryName, RoomId, ItemId>,
    room: RoomState<SceneryName, RoomId, ItemId>,
    gameState: GameState<RoomId>,
  ) {
    this.#item = item;
    this.#room = room;

    this.#container = new Container({
      label: `ItemAppearanceRenderer ${item.id}`,
    });

    assignMouseActions(item, this.#container, gameState);

    this.#appearance = itemAppearances[item.type];

    // this.#itemShadowRenderer = ItemShadowRenderer(item, room);

    // if (this.#itemShadowRenderer !== undefined) {
    //   this.#container.addChild(this.#itemShadowRenderer.container);
    // }
  }

  destroy() {
    this.#container.destroy({ children: true });
    //if (this.#itemShadowRenderer) this.#itemShadowRenderer.destroy();
  }

  tick(renderContext: RenderContext) {
    if (!this.#item.renders) {
      throw new Error("should not have a renderer for non-rendering item");
    }

    const rendering = this.#appearance({
      item: this.#item,
      room: this.#room,
      currentlyRenderedProps: this.#currentlyRenderedProps,
      displaySettings: renderContext.displaySettings,
    });

    if (rendering !== "no-update") {
      this.#currentlyRenderedProps = rendering.renderProps;
      this.#container.children.forEach((child) => child.destroy());
      if (rendering.container !== null)
        this.#container.addChild(rendering.container);
    }
  }

  get container() {
    return this.#container;
  }
}
