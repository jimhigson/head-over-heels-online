import { Container } from "pixi.js";
import type { BlockStyle, ItemConfigMap } from "@/model/json/ItemConfigMap";
import type { TextureId } from "../../../sprites/spriteSheet";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { blockSizePx } from "@/sprites/spritePivots";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { wallTextureId } from "../wallTextureId";
import type { SceneryName } from "../../../sprites/planets";
import { doorFrameAppearance, doorLegsAppearance } from "./doorAppearance";
import { type ItemInPlayType } from "@/model/ItemInPlay";
import { isPlayableItem } from "@/game/physics/itemPredicates";
import { playableAppearance } from "./playableAppearance";
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
import { renderOnce, staticSpriteAppearance } from "./appearanceUtils";
import type { ItemRenderProps } from "./ItemRenderProps";
import { floorAppearance } from "./floorAppearance";
import {
  doughnuttedFilter,
  greyFilter,
  mainPaletteSwapFilter,
} from "../filters/paletteSwapFilters";
import {
  stackedSprites,
  itemRidingOnBubblesSpritesOptions,
} from "./stackedSprites";
import { OutlineFilter } from "@/filters/colorReplace/outlineFilter";
import { spritesheetPalette } from "gfx/spritesheetPalette";

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  disappear: boolean,
): TextureId => {
  if (style === "organic" && isDark) {
    return `block.organic.dark${disappear ? ".disappearing" : ""}`;
  }
  return `block.${style}${disappear ? ".disappearing" : ""}`;
};

const carryableOutlineColour = spritesheetPalette.moss;

const singleRenderWithStyleAsTexture = renderOnce<
  "deadlyBlock" | "slidingDeadly" | "slidingBlock",
  string
>(
  ({
    item: {
      config: { style },
    },
  }) => createSprite(style),
);

