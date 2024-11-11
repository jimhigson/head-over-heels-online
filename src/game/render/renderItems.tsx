import type {
  AnyItemInPlay,
  ItemInPlay,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import {
  assertItemHasPositionContainer,
  assertItemHasRenderContainer,
} from "@/model/ItemInPlay";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import type { GameState } from "../gameState/GameState";
import type { PlanetName } from "@/sprites/planets";

/** render an item inside the container it was previously assigned */
export const renderItem = <T extends ItemInPlayType, RoomId extends string>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
) => {
  assertItemHasRenderContainer(item);

  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(
      `item type "${item.type}" has no appearance - if it doesn't render, give it the .renders = false`,
    );
  }
  item.renderContainer.removeChildren();

  const sprite = itemAppearance(item, gameState);
  item.renderContainer.addChild(sprite);
};

export const moveSpriteToItemProjection = (item: AnyItemInPlay) => {
  assertItemHasPositionContainer(item);

  const {
    state: { position },
    positionContainer,
  } = item;
  const projectionXyz = projectWorldXyzToScreenXy(position);

  positionContainer.x = projectionXyz.x;
  positionContainer.y = projectionXyz.y;
};
