import type { Container } from "pixi.js";
import type { RenderContext } from "../Renderer";
import type { GameState } from "../../gameState/GameState";

/** anything that can be rendered by the appearance system */
export type RenderSubject = { id: string };
export type RenderProps = Record<string, unknown>;

export type AppearanceReturn<RP extends RenderProps> =
  | {
      /**
       * a new rendering, since one is required - null to explicitly change the item's rendering
       * to nothing
       */
      container: Container | null;
      /** the render props of the new rendering, to stash and use for checking in the next tick if a new rendering is needed */
      renderProps: RP;
    }
  /** returns undefined if no new rendering is required */
  | "no-update";

export type AppearanceOptions<
  S extends RenderSubject,
  RP extends RenderProps,
  RoomId extends string,
  RC extends RenderContext,
> = {
  subject: S;
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: RP | undefined;

  /** the rendering that already exists for this item, or null if it was not rendered previously */
  previousRendering: Container | null;

  gameState: GameState<RoomId>;

  /**
   * some context that this subject is being rendered in, for example the room
   * that is being rendered, or the current display settings
   */
  renderContext: RC;
};

/**
 * generic type for rendering and re-rendering the appearance of anything. For Item-specific
 * appearances, see ItemAppearance
 */
export type Appearance<
  S extends RenderSubject,
  RP extends RenderProps,
  RC extends RenderContext,
> = <RoomId extends string>(
  options: AppearanceOptions<S, RP, RoomId, RC>,
) => AppearanceReturn<RP>;

/**
 * sometimes it is useful to be able to cast Appearance to a version that
 * knows the room id before the callsite
 */
export type AppearanceWithKnownRoomId<
  S extends RenderSubject,
  RP extends RenderProps,
  RoomId extends string,
  RC extends RenderContext,
> = (options: AppearanceOptions<S, RP, RoomId, RC>) => AppearanceReturn<RP>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};
