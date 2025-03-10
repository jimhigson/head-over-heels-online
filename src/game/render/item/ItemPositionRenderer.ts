import { Container } from "pixi.js";
import type { AnyItemInPlay } from "../../../model/ItemInPlay";
import { projectWorldXyzToScreenXy } from "../projectToScreen";
import type { Renderer, ItemRenderContext } from "../Renderer";

export class ItemPositionRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements Renderer<ItemRenderContext<RoomId, RoomItemId>>
{
  #container: Container;

  constructor(
    private item: AnyItemInPlay<RoomId, RoomItemId>,
    private wrappedRenderer: Renderer<ItemRenderContext<RoomId, RoomItemId>>,
  ) {
    this.#container = new Container({
      label: `ItemPositionRenderer ${item.id}`,
      children: [wrappedRenderer.container],
    });
    this.#updatePosition();
  }

  #updatePosition() {
    const projectionXy = projectWorldXyzToScreenXy(this.item.state.position);

    this.#container.x = projectionXy.x;
    this.#container.y = projectionXy.y;
  }

  tick(renderContext: ItemRenderContext<RoomId, RoomItemId>) {
    this.wrappedRenderer?.tick(renderContext);

    if (renderContext.movedItems.has(this.item)) {
      // item has moved - update its position:
      this.#updatePosition();
    }
  }
  destroy(): void {
    this.#container.destroy({ children: true });
    this.wrappedRenderer?.destroy();
  }
  get container() {
    return this.#container;
  }
}
