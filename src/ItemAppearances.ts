import { PointData, Texture } from "pixi.js";
import { ItemType, ItemConfig } from "./Item";
import { pixiSpriteSheet, TextureId } from "./sprites/pixiSpriteSheet";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = {
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  texture:
    | TextureId
    | Texture[]
    | ((data: ItemConfig[T]) => TextureId | Texture[]);
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
    texture: (d) => `items.barrier.${d.axis}`,
  },
  "deadly-block": {
    anchor: { x: 0.5, y: 1 },
    texture: (d) => `items.${d.style}`,
  },
  block: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `items.block.${style}`,
  },
  conveyor: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ direction }) =>
      direction === "left" || direction === "right"
        ? "items.conveyor.x"
        : "items.conveyor.y",
  },
  fish: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ alive }) =>
      alive ? pixiSpriteSheet.animations.fish : "items.fish1",
  },
  spring: {
    anchor: { x: 0.5, y: 1 },
    texture: "items.spring.released",
  },
  teleporter: {
    anchor: { x: 0.5, y: 1 },
    texture: "items.teleporter",
  },
  pickup: {
    anchor: { x: 0.5, y: 1 },
    texture: (d) => pickupIcons[d.gives],
  },
  player: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ which }) => `items.${which}.toward1`,
  },
};
