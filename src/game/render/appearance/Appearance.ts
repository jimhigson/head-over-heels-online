import type { Container } from "pixi.js";

/** anything that can be rendered by the appearance system */
export type RenderSubject = { id: string };

export type AppearanceRendering<
  RenderProps extends object,
  Output extends Container = Container,
> = {
  /**
   * a new or existing rendering, returned from the appearance if one is required.
   * can also be undefined, which means that the appearance has explicitly decided
   * to not render anything, and remove any current rendering
   */
  output: Output | undefined;
  /**
   * the render props of the new rendering, to stash and use for checking in the next tick if a new rendering is needed
   */
  renderProps: RenderProps;
};

export type AppearanceReturn<
  RenderProps extends object,
  Output extends Container = Container,
> =
  // output is optional, to explicitly say not to render anything, and remove any current rendering
  AppearanceRendering<RenderProps, Output> | "no-update";

/**
 * the parameters given to an appearance to give it a chance to render, or keep
 * the current rendering
 */
export type AppearanceOptions<
  RenderContext extends object,
  TickContext extends object,
  RP extends object,
  RenderTarget extends Container = Container,
> = {
  /**
   * The current rendering. The appearance may choose to modify this rendering,
   * or replace it, based on compareing the render props from the current rendering
   * with the current state of the subject being rendered
   */
  currentRendering?: AppearanceRendering<RP, RenderTarget>;

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
  RP extends object,
  RenderTarget extends Container = Container,
> = (
  options: AppearanceOptions<RenderContext, TickContext, RP, RenderTarget>,
) => AppearanceReturn<RP, RenderTarget>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};
