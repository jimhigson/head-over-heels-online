import { Container } from "pixi.js";
import type { TextureId } from "../../../sprites/spriteSheetData";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import { wallTextureId } from "../wallTextureId";
import { doorFrameAppearance, doorLegsAppearance } from "./doorAppearance";
import { playableAppearance } from "./playableAppearance";
import type { ItemAppearance } from "./ItemAppearance";
import { itemRenderOnce, itemStaticSpriteAppearance } from "./ItemAppearance";
import { floorAppearance } from "./floorAppearance/floorAppearance";
import { floorEdgeAppearance } from "./floorAppearance/floorEdgeAppearance";
import { mainPaletteSwapFilter } from "../filters/standardFilters";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { OutlineFilter } from "../filters/outlineFilter";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import type { BlockStyle } from "../../../model/json/ItemConfigMap";
import {
  wallTileSize,
  smallItemTextureSize,
} from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  directionAxis,
  perpendicularAxisXy,
  vectorClosestDirectionXy4,
} from "../../../utils/vectors/vectors";
import { isPlayableItem } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";
import { store } from "../../../store/store";
import { getAtPath } from "../../../utils/getAtPath";
import { projectBlockXyzToScreenXy } from "../projectToScreen";
import { monsterAppearance } from "./monsterAppearance";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { stoodOnByCount } from "../../../model/StoodOnBy";

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  disappear: boolean,
): TextureId => {
  if (style === "tower") {
    return "tower";
  }
  if (style === "book") {
    return `book.x`;
  }
  if (style === "organic" && isDark) {
    return `block.organic.dark${disappear ? ".disappearing" : ""}`;
  }
  return `block.${style}${disappear ? ".disappearing" : ""}`;
};

const carryableOutlineColour = spritesheetPalette.moss;

const singleRenderWithStyleAsTexture = <
  RoomId extends string,
  RoomItemId extends string,
>() =>
  itemRenderOnce<
    "deadlyBlock" | "slidingDeadly" | "slidingBlock",
    RoomId,
    RoomItemId
  >(
    ({
      renderContext: {
        item: {
          config: { style },
        },
      },
    }) => createSprite(style === "book" ? "book.y" : style),
  );

