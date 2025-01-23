import { Container } from "pixi.js";
import type { AnyItemInPlay } from "../../../model/ItemInPlay";
import { projectWorldXyzToScreenXy } from "../projectToScreen";
import type { Renderer, RenderContext } from "../Renderer";

export class ItemPositionRenderer implements Renderer {
  #item: AnyItemInPlay;
  #container: Container;
  #wrappedRenderer?: Renderer;

  constructor(item: AnyItemInPlay, wrappedRenderer: Renderer) {
    this.#container = new Container({
      label: `ItemPositionRenderer ${item.id}`,
      children: [wrappedRenderer.container],
    });
    this.#wrappedRenderer = wrappedRenderer;
    this.#item = item;
    this.#updatePosition();
  }

  #updatePosition() {
    const projectionXy = projectWorldXyzToScreenXy(this.#item.state.position);

    this.#container.x = projectionXy.x;
    this.#container.y = projectionXy.y;
  }

  tick(renderContext: RenderContext) {
    this.#wrappedRenderer?.tick(renderContext);

    if (renderContext.movedItems.has(this.#item)) {
      // item has moved - update its position:
      this.#updatePosition();
    }
  }
  destroy(): void {
    this.#container.destroy({ children: true });
    this.#wrappedRenderer?.destroy();
  }
  get container() {
    return this.#container;
  }
}
