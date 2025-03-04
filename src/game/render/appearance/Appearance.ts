import type { Container } from "pixi.js";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { DisplaySettings } from "../../../store/gameMenusSlice";
import type { GameState } from "../../gameState/GameState";

export type RenderSubject = unknown;
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
> = {
  subject: S;
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: RP | undefined;

  /** the rendering that already exists for this item, or null if it was not rendered previously */
  previousRendering: Container | null;

  displaySettings: DisplaySettings;

  room: RoomState<SceneryName, RoomId>;

  gameState: GameState<RoomId>;

  /** are we on hold (paused) right now? */
  onHold: boolean;
};

/**
 * generic type for rendering and re-rendering the appearance of anything. For Item-specific
 * appearances, see ItemAppearance
 */
export type Appearance<S extends RenderSubject, RP extends RenderProps> = <
  RoomId extends string,
>(
  options: AppearanceOptions<S, RP, RoomId>,
) => AppearanceReturn<RP>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};
