import type { GameState } from "@/game/gameState/GameState";
import type { ItemInPlayType, ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { SetRequired } from "type-fest";
import type { Container } from "pixi.js";
import { createSprite } from "../createSprite";
import type { TextureId } from "@/sprites/spriteSheet";

export type ItemAppearance<T extends ItemInPlayType> = <RoomId extends string>(
  // appearances don't care about the romId generic so give it string
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
) => undefined;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};

const hasRenderContainer = <T extends ItemInPlayType, RoomId extends string>(
  item: ItemInPlay<T, PlanetName, RoomId>,
): item is SetRequired<
  ItemInPlay<T, PlanetName, RoomId>,
  "renderContainer"
> => {
  return item.renderContainer !== undefined;
};

export const ifNotRenderedBefore =
  <T extends ItemInPlayType, RoomId extends string>(
    renderWith: (
      // appearances don't care about the romId generic so give it string
      item: SetRequired<ItemInPlay<T, PlanetName, RoomId>, "renderContainer">,
      gameState: GameState<RoomId>,
    ) => undefined,
  ): ((
    // appearances don't care about the romId generic so give it string
    item: ItemInPlay<T, PlanetName, RoomId>,
    gameState: GameState<RoomId>,
  ) => undefined) =>
  // inner function - calls renderWith
  (item, gameState) => {
    if (hasRenderContainer(item) && !renderedBefore(item.renderContainer)) {
      renderWith(item, gameState);
    }
  };

export const staticSpriteAppearance = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  textureId: TextureId,
) =>
  ifNotRenderedBefore<T, RoomId>(({ renderContainer }) => {
    applyAppearance(renderContainer, createSprite(textureId));
  });

export const applyAppearance = (
  renderContainer: Container,
  newRendering: Container,
) => {
  for (const child of renderContainer.children) {
    child.destroy({ children: true, context: true });
  }
  renderContainer.removeChildren();
  renderContainer.addChild(newRendering);
};
