import { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { projectWorldXyzToScreenXy } from "../../projectToScreen";
import type { ItemTickContext, ItemRenderContext } from "../../Renderer";
import type { ItemPixiRenderer } from "./ItemRenderer";

export class ItemPositionRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemPixiRenderer<T, RoomId, RoomItemId>
{
  #container: Container;

  constructor(
    public readonly renderContext: ItemRenderContext<T, RoomId, RoomItemId>,
    private wrappedRenderer: ItemPixiRenderer<T, RoomId, RoomItemId>,
  ) {
    this.#container = new Container({
      label: `ItemPositionRenderer ${renderContext.item.id}`,
      children: [wrappedRenderer.output],
    });
    this.#updatePosition();
  }

  #updatePosition() {
    const projectionXy = projectWorldXyzToScreenXy(
      this.renderContext.item.state.position,
    );

    this.#container.x = projectionXy.x;
    this.#container.y = projectionXy.y;
  }

  tick(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    this.wrappedRenderer?.tick(tickContext);

    if (tickContext.movedItems.has(this.renderContext.item)) {
      // item has moved - update its position:
      this.#updatePosition();
    }
  }
  destroy(): void {
    this.#container.destroy({ children: true });
    this.wrappedRenderer?.destroy();
  }
  get output() {
    return this.#container;
  }
}
