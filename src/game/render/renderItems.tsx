import { Container } from "pixi.js";
import { AnyRoom, RoomId } from "../../modelTypes";
import { RenderOptions } from "../gameMain";
import { makeClickPortal } from "./makeClickPortal";
import { moveSpriteToBlock } from "./moveSpriteToBlock";
import { itemAppearances } from "../../ItemAppearances";
import { Item, ItemType } from "../../Item";

const renderItem = <T extends ItemType>(item: Item<T>) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  return itemAppearance(item.config);
};

export function* renderItems(
  room: AnyRoom,
  options: RenderOptions,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const sprite = renderItem(item);

    moveSpriteToBlock(item.position, sprite, {giveZIndex: true});

    if (item.type === "teleporter") {
      makeClickPortal(
        (item as Item<"teleporter">).config.toRoom as RoomId,
        options,
        sprite,
      );
    }

    if (item.type === "lift" && room.roomAbove !== undefined) {
      makeClickPortal(room.roomAbove as RoomId, options, sprite);
    }

    yield sprite;
  }
}
