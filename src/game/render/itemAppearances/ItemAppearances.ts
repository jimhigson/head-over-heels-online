import { Container } from "pixi.js";
import type { ItemConfigMap } from "../../../model/json/JsonItem";
import type { TextureId } from "../../../sprites/spriteSheet";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { barrierPivot } from "@/sprites/spritePivots";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { wallTextureId } from "../wallTextureId";
import type { PlanetName } from "../../../sprites/planets";
import {
  doorFrameAppearance,
  doorLegsAppearance,
} from "../../../doorAppearance";
import type { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import { playableAppearance } from "./playableAppearance";
import { currentRoom, type GameState } from "@/game/gameState/GameState";
import { smallItemTextureSize } from "@/sprites/textureSizes";
import { liftBBShortening } from "@/game/physics/mechanicsConstants";

const bubbles = {
  frames: spriteSheet.animations["bubbles.cold"],
  animationSpeed: 0.25,
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
  [T in ItemInPlayType]: <RoomId extends string>(
    // appearances don't care about the romId generic so give it string
    item: ItemInPlay<T, PlanetName, RoomId>,
    gameState: GameState<RoomId>,
  ) => Container;
} = {
  head: playableAppearance,
  heels: playableAppearance,
  doorFrame: doorFrameAppearance,
  doorLegs: doorLegsAppearance,

  portal() {
    throw new Error("these should always be non-rendering");
  },

  wall({ config: { side, style } }, gameState) {
    if (side === "right" || side === "towards") {
      return new Container();
    }
    return createSprite({
      texture: wallTextureId(currentRoom(gameState).planet, style, side),
      anchor: side === "away" ? { x: 1, y: 1 } : { x: 0, y: 1 },
    });
  },

  barrier: ({ config: { axis } }) =>
    createSprite({
      texture: `barrier.${axis}`,
      pivot: barrierPivot[axis],
    }),

  "deadly-block": ({ config: { style } }) =>
    createSprite(style === "puck" ? "puck.deadly" : style),

  block: ({ config: { style } }) => createSprite(`block.${style}`),

  conveyor: ({ config: { direction } }) =>
    createSprite(
      direction === "left" || direction === "right" ?
        "conveyor.x"
      : "conveyor.y",
    ),

  fish: ({ config: { alive } }) =>
    createSprite(
      alive ?
        {
          frames: spriteSheet.animations.fish,
          animationSpeed: 0.25,
        }
      : {
          texture: "fish.1",
        },
    ),

  lift() {
    const container = new Container();

    const pivot = {
      x: smallItemTextureSize.w / 2,
      y: smallItemTextureSize.h - liftBBShortening,
    };
    container.addChild(
      createSprite({
        frames: spriteSheet.animations.lift,
        pivot,
      }),
    );

    container.addChild(createSprite({ texture: "lift.static", pivot }));

    return container;
  },

  spring: (item, _gameState) =>
    !item.state.stoodOn && item.lastRenderedState?.stoodOn ?
      createSprite({
        frames: spriteSheet.animations["spring.bounce"],
        playOnce: "and-stop",
      })
    : item.state.stoodOn ? createSprite("spring.compressed")
    : createSprite("spring.released"),

  teleporter: (item) =>
    item.state.stoodOn ?
      createSprite({
        frames: spriteSheet.animations["teleporter.flashing"],
      })
    : createSprite("teleporter"),

  pickup({ id: pickupId, config: { gives } }, gameState) {
    const roomId = currentRoom(gameState).id;
    const collected = gameState.pickupsCollected[roomId][pickupId] === true;

    if (collected) {
      return createSprite({
        frames: spriteSheet.animations["bubbles.pickup"],
        playOnce: "and-destroy",
      });
    }

    const pickupIcons: Record<
      ItemConfigMap<PlanetName, string>["pickup"]["gives"],
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

  sceneryPlayer: ({ config: { which } }) =>
    createSprite(`${which}.walking.towards.2`),

  baddie({ config }) {
    switch (config.which) {
      case "helicopter-bug":
      case "dalek":
        // animated, no directions
        return createSprite({
          frames: spriteSheet.animations[config.which],
          animationSpeed: 0.5,
        });
      case "headless-base":
        // no anim, not directional
        return createSprite({ texture: "headless-base" });
      case "american-football-head":
        return createSprite({
          texture: `american-football-head.${config.startDirection}`,
        });
      case "turtle":
        // animated, directional:
        return createSprite({
          frames: spriteSheet.animations[`turtle.${config.startDirection}`],
          animationSpeed: 0.25,
        });
      case "cyberman":
        if (config.charging) {
          return createSprite(`cyberman.${config.startDirection}`);
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
        return stackedSprites(`${config.which}.towards`);
      case "elephant-head":
        return createSprite("elephant.right");
      default:
        config satisfies never;
        throw new Error(`unexpected baddie ${config}`);
    }
  },

  joystick: () => createSprite("joystick"),

  "movable-block": ({ config: { style } }) => createSprite(style),

  book: ({ config: { slider } }) => createSprite(`book.${slider ? "y" : "x"}`),

  "portable-block": ({ config: { style } }) => createSprite(style),

  charles: () => stackedSprites("charles.towards"),

  switch: () => createSprite("switch.off"),
  "hush-puppy": () => createSprite("hush-puppy"),
  ball: () => createSprite("ball"),

  // for now, the floor has special rendering different from the main engine.
  // TODO: standardise
  floor() {
    throw new Error("floor should not be rendered as an item");
  },
};