export const itemAppearances: {
  [T in ItemInPlayType]: ItemAppearance<T>;
} = {
  head: playableAppearance,
  heels: playableAppearance,
  headOverHeels: playableAppearance,
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

      return createSprite({
        texture: wallTextureId(
          room.planet,
          style,
          side,
          room.color.shade === "dimmed",
        ),
        // to match the original, the walls need to be rendered 2px lower than we'd expect. Unfortunately, this
        // means they're outside their bounding box, so it sometimes doesn't work with z-index rendering
        y: 1,
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
        filter: mainPaletteSwapFilter(room),
      });
    },
  ),

  barrier: renderOnce(
    ({
      item: {
        config: { axis },
      },
    }) => {
      return createSprite({
        texture: `barrier.${axis}`,
        //pivot: barrierPivot[axis],
      });
    },
  ),

  deadlyBlock: renderOnce(
    ({
      item: {
        config: { style },
      },
      room,
    }) =>
      createSprite({
        texture: style,
        filter: style === "volcano" ? mainPaletteSwapFilter(room) : undefined,
      }),
  ),
  slidingDeadly: singleRenderWithStyleAsTexture,
  slidingBlock: singleRenderWithStyleAsTexture,

  block({
    item: {
      config: { style },
      state: { disappear },
    },
    room,
    currentlyRenderedProps,
  }) {
    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.disappear !== disappear;

    if (!render) {
      return;
    }

    return {
      container: createSprite({
        texture: blockTextureId(
          room.color.shade === "dimmed",
          style,
          disappear !== null,
        ),
        filter: style === "organic" ? mainPaletteSwapFilter(room) : undefined,
      }),
      renderProps: { disappear },
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

    return rendering;
  }),

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

  pickup: renderOnce(
    ({
      item: {
        config: { gives },
      },
      room,
    }) => {
      const pickupIcons: Record<
        ItemConfigMap<SceneryName, string, string>["pickup"]["gives"],
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
        scroll: { texture: "scroll", filter: mainPaletteSwapFilter(room) },
        reincarnation: {
          frames: spriteSheet.animations["fish"],
          animationSpeed: 0.25,
        },
      };
      const createOptions = pickupIcons[gives];

      return createSprite(createOptions);
    },
  ),

  moveableDeadly: renderOnce(
    ({
      item: {
        config: { style },
      },
    }) => createSprite(style === "deadFish" ? "fish.1" : "puck.deadly"),
  ),

  sceneryPlayer: renderOnce(
    ({
      item: {
        config: { which },
      },
    }) =>
      which === "headOverHeels" ?
        stackedSprites({
          top: `head.walking.towards.2`,
          bottom: `heels.walking.towards.2`,
        })
      : createSprite(`${which}.walking.towards.2`),
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
      container: stackedSprites({ top: `charles.${facingXy4}` }),
      renderProps: { facingXy4 },
    };
  },

  baddie({ item: { config, state }, room, currentlyRenderedProps }) {
    const { activated, busyLickingDoughnutsOffFace } = state;

    const filter =
      busyLickingDoughnutsOffFace ? doughnuttedFilter
      : !activated ? greyFilter(room)
      : undefined;

    switch (config.which) {
      case "american-football-head":
      case "turtle":
      case "cyberman":
      case "computer-bot":
      case "elephant":
      case "elephant-head":
      case "monkey": {
        const facingXy4 = vectorClosestDirectionXy4(state.facing);

        const render =
          currentlyRenderedProps === undefined ||
          activated !== currentlyRenderedProps.activated ||
          busyLickingDoughnutsOffFace !==
            currentlyRenderedProps.busyLickingDoughnutsOffFace ||
          facingXy4 !== currentlyRenderedProps.facingXy4;

        if (!render) {
          return;
        }
        const renderProps: ItemRenderProps<"baddie"> = {
          facingXy4,
          activated,
          busyLickingDoughnutsOffFace,
        };

        // rendering is directional (xy4)
        switch (config.which) {
          case "american-football-head":
            // directional, style, no anim
            return {
              container: createSprite({
                texture: `${config.which}.${config.style}.${facingXy4}`,
                filter,
              }),
              renderProps,
            };
          case "elephant-head":
            // directional, no style, no anim
            return {
              container: createSprite({
                texture: `elephant.${facingXy4}`,
                filter,
              }),
              renderProps,
            };
          case "turtle": {
            // directional, anim:
            const animate = activated && !busyLickingDoughnutsOffFace;
            return {
              container:
                animate ?
                  createSprite({
                    frames:
                      spriteSheet.animations[`${config.which}.${facingXy4}`],
                    animationSpeed: 0.25,
                    filter,
                  })
                : createSprite({
                    texture: `${config.which}.${facingXy4}.1`,
                    filter,
                  }),
              renderProps,
            };
          }
          case "cyberman":
            // directional, animated, stacked (bubbles):
            return {
              container:
                state.activated || state.busyLickingDoughnutsOffFace ?
                  stackedSprites({
                    top: {
                      texture: `${config.which}.${facingXy4}`,
                      filter: filter || mainPaletteSwapFilter(room),
                    },
                    bottom: itemRidingOnBubblesSpritesOptions,
                  })
                  // charging on a toaster
                : createSprite({
                    texture: `${config.which}.${facingXy4}`,
                    filter,
                  }),
              renderProps,
            };
          case "computer-bot":
          case "elephant":
          case "monkey":
            // directional, not animated, stacked (base)
            return {
              container: stackedSprites({
                top: `${config.which}.${facingXy4}`,
                filter,
              }),
              renderProps,
            };
          default:
            config satisfies never;
        }
        break;
      }

      case "helicopter-bug":
      case "emperor":
      case "dalek":
      case "headless-base":
      case "bubble-robot":
      case "flying-ball": {
        // not directional
        const render =
          currentlyRenderedProps === undefined ||
          busyLickingDoughnutsOffFace !==
            currentlyRenderedProps.busyLickingDoughnutsOffFace ||
          activated !== currentlyRenderedProps.activated;

        if (!render) {
          return;
        }

        const renderProps: ItemRenderProps<"baddie"> = {
          activated,
          busyLickingDoughnutsOffFace,
        };

        // rendering is uni-directional
        switch (config.which) {
          case "helicopter-bug":
          case "dalek": {
            const frames = spriteSheet.animations[config.which];
            const animate = activated && !busyLickingDoughnutsOffFace;
            // not directional, animated
            return {
              container: createSprite(
                animate ?
                  {
                    frames,
                    animationSpeed: 0.5,
                    filter,
                  }
                : { texture: `${config.which}.1`, filter },
              ),
              renderProps,
            };
          }
          case "headless-base":
            // not directional, not animated
            return {
              filter,
              container: createSprite({ texture: config.which, filter }),
              renderProps,
            };

          case "bubble-robot":
            //not directional, animated, stacked (base):
            return {
              container: stackedSprites({
                top: itemRidingOnBubblesSpritesOptions,
                filter,
              }),
              renderProps,
            };

          case "flying-ball":
            //not directional, stacked (bubbles):
            return {
              container: stackedSprites({
                top: `ball`,
                bottom: itemRidingOnBubblesSpritesOptions,
                filter,
              }),
              renderProps,
            };

          case "emperor":
            return {
              container: createSprite({
                frames: spriteSheet.animations["bubbles.cold"],
                animationSpeed: 0.25,
                filter,
              }),
              renderProps,
            };
          default:
            config satisfies never;
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
    }) => createSprite(style),
  ),

  portableBlock({
    item: {
      config: { style },
      state: { wouldPickUpNext },
    },
    currentlyRenderedProps,
    renderOptions,
  }) {
    const highlighted = wouldPickUpNext;

    const render =
      currentlyRenderedProps === undefined ||
      highlighted !== currentlyRenderedProps.highlighted;

    if (!render) {
      return;
    }

    const filter =
      highlighted ?
        new OutlineFilter(
          carryableOutlineColour,
          renderOptions.upscale.scaleFactor,
        )
      : undefined;

    return {
      container: createSprite({
        texture: style,
        filter,
      }),
      renderProps: { highlighted },
    };
  },

  spring({
    item: {
      state: { stoodOnBy, wouldPickUpNext },
    },
    currentlyRenderedProps,
    renderOptions,
  }) {
    const compressed = stoodOnBy.size > 0;
    const highlighted = wouldPickUpNext;

    const render =
      currentlyRenderedProps === undefined ||
      highlighted !== currentlyRenderedProps.highlighted ||
      compressed !== currentlyRenderedProps.compressed;

    if (!render) {
      return;
    }

    const currentlyRenderedCompressed =
      currentlyRenderedProps?.compressed ?? false;

    const filter =
      highlighted ?
        new OutlineFilter(
          carryableOutlineColour,
          renderOptions.upscale.scaleFactor,
        )
      : undefined;

    return {
      container:
        !compressed && currentlyRenderedCompressed ?
          createSprite({
            frames: spriteSheet.animations["spring.bounce"],
            playOnce: "and-stop",
            filter,
          })
        : createSprite({
            texture: compressed ? "spring.compressed" : "spring.released",
            filter,
          }),

      renderProps: { compressed, highlighted },
    };
  },

  book: renderOnce(
    ({
      item: {
        config: { slider },
      },
    }) => createSprite(`book.${slider ? "y" : "x"}`),
  ),

  hushPuppy: staticSpriteAppearance("hushPuppy"),

  bubbles: renderOnce(
    ({
      item: {
        config: { style },
      },
    }) => {
      return createSprite({
        frames: spriteSheet.animations[`bubbles.${style}`],
      });
    },
  ),
  firedDonut: staticSpriteAppearance({
    frames: spriteSheet.animations["bubbles.donut"],
  }),

  ball: staticSpriteAppearance("ball"),

  floor: floorAppearance,
};
