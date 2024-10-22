import { Container } from "pixi.js";
import { ItemType, ItemConfig } from "./Item";
import { pixiSpriteSheet, TextureId } from "./sprites/pixiSpriteSheet";
import { createSprite } from "./game/render/spriteAtBlock";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = (
  data: ItemConfig[T],
) => Container;

export const itemAppearances: {
  [T in ItemType]: ItemAppearance<T>;
} = {
  barrier: ({ axis }) =>
    createSprite({
      texture: `barrier.${axis}`,
    }),

  "deadly-block": ({ style }) => createSprite(style),

  block: ({ style }) => createSprite(`block.${style}`),

  conveyor: ({ direction }) =>
    createSprite(
      direction === "left" || direction === "right"
        ? "conveyor.x"
        : "conveyor.y",
    ),

  fish: ({ alive }) =>
    createSprite(
      alive
        ? {
            frames: pixiSpriteSheet.animations.fish,
            animationSpeed: 0.1,
          }
        : {
            texture: "fish.1",
          },
    ),

  lift: () =>
    createSprite({
      frames: pixiSpriteSheet.animations.lift,
      animationSpeed: 0.2,
    }),

  spring: () => createSprite("spring.released"),

  teleporter: () => createSprite("teleporter"),

  pickup({ gives }) {
    const pickupIcons: Record<ItemConfig["pickup"]["gives"], TextureId> = {
      shield: "bunny",
      jumps: "bunny",
      fast: "bunny",
      "extra-life": "bunny",
      bag: "bag",
      donuts: "donuts",
      hooter: "hooter",
    };

    return createSprite(pickupIcons[gives]);
  },

  player: ({ which }) => createSprite(`${which}.toward1`),

  baddie({ which, startDirection }) {
    switch (which) {
      case "helicopter-bug":
      case "dalek":
        return createSprite({
          frames: pixiSpriteSheet.animations[which],
          animationSpeed: 0.2,
        });
      case "headless-base":
        return createSprite({ texture: "headless-base" });
      case "turtle":
        return createSprite({
          frames: pixiSpriteSheet.animations[`turtle.${startDirection!}`],
          animationSpeed: 0.1,
        });
      case "flying-ball":
        //TODO: stack the sprites
        return createSprite({ texture: "ball" }); // TODO: needs bubbles under it too
      default:
        // TODO: make stack
        return createSprite({
          texture: `${which}.${startDirection || "towards"}`,
        });
    }
  },

  joystick: () => createSprite("joystick"),

  "movable-block": ({ style }) => createSprite(style),

  book: ({ slider }) => createSprite(`book.${slider ? "y" : "x"}`),

  "portable-block": ({ style }) => createSprite(style),

  charles: () => createSprite("charles.right"),

  switch: () => createSprite("switch.off"),
  "hush-puppy": () => createSprite("hush-puppy"),
  ball: () => createSprite("ball"),
};
