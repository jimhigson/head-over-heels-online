import { Container } from "pixi.js";
import type { Renderer } from "../Renderer";
import type { Appearance, AppearanceRendering } from "./Appearance";

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
  RenderProps extends object,
  /** the type of the thing returned by this renderer */
  Output extends Container = Container,
> implements Renderer<RenderContext, TickContext, Container>
{
  /* what is currently rendered by the appearance,
     and what render props did it use?
   */
  #currentRendering?: AppearanceRendering<RenderProps, Output>;

  //#currentlyRenderedProps: RenderProps | undefined = undefined;
  public readonly output: Container<Output>;

  constructor(
    public readonly renderContext: RenderContext,
    private appearance: Appearance<
      RenderContext,
      TickContext,
      RenderProps,
      Output
    >,
    /*outputContainer: Container<Output> = new Container({
      label: `AppearanceRenderer`,
    }),*/
  ) {
    this.output = new Container({
      label: `AppearanceRenderer`,
    });
  }

  destroy() {
    this.output.destroy({ children: true });
  }

  tick(tickContext: TickContext) {
    const rendering = this.appearance({
      renderContext: this.renderContext,
      currentRendering: this.#currentRendering,
      tickContext,
    });

    if (rendering !== "no-update") {
      // it is ok to return the same container back, in which case we don't need to do anything:
      if (this.output.children.at(0) !== rendering.output) {
        if (this.#currentRendering?.output) {
          this.output.removeChild(this.#currentRendering.output);
        }

        if (rendering.output !== undefined)
          this.output.addChild(rendering.output);
      }

      this.#currentRendering = rendering;
    }
  }
}
