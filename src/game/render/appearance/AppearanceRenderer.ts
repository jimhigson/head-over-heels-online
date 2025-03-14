import { Container } from "pixi.js";
import type { Renderer } from "../Renderer";
import type { Appearance, RenderProps } from "./Appearance";

/**
 * track changes of a subject over time, updating the rendering as necessary using a pluggable
 * appearance function.
 */

export class AppearanceRenderer<
  /**
   * context provided once to this renderer that never changes - if this
   * changes the renderer has to be destroyed and recreated
   */
  RenderContext extends object,
  TickContext extends object,
  RP extends RenderProps,
  /** the type of the thing returned by this renderer */
  RenderTarget extends Container = Container,
> implements Renderer<RenderContext, TickContext>
{
  #currentlyRenderedProps: RP | undefined = undefined;
  #container: Container<RenderTarget>;

  constructor(
    public readonly renderContext: RenderContext,
    private appearance: Appearance<
      RenderContext,
      TickContext,
      RP,
      RenderTarget
    >,
  ) {
    this.#container = new Container({
      label: `AppearanceRenderer`,
    });
  }

  destroy() {
    this.#container.destroy({ children: true });
  }

  tick(tickContext: TickContext) {
    const rendering = this.appearance({
      renderContext: this.renderContext,
      currentlyRenderedProps: this.#currentlyRenderedProps,
      previousRendering: this.#container.children.at(0) ?? null,
      tickContext,
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
