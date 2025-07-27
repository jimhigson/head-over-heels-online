import type { Container, Sprite } from "pixi.js";
import type { ItemConfigMap } from "../../../model/json/ItemConfigMap";
import { blockSizePx } from "../../../sprites/spritePivots";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import {
  originXy,
  vectorClosestDirectionXy4,
  xyEqual,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import {
  doughnuttedFilter,
  greyFilter,
  mainPaletteSwapFilter,
} from "../filters/standardFilters";
import type { StackedSpritesContainer } from "./createStackedSprites";
import {
  createStackedSprites,
  itemRidingOnBubblesSpritesOptions,
  stackedTopSymbol,
} from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";

const greyWhileDeactivated: Array<
  ItemConfigMap<string, string>["monster"]["which"]
> = [
  "cyberman",
  "dalek",
  "skiHead",
  "bubbleRobot",
  "computerBot",
  "turtle",
  "homingBot",
];

type MonsterRenderProps = {
  walking?: boolean;
  facingXy4?: DirectionXy4;
  activated: boolean;
  busyLickingDoughnutsOffFace: boolean;
};

const bobTimeOffset = (str: string): number => {
  let h = 0x811c9dc5; // seed
  const len = str.length;
  for (let i = Math.max(0, len - 9); i < len; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x5bd1e995);
    h ^= h >>> 15;
  }
  return (h >>> 0) / 0xffffffff;
};

const bobPeriod = 200;
const bobAmplitude = 1;
const floatingVerticalBob = (roomTime: number, itemId: string) => {
  const itemsNameHash = bobTimeOffset(itemId);
  return (
    Math.sin((roomTime + itemsNameHash * 20_000) / bobPeriod) * bobAmplitude
  );
};

const maybeAddBob = (
  { id, config: { which }, state }: ItemInPlay<"monster">,
  room: RoomState<string, string>,
  currentOutput: Container,
) => {
  if (
    ((which === "cyberman" || which === "bubbleRobot") && state.activated) ||
    which === "emperorsGuardian"
  ) {
    const outputTyped = currentOutput as StackedSpritesContainer<Sprite>;
    outputTyped[stackedTopSymbol].y =
      -blockSizePx.h + floatingVerticalBob(room.roomTime, id);
  }
};

export const monsterAppearance: ItemAppearance<
  "monster",
  MonsterRenderProps
