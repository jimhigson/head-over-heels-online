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
import {
  isFreeItem,
  isPlayableItem,
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
    ({ config: { side, style }, renderContainer }, gameState) => {
      const room = currentRoom(gameState);
      applyAppearance(
        renderContainer,
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
                  // we already position them 2px low to match original rendering
                  y: wallTileSize.h + 1,
                }
              : { x: 0, y: wallTileSize.h + 1 },
          }),
      );
    },
  ),

  barrier({
    config: { axis },
    state: { expires },
    stateLastFrame,
    renderContainer,
  }) {
    const bubbles = expires !== null;
    const wasBubbles =
      stateLastFrame === undefined ? false : stateLastFrame.expires !== null;

    if (renderedBefore(renderContainer!) && bubbles === wasBubbles) {
      return;
    }

    applyAppearance(
      renderContainer!,
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

  deadlyBlock: ifNotRenderedBefore(({ config: { style }, renderContainer }) => {
    applyAppearance(
      renderContainer,
      createSprite(style === "puck" ? "puck.deadly" : style),
    );
  }),

  block({
    config: { style },
    state: { expires, disappearing },
    stateLastFrame,
    renderContainer,
  }) {
    const bubbles = expires !== null;
    const wasBubbles =
      stateLastFrame === undefined ? false : stateLastFrame.expires !== null;
    const wasDisappearing =
      stateLastFrame === undefined ? false : stateLastFrame.disappearing;

    if (
      renderedBefore(renderContainer!) &&
      bubbles === wasBubbles &&
      disappearing === wasDisappearing
    ) {
      return;
    }

    applyAppearance(
      renderContainer!,
      bubbles ?
        createSprite({
          frames: spriteSheet.animations["bubbles.taupe"],
          playOnce: "and-destroy",
        })
      : createSprite(`block.${style}${disappearing ? ".disappearing" : ""}`),
    );
  },

  switch({ state: { setting }, stateLastFrame, renderContainer }) {
    const lastSetting =
      stateLastFrame === undefined ? false : stateLastFrame.setting;

    if (renderedBefore(renderContainer!) && setting === lastSetting) {
      return;
    }

    applyAppearance(
      renderContainer!,

      createSprite(`switch.${setting}`),
    );
  },

  conveyor(item) {
    const {
      config: { direction, count },
      state: { stoodOnBy },
      stateLastFrame,
      renderContainer,
    } = item;

    if (renderContainer === undefined) return;

    const isActive =
      stoodOnBy.find(
        (i) => isFreeItem(i) && i.state.activeConveyor === item,
      ) !== undefined;
    const wasActiveLastFrame =
      stateLastFrame !== undefined &&
      stateLastFrame.stoodOnBy.find(
        (i) =>
          isFreeItem(i) &&
          i.stateLastFrame !== undefined &&
          i.stateLastFrame.activeConveyor === item,
      ) !== undefined;

    const shouldRender =
      (renderContainer !== undefined && !renderedBefore(renderContainer)) ||
      isActive !== wasActiveLastFrame;

    if (shouldRender) {
      const rendering = new Container();

      const axis = directionAxis(direction);
      rendering.addChild(
        ...iterate(range(count, 0, -1)).map((i) => {
          const xy = projectWorldXyzToScreenXyInteger({
            [axis]: (i - 1) * blockSizePx.w,
          });

          return createSprite(
            isActive ?
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

      applyAppearance(renderContainer, rendering);
    }
  },

  lift: ifNotRenderedBefore(({ renderContainer }) => {
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

    applyAppearance(renderContainer, rendering);
  }),

  spring({ state: { stoodOnBy }, stateLastFrame, renderContainer }) {
    const stoodOn = stoodOnBy.length > 0;
    const prevStoodOn = (stateLastFrame?.stoodOnBy.length ?? 0) > 0;

    if (renderedBefore(renderContainer!) && stoodOn === prevStoodOn) {
      return;
    }

    applyAppearance(
      renderContainer!,
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

  teleporter({ state: { stoodOnBy }, stateLastFrame, renderContainer }) {
    const stoodOn = stoodOnBy.find(isPlayableItem) !== undefined;
    const prevStoodOn =
      stateLastFrame?.stoodOnBy.find(isPlayableItem) !== undefined;

    if (renderedBefore(renderContainer!) && stoodOn === prevStoodOn) {
      return;
    }

    if (stoodOn) {
      const rendering = new Container();
      rendering.addChild(createSprite("teleporter"));
      rendering.addChild(
        createSprite({
          frames: spriteSheet.animations["teleporter.flashing"],
        }),
      );
      applyAppearance(renderContainer!, rendering);
    } else applyAppearance(renderContainer!, createSprite("teleporter"));
  },

  pickup({
    config: { gives },
    renderContainer,
    state: { expires },
    stateLastFrame,
  }) {
    const bubbles = expires !== null;
    const wasBubbles =
      stateLastFrame === undefined ? false : stateLastFrame.expires !== null;

    if (renderedBefore(renderContainer!) && bubbles === wasBubbles) {
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
      renderContainer!,
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
  fish({
    config: { alive },
    state: { expires },
    stateLastFrame,
    renderContainer,
  }) {
    const bubbles = expires !== null;
    const wasBubbles =
      stateLastFrame === undefined ? false : stateLastFrame.expires !== null;

    if (renderedBefore(renderContainer!) && bubbles === wasBubbles) {
      return;
    }

    applyAppearance(
      renderContainer!,
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
    ({ config: { which }, renderContainer }) => {
      applyAppearance(
        renderContainer,
        createSprite(`${which}.walking.towards.2`),
      );
    },
  ),

  charles({ state: { facing }, stateLastFrame, renderContainer }) {
    const facingXy4 = vectorClosestDirectionXy4(facing);
    const wasFacingXy4 =
      stateLastFrame === undefined ? undefined : (
        vectorClosestDirectionXy4(stateLastFrame.facing)
      );

    if (renderedBefore(renderContainer!) && facingXy4 === wasFacingXy4) {
      return;
    }

    applyAppearance(renderContainer!, stackedSprites(`charles.${facingXy4}`));
  },

  baddie: ifNotRenderedBefore(({ config, renderContainer }) => {
    switch (config.which) {
      case "helicopter-bug":
      case "dalek":
        // animated, no directions
        applyAppearance(
          renderContainer,
          createSprite({
            frames: spriteSheet.animations[config.which],
            animationSpeed: 0.5,
          }),
        );
        break;
      case "headless-base":
        // no anim, not directional
        applyAppearance(
          renderContainer,
          createSprite({ texture: "headless-base" }),
        );
        break;
      case "american-football-head":
        applyAppearance(
          renderContainer,
          createSprite({
            texture: `american-football-head.${config.startDirection}`,
          }),
        );
        break;
      case "turtle":
        // animated, directional:
        applyAppearance(
          renderContainer,
          createSprite({
            frames: spriteSheet.animations[`turtle.${config.startDirection}`],
            animationSpeed: 0.25,
          }),
        );
        break;
      case "cyberman":
        if (config.charging) {
          applyAppearance(
            renderContainer,
            createSprite(`cyberman.${config.startDirection}`),
          );
        } else {
          applyAppearance(
            renderContainer,
            stackedSprites(`cyberman.towards`, bubbles),
          );
        }
        break;
      case "bubble-robot":
        applyAppearance(renderContainer, stackedSprites(bubbles));
        break;
      case "flying-ball":
        //stacked on bubbles:
        applyAppearance(renderContainer, stackedSprites(`ball`, bubbles));
        break;
      case "computer-bot":
      case "elephant":
      case "monkey":
        // stacked on standard base:
        applyAppearance(
          renderContainer,
          stackedSprites(`${config.which}.towards`),
        );
        break;
      case "elephant-head":
        applyAppearance(renderContainer, createSprite("elephant.right"));
        break;
      default:
        config satisfies never;
        throw new Error(`unexpected baddie ${config}`);
    }
  }),

  joystick: staticSpriteAppearance("joystick"),

  movableBlock: ifNotRenderedBefore(
    ({ config: { style }, renderContainer }) => {
      applyAppearance(renderContainer, createSprite(style));
    },
  ),

  book: ifNotRenderedBefore(({ config: { slider }, renderContainer }) => {
    applyAppearance(
      renderContainer,
      createSprite(`book.${slider ? "y" : "x"}`),
    );
  }),

  portableBlock: ifNotRenderedBefore(
    ({ config: { style }, renderContainer }) => {
      applyAppearance(renderContainer, createSprite(style));
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
