import { Container } from "pixi.js";
import { RenderOptions } from "../RenderOptions";
import {
  AnyItemInPlay,
  assertItemHasContainers,
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { maybeRenderBB } from "./maybeRenderBB";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { RoomState, UnknownRoomState } from "@/model/modelTypes";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { PlanetName } from "@/sprites/planets";

/* gives an item the container it will be rendered into, but doesn't render it yet */
export const assignContainerToItem = <RoomId extends string>(
  item: UnknownItemInPlay<RoomId>,
  room: RoomState<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): void => {
  if (!item.renders) return;

  // TODO: handle case where never re-renders - container can just be the sprite

  const renderContainer = new Container();
  const positionContainer = maybeRenderBB(item, renderContainer, options);

  if (options.onItemClick) {
    positionContainer.eventMode = "static";
    positionContainer.on("pointertap", () => {
      options.onItemClick!(item);
    });
  }

  item.positionContainer = positionContainer;
  item.renderContainer = renderContainer;

  renderItem(item, room);
  moveSpriteToItemProjection(item);
};

/** render an item inside the container it was previously assigned */
export const renderItem = <T extends ItemInPlayType>(
  item: ItemInPlay<T>,
  room: UnknownRoomState,
) => {
  assertItemHasContainers(item);

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
  assertItemHasContainers(item);

  const { position, positionContainer } = item;
  const projectionXyz = projectWorldXyzToScreenXy(position);

  positionContainer.x = projectionXyz.x;
  positionContainer.y = projectionXyz.y;
};
