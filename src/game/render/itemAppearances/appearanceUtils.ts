import type { Container } from "pixi.js";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemInPlayTypesWithoutRenderProps,
  ItemRenderProps,
} from "./ItemRenderProps";
import type { ItemInPlayType, ItemTypeUnion } from "../../../model/ItemInPlay";
import { emptyObject } from "../../../utils/empty";
import type { DisplaySettings } from "../../../store/gameMenusSlice";
import { isMultipliedItem } from "../../physics/itemPredicates";
import type { GameState } from "../../gameState/GameState";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";

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

export type ItemAppearanceReturn<T extends ItemInPlayType> =
  | {
      /**
       * a new rendering, since one is required - null to explicitly change the item's rendering
       * to nothing
       */
      container: Container | null;
      /** the render props of the new rendering, to stash and use for checking in the next tick if a new rendering is needed */
      renderProps: ItemRenderProps<T>;
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

export type ItemAppearanceOptions<
  T extends ItemInPlayType,
  RoomId extends string,
> = AppearanceOptions<ItemTypeUnion<T, RoomId>, ItemRenderProps<T>, RoomId>;

export type Appearance<S extends RenderSubject, RP extends RenderProps> = <
  RoomId extends string,
>(
  options: AppearanceOptions<S, RP, RoomId>,
) => AppearanceReturn<RP>;

export type ItemAppearance<T extends ItemInPlayType> = <RoomId extends string>(
  options: ItemAppearanceOptions<T, RoomId>,
) => AppearanceReturn<ItemRenderProps<T>>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};

export const staticSpriteAppearance = <
  T extends ItemInPlayTypesWithoutRenderProps,
>(
  createSpriteOptions: CreateSpriteOptions,
): ItemAppearance<T> =>
  renderItemOnce(({ subject }) => {
    if (isMultipliedItem(subject)) {
      return createSprite({
        ...(typeof createSpriteOptions === "string" ?
          { textureId: createSpriteOptions }
        : createSpriteOptions),
        times: subject.config.times,
      });
    } else {
      return createSprite(createSpriteOptions);
    }
  });

/**
 * plenty of items never need to be re-rendered and have no render props - convenience for that case
 * that handles not rendering again after the first render
 */
export const renderItemOnce =
  <T extends ItemInPlayTypesWithoutRenderProps, RoomId extends string>(
    renderWith: (
      appearance: Omit<
        ItemAppearanceOptions<T, RoomId>,
        "currentlyRenderedProps"
      >,
    ) => Container,
  ): ((options: ItemAppearanceOptions<T, RoomId>) => ItemAppearanceReturn<T>) =>
  // inner function - calls renderWith
  ({
    subject,
    currentlyRenderedProps,
    displaySettings,
    onHold,
    room,
    gameState,
  }) => {
    if (currentlyRenderedProps === undefined) {
      return {
        container: renderWith({
          room,
          subject,
          displaySettings,
          onHold,
          gameState,
          previousRendering: null,
        }),
        renderProps: emptyObject as ItemRenderProps<T>,
      };
    } else {
      return "no-update";
    }
  };
