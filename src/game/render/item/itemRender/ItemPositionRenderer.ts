import { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { projectWorldXyzToScreenXy } from "../../projectToScreen";
import type { ItemTickContext, ItemRenderContext } from "../../Renderer";
import type { ItemPixiRenderer } from "./ItemRenderer";

export class ItemPositionRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #container: Container;

  constructor(
    public readonly renderContext: ItemRenderContext<T>,
    private wrappedRenderer: ItemPixiRenderer<T>,
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

  tick(tickContext: ItemTickContext) {
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
