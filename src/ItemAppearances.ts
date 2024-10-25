import { Container } from "pixi.js";
import { ItemType, ItemConfig, LoadedDoorConfig } from "./Item";
import {
  blockSizePx,
  doorTexturePivot,
  pixiSpriteSheet,
  TextureId,
} from "./sprites/pixiSpriteSheet";
import { createSprite, CreateSpriteOptions } from "./game/render/createSprite";
import { AnyRoom, Axis, crossAxis, Xyz } from "./modelTypes";
import { wallTextureId } from "./game/render/wallTextureId";
import { doorTexture } from "./game/render/doorTexture";
import { projectBlockToScreen } from "./game/render/projectToScreen";
import { PlanetName } from "./sprites/planets";

// how an item is rendered
export type ItemAppearance<T extends ItemType> = (
  // appearances don't care about the romId generic so give it string
  data: ItemConfig<PlanetName, string>[T],
  room: AnyRoom,
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

function* renderDoorLeg(axis: Axis, z: number): Generator<Container> {
  // drag legs etc
  const pivotX = axis === "y" ? 0 : 16;

  yield createSprite({
    pivot: { x: pivotX, y: 9 },
    texture: "generic.door.legs.base",
    y: blockSizePx.h * z,
  });

  for (let zi = z - 1; zi > 0; zi--) {
    yield createSprite({
      pivot: { x: pivotX, y: 9 },
      texture: "generic.door.legs.pillar",
      y: blockSizePx.h * zi,
    });
  }

  yield createSprite({
    pivot: { x: pivotX, y: 15 },
    texture: `generic.door.legs.threshold.${axis}`,
  });
}

function* renderDoorPart(
  { axis, inHiddenWall }: LoadedDoorConfig<string>,
  room: AnyRoom,
  { z }: Xyz,
  nearness: "near" | "far",
): Generator<Container> {
  if (inHiddenWall) {
    if (z !== 0) {
      //draw the 'floating' threshold:
      const pivotX = axis === "x" ? 18 : 8;

      yield createSprite({
        pivot: { x: pivotX, y: 12 },
        texture: `generic.door.threshold.${axis}`,
      });
    }
  } else {
    // in a drawn wall:
    if (z !== 0) {
      // drag legs etc
      yield* renderDoorLeg(axis, z);
    } else {
      const offset = projectBlockToScreen({ [crossAxis(axis)]: 0.5 });

      if (nearness === "far") {
        yield createSprite({
          anchor: { x: 0, y: 1 },
          flipX: axis === "x",
          texture: "generic.wall.overdraw",
          ...offset,
        });
      }
    }
  }

  // draw the actual door
  yield createSprite({
    texture: doorTexture(room, axis, nearness),
    pivot: doorTexturePivot[axis],
  });
}

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

  lift: () =>
    createSprite({
      frames: pixiSpriteSheet.animations.lift,
      animationSpeed: 0.2,
    }),

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
    };

    return createSprite(pickupIcons[gives]);
  },

  player: ({ which }) => createSprite(`${which}.toward1`),

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
