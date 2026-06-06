import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";

export class CompositeItemGraphicsRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #componentRenderers: ItemPixiRenderer<T>[];
  #container: Container;
  readonly renderContext: ItemRenderContext<T>;

  constructor(
    componentRenderers: ItemPixiRenderer<T>[],
    /* the composite renderer doesn't actually use the render context, but it's needed
       to implement the interface */
    renderContext: ItemRenderContext<T>,
    /**
     * the container to render the components into. May be provided so a caller can hold a
     * reference to it (eg to tint it); otherwise the composite creates its own
     */
    container: Container = new Container({ label: "CompositeRenderer" }),
  ) {
    this.renderContext = renderContext;
    this.#componentRenderers = componentRenderers;
    this.#container = container;
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
