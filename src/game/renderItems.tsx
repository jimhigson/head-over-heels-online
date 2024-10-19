import { Container } from "pixi.js";
import { AnyRoom, RoomId } from "../modelTypes";
import { Pickup } from "../Item";
import { RenderWorldOptions } from "./renderWorld";
import { makeClickPortal } from "./makeClickPortal";
import { spriteAtBlock } from "./spriteAtBlock";
import { TextureId } from "../sprites/pixiSpriteSheet";

const pickupIcons: Record<Pickup["gives"], TextureId> = {
  "extra-life": "items.bunny",
  bag: "items.bag",
  donuts: "items.donuts",
  hooter: "items.hooter",
};

export function* renderItems(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    switch (item.type) {
      case "teleporter": {
        const sprite = spriteAtBlock(item.position, "items.teleporter", {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        makeClickPortal(item.toRoom as RoomId, options, sprite);
        yield sprite;
        break;
      }
      case "barrier":
        yield spriteAtBlock(item.position, "items.barrier", {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        break;

      case "block":
        yield spriteAtBlock(item.position, `items.block.${item.style}`, {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        break;

      case "conveyor":
        yield spriteAtBlock(
          item.position,
          item.direction === "left" || item.direction === "right"
            ? "items.conveyor.x"
            : "items.conveyor.y",
          { anchor: { x: 0.5, y: 1 }, giveZIndex: true },
        );
        break;

      case "deadly-block":
        yield spriteAtBlock(item.position, "items.volcano", {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        break;

      case "fish":
        yield spriteAtBlock(item.position, "items.fish1", {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        break;

      case "pickup": {
        yield spriteAtBlock(item.position, pickupIcons[item.gives], {
          anchor: { x: 0.5, y: 1 },
          giveZIndex: true,
        });
        break;
      }
    }
  }
}
