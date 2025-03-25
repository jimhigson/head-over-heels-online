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
> implements Renderer<RenderContext, TickContext, Container>
{
  #currentlyRenderedProps: RP | undefined = undefined;
  #output: Container<RenderTarget>;

  constructor(
    public readonly renderContext: RenderContext,
    private appearance: Appearance<
      RenderContext,
      TickContext,
      RP,
      RenderTarget
    >,
  ) {
    this.#output = new Container({
      label: `AppearanceRenderer`,
    });
  }

  destroy() {
    this.#output.destroy({ children: true });
  }

  tick(tickContext: TickContext) {
    const rendering = this.appearance({
      renderContext: this.renderContext,
      currentlyRenderedProps: this.#currentlyRenderedProps,
      previousRendering: this.#output.children.at(0) ?? null,
      tickContext,
    });

    if (rendering !== "no-update") {
      this.#currentlyRenderedProps = rendering.renderProps;
      // it is ok to return the same container back, in which case we don't need to do anything:
      if (this.#output.children.at(0) !== rendering.output) {
        this.#output.removeChildren();
        if (rendering.output !== null) this.#output.addChild(rendering.output);
      }
    }
  }

  get output() {
    return this.#output;
  }
}
