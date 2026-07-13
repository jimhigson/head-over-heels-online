import { type Container, type Sprite } from "pixi.js";

import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import {
  type AnimationId,
  type TextureId,
} from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import { renderBobSine } from "../../../utils/maths/renderBob";
import { resolveCameraRelativeVectorXy4 } from "../../../utils/vectors/resolveCameraRelativeVector";
import {
  type DirectionXy4,
  originXy,
  xyEqual,
} from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import {
  type AnimatedCreateSpriteOptions,
  createSprite,
} from "../createSprite";
import {
  createStackedSprites,
  type StackedSpritesContainer,
  stackedTopSymbol,
} from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

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
  resolvedFacingXy4?: DirectionXy4;
  activated: boolean;
  busyLickingDoughnutsOffFace: boolean;
};

const bobPeriodNervous = 50;
const bobPeriodSlow = 200;
const bobAmplitudeNervous = 0.25;
const bobAmplitudeRelaxed = 1;

const maybeAddBob = (
  { hash, config: { which }, state }: ItemInPlay<"monster">,
  room: RoomState<string, string>,
  currentOutput: Container,
  uncolourised: boolean,
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

    const bobY = renderBobSine(
      room.roomTime,
      bobPeriod,
      bobAmplitude,
      hash,
      uncolourised,
    );
    if (isStacked) {
      const outputTyped = currentOutput as StackedSpritesContainer<Sprite>;
      outputTyped[stackedTopSymbol].y = -blockSizePx.z + bobY;
    } else {
      currentOutput.y = bobY;
    }
  }

  return currentOutput;
};

export const monsterAppearance: ItemAppearance<
  "monster",
  MonsterRenderProps
> = ({
  renderContext: {
    isReflection,
    item,
    room,
    general: {
      paused,
      spritesheetVariants,
      spriteOption: { uncolourised },
      cameraAngle,
    },
  },
  currentRendering,
}) => {
  const { config, state, hash } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  const { activated, busyLickingDoughnutsOffFace } = state;

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    !activated,
    busyLickingDoughnutsOffFace,
    isReflection,
  );

  switch (config.which) {
    case "skiHead":
    case "turtle":
    case "cyberman":
    case "computerBot":
    case "elephant":
    case "elephantHead":
    case "monkey": {
      // rendering is directional (xy4)

      // resolve the facing against the continuous camera angle so the
      // directional sprite matches how the monster appears once the camera
      // has turned - stepping through intermediate facings mid-turn.
      // Rounding happens only here, at the final sprite-name pick:
      const resolvedFacingXy4 = resolveCameraRelativeVectorXy4(
        state.facing,
        cameraAngle,
        isReflection,
      );

      const render =
        currentlyRenderedProps === undefined ||
        activated !== currentlyRenderedProps.activated ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        resolvedFacingXy4 !== currentlyRenderedProps.resolvedFacingXy4;

      if (!render) {
        maybeAddBob(item, room, currentRendering!.output!, uncolourised);

        return "no-update";
      }
      const renderProps: MonsterRenderProps = {
        resolvedFacingXy4,
        activated,
        busyLickingDoughnutsOffFace,
      };

      switch (config.which) {
        case "skiHead": {
          // directional, style, no anim — fall back to first style if this one is missing
          const preferredId = `${config.which}.${config.style}.${resolvedFacingXy4}`;
          const spritesheetData = spritesheetVariants.originalSpritesheet.data;
          return {
            output: createSprite({
              textureId:
                isTextureId(preferredId, spritesheetData) ? preferredId : (
                  (`${config.which}.greenAndPink.${resolvedFacingXy4}` as TextureId)
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
              textureId: `elephant.${resolvedFacingXy4}`,
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
                  animationId: `${config.which}.${resolvedFacingXy4}`,
                  spritesheet,
                  paused,
                  startFramePhase: hash,
                })
              : createSprite({
                  textureId: `${config.which}.${resolvedFacingXy4}.1`,
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
                      textureId: `${config.which}.${resolvedFacingXy4}`,
                      spritesheet,
                    },
                    bottom: {
                      animationId: "bubbles.jetpack",
                      paused,
                      spritesheet,
                    },
                  }),
                  uncolourised,
                )
                // charging on a toaster
              : createSprite({
                  textureId: `${config.which}.${resolvedFacingXy4}`,
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
                  textureId: `${config.which}.${resolvedFacingXy4}`,
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
              uncolourised,
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
        maybeAddBob(item, room, currentRendering!.output!, uncolourised);

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
                    startFramePhase: hash,
                  } satisfies AnimatedCreateSpriteOptions)
                : { textureId: `${config.which}.1`, spritesheet },
              ),
              uncolourised,
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
                      startFramePhase: hash,
                      paused,
                      spritesheet,
                    }
                  : { textureId: "bubbles.blueGreen.1", spritesheet },
                bottom: {
                  textureId: "headlessBase",
                  spritesheet,
                },
              }),
              uncolourised,
            ),
            renderProps,
            uncolourised,
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
              uncolourised,
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
