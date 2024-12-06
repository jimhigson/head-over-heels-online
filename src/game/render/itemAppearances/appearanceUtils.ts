import { type ItemInPlayType, type ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { Container } from "pixi.js";
import type { TextureId } from "@/sprites/spriteSheet";
import type { RoomState } from "@/model/modelTypes";
import { createSprite } from "../createSprite";
import type { ItemRenderProps } from "./ItemRenderProps";

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
  item: ItemInPlay<T, PlanetName, RoomId>;
  room: RoomState<PlanetName, RoomId>;
  /**
   * the render props that the item rendering is currently rendered with; so the appearance can check if
   * the props have changed, and decline to render if it has not
   */
  currentlyRenderedProps: ItemRenderProps<T> | undefined;
};

export type ItemAppearance<T extends ItemInPlayType> = <RoomId extends string>({
  item,
  room,
  currentlyRenderedProps,
}: ItemAppearanceOptions<T, RoomId>) => ItemAppearanceReturn<T>;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};

export const staticSpriteAppearance =
  <T extends ItemInPlayType>(textureId: TextureId): ItemAppearance<T> =>
  () => {
    return {
      container: createSprite(textureId),
      renderProps: {} as ItemRenderProps<T>,
    };
  };

/**
 * plenty of items never need to be re-rendered and have no render props - convenience for that case
 * that handles not rendering again after the first render
 */
export const renderOnce =
  <T extends ItemInPlayType, RoomId extends string>(
    renderWith: (
      appearance: Omit<
        ItemAppearanceOptions<T, RoomId>,
        "currentlyRenderedProps"
      >,
    ) => ItemAppearanceReturn<T>,
  ): ((options: ItemAppearanceOptions<T, RoomId>) => ItemAppearanceReturn<T>) =>
  // inner function - calls renderWith
  ({ item, room, currentlyRenderedProps }) => {
    if (currentlyRenderedProps === undefined) {
      return renderWith({ item, room });
    }
  };
