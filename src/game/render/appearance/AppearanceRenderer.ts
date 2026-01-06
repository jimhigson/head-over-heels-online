import { Container } from "pixi.js";

import type { Renderer } from "../Renderer";
import type { Appearance, AppearanceRendering } from "./Appearance";

import { destroyRenderTextureDescendants } from "../../../utils/pixi/destroyRenderTextureDescendants";

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

  public readonly output: Container<Output> = new Container({
    label: `AppearanceRenderer`,
  });

  constructor(
    public readonly renderContext: RenderContext,
    private appearance: Appearance<
      RenderContext,
      TickContext,
      RenderProps,
      Output
    >,
  ) {}

  destroy() {
    if (this.#currentRendering?.output) {
      destroyRenderTextureDescendants(this.#currentRendering.output);
    }
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

          // #currentRendering may contain dynamic textures that need to be freed
          // to prevent memory leaks. Without this, the dynamic teleporter shadow
          // maps textures (for multiplied teleporters) were not being freed
          destroyRenderTextureDescendants(this.#currentRendering.output);

          this.#currentRendering.output.destroy({
            // don't destroy textures here - hopefully the destroyRenderTextures above destroyed
            // the dynamic ones
            texture: false,
            children: true,
          });
        }

        if (rendering.output !== undefined)
          this.output.addChild(rendering.output);
      }

      this.#currentRendering = rendering;
    }
  }
}
