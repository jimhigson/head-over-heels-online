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
import type { ItemState } from "@/model/ItemInPlay";
import {
  isFreeItem,
  isPlayableItem,
  renderContainerState,
  type ItemInPlayType,
} from "@/model/ItemInPlay";
import { playableAppearance } from "./playableAppearance";
import { currentRoom } from "@/game/gameState/GameState";
import { smallItemTextureSize, wallTileSize } from "@/sprites/textureSizes";
import { liftBBShortening } from "@/game/physics/mechanicsConstants";
import { range } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { projectWorldXyzToScreenXyInteger } from "../projectToScreen";
import {
  directionAxis,
  vectorClosestDirectionXy4,
} from "@/utils/vectors/vectors";
import type { ItemAppearance } from "./appearanceUtils";
import { applyAppearance, renderedBefore } from "./appearanceUtils";
import { ifNotRenderedBefore, staticSpriteAppearance } from "./appearanceUtils";

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
  [T in ItemInPlayType]: ItemAppearance<T>;
} = {
  head: playableAppearance,
  heels: playableAppearance,
  doorFrame: doorFrameAppearance,
  doorLegs: doorLegsAppearance,

  stopAutowalk() {
    throw new Error("these should always be non-rendering");
  },
  portal() {
    throw new Error("these should always be non-rendering");
  },

  wall: ifNotRenderedBefore(
    ({ config: { side, style }, state }, gameState, renderTo) => {
      const room = currentRoom(gameState);
      applyAppearance(
        renderTo,
        state,
        side === "right" || side === "towards" ?
          new Container()
        : createSprite({
            texture: wallTextureId(
              room.planet,
              style,
              side,
              room.color.shade === "dimmed",
            ),
            pivot:
              side === "away" ?
                {
                  x: wallTileSize.w,
                  // walls need to be rendered 1px high to match original game (original puts them 1px low, but
                  // we already position them (in world space) 2px low to match original rendering while keeping
                  // bounding boxes correct
                  y: wallTileSize.h + 1,
                }
              : { x: 0, y: wallTileSize.h + 1 },
          }),
      );
    },
  ),

  barrier({ config: { axis }, state }, _gameState, renderTo) {
    const currentlyRenderedState = renderTo[renderContainerState];
    const bubbles = state.expires !== null;
    const wasBubbles =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.expires !== null
      );

    if (renderedBefore(renderTo) && bubbles === wasBubbles) {
      return;
    }

    applyAppearance(
      renderTo,
      state,
      bubbles ?
        createSprite({
          frames: spriteSheet.animations["bubbles.taupe"],
          playOnce: "and-destroy",
          pivot: barrierPivot[axis],
          //...projectWorldXyzToScreenXyInteger(blockXyzToFineXyz({ x: -0.5 })),
        })
      : createSprite({
          texture: `barrier.${axis}`,
          pivot: barrierPivot[axis],
        }),
    );
  },

  deadlyBlock: ifNotRenderedBefore(
    ({ config: { style }, state }, _gameState, renderTo) => {
      applyAppearance(
        renderTo,
        state,
        createSprite(style === "puck" ? "puck.deadly" : style),
      );
    },
  ),

  block({ config: { style }, state }, _gameState, renderTo) {
    const currentlyRenderedState = renderTo[renderContainerState];
    const { expires, disappearing } = state;

    const bubbles = expires !== null;
    const wasBubbles =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.expires !== null
      );
    const wasDisappearing =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.disappearing
      );

    if (
      renderedBefore(renderTo) &&
      bubbles === wasBubbles &&
      disappearing === wasDisappearing
    ) {
      return;
    }

    applyAppearance(
      renderTo,
      state,
      bubbles ?
        createSprite({
          frames: spriteSheet.animations["bubbles.taupe"],
          playOnce: "and-destroy",
        })
      : createSprite(`block.${style}${disappearing ? ".disappearing" : ""}`),
    );
  },

  switch({ state }, _gameState, renderTo) {
    const { setting } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const lastSetting =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.setting
      );

    if (renderedBefore(renderTo) && setting === lastSetting) {
      return;
    }

    applyAppearance(renderTo, state, createSprite(`switch.${setting}`));
  },

  conveyor(item, _gameState, renderTo) {
    const currentlyRenderedState = renderTo[renderContainerState];
    const {
      config: { direction, count },
      state,
    } = item;

    const isActive = (state: ItemState<"conveyor">) =>
      state.stoodOnBy.find(
        (i) => isFreeItem(i) && i.state.activeConveyor === item,
      ) !== undefined;

    const activeNow = isActive(state);

    // this isn't quite right since it is looking at the .activeConveyor property for the item that was standing on it
    // in the current state, not the previous state. Might still be ok. Previous state is now lost.
    // would need to be able to give custom state on the renderer for this conveyor type only (so far)
    const wasActiveLastRender = isActive(currentlyRenderedState);

    const shouldRender =
      !renderedBefore(renderTo) || activeNow !== wasActiveLastRender;

    console.log(
      "now",
      activeNow,
      "last",
      wasActiveLastRender,
      "shouldRender",
      shouldRender,
    );

    if (shouldRender) {
      const rendering = new Container();

      const axis = directionAxis(direction);
      rendering.addChild(
        ...iterate(range(count, 0, -1)).map((i) => {
          const xy = projectWorldXyzToScreenXyInteger({
            [axis]: (i - 1) * blockSizePx.w,
          });

          return createSprite(
            activeNow ?
              {
                frames: spriteSheet.animations[`conveyor.${axis}`],
                reverse: direction === "towards" || direction === "right",
                animationSpeed: 0.5,
                ...xy,
              }
            : {
                texture: `conveyor.${axis}.6`,
                ...xy,
              },
          );
        }),
      );

      applyAppearance(renderTo, state, rendering);
    }
  },

  lift: ifNotRenderedBefore(({ state }, _gameState, renderTo) => {
    const rendering = new Container();

    const pivot = {
      x: smallItemTextureSize.w / 2,
      y: smallItemTextureSize.h - liftBBShortening,
    };
    rendering.addChild(
      createSprite({
        frames: spriteSheet.animations.lift,
        pivot,
      }),
    );

    rendering.addChild(createSprite({ texture: "lift.static", pivot }));

    applyAppearance(renderTo, state, rendering);
  }),

  spring({ state }, _gameSate, renderTo) {
    const { stoodOnBy } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const stoodOn = stoodOnBy.length > 0;
    const prevStoodOn = (currentlyRenderedState?.stoodOnBy.length ?? 0) > 0;

    if (renderedBefore(renderTo) && stoodOn === prevStoodOn) {
      return;
    }

    applyAppearance(
      renderTo,
      state,
      createSprite(
        !stoodOn && prevStoodOn ?
          {
            frames: spriteSheet.animations["spring.bounce"],
            playOnce: "and-stop",
          }
        : stoodOn ? "spring.compressed"
        : "spring.released",
      ),
    );
  },

  teleporter({ state }, _gameSate, renderTo) {
    const { stoodOnBy } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const stoodOn = stoodOnBy.find(isPlayableItem) !== undefined;
    const prevStoodOn =
      currentlyRenderedState?.stoodOnBy.find(isPlayableItem) !== undefined;

    if (renderedBefore(renderTo) && stoodOn === prevStoodOn) {
      return;
    }

    const renderFlashing = () =>
      new Container({
        children: [
          createSprite("teleporter"),
          createSprite({
            frames: spriteSheet.animations["teleporter.flashing"],
          }),
        ],
      });

    applyAppearance(
      renderTo,
      state,
      stoodOn ? renderFlashing() : createSprite("teleporter"),
    );
  },

  pickup({ config: { gives }, state }, _gameState, renderTo) {
    const { expires } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const bubbles = expires !== null;
    const wasBubbles =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.expires !== null
      );

    if (renderedBefore(renderTo) && bubbles === wasBubbles) {
      return;
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
    const texture = pickupIcons[gives];

    applyAppearance(
      renderTo,
      state,
      createSprite(
        bubbles ?
          {
            frames:
              texture === "donuts" ?
                spriteSheet.animations[`bubbles.taupe`]
              : spriteSheet.animations[`bubbles.white`],
            playOnce: "and-destroy",
          }
        : texture,
      ),
    );
  },
  fish({ config: { alive }, state }, _gameState, renderTo) {
    const { expires } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const bubbles = expires !== null;
    const wasBubbles =
      currentlyRenderedState === undefined ? false : (
        currentlyRenderedState.expires !== null
      );

    if (renderedBefore(renderTo) && bubbles === wasBubbles) {
      return;
    }

    applyAppearance(
      renderTo,
      state,
      createSprite(
        bubbles ?
          {
            frames: spriteSheet.animations[`bubbles.fish`],
            playOnce: "and-destroy",
          }
        : alive ?
          {
            frames: spriteSheet.animations.fish,
            animationSpeed: 0.25,
          }
        : {
            texture: "fish.1",
          },
      ),
    );
  },

  sceneryPlayer: ifNotRenderedBefore(
    ({ config: { which }, state }, _gameState, renderTo) => {
      applyAppearance(
        renderTo,
        state,
        createSprite(`${which}.walking.towards.2`),
      );
    },
  ),

  charles({ state }, _gameSate, renderTo) {
    const { facing } = state;
    const currentlyRenderedState = renderTo[renderContainerState];
    const facingXy4 = vectorClosestDirectionXy4(facing);
    const wasFacingXy4 =
      currentlyRenderedState === undefined ? undefined : (
        vectorClosestDirectionXy4(currentlyRenderedState.facing)
      );

    if (renderedBefore(renderTo) && facingXy4 === wasFacingXy4) {
      return;
    }

    applyAppearance(renderTo, state, stackedSprites(`charles.${facingXy4}`));
  },

  baddie: ifNotRenderedBefore(({ config, state }, _gameState, renderTo) => {
    switch (config.which) {
      case "helicopter-bug":
      case "dalek":
        // animated, no directions
        applyAppearance(
          renderTo,
          state,
          createSprite({
            frames: spriteSheet.animations[config.which],
            animationSpeed: 0.5,
          }),
        );
        break;
      case "headless-base":
        // no anim, not directional
        applyAppearance(
          renderTo,
          state,
          createSprite({ texture: "headless-base" }),
        );
        break;
      case "american-football-head":
        applyAppearance(
          renderTo,
          state,
          createSprite({
            texture: `american-football-head.${config.startDirection}`,
          }),
        );
        break;
      case "turtle":
        // animated, directional:
        applyAppearance(
          renderTo,
          state,
          createSprite({
            frames: spriteSheet.animations[`turtle.${config.startDirection}`],
            animationSpeed: 0.25,
          }),
        );
        break;
      case "cyberman":
        if (config.activated) {
          applyAppearance(
            renderTo,
            state,
            stackedSprites(`cyberman.towards`, bubbles),
          );
        } else {
          // charging on a toaster
          applyAppearance(
            renderTo,
            state,
            createSprite(`cyberman.${config.startDirection}`),
          );
        }
        break;
      case "bubble-robot":
        applyAppearance(renderTo, state, stackedSprites(bubbles));
        break;
      case "flying-ball":
        //stacked on bubbles:
        applyAppearance(renderTo, state, stackedSprites(`ball`, bubbles));
        break;
      case "computer-bot":
      case "elephant":
      case "monkey":
        // stacked on standard base:
        applyAppearance(
          renderTo,
          state,
          stackedSprites(`${config.which}.towards`),
        );
        break;
      case "elephant-head":
        applyAppearance(renderTo, state, createSprite("elephant.right"));
        break;
      default:
        config satisfies never;
        throw new Error(`unexpected baddie ${config}`);
    }
  }),

  joystick: staticSpriteAppearance("joystick"),

  movableBlock: ifNotRenderedBefore(
    ({ config: { style }, state }, _gameState, renderTo) => {
      applyAppearance(renderTo, state, createSprite(style));
    },
  ),

  book: ifNotRenderedBefore(
    ({ config: { slider }, state }, _gameState, renderTo) => {
      applyAppearance(
        renderTo,
        state,
        createSprite(`book.${slider ? "y" : "x"}`),
      );
    },
  ),

  portableBlock: ifNotRenderedBefore(
    ({ config: { style }, state }, _gameState, renderTo) => {
      applyAppearance(renderTo, state, createSprite(style));
    },
  ),

  hushPuppy: staticSpriteAppearance("hushPuppy"),
  ball: staticSpriteAppearance("ball"),

  // for now, the floor has special rendering different from the main engine.
  // TODO: standardise
  floor() {
    throw new Error("floor should not be rendered as an item");
  },
};
