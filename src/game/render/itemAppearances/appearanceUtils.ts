import type { Container } from "pixi.js";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemInPlayTypesWithoutRenderProps,
  ItemRenderProps,
} from "./ItemRenderProps";
import type { ItemInPlayType, ItemTypeUnion } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { emptyObject } from "../../../utils/empty";
import type { DisplaySettings } from "../../../store/gameMenusSlice";
import { isMultipliedItem } from "../../physics/itemPredicates";
import type { GameState } from "../../gameState/GameState";

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

export type ItemAppearanceOptions<
  T extends ItemInPlayType,
  RoomId extends string,
> = {
  // appearances don't care about the romId generic so give it string
  item: ItemTypeUnion<T, RoomId>;
  room: RoomState<SceneryName, RoomId>;
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: ItemRenderProps<T> | undefined;

  /** the rendering that already exists for this item, or null if it was not rendered previously */
  previousRendering: Container | null;

  displaySettings: DisplaySettings;

  gameState: GameState<RoomId>;

  /** are we on hold (paused) right now? */
  onHold: boolean;
};

export type ItemAppearance<T extends ItemInPlayType> = <RoomId extends string>({
  item,
  room,
  currentlyRenderedProps,
}: ItemAppearanceOptions<T, RoomId>) => ItemAppearanceReturn<T>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};

export const staticSpriteAppearance = <
  T extends ItemInPlayTypesWithoutRenderProps,
>(
  createSpriteOptions: CreateSpriteOptions,
): ItemAppearance<T> =>
  renderOnce(({ item }) => {
    if (isMultipliedItem(item)) {
      return createSprite({
        ...(typeof createSpriteOptions === "string" ?
          { textureId: createSpriteOptions }
        : createSpriteOptions),
        times: item.config.times,
      });
    } else {
      return createSprite(createSpriteOptions);
    }
  });

/**
 * plenty of items never need to be re-rendered and have no render props - convenience for that case
 * that handles not rendering again after the first render
 */
export const renderOnce =
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
    item,
    room,
    currentlyRenderedProps,
    displaySettings,
    onHold,
    gameState,
  }) => {
    if (currentlyRenderedProps === undefined) {
      return {
        container: renderWith({
          item,
          room,
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
