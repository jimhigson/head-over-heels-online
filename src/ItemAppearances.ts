import { PointData, Texture } from "pixi.js";
import { ItemType, ItemConfig } from "./Item";
import { pixiSpriteSheet, TextureId } from "./sprites/pixiSpriteSheet";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = {
  anchor?: PointData;
  pivot?: PointData;
  flipX?: boolean;
  animationSpeed?: number;
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

// TODO: this probably isn't the long-term solution vs just putting them in the middle of the space
// when items aren't positioned by blocks any more
const centreSmallBlock = { x: 12, y: 26 };

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
    animationSpeed: 0.1,
  },
  lift: {
    anchor: { x: 0.5, y: 1 },
    texture: pixiSpriteSheet.animations.lift,
    animationSpeed: 0.2,
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
  baddie: {
    pivot: centreSmallBlock,
    // TODO: render other baddies
    texture: pixiSpriteSheet.animations.dalek,
    animationSpeed: 0.2,
  },
  joystick: {
    // bumped up 2 is pixel-correct with the original game, but in the remake it might
    // look better to not do this and let it be a bit recessed
    //pivot: { x: smallItemTextureSize.w/2, y: smallItemTextureSize.h +2 },
    anchor: { x: 0.5, y: 1 },
    // TODO: render other baddies
    texture: "items.joystick",
  },
  "movable-block": {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `items.${style}`,
  },
  "portable-block": {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `items.${style}`,
  },
  "charles": {
    anchor: { x: 0.5, y: 1 },
    texture: 'charles.right',
  },

};
