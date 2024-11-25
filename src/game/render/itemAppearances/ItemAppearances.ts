import { Container } from "pixi.js";
import type { ItemConfigMap } from "../../../model/json/JsonItem";
import type { TextureId } from "../../../sprites/spriteSheet";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { barrierPivot, blockSizePx } from "@/sprites/spritePivots";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { wallTextureId } from "../wallTextureId";
import type { PlanetName } from "../../../sprites/planets";
import {
  doorFrameAppearance,
  doorLegsAppearance,
} from "../../../doorAppearance";
import { type ItemInPlay, type ItemInPlayType } from "@/model/ItemInPlay";
import { playableAppearance } from "./playableAppearance";
import { currentRoom, type GameState } from "@/game/gameState/GameState";
import { smallItemTextureSize, wallTileSize } from "@/sprites/textureSizes";
import { liftBBShortening } from "@/game/physics/mechanicsConstants";
import { range } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { projectWorldXyzToScreenXyInteger } from "../projectToScreen";
import { directionAxis } from "@/utils/vectors/vectors";

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
      pivot:
        side === "away" ?
          {
            x: wallTileSize.w,
            // walls need to be rendered 1px low to match original game:
            y: wallTileSize.h - 1,
          }
        : { x: 0, y: wallTileSize.h - 1 },
    });
  },

  barrier({ config: { axis }, state: { expires } }) {
    if (expires !== null)
      return createSprite({
        frames: spriteSheet.animations["bubbles.taupe"],
        playOnce: "and-destroy",
        pivot: barrierPivot[axis],
        //...projectWorldXyzToScreenXyInteger(blockXyzToFineXyz({ x: -0.5 })),
      });
    else
      return createSprite({
        texture: `barrier.${axis}`,
        pivot: barrierPivot[axis],
      });
  },

  "deadly-block": ({ config: { style } }) =>
    createSprite(style === "puck" ? "puck.deadly" : style),

  block({ config: { style, disappearing }, state: { expires } }) {
    if (expires !== null)
      return createSprite({
        frames: spriteSheet.animations["bubbles.taupe"],
        playOnce: "and-destroy",
      });
    else
      return createSprite(
        `block.${style}${disappearing ? ".disappearing" : ""}`,
      );
  },

  conveyor({ config: { direction, count } }) {
    const container = new Container();

    const axis = directionAxis(direction);
    container.addChild(
      ...iterate(range(count, 0, -1)).map((i) =>
        createSprite({
          texture: `conveyor.${axis}`,
          ...projectWorldXyzToScreenXyInteger({
            [axis]: (i - 1) * blockSizePx.w,
          }),
        }),
      ),
    );

    return container;
  },

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

  spring(springItem, _gameState) {
    /*
    // getting from game state gives no easy way to get the previous state
    const stoodOn = iterate(objectValues(currentRoom(gameState).items)).some(
      (i) => itemFalls(i) && i.state.standingOn === springItem,
    );*/
    return (
      !springItem.state.stoodOn && springItem.lastRenderedState?.stoodOn ?
        createSprite({
          frames: spriteSheet.animations["spring.bounce"],
          playOnce: "and-stop",
        })
      : springItem.state.stoodOn ? createSprite("spring.compressed")
      : createSprite("spring.released")
    );
  },

  teleporter(item, gameState) {
    // this isn't firing because it doesn't know it needs to be re-rendered.
    // restructure to combine ItemAppearnce with that test, and return previous rendering here
    // if it has not changed

    const { items } = currentRoom(gameState);
    const stoodOn =
      items.head?.state.standingOn === item ||
      items.heels?.state.standingOn === item;

    if (stoodOn) {
      const container = new Container();
      container.addChild(createSprite("teleporter"));
      container.addChild(
        createSprite({
          frames: spriteSheet.animations["teleporter.flashing"],
        }),
      );
      return container;
    } else return createSprite("teleporter");
  },

  pickup({ id: pickupId, config: { gives } }, gameState) {
    const roomId = currentRoom(gameState).id;
    const collected = gameState.pickupsCollected[roomId][pickupId] === true;

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
    const texture = pickupIcons[gives];

    if (collected) {
      return createSprite({
        frames:
          texture === "donuts" ?
            spriteSheet.animations[`bubbles.taupe`]
          : spriteSheet.animations[`bubbles.white`],
        playOnce: "and-destroy",
      });
    }

    return createSprite(texture);
  },
  fish({ id: pickupId, config: { alive } }, gameState) {
    const roomId = currentRoom(gameState).id;
    const collected = gameState.pickupsCollected[roomId][pickupId] === true;

    if (collected) {
      return createSprite({
        frames: spriteSheet.animations[`bubbles.fish`],
        playOnce: "and-destroy",
      });
    }

    return createSprite(
      alive ?
        {
          frames: spriteSheet.animations.fish,
          animationSpeed: 0.25,
        }
      : {
          texture: "fish.1",
        },
    );
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
