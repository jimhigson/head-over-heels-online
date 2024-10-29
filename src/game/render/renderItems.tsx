import { Container } from "pixi.js";
import { AnyRoomState, RoomState } from "../../modelTypes";
import { RenderOptions } from "../gameMain";
import { makeClickPortal } from "./makeClickPortal";
import { moveSpriteToXyz } from "./positionSprite";
import { itemAppearances } from "../../ItemAppearances";
import { JsonItem, ItemType } from "../../Item";
import { PlanetName } from "@/sprites/planets";

const renderItem = <T extends ItemType>(
  item: JsonItem<T>,
  room: AnyRoomState,
) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  return itemAppearance(item.config, room, item.position);
};

export function* renderItems<RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const sprite = renderItem(item, room);

    moveSpriteToXyz(item.position, sprite, { giveZIndex: true });

    item.events.on("move", () => {
      moveSpriteToXyz(item.position, sprite, { giveZIndex: true });
    });

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
