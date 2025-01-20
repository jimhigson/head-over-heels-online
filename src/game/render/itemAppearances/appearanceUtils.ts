import type { Container } from "pixi.js";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemInPlayTypesWithoutRenderProps,
  ItemRenderProps,
} from "./ItemRenderProps";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { emptyObject } from "../../../utils/empty";
import type { RenderOptions } from "../../RenderOptions";

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
  | undefined;

export type ItemAppearanceOptions<
  T extends ItemInPlayType,
  RoomId extends string,
> = {
  // appearances don't care about the romId generic so give it string
  item: ItemInPlay<T, SceneryName, RoomId>;
  room: RoomState<SceneryName, RoomId>;
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: ItemRenderProps<T> | undefined;

  renderOptions: RenderOptions;
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
): ItemAppearance<T> => renderOnce(() => createSprite(createSpriteOptions));

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
  ({ item, room, currentlyRenderedProps, renderOptions }) => {
    if (currentlyRenderedProps === undefined) {
      return {
        container: renderWith({ item, room, renderOptions }),
        renderProps: emptyObject as ItemRenderProps<T>,
      };
    }
  };
