import { Container } from "pixi.js";
import { ItemType, ItemConfig } from "./Item";
import { pixiSpriteSheet, TextureId } from "./sprites/pixiSpriteSheet";
import { createSprite, CreateSpriteOptions } from "./game/render/createSprite";
import { AnyRoomState, Xyz } from "./modelTypes";
import { wallTextureId } from "./game/render/wallTextureId";
import { PlanetName } from "./sprites/planets";
import { renderDoorPart } from "./renderDoorPart";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = (
  // appearances don't care about the romId generic so give it string
  config: ItemConfig<PlanetName, string>[T],
  room: AnyRoomState,
  position: Xyz,
) => Container;

const bubbles = {
  frames: pixiSpriteSheet.animations.bubbles,
  animationSpeed: 0.1,
};
const stackedSprites = (
  head: CreateSpriteOptions,
  body: CreateSpriteOptions = "headless-base",
): Container => {
  const container = new Container();
  container.addChild(createSprite(body));
  const headSprite = createSprite(head);
  headSprite.y = -12;
  container.addChild(headSprite);
  return container;
};

export const itemAppearances: {
  [T in ItemType]: ItemAppearance<T>;
} = {
  door() {
    throw new Error("doors should be rendered as doorNear and doorFar");
  },
  doorNear(config, room, position) {
    const container = new Container();

    for (const s of renderDoorPart(config, room, position, "near")) {
      container.addChild(s);
    }

    return container;
  },

  doorFar(config, room, position) {
    const container = new Container();

    for (const s of renderDoorPart(config, room, position, "far")) {
      container.addChild(s);
    }

    return container;
  },

  wall({ side, style }, room) {
    if (side === "right" || side === "towards") {
      return new Container();
    }
    return createSprite({
      texture: wallTextureId(room.planet, style, side),
      anchor: side === "away" ? { x: 1, y: 1 } : { x: 0, y: 1 },
    });
  },

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

  lift() {
    const container = new Container();

    container.addChild(
      createSprite({
        frames: pixiSpriteSheet.animations.lift,
        animationSpeed: 0.2,
      }),
    );

    container.addChild(createSprite("lift.static"));

    return container;
  },

  spring: () => createSprite("spring.released"),

  teleporter: () => createSprite("teleporter"),

  pickup({ gives }) {
    const pickupIcons: Record<
      ItemConfig<PlanetName, string>["pickup"]["gives"],
      TextureId
    > = {
      shield: "bunny",
      jumps: "bunny",
      fast: "bunny",
      "extra-life": "bunny",
      bag: "bag",
      donuts: "donuts",
      hooter: "hooter",
      crown: "crown",
    };

    return createSprite(pickupIcons[gives]);
  },

  player: ({ which }) => createSprite(`${which}.walking.toward.2`),
  sceneryPlayer: ({ which }) => createSprite(`${which}.walking.toward.2`),

  baddie(options) {
    switch (options.which) {
      case "helicopter-bug":
      case "dalek":
        // animated, no directions
        return createSprite({
          frames: pixiSpriteSheet.animations[options.which],
          animationSpeed: 0.2,
        });
      case "headless-base":
        // no anim, not directional
        return createSprite({ texture: "headless-base" });
      case "american-football-head":
        return createSprite({
          texture: `american-football-head.${options.startDirection}`,
        });
      case "turtle":
        // animated, directional:
        return createSprite({
          frames:
            pixiSpriteSheet.animations[`turtle.${options.startDirection}`],
          animationSpeed: 0.1,
        });
      case "cyberman":
        if (options.charging) {
          return createSprite(`cyberman.${options.startDirection}`);
        } else {
          return stackedSprites(`cyberman.towards`, bubbles);
        }
      case "bubble-robot":
        return stackedSprites(bubbles);
      case "flying-ball":
        //stacked on bubbles:
        return stackedSprites(`ball`, bubbles);
      case "computer-bot":
      case "elephant":
      case "monkey":
        // stacked on standard base:
        return stackedSprites(`${options.which}.towards`);
    }
  },

  joystick: () => createSprite("joystick"),

  "movable-block": ({ style }) => createSprite(style),

  book: ({ slider }) => createSprite(`book.${slider ? "y" : "x"}`),

  "portable-block": ({ style }) => createSprite(style),

  charles: () => stackedSprites("charles.towards"),

  switch: () => createSprite("switch.off"),
  "hush-puppy": () => createSprite("hush-puppy"),
  ball: () => createSprite("ball"),
};
