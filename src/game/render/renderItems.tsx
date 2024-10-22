import { Container } from "pixi.js";
import { AnyRoom, RoomId } from "../../modelTypes";
import { RenderWorldOptions } from "./renderWorld";
import { makeClickPortal } from "./makeClickPortal";
import { moveToBlock } from "./spriteAtBlock";
import { itemAppearances } from "../../ItemAppearances";
import { Item, ItemType } from "../../Item";

const renderItem = <T extends ItemType>(item: Item<T>) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  const sprite = itemAppearance(item.config);

  return sprite;
};

export function* renderItems(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const sprite = renderItem(item);

    moveToBlock(item.position, sprite);

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
