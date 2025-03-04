import { Container } from "pixi.js";
import type {
  ItemInPlayType,
  ItemInPlay,
  AnyItemInPlay,
} from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { GameState } from "../../gameState/GameState";
import type { ItemAppearance } from "../itemAppearances/ItemAppearance";
import { itemAppearances } from "../itemAppearances/ItemAppearances";
import type { ItemRenderProps } from "../itemAppearances/ItemRenderProps";
import type { Renderer, RenderContext } from "../Renderer";

const assignMouseActions = <RoomId extends string>(
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
    private gameState: GameState<RoomId>,
  ) {
    this.#item = item;
    this.#room = room;

    this.#container = new Container({
      label: `ItemAppearanceRenderer ${item.id}`,
    });

    assignMouseActions(item, this.#container, gameState);

    this.#appearance = itemAppearances[item.type];
  }

  destroy() {
    this.#container.destroy({ children: true });
  }

  tick(renderContext: RenderContext) {
    if (!this.#item.renders) {
      throw new Error("should not have a renderer for non-rendering item");
    }

    const rendering = this.#appearance<RoomId>({
      subject: this.#item,
      room: this.#room,
      currentlyRenderedProps: this.#currentlyRenderedProps,
      displaySettings: renderContext.displaySettings,
      previousRendering: this.#container.children.at(0) ?? null,
      onHold: renderContext.onHold,
      gameState: this.gameState,
    });

    if (rendering !== "no-update") {
      this.#currentlyRenderedProps = rendering.renderProps;
      // it is ok to return the same container back, in which case we don't need to do anything:
      if (this.#container.children.at(0) !== rendering.container) {
        this.#container.removeChildren();
        if (rendering.container !== null)
          this.#container.addChild(rendering.container);
      }
    }
  }

  get container() {
    return this.#container;
  }
}
