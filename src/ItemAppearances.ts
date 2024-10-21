import { PointData } from "pixi.js";
import { ItemType, ItemConfig } from "./Item";
import { TextureId } from "./sprites/pixiSpriteSheet";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = {
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  textureId: TextureId | ((data: ItemConfig[T]) => TextureId);
};

const pickupIcons: Record<ItemConfig["pickup"]["gives"], TextureId> = {
  shield: "items.bunny",
  jumps: "items.bunny",
  fast: "items.bunny",
  "extra-life": "items.bunny",
  bag: "items.bag",
  donuts: "items.donuts",
  hooter: "items.hooter",
};

export const itemAppearances: {
  [T in ItemType]: ItemAppearance<T>;
} = {
  barrier: {
    anchor: { x: 0.5, y: 1 },
    textureId: (d) => `items.barrier.${d.axis}`,
  },
  "deadly-block": {
    anchor: { x: 0.5, y: 1 },
    textureId: (d) => `items.${d.style}`,
  },
  block: {
    anchor: { x: 0.5, y: 1 },
    textureId: (d) => `items.block.${d.style}`,
  },
  conveyor: {
    anchor: { x: 0.5, y: 1 },
    textureId: (d) =>
      d.direction === "left" || d.direction === "right"
        ? "items.conveyor.x"
        : "items.conveyor.y",
  },
  fish: {
    anchor: { x: 0.5, y: 1 },
    textureId: "items.fish1", // TODO: animate if alive
  },
  spring: {
    anchor: { x: 0.5, y: 1 },
    textureId: "items.spring.released",
  },
  teleporter: {
    anchor: { x: 0.5, y: 1 },
    textureId: "items.teleporter",
  },
  pickup: {
    anchor: { x: 0.5, y: 1 },
    textureId: (d) => pickupIcons[d.gives],
  },
};
