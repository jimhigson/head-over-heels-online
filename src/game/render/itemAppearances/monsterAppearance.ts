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
import type { ItemRenderProps } from "./ItemRenderProps";

export const monsterAppearance: ItemAppearance<"monster"> = ({
  subject: { config, state },
  currentlyRenderedProps,
  renderContext: { room },
}) => {
  const { activated, busyLickingDoughnutsOffFace } = state;

  const filter =
    busyLickingDoughnutsOffFace ? doughnuttedFilter
    : !activated ? greyFilter(room!)
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
      const renderProps: ItemRenderProps<"monster"> = {
        facingXy4,
        activated,
        busyLickingDoughnutsOffFace,
      };

      // rendering is directional (xy4)
      switch (config.which) {
        case "skiHead":
          // directional, style, no anim
          return {
            container: createSprite({
              textureId: `${config.which}.${config.style}.${facingXy4}`,
              filter,
            }),
            renderProps,
          };
        case "elephantHead":
          // directional, no style, no anim
          return {
            container: createSprite({
              textureId: `elephant.${facingXy4}`,
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
                  animationId: `${config.which}.${facingXy4}`,
                  filter,
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
            container:
              state.activated || state.busyLickingDoughnutsOffFace ?
                createStackedSprites({
                  top: {
                    textureId: `${config.which}.${facingXy4}`,
                    filter: filter || mainPaletteSwapFilter(room),
                  },
                  bottom: itemRidingOnBubblesSpritesOptions,
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
            container: createStackedSprites({
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

      const renderProps: ItemRenderProps<"monster"> = {
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
            container: createSprite(
              animate ?
                {
                  animationId: config.which,
                  filter,
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
            container: createSprite({ textureId: config.which, filter }),
            renderProps,
          };

        case "bubbleRobot":
          //not directional, animated, stacked (base):
          return {
            container: createStackedSprites({
              top: itemRidingOnBubblesSpritesOptions,
              filter,
            }),
            renderProps,
          };

        case "emperorsGuardian":
          //not directional, stacked (bubbles):
          return {
            container: createStackedSprites({
              top: `ball`,
              bottom: itemRidingOnBubblesSpritesOptions,
              filter,
            }),
            renderProps,
          };

        case "emperor":
          return {
            container: createSprite({
              animationId: "bubbles.cold",
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

    default:
      config satisfies never;
      throw new Error(`unexpected monster ${config}`);
  }
};
