import type { Container } from "pixi.js";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type {
  ItemInPlayTypesWithoutRenderProps,
  ItemRenderProps,
} from "./ItemRenderProps";
import type { ItemInPlayType, ItemTypeUnion } from "../../../model/ItemInPlay";
import { emptyObject } from "../../../utils/empty";
import { isMultipliedItem } from "../../physics/itemPredicates";
import type {
  AppearanceOptions,
  AppearanceReturn,
} from "../appearance/Appearance";
import type { ItemRenderContext } from "../Renderer";

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
  RoomItemId extends string,
> = AppearanceOptions<
  ItemTypeUnion<T, RoomId, RoomItemId>,
  ItemRenderProps<T>,
  RoomId,
  ItemRenderContext<RoomId>
>;

export type ItemAppearance<T extends ItemInPlayType> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  options: ItemAppearanceOptions<T, RoomId, RoomItemId>,
) => AppearanceReturn<ItemRenderProps<T>>;

/**
 * Like ItemAppearance but sometimes it is useful to be able to cast
 * ItemAppearance to a version that knows the room id before the callsite
 */
export type ItemAppearanceWithKnownRoomId<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> = (
  options: ItemAppearanceOptions<T, RoomId, RoomItemId>,
) => AppearanceReturn<ItemRenderProps<T>>;

export const itemStaticSpriteAppearance = <
  T extends ItemInPlayTypesWithoutRenderProps,
>(
  createSpriteOptions: CreateSpriteOptions,
): ItemAppearance<T> =>
  itemRenderOnce(({ subject }) => {
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
export const itemRenderOnce =
  <
    T extends ItemInPlayTypesWithoutRenderProps,
    RoomId extends string,
    RoomItemId extends string,
  >(
    renderWith: (
      appearance: Omit<
        ItemAppearanceOptions<T, RoomId, RoomItemId>,
        "currentlyRenderedProps"
      >,
    ) => Container,
  ): ((
    options: ItemAppearanceOptions<T, RoomId, RoomItemId>,
  ) => ItemAppearanceReturn<T>) =>
  // inner function - calls renderWith
  ({ subject, currentlyRenderedProps, gameState, renderContext }) => {
    if (currentlyRenderedProps === undefined) {
      return {
        container: renderWith({
          subject,
          gameState,
          previousRendering: null,
          renderContext,
        }),
        renderProps: emptyObject as ItemRenderProps<T>,
      };
    } else {
      return "no-update";
    }
  };
