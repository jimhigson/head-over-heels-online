import type { Container, Sprite } from "pixi.js";

import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { ItemConfigMap } from "../../../model/json/ItemConfigMap";
import type { RoomState } from "../../../model/RoomState";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type { StackedSpritesContainer } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

import { hashStringToNumber0to1 } from "../../../utils/maths/hashStringToNumber0to1";
import {
  originXy,
  vectorClosestDirectionXy4,
  xyEqual,
} from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { createStackedSprites, stackedTopSymbol } from "./createStackedSprites";

type MonsterWhich = ItemConfigMap<string, string>["monster"]["which"];

const greyWhileDeactivated: Array<MonsterWhich> = [
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

const floatingVerticalBob = (
  roomTime: number,
  bobPeriod: number,
  bobAmplitude: number,
  itemId: string,
) => {
  const itemsNameHash = hashStringToNumber0to1(itemId);
  return (
    Math.sin((roomTime + itemsNameHash * 20_000) / bobPeriod) * bobAmplitude
  );
};

const bobPeriodNervous = 50;
const bobPeriodSlow = 200;
const bobAmplitudeNervous = 0.25;
const bobAmplitudeRelaxed = 1;

const maybeAddBob = (
  { id, config: { which }, state }: ItemInPlay<"monster">,
  room: RoomState<string, string>,
  currentOutput: Container,
) => {
  if (
    ((which === "cyberman" ||
      which === "bubbleRobot" ||
      which === "computerBot") &&
      state.activated) ||
    which === "emperorsGuardian"
  ) {
    const bobPeriod =
      which === "computerBot" ? bobPeriodNervous : bobPeriodSlow;

    const bobAmplitude =
      which === "computerBot" ? bobAmplitudeNervous : bobAmplitudeRelaxed;

    const outputTyped = currentOutput as StackedSpritesContainer<Sprite>;
    outputTyped[stackedTopSymbol].y =
      -blockSizePx.z +
      floatingVerticalBob(room.roomTime, bobPeriod, bobAmplitude, id);
  }
};

export const monsterAppearance: ItemAppearance<
  "monster",
  MonsterRenderProps
> = ({
  renderContext: {
    item,
    room,
    general: { paused, colourised },
  },
  currentRendering,
}) => {
  const { config, state, id } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  const { activated, busyLickingDoughnutsOffFace } = state;

  const spritesheetVariant: SpritesheetVariant =
    !colourised ? "uncolourised"
    : busyLickingDoughnutsOffFace ? "doughnutted"
    : !activated && greyWhileDeactivated.includes(config.which) ? "deactivated"
    : "for-current-room";

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
              spritesheetVariant,
            }),
            renderProps,
          };
        case "elephantHead":
          // directional, no style, no anim
          return {
            output: createSprite({
              textureId: `elephant.${facingXy4}`,
              spritesheetVariant,
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
                  spritesheetVariant,
                  paused,
                  randomiseStartFrame: id,
                })
              : createSprite({
                  textureId: `${config.which}.${facingXy4}.1`,
                  spritesheetVariant,
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
                    spritesheetVariant,
                  },
                  bottom: {
                    animationId: "bubbles.jetpack",
                    paused,
                    spritesheetVariant,
                  },
                })
                // charging on a toaster
              : createSprite({
                  textureId: `${config.which}.${facingXy4}`,
                  spritesheetVariant,
                }),
            renderProps,
          };
        case "computerBot":
        case "elephant":
        case "monkey":
          // directional, not animated, stacked (base)
          return {
            output: createStackedSprites({
              top: {
                textureId: `${config.which}.${facingXy4}`,
                spritesheetVariant,
              },
              bottom: {
                animationId: `headlessBase.flash`,
                // by playing once, the enemy's base flashes only when it has
                // just changed direction etc
                playOnce: "and-stop",
                spritesheetVariant,
              },
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
        spritesheetVariant,
        output: createSprite(
          activated && !busyLickingDoughnutsOffFace ?
            {
              animationId: walking ? "headlessBase.flash" : "headlessBase.scan",
              spritesheetVariant,
            }
          : {
              textureId: `headlessBase`,
              spritesheetVariant,
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
                  spritesheetVariant,
                  paused,
                  randomiseStartFrame: id,
                }
              : { textureId: `${config.which}.1`, spritesheetVariant },
            ),
            renderProps,
          };
        }

        case "bubbleRobot":
          //not directional, animated, stacked (base):
          return {
            output: createStackedSprites({
              top: {
                animationId: "bubbles.cold",
                randomiseStartFrame: id,
                paused,
                spritesheetVariant,
              },
              bottom: {
                textureId: "headlessBase",
                spritesheetVariant,
              },
            }),
            renderProps,
          };

        case "emperorsGuardian":
          //not directional, stacked (bubbles):
          return {
            output: createStackedSprites({
              top: { textureId: `ball`, spritesheetVariant },
              bottom: {
                animationId: "bubbles.cold",
                spritesheetVariant,
                paused,
              },
            }),
            renderProps,
          };

        case "emperor":
          return {
            output: createSprite({
              animationId: "bubbles.cold",
              spritesheetVariant,
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
