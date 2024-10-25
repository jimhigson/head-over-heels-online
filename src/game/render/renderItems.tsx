import { Container } from "pixi.js";
import { AnyRoom, RoomJson } from "../../modelTypes";
import { RenderOptions } from "../gameMain";
import { makeClickPortal } from "./makeClickPortal";
import { moveSpriteToBlock } from "./moveSpriteToBlock";
import { itemAppearances } from "../../ItemAppearances";
import { JsonItem, ItemType } from "../../Item";
import { PlanetName } from "@/sprites/planets";

const renderItem = <T extends ItemType>(item: JsonItem<T>, room: AnyRoom) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  return itemAppearance(item.config, room, item.position);
};

export function* renderItems<RoomId extends string>(
  room: RoomJson<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const sprite = renderItem(item, room);

    moveSpriteToBlock(item.position, sprite, { giveZIndex: true });

    if (
      item.type === "teleporter" ||
      item.type === "doorFar" ||
      item.type === "doorNear"
    ) {
      makeClickPortal(
        (item as JsonItem<"teleporter", PlanetName, RoomId>).config.toRoom,
        options,
        sprite,
      );
    }

    if (item.type === "lift" && room.roomAbove !== undefined) {
      makeClickPortal(room.roomAbove, options, sprite);
    }

    yield sprite;
  }
}
