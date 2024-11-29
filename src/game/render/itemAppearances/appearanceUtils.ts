import type { GameState } from "@/game/gameState/GameState";
import {
  type ItemInPlayType,
  type ItemInPlay,
  type ContainerWithItemState,
  type ItemState,
  renderContainerState,
} from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { Container } from "pixi.js";
import { createSprite } from "../createSprite";
import type { TextureId } from "@/sprites/spriteSheet";

export type ItemAppearance<T extends ItemInPlayType> = <RoomId extends string>(
  // appearances don't care about the romId generic so give it string
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  renderTo: ContainerWithItemState<T>,
) => undefined;

export const renderedBefore = (renderContainer: Container) => {
  return renderContainer.children.length > 0;
};

export const ifNotRenderedBefore =
  <T extends ItemInPlayType, RoomId extends string>(
    renderWith: (
      // appearances don't care about the romId generic so give it string
      item: ItemInPlay<T, PlanetName, RoomId>,
      gameState: GameState<RoomId>,
      renderTo: ContainerWithItemState<T>,
    ) => undefined,
  ): ((
    // appearances don't care about the romId generic so give it string
    item: ItemInPlay<T, PlanetName, RoomId>,
    gameState: GameState<RoomId>,
    renderTo: ContainerWithItemState<T>,
  ) => undefined) =>
  // inner function - calls renderWith
  (item, gameState, renderTo) => {
    if (!renderedBefore(renderTo)) {
      renderWith(item, gameState, renderTo);
    }
  };

export const staticSpriteAppearance = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  textureId: TextureId,
) =>
  ifNotRenderedBefore<T, RoomId>(({ state }, _gameState, renderTo) => {
    applyAppearance(renderTo, state, createSprite(textureId));
  });

export const applyAppearance = <T extends ItemInPlayType>(
  renderContainer: ContainerWithItemState<T>,
  itemState: ItemState<T>,
  newRendering: Container,
) => {
  for (const child of renderContainer.children) {
    child.destroy({ children: true, context: true });
  }
  renderContainer.removeChildren();
  renderContainer.addChild(newRendering);
  renderContainer[renderContainerState] = { ...itemState };
};
