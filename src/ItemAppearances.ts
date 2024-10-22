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
  shield: "bunny",
  jumps: "bunny",
  fast: "bunny",
  "extra-life": "bunny",
  bag: "bag",
  donuts: "donuts",
  hooter: "hooter",
};

export const itemAppearances: {
  [T in ItemType]: ItemAppearance<T>;
} = {
  barrier: {
    anchor: { x: 0.5, y: 1 },
    texture: (d) => `barrier.${d.axis}`,
  },
  "deadly-block": {
    anchor: { x: 0.5, y: 1 },
    texture: (d) => `${d.style}`,
  },
  block: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `block.${style}`,
  },
  conveyor: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ direction }) =>
      direction === "left" || direction === "right"
        ? "conveyor.x"
        : "conveyor.y",
  },
  fish: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ alive }) => (alive ? pixiSpriteSheet.animations.fish : "fish1"),
    animationSpeed: 0.1,
  },
  lift: {
    anchor: { x: 0.5, y: 1 },
    texture: pixiSpriteSheet.animations.lift,
    animationSpeed: 0.2,
  },
  spring: {
    anchor: { x: 0.5, y: 1 },
    texture: "spring.released",
  },
  teleporter: {
    anchor: { x: 0.5, y: 1 },
    texture: "teleporter",
  },
  pickup: {
    anchor: { x: 0.5, y: 1 },
    texture: (d) => pickupIcons[d.gives],
  },
  player: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ which }) => `${which}.toward1`,
  },
  baddie: {
    anchor: { x: 0.5, y: 1 },
    // TODO: render other baddies
    texture({ which, startDirection }) {
      switch (which) {
        case "helicopter-bug":
        case "dalek":
          return pixiSpriteSheet.animations[which];
        default:
          // TODO: make stack
          return `${which}.${startDirection}`;
      }
    },
    animationSpeed: 0.2,
  },
  joystick: {
    // bumped up 2 is pixel-correct with the original game, but in the remake it might
    // look better to not do this and let it be a bit recessed
    //pivot: { x: smallItemTextureSize.w/2, y: smallItemTextureSize.h +2 },
    anchor: { x: 0.5, y: 1 },
    // TODO: render other baddies
    texture: "joystick",
  },
  "movable-block": {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `${style}`,
  },
  book: {
    anchor: { x: 0.5, y: 1 },
    texture: ({ slider }) => `book.${slider ? "y" : "x"}`,
  },
  "portable-block": {
    anchor: { x: 0.5, y: 1 },
    texture: ({ style }) => `${style}`,
  },
  charles: {
    anchor: { x: 0.5, y: 1 },
    // TODO: make stack
    texture: "charles.right",
  },
  switch: {
    anchor: { x: 0.5, y: 1 },
    texture: "switch.off",
  },
  "hush-puppy": {
    anchor: { x: 0.5, y: 1 },
    texture: "hush-puppy",
  },
  ball: {
    anchor: { x: 0.5, y: 1 },
    texture: "ball",
  },
};
