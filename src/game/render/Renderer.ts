export interface Renderer<
  RenderContext extends object,
  TickContext extends object,
  /** the thing rendered to, for example a pixi Container */
  Output,
> {
  tick(tickContext: TickContext): void;
  destroy(): void;
  output: Output;
  /** get the unchanging render context for this renderer */
  readonly renderContext: RenderContext;
}
