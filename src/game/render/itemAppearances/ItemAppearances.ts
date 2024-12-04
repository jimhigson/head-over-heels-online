import { Container } from "pixi.js";
import type { ItemConfigMap } from "../../../model/json/JsonItem";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { barrierPivot, blockSizePx } from "@/sprites/spritePivots";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { wallTextureId } from "../wallTextureId";
import type { PlanetName } from "../../../sprites/planets";
import { doorFrameAppearance, doorLegsAppearance } from "./doorAppearance";
import { isPlayableItem, type ItemInPlayType } from "@/model/ItemInPlay";
import { playableAppearance } from "./playableAppearance";
import { smallItemTextureSize, wallTileSize } from "@/sprites/textureSizes";
import { liftBBShortening } from "@/game/physics/mechanicsConstants";
import { range } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { projectWorldXyzToScreenXyInteger } from "../projectToScreen";
import type { DirectionXy4 } from "@/utils/vectors/vectors";
import {
  directionAxis,
  originXy,
  vectorClosestDirectionXy4,
  xyEqual,
} from "@/utils/vectors/vectors";
import type { ItemAppearance } from "./appearanceUtils";
import { renderOnce, staticSpriteAppearance } from "./appearanceUtils";
import type { ItemRenderProps } from "./ItemRenderProps";

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

  wall: renderOnce(
    ({
      item: {
        config: { side, style },
      },
      room,
    }) => {
      if (side === "right" || side === "towards") {
        throw new Error("this wall should be non-rendering");
      }

      return {
        container: createSprite({
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
        renderProps: {},
      };
    },
  ),

  barrier({
    item: {
      config: { axis },
      state: { expires },
    },
    currentlyRenderedProps,
  }) {
    const bubbles = expires !== null;

    const render =
      currentlyRenderedProps === undefined ||
      bubbles !== currentlyRenderedProps.bubbles;

    if (!render) {
      return;
    }

    return {
      container:
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
      renderProps: { bubbles },
    };
  },

  deadlyBlock: renderOnce(
    ({
      item: {
        config: { style },
      },
    }) => {
      return {
        container: createSprite(style),
        renderProps: {},
      };
    },
  ),

  block({
    item: {
      config: { style },
      state: { expires, disappearing },
    },
    currentlyRenderedProps,
  }) {
    const bubbles = expires !== null;

    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.bubbles !== bubbles ||
      currentlyRenderedProps.disappearing !== disappearing;

    if (!render) {
      return;
    }

    return {
      container:
        bubbles ?
          createSprite({
            frames: spriteSheet.animations["bubbles.taupe"],
            playOnce: "and-destroy",
          })
        : createSprite(`block.${style}${disappearing ? ".disappearing" : ""}`),
      renderProps: { bubbles, disappearing },
    };
  },

  switch({
    item: {
      state: { setting },
    },
    currentlyRenderedProps,
  }) {
    const render =
      currentlyRenderedProps === undefined ||
      setting !== currentlyRenderedProps.setting;

    if (!render) {
      return;
    }

    return {
      container: createSprite(`switch.${setting}`),
      renderProps: { setting },
    };
  },

  conveyor({
    item: {
      config: { direction, count },
      state: { stoodOnBy },
    },
    currentlyRenderedProps,
  }) {
    const moving = stoodOnBy.size > 0;

    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.moving !== moving;

    if (!render) {
      return;
    }

    const rendering = new Container();

    const axis = directionAxis(direction);
    rendering.addChild(
      ...iterate(range(count, 0, -1)).map((i) => {
        const xy = projectWorldXyzToScreenXyInteger({
          [axis]: (i - 1) * blockSizePx.w,
        });

        return createSprite(
          moving ?
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

    return {
      container: rendering,
      renderProps: { moving },
    };
  },

  lift: renderOnce(() => {
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

    return {
      container: rendering,
      renderProps: {},
    };
  }),

  spring({
    item: {
      state: { stoodOnBy },
    },
    currentlyRenderedProps,
  }) {
    const compressed = stoodOnBy.size > 0;

    const render =
      currentlyRenderedProps === undefined ||
      compressed !== currentlyRenderedProps.compressed;

    if (!render) {
      return;
    }

    const currentlyRenderedCompressed =
      currentlyRenderedProps?.compressed ?? false;

    return {
      container: createSprite(
        !compressed && currentlyRenderedCompressed ?
          {
            frames: spriteSheet.animations["spring.bounce"],
            playOnce: "and-stop",
          }
        : compressed ? "spring.compressed"
        : "spring.released",
      ),
      renderProps: { compressed },
    };
  },

  teleporter({
    item: {
      state: { stoodOnBy },
    },
    currentlyRenderedProps,
  }) {
    const flashing = iterate(stoodOnBy).find(isPlayableItem) !== undefined;

    const render =
      currentlyRenderedProps === undefined ||
      flashing !== currentlyRenderedProps.flashing;

    if (!render) {
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

    return {
      container: flashing ? renderFlashing() : createSprite("teleporter"),
      renderProps: { flashing },
    };
  },

  pickup({
    item: {
      config: { gives },
      state: { expires },
    },
    currentlyRenderedProps,
  }) {
    const bubbles = expires !== null;

    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.bubbles !== bubbles;

    if (!render) {
      return;
    }

    const pickupIcons: Record<
      ItemConfigMap<PlanetName, string>["pickup"]["gives"],
      CreateSpriteOptions
    > = {
      shield: "bunny",
      jumps: "bunny",
      fast: "bunny",
      "extra-life": "bunny",
      bag: "bag",
      donuts: "donuts",
      hooter: "hooter",
      crown: "crown",
      reincarnation: {
        frames: spriteSheet.animations["fish"],
        animationSpeed: 0.25,
      },
    };
    const texture = pickupIcons[gives];

    return {
      container: createSprite(
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
      renderProps: { bubbles },
    };
  },

  moveableDeadly: renderOnce(
    ({
      item: {
        config: { style },
      },
    }) => {
      return {
        container: createSprite(
          style === "deadFish" ? "fish.1" : "puck.deadly",
        ),
        renderProps: {},
      };
    },
  ),

  sceneryPlayer: renderOnce(
    ({
      item: {
        config: { which },
      },
    }) => {
      return {
        container: createSprite(`${which}.walking.towards.2`),
        renderProps: {},
      };
    },
  ),

  charles({
    item: {
      state: { facing },
    },
    currentlyRenderedProps,
  }) {
    const facingXy4 = vectorClosestDirectionXy4(facing);

    const render =
      currentlyRenderedProps === undefined ||
      facingXy4 !== currentlyRenderedProps.facingXy4;

    if (!render) {
      return;
    }
    return {
      container: stackedSprites(`charles.${facingXy4}`),
      renderProps: { facingXy4 },
    };
  },

  baddie({ item: { config, state }, currentlyRenderedProps }) {
    let startingDirection: DirectionXy4 | undefined = undefined;
    const { activated } = state;

    switch (config.which) {
      case "american-football-head":
      case "turtle":
      case "cyberman":
        // have a starting direction
        startingDirection = config.startDirection;
      // eslint-disable-next-line no-fallthrough
      case "computer-bot":
      case "elephant":
      case "monkey": {
        const facingXy4 =
          xyEqual(state.vels.walking, originXy) ?
            (startingDirection ?? "towards")
          : vectorClosestDirectionXy4(state.vels.walking);

        const render =
          currentlyRenderedProps === undefined ||
          activated !== currentlyRenderedProps.activated ||
          facingXy4 !== currentlyRenderedProps.facingXy4;

        if (!render) {
          return;
        }
        const renderProps: ItemRenderProps<"baddie"> = { facingXy4, activated };

        // rendering is directional (xy4)
        switch (config.which) {
          case "american-football-head":
            // directional, no anim
            return {
              container: createSprite({
                texture: `${config.which}.${config.style}.${facingXy4}`,
              }),
              renderProps,
            };
          case "turtle":
            // directional, anim:
            return {
              container:
                activated ?
                  createSprite({
                    frames:
                      spriteSheet.animations[`${config.which}.${facingXy4}`],
                    animationSpeed: 0.25,
                  })
                : createSprite(`${config.which}.${facingXy4}.1`),
              renderProps,
            };
          case "cyberman":
            // directional, animated, stacked (bubbles):
            return {
              container:
                state.activated ?
                  stackedSprites(`${config.which}.${facingXy4}`, bubbles)
                  // charging on a toaster
                : createSprite(`${config.which}.${facingXy4}`),
              renderProps,
            };
          case "computer-bot":
          case "elephant":
          case "monkey":
            // directional, not animated, stacked (base)
            return {
              container: stackedSprites(`${config.which}.${facingXy4}`),
              renderProps,
            };
        }
        break;
      }

      case "helicopter-bug":
      case "dalek":
      case "headless-base":
      case "elephant-head":
      case "bubble-robot":
      case "flying-ball": {
        // these baddies never re-render since they are not directional
        const render =
          currentlyRenderedProps === undefined ||
          activated !== currentlyRenderedProps.activated;

        if (!render) {
          return;
        }

        const renderProps: ItemRenderProps<"baddie"> = { activated };

        // rendering is uni-directional
        switch (config.which) {
          case "helicopter-bug":
          case "dalek":
            // not directional, animated
            return {
              container: createSprite({
                frames: spriteSheet.animations[config.which],
                animationSpeed: 0.5,
              }),
              renderProps,
            };
          case "headless-base":
            // not directional, not animated
            return {
              container: createSprite(config.which),
              renderProps,
            };
          case "elephant-head":
            // not directional, not animated
            return {
              container: createSprite("elephant.towards"),
              renderProps,
            };

          case "bubble-robot":
            //not directional, animated, stacked (base):
            return {
              container: stackedSprites(bubbles),
              renderProps,
            };

          case "flying-ball":
            //not directional, stacked (bubbles):
            return {
              container: stackedSprites(`ball`, bubbles),
              renderProps,
            };
        }
        break;
      }

      default:
        config satisfies never;
        throw new Error(`unexpected baddie ${config}`);
    }
  },

  joystick: staticSpriteAppearance("joystick"),

  movableBlock: renderOnce(
    ({
      item: {
        config: { style },
      },
    }) => {
      return {
        container: createSprite(style),
        renderProps: {},
      };
    },
  ),

  portableBlock({
    item: {
      id,
      config: { style },
    },
    room,
    currentlyRenderedProps,
  }) {
    const heelsCarrying = room.items.heels?.state.carrying?.id ?? null;
    const carried = heelsCarrying === id;

    const render =
      currentlyRenderedProps === undefined ||
      carried !== currentlyRenderedProps.carried;

    if (!render) {
      return;
    }

    return {
      container: carried ? new Container() : createSprite(style),
      renderProps: { carried },
    };
  },

  book: renderOnce(
    ({
      item: {
        config: { slider },
      },
    }) => {
      return {
        container: createSprite(`book.${slider ? "y" : "x"}`),
        renderProps: {},
      };
    },
  ),

  hushPuppy({
    item: {
      state: { expires },
    },
    currentlyRenderedProps,
  }) {
    const bubbles = expires !== null;

    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.bubbles !== bubbles;

    if (!render) {
      return;
    }

    return {
      container:
        bubbles ?
          createSprite({
            frames: spriteSheet.animations["bubbles.taupe"],
            playOnce: "and-destroy",
          })
        : createSprite("hushPuppy"),
      renderProps: { bubbles },
    };
  },

  ball: staticSpriteAppearance("ball"),

  // for now, the floor has special rendering different from the main engine.
  // TODO: standardise
  floor() {
    throw new Error("floor should not be rendered as an item");
  },
};