> = ({
  renderContext: {
    item,
    room,
    general: { paused },
  },
  currentRendering,
}) => {
  const { config, state } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  const { activated, busyLickingDoughnutsOffFace } = state;

  const filter =
    busyLickingDoughnutsOffFace ? doughnuttedFilter
    : !activated ?
      greyWhileDeactivated.includes(config.which) ?
        greyFilter(room!)
      : undefined
    : undefined;

  switch (config.which) {
    case "skiHead":
    case "turtle":
    case "cyberman":
    case "computerBot":
    case "elephant":
    case "elephantHead":
    case "monkey": {
      // rendering is directional (xy4)

      const facingXy4 = vectorClosestDirectionXy4(state.facing) ?? "towards";

      const render =
        currentlyRenderedProps === undefined ||
        activated !== currentlyRenderedProps.activated ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        facingXy4 !== currentlyRenderedProps.facingXy4;

      if (!render) {
        maybeAddBob(item, room, currentRendering!.output!);

        return "no-update";
      }
      const renderProps: MonsterRenderProps = {
        facingXy4,
        activated,
        busyLickingDoughnutsOffFace,
      };

      switch (config.which) {
        case "skiHead":
          // directional, style, no anim
          return {
            output: createSprite({
              textureId: `${config.which}.${config.style}.${facingXy4}`,
              filter,
            }),
            renderProps,
          };
        case "elephantHead":
          // directional, no style, no anim
          return {
            output: createSprite({
              textureId: `elephant.${facingXy4}`,
              filter,
            }),
            renderProps,
          };
        case "turtle": {
          // directional, anim:
          const animate = activated && !busyLickingDoughnutsOffFace;
          return {
            output:
              animate ?
                createSprite({
                  animationId: `${config.which}.${facingXy4}`,
                  filter,
                  paused,
                })
              : createSprite({
                  textureId: `${config.which}.${facingXy4}.1`,
                  filter,
                }),
            renderProps,
          };
        }
        case "cyberman":
          // directional, animated, stacked (bubbles):
          return {
            output:
              state.activated || state.busyLickingDoughnutsOffFace ?
                createStackedSprites({
                  top: {
                    textureId: `${config.which}.${facingXy4}`,
                    filter: filter || mainPaletteSwapFilter(room),
                  },
                  bottom: { ...itemRidingOnBubblesSpritesOptions, paused },
                })
                // charging on a toaster
              : createSprite({
                  textureId: `${config.which}.${facingXy4}`,
                  filter,
                }),
            renderProps,
          };
        case "computerBot":
        case "elephant":
        case "monkey":
          // directional, not animated, stacked (base)
          return {
            output: createStackedSprites({
              top: `${config.which}.${facingXy4}`,
              bottom: {
                animationId: `headlessBase.flash`,
                // by playing once, the enemy's base flashes only when it has
                // just changed direction etc
                playOnce: "and-stop",
              },
              filter,
            }),
            renderProps,
          };
        default:
          config satisfies never;
          throw new Error(`unexpected monster ${config}`);
      }
      break;
    }

    case "homingBot": {
      // not directional, not animated, but different if 'walking' towards the player
      const walking = !xyEqual(state.vels.walking, originXy);

      const render =
        currentlyRenderedProps === undefined ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        activated !== currentlyRenderedProps.activated ||
        walking !== currentlyRenderedProps.walking;

      if (!render) {
        return "no-update";
      }

      return {
        filter,
        output: createSprite(
          activated && !busyLickingDoughnutsOffFace ?
            {
              animationId: walking ? "headlessBase.flash" : "headlessBase.scan",
              filter,
            }
          : {
              textureId: `headlessBase`,
              filter,
            },
        ),
        renderProps: {
          activated,
          busyLickingDoughnutsOffFace,
          walking,
        },
      };
    }

    case "helicopterBug":
    case "emperor":
    case "dalek":
    case "bubbleRobot":
    case "emperorsGuardian": {
      // not directional
      const render =
        currentlyRenderedProps === undefined ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        activated !== currentlyRenderedProps.activated;

      if (!render) {
        maybeAddBob(item, room, currentRendering!.output!);

        return "no-update";
      }

      const renderProps: MonsterRenderProps = {
        activated,
        busyLickingDoughnutsOffFace,
      };

      // rendering is uni-directional
      switch (config.which) {
        case "helicopterBug":
        case "dalek": {
          const animate = activated && !busyLickingDoughnutsOffFace;
          // not directional, animated
          return {
            output: createSprite(
              animate ?
                {
                  animationId: config.which,
                  filter,
                  paused,
                }
              : { textureId: `${config.which}.1`, filter },
            ),
            renderProps,
          };
        }

        case "bubbleRobot":
          //not directional, animated, stacked (base):
          return {
            output: createStackedSprites({
              top: { ...itemRidingOnBubblesSpritesOptions, paused },
              filter,
            }),
            renderProps,
          };

        case "emperorsGuardian":
          //not directional, stacked (bubbles):
          return {
            output: createStackedSprites({
              top: `ball`,
              bottom: { ...itemRidingOnBubblesSpritesOptions, paused },
              filter,
            }),
            renderProps,
          };

        case "emperor":
          return {
            output: createSprite({
              animationId: "bubbles.cold",
              filter,
              paused,
            }),
            renderProps,
          };
        default:
          config satisfies never;
          throw new Error(`unexpected monster ${config}`);
      }
      break;
    }

    default:
      config satisfies never;
      throw new Error(`unexpected monster ${config}`);
  }
};
