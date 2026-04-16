import type { Container, Sprite } from "pixi.js";

import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { AppSpritesheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import type {
  AnimationId,
  TextureId,
} from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type { AnimatedCreateSpriteOptions } from "../createSprite";
import type { StackedSpritesContainer } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import { originalSpriteSheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { hashStringToNumber0to1 } from "../../../utils/maths/hashStringToNumber0to1";
import {
  originXy,
  vectorClosestDirectionXy4,
  xyEqual,
} from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { createStackedSprites, stackedTopSymbol } from "./createStackedSprites";

/** resolve the dalek animation id, using the dark variant if available for this room's scenery */
const dalekAnimationId = (
  room: RoomState<string, string>,
  spritesheet: AppSpritesheet,
): AnimationId => {
  if (room.color.shade !== "dimmed") {
    return "dalek";
  }

  const { data } = spritesheet;

  if (
    isAnimationId("dalek.dark", data) &&
    // use the floor texture existing to decide if the room has a dark variant - only use the
    // dark version of the monster in this case:
    isTextureId(`${room.planet}.dark.floor`, data)
  ) {
    return "dalek.dark";
  }

  return "dalek";
};

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
): Container => {
  const isStacked =
    which === "cyberman" ||
    which === "bubbleRobot" ||
    which === "computerBot" ||
    which === "emperorsGuardian";

  const isBobbingMonster = isStacked || which === "helicopterBug";

  if (isBobbingMonster && state.activated) {
    const nervousStyle = which === "computerBot" || which === "helicopterBug";
    const bobPeriod = nervousStyle ? bobPeriodNervous : bobPeriodSlow;

    const bobAmplitude =
      nervousStyle ? bobAmplitudeNervous : bobAmplitudeRelaxed;

    if (isStacked) {
      const outputTyped = currentOutput as StackedSpritesContainer<Sprite>;
      outputTyped[stackedTopSymbol].y =
        -blockSizePx.z +
        floatingVerticalBob(room.roomTime, bobPeriod, bobAmplitude, id);
    } else {
      currentOutput.y = floatingVerticalBob(
        room.roomTime,
        bobPeriod,
        bobAmplitude,
        id,
      );
    }
  }

  return currentOutput;
};

export const monsterAppearance: ItemAppearance<
  "monster",
  MonsterRenderProps
> = ({
  renderContext: {
    item,
    room,
    general: { paused, spriteOption },
  },
  currentRendering,
}) => {
  const { config, state, id } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  const { activated, busyLickingDoughnutsOffFace } = state;

  const spritesheetVariant: SpritesheetVariant =
    spriteOption.uncolourised ? "uncolourised"
    : busyLickingDoughnutsOffFace ? "doughnutted"
    : !activated ? "deactivated"
    : "for-current-room";
  const spritesheet = getSpriteSheetVariant(spritesheetVariant);

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
        case "skiHead": {
          // directional, style, no anim — fall back to first style if this one is missing
          const preferredId = `${config.which}.${config.style}.${facingXy4}`;
          const spritesheetData = originalSpriteSheet().data;
          return {
            output: createSprite({
              textureId:
                isTextureId(preferredId, spritesheetData) ? preferredId : (
                  (`${config.which}.greenAndPink.${facingXy4}` as TextureId)
                ),
              spritesheet,
            }),
            renderProps,
          };
        }
        case "elephantHead":
          // directional, no style, no anim
          return {
            output: createSprite({
              textureId: `elephant.${facingXy4}`,
              spritesheet,
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
                  spritesheet,
                  paused,
                  randomiseStartFrame: id,
                })
              : createSprite({
                  textureId: `${config.which}.${facingXy4}.1`,
                  spritesheet,
                }),
            renderProps,
          };
        }
        case "cyberman":
          // directional, animated, stacked
          return {
            output:
              state.activated || state.busyLickingDoughnutsOffFace ?
                maybeAddBob(
                  item,
                  room,
                  createStackedSprites({
                    top: {
                      textureId: `${config.which}.${facingXy4}`,
                      spritesheet,
                    },
                    bottom: {
                      animationId: "bubbles.jetpack",
                      paused,
                      spritesheet,
                    },
                  }),
                )
                // charging on a toaster
              : createSprite({
                  textureId: `${config.which}.${facingXy4}`,
                  spritesheet,
                }),
            renderProps,
          };

        case "computerBot":
        case "elephant":
        case "monkey":
          // directional, not animated, stacked (base)
          return {
            output: maybeAddBob(
              item,
              room,
              createStackedSprites({
                top: {
                  textureId: `${config.which}.${facingXy4}`,
                  spritesheet,
                },
                bottom: {
                  animationId: `headlessBase.flash`,
                  // by playing once, the enemy's base flashes only when it has
                  // just changed direction etc
                  playOnce: "and-stop",
                  spritesheet,
                },
              }),
            ),
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
        spritesheet,
        output: createSprite(
          activated && !busyLickingDoughnutsOffFace ?
            {
              animationId: walking ? "headlessBase.flash" : "headlessBase.scan",
              spritesheet,
            }
          : {
              textureId: `headlessBase`,
              spritesheet,
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
            output: maybeAddBob(
              item,
              room,
              createSprite(
                animate ?
                  ({
                    animationId:
                      config.which === "dalek" ?
                        dalekAnimationId(room, spritesheet)
                      : "helicopterBug",
                    spritesheet,
                    paused,
                    randomiseStartFrame: id,
                  } satisfies AnimatedCreateSpriteOptions)
                : { textureId: `${config.which}.1`, spritesheet },
              ),
            ),
            renderProps,
          };
        }

        case "bubbleRobot":
          //not directional, animated, stacked (base):
          return {
            output: maybeAddBob(
              item,
              room,
              createStackedSprites({
                top:
                  activated && !busyLickingDoughnutsOffFace ?
                    {
                      animationId: "bubbles.blueGreen",
                      randomiseStartFrame: id,
                      paused,
                      spritesheet,
                    }
                  : { textureId: "bubbles.blueGreen.1", spritesheet },
                bottom: {
                  textureId: "headlessBase",
                  spritesheet,
                },
              }),
            ),
            renderProps,
          };

        case "emperorsGuardian":
          //not directional, stacked (bubbles):
          return {
            output: maybeAddBob(
              item,
              room,
              createStackedSprites({
                top:
                  activated && !busyLickingDoughnutsOffFace ?
                    { animationId: `emperorsGuardian`, spritesheet }
                  : { textureId: `emperorsGuardian.1`, spritesheet },
                bottom:
                  activated && !busyLickingDoughnutsOffFace ?
                    { animationId: "bubbles.cold", spritesheet, paused }
                  : { textureId: "bubbles.cold.1", spritesheet },
              }),
            ),
            renderProps,
          };

        case "emperor":
          return {
            output: createSprite(
              activated && !busyLickingDoughnutsOffFace ?
                { animationId: "bubbles.cold", spritesheet, paused }
              : { textureId: "bubbles.cold.1", spritesheet },
            ),
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
