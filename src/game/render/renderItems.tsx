import {
  AnyItemInPlay,
  assertItemHasPositionContainer,
  assertItemHasRenderContainer,
  ItemInPlay,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { UnknownRoomState } from "@/model/modelTypes";
import { projectWorldXyzToScreenXy } from "./projectToScreen";

/** render an item inside the container it was previously assigned */
export const renderItem = <T extends ItemInPlayType>(
  item: ItemInPlay<T>,
  room: UnknownRoomState,
) => {
  assertItemHasRenderContainer(item);

  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(
      `item type "${item.type}" has no appearance - if it doesn't render, give it the .renders = false`,
    );
  }
  item.renderContainer.removeChildren();

  const sprite = itemAppearance(item, room);
  item.renderContainer.addChild(sprite);
};

export const moveSpriteToItemProjection = (item: AnyItemInPlay) => {
  assertItemHasPositionContainer(item);

  const { position, positionContainer } = item;
  const projectionXyz = projectWorldXyzToScreenXy(position);

  positionContainer.x = projectionXyz.x;
  positionContainer.y = projectionXyz.y;
};
