import type { ItemConfigMap } from "../../../model/json/ItemConfigMap";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import { vectorClosestDirectionXy4 } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import {
  doughnuttedFilter,
  greyFilter,
  mainPaletteSwapFilter,
} from "../filters/standardFilters";
import {
  createStackedSprites,
  itemRidingOnBubblesSpritesOptions,
} from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

const greyWhileDeactivated: Array<
  ItemConfigMap<string, string>["monster"]["which"]
> = ["cyberman", "dalek", "skiHead", "bubbleRobot", "computerBot", "turtle"];

type MonsterRenderProps = {
  facingXy4?: DirectionXy4;
  activated: boolean;
  busyLickingDoughnutsOffFace: boolean;
};

export const monsterAppearance: ItemAppearance<
  "monster",
  MonsterRenderProps
> = ({
  renderContext: {
    item: { config, state },
    room,
    general: { paused },
  },
  currentRendering,
}) => {
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
      const facingXy4 = vectorClosestDirectionXy4(state.facing) ?? "towards";

      const render =
        currentlyRenderedProps === undefined ||
        activated !== currentlyRenderedProps.activated ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        facingXy4 !== currentlyRenderedProps.facingXy4;

      if (!render) {
        return "no-update";
      }
      const renderProps: MonsterRenderProps = {
        facingXy4,
        activated,
        busyLickingDoughnutsOffFace,
      };

      // rendering is directional (xy4)
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

    case "helicopterBug":
    case "emperor":
    case "dalek":
    case "homingBot":
    case "bubbleRobot":
    case "emperorsGuardian": {
      // not directional
      const render =
        currentlyRenderedProps === undefined ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        activated !== currentlyRenderedProps.activated;

      if (!render) {
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
        case "homingBot":
          // not directional, not animated
          return {
            filter,
            output: createSprite({ textureId: config.which, filter }),
            renderProps,
          };

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