export const itemAppearances: {
  [T in ItemInPlayType]: ItemAppearance<T>;
} = {
  // casts allow these appearances to use Container specialisations as their output without
  // clashing with the `itemAppearances` types
  head: playableAppearance as ItemAppearance<"head">,
  heels: playableAppearance as ItemAppearance<"heels">,
  headOverHeels: playableAppearance as ItemAppearance<"headOverHeels">,
  doorFrame: doorFrameAppearance,
  doorLegs: doorLegsAppearance,
  monster: monsterAppearance,

  stopAutowalk() {
    throw new Error("these should always be non-rendering");
  },
  portal() {
    throw new Error("these should always be non-rendering");
  },

  wall: itemRenderOnce(
    ({
      renderContext: {
        item: {
          id,
          config: { direction, tiles },
        },
        room,
      },
    }) => {
      if (direction === "right" || direction === "towards") {
        throw new Error(`this wall should be non-rendering ${id}`);
      }

      const alongAxis = perpendicularAxisXy(directionAxis(direction));

      const container = new Container({ label: "wallTiles" });
      for (let i = 0; i < tiles.length; i++) {
        const tileSprite = createSprite({
          textureId: wallTextureId(
            room.planet,
            tiles[i],
            direction,
            room.color.shade === "dimmed",
          ),
          // to match the original, the walls need to be rendered 2px lower than we'd expect. Unfortunately, this
          // means they're outside their bounding box, so it sometimes doesn't work with z-index rendering
          y: 1,
          pivot:
            direction === "away" ?
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

        const tileRenderPosition: Xy = projectBlockXyzToScreenXy({
          [alongAxis]: i,
        });

        tileSprite.x += tileRenderPosition.x;
        tileSprite.y += tileRenderPosition.y;

        container.addChild(tileSprite);
      }

      return container;
    },
  ),

  barrier: itemRenderOnce(
    ({
      renderContext: {
        item: {
          config: { axis, times },
        },
      },
    }) => {
      return createSprite({
        textureId: `barrier.${axis}`,
        times,
      });
    },
  ),

  deadlyBlock: itemRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style, times },
        },
        room,
      },
    }) =>
      createSprite({
        textureId: style,
        filter: style === "volcano" ? mainPaletteSwapFilter(room) : undefined,
        times,
      }),
  ),
  slidingDeadly: singleRenderWithStyleAsTexture(),
  slidingBlock: singleRenderWithStyleAsTexture(),

  block({
    renderContext: {
      item: {
        config: { style, times },
        state: { disappear },
      },
      room,
    },
    currentlyRenderedProps,
  }) {
    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.disappear !== disappear;

    if (!render) {
      return "no-update";
    }

    return {
      container: createSprite({
        textureId: blockTextureId(
          room.color.shade === "dimmed",
          style,
          disappear !== null,
        ),
        filter: style === "organic" ? mainPaletteSwapFilter(room) : undefined,
        times,
      }),
      renderProps: { disappear },
    };
  },

  switch({
    renderContext: {
      item: {
        state: { setting: stateSetting },
        config: { store: switchStoreConfig },
      },
    },
    currentlyRenderedProps,
  }) {
    // for store switches, ignore the switch's own state and read from the store:
    const setting =
      switchStoreConfig ?
        getAtPath(store.getState().gameMenus, switchStoreConfig.path) ? "right"
        : "left"
      : stateSetting;

    const render =
      currentlyRenderedProps === undefined ||
      setting !== currentlyRenderedProps.setting;

    if (!render) {
      return "no-update";
    }

    return {
      container: createSprite(`switch.${setting}`),
      renderProps: { setting },
    };
  },

  conveyor({
    renderContext: {
      item: {
        config: { direction, times },
        state: { stoodOnBy },
      },
    },
    currentlyRenderedProps,
  }) {
    const moving = stoodOnByCount(stoodOnBy) > 0;

    const render =
      currentlyRenderedProps === undefined ||
      currentlyRenderedProps.moving !== moving;

    if (!render) {
      return "no-update";
    }

    const rendering = new Container();

    const axis = directionAxis(direction);
    rendering.addChild(
      createSprite(
        moving ?
          {
            animationId: `conveyor.${axis}`,
            reverse: direction === "towards" || direction === "right",
            times,
          }
        : {
            textureId: `conveyor.${axis}.6`,
            times,
          },
      ),
    );

    return {
      container: rendering,
      renderProps: { moving },
    };
  },

  lift: itemRenderOnce(() => {
    const rendering = new Container();

    const pivot = {
      x: smallItemTextureSize.w / 2,
      y: smallItemTextureSize.h,
    };
    rendering.addChild(
      createSprite({
        animationId: "lift",
        pivot,
      }),
    );

    rendering.addChild(createSprite({ textureId: "lift.static", pivot }));

    return rendering;
  }),

  teleporter({
    renderContext: {
      item: {
        state: { stoodOnBy },
      },
      room,
    },
    currentlyRenderedProps,
  }) {
    const flashing =
      iterateStoodOnByItems(stoodOnBy, room).find(isPlayableItem) !== undefined;

    const render =
      currentlyRenderedProps === undefined ||
      flashing !== currentlyRenderedProps.flashing;

    if (!render) {
      return "no-update";
    }

    const renderFlashing = () =>
      new Container({
        children: [
          createSprite("teleporter"),
          createSprite({
            animationId: "teleporter.flashing",
          }),
        ],
      });

    return {
      container: flashing ? renderFlashing() : createSprite("teleporter"),
      renderProps: { flashing },
    };
  },

  pickup: itemRenderOnce(
    ({
      renderContext: {
        item: { config },
        room,
      },
    }) => {
      if (config.gives === "crown") {
        return createSprite({
          textureId: `crown.${config.planet}`,
        });
      }

      const pickupIcons: Record<(typeof config)["gives"], CreateSpriteOptions> =
        {
          shield: "whiteRabbit",
          jumps: "whiteRabbit",
          fast: "whiteRabbit",
          "extra-life": "whiteRabbit",
          bag: "bag",
          doughnuts: "doughnuts",
          hooter: "hooter",
          scroll: { textureId: "scroll", filter: mainPaletteSwapFilter(room!) },
          reincarnation: {
            animationId: "fish",
          },
        };
      const createOptions = pickupIcons[config.gives];

      return createSprite(createOptions);
    },
  ),

  moveableDeadly: itemRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
      },
    }) => createSprite(style === "deadFish" ? "fish.1" : "puck.deadly"),
  ),

  charles({
    renderContext: {
      item: {
        state: { facing },
      },
    },
    currentlyRenderedProps,
  }) {
    const facingXy4 = vectorClosestDirectionXy4(facing) ?? "towards";

    const render =
      currentlyRenderedProps === undefined ||
      facingXy4 !== currentlyRenderedProps.facingXy4;

    if (!render) {
      return "no-update";
    }
    return {
      container: createStackedSprites({ top: `charles.${facingXy4}` }),
      renderProps: { facingXy4 },
    };
  },

  joystick: itemStaticSpriteAppearance("joystick"),

  movableBlock: itemRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
      },
    }) => createSprite(style),
  ),

  portableBlock({
    renderContext: {
      item: {
        config: { style },
        state: { wouldPickUpNext: highlighted },
      },
    },
    currentlyRenderedProps,
  }) {
    const render =
      currentlyRenderedProps === undefined ||
      highlighted !== currentlyRenderedProps.highlighted;

    if (!render) {
      return "no-update";
    }

    const filter =
      highlighted ?
        new OutlineFilter({
          outlineColor: carryableOutlineColour,
          lowRes: false,
          upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
        })
      : undefined;

    return {
      container: createSprite({
        textureId: style,
        filter,
      }),
      renderProps: { highlighted },
    };
  },

  spring({
    renderContext: {
      item: {
        state: { stoodOnBy, wouldPickUpNext: highlighted },
      },
    },
    currentlyRenderedProps,
  }) {
    const compressed = stoodOnByCount(stoodOnBy) > 0;

    const render =
      currentlyRenderedProps === undefined ||
      highlighted !== currentlyRenderedProps.highlighted ||
      compressed !== currentlyRenderedProps.compressed;

    if (!render) {
      return "no-update";
    }

    const currentlyRenderedCompressed =
      currentlyRenderedProps?.compressed ?? false;

    const filter =
      highlighted ?
        new OutlineFilter({
          outlineColor: carryableOutlineColour,
          lowRes: false,
          upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
        })
      : undefined;

    return {
      container:
        !compressed && currentlyRenderedCompressed ?
          createSprite({
            animationId: "spring.bounce",
            playOnce: "and-stop",
            filter,
          })
        : createSprite({
            textureId: compressed ? "spring.compressed" : "spring.released",
            filter,
          }),

      renderProps: { compressed, highlighted },
    };
  },

  sceneryPlayer({
    renderContext: {
      item: {
        config: { which, startDirection },
        state: { wouldPickUpNext: highlighted },
      },
    },
    currentlyRenderedProps,
  }) {
    const render =
      currentlyRenderedProps === undefined ||
      highlighted !== currentlyRenderedProps.highlighted;

    if (!render) {
      return "no-update";
    }

    const filter =
      highlighted ?
        new OutlineFilter({
          outlineColor: carryableOutlineColour,
          upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
          // they might get pushed between pixels so can't skip the res
          lowRes: false,
        })
      : undefined;

    return {
      container:
        which === "headOverHeels" ?
          createStackedSprites({
            top: { textureId: `head.walking.${startDirection}.2`, filter },
            bottom: {
              textureId: `heels.walking.${startDirection}.2`,
              filter,
            },
          })
        : createSprite({
            textureId: `${which}.walking.${startDirection}.2`,
            filter,
          }),
      renderProps: { highlighted },
    };
  },

  hushPuppy: itemStaticSpriteAppearance("hushPuppy"),

  bubbles: itemRenderOnce(
    ({
      renderContext: {
        item: {
          config: { style },
        },
      },
    }) => {
      return createSprite({
        animationId: `bubbles.${style}`,
      });
    },
  ),
  firedDoughnut: itemStaticSpriteAppearance({
    animationId: "bubbles.doughnut",
  }),

  ball: itemStaticSpriteAppearance("ball"),

  floor: floorAppearance,
  floorEdge: floorEdgeAppearance,
};
