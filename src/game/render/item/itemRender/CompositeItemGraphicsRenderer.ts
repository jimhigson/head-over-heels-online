import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

export class CompositeItemGraphicsRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #componentRenderers: ItemPixiRenderer<T>[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(
    componentRenderers: ItemPixiRenderer<T>[],
    /* the composite renderer doesn't actually use the render context, but it's needed
       to implement the interface */
    public readonly renderContext: ItemRenderContext<T>,
  ) {
    this.#componentRenderers = componentRenderers;
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
