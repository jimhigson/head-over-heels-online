import type { Container } from "pixi.js";

/** anything that can be rendered by the appearance system */
export type RenderSubject = { id: string };
export type RenderProps = Record<string, unknown>;

export type AppearanceReturn<
  RP extends RenderProps,
  RenderTarget extends Container = Container,
> =
  | {
      /**
       * a new rendering, since one is required - null to explicitly change the item's rendering
       * to nothing
       */
      container: RenderTarget | null;
      /** the render props of the new rendering, to stash and use for checking in the next tick if a new rendering is needed */
      renderProps: RP;
    }
  /** returns undefined if no new rendering is required */
  | "no-update";

export type AppearanceOptions<
  RenderContext extends object,
  TickContext extends object,
  RP extends RenderProps,
  RenderTarget extends Container = Container,
> = {
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: RP | undefined;

  /** the rendering that already exists for this item, or null if it was not rendered previously */
  previousRendering: RenderTarget | null;

  /**
   * some context that this subject is being rendered in, for example the room
   * that is being rendered, or the current display settings
   */
  tickContext: TickContext;

  renderContext: RenderContext;
};

/**
 * generic type for rendering and re-rendering the appearance of anything. For Item-specific
 * appearances, see ItemAppearance
 */
export type Appearance<
  RenderContext extends object,
  TickContext extends object,
  RP extends RenderProps,
  RenderTarget extends Container = Container,
> = (
  options: AppearanceOptions<RenderContext, TickContext, RP, RenderTarget>,
) => AppearanceReturn<RP, RenderTarget>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};
