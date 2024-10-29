import { Container } from "pixi.js";
import { AnyRoomState, RoomState } from "../../model/modelTypes";
import { RenderOptions } from "../gameMain";
import { makeClickPortal } from "./makeClickPortal";
import { moveContainerToXyz } from "./positionSprite";
import { itemAppearances } from "./ItemAppearances";
import { ItemType } from "../../model/Item";
import { PlanetName } from "@/sprites/planets";
import { ItemInPlay } from "@/model/ItemState";

const renderItem = <T extends ItemType>(
  item: ItemInPlay<T>,
  room: AnyRoomState,
) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  const container = new Container();

  const renderInContainer = () => {
    container.removeChildren();
    const sprite = itemAppearance(item.config, room, item.position, item.state);
    container.addChild(sprite);
  };

  const position = () => {
    moveContainerToXyz(item.position, container, { giveZIndex: true });
  };

  renderInContainer();
  position();

  item.events.on("move", position);
  item.events.on("stateChange", renderInContainer);

  return container;
};

export function* renderItems<RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const rendering = renderItem(item, room);

    if (
      item.type === "teleporter" ||
      item.type === "doorFar" ||
      item.type === "doorNear"
    ) {
      makeClickPortal(item.config.toRoom, options, rendering);
    }
    if (item.type === "lift" && room.roomAbove !== undefined) {
      makeClickPortal(room.roomAbove, options, rendering);
    }

    yield rendering;
  }
}
