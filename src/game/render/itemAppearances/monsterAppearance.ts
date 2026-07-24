import { type Container, type Sprite } from "pixi.js";

import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { isAnimationId, isTextureId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../sprites/spritesheet/AppSpritesheet";
import { type BaseAnimationId } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type DoughnuttableId } from "../../../sprites/spritesheet/spritesheetData/variantSpritesheetData";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { renderBobSine } from "../../../utils/maths/renderBob";
import { resolveCameraRelativeIndexXy4 } from "../../../utils/vectors/resolveCameraRelativeVector";
import {
  type DirectionIndexXy4,
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
): BaseAnimationId & DoughnuttableId => {
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
  resolvedFacingIndexXy4?: DirectionIndexXy4;
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
      spritesheets,
      spriteOption: { uncolourised },
      cameraAngle,
    },
  },
  currentRendering,
}) => {
  const { config, state, hash } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  const { activated, busyLickingDoughnutsOffFace } = state;

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  // every sampled id takes the suffix for the monster's current variant state,
  // so each draw passes (isReflection, busyLickingDoughnutsOffFace, !activated)

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
      const resolvedFacingIndexXy4 = resolveCameraRelativeIndexXy4(
        state.facing,
        cameraAngle,
        isReflection,
      );

      const render =
        currentlyRenderedProps === undefined ||
        activated !== currentlyRenderedProps.activated ||
        busyLickingDoughnutsOffFace !==
          currentlyRenderedProps.busyLickingDoughnutsOffFace ||
        resolvedFacingIndexXy4 !==
          currentlyRenderedProps.resolvedFacingIndexXy4;

      if (!render) {
        maybeAddBob(item, room, currentRendering!.output!, uncolourised);

        return "no-update";
      }
      const renderProps: MonsterRenderProps = {
        resolvedFacingIndexXy4,
        activated,
        busyLickingDoughnutsOffFace,
      };

      switch (config.which) {
        case "skiHead": {
          // directional, style, no anim — fall back to first style if this one is missing
          const preferredId =
            `${config.which}.${config.style}.d${resolvedFacingIndexXy4}` as const;
          const spritesheetData = spritesheets.originalSpritesheet.data;
          return {
            output: createSprite({
              textureId: variantTextureId(
                isTextureId(preferredId, spritesheetData) ? preferredId : (
                  `${config.which}.greenAndPink.d${resolvedFacingIndexXy4}`
                ),
                isReflection,
                busyLickingDoughnutsOffFace,
                !activated,
                false,
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
              textureId: variantTextureId(
                `elephant.d${resolvedFacingIndexXy4}`,
                isReflection,
                busyLickingDoughnutsOffFace,
                !activated,
                false,
              ),
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
                  animationId: variantTextureId(
                    `${config.which}.d${resolvedFacingIndexXy4}`,
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
                  spritesheet,
                  paused,
                  startFramePhase: hash,
                })
              : createSprite({
                  textureId: variantTextureId(
                    `${config.which}.d${resolvedFacingIndexXy4}.1`,
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
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
                      textureId: variantTextureId(
                        `${config.which}.d${resolvedFacingIndexXy4}`,
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      spritesheet,
                    },
                    bottom: {
                      animationId: variantTextureId(
                        "bubbles.jetpack",
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      paused,
                      spritesheet,
                    },
                  }),
                  uncolourised,
                )
                // charging on a toaster
              : createSprite({
                  textureId: variantTextureId(
                    `${config.which}.d${resolvedFacingIndexXy4}`,
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
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
                  textureId: variantTextureId(
                    `${config.which}.d${resolvedFacingIndexXy4}`,
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
                  spritesheet,
                },
                bottom: {
                  animationId: variantTextureId(
                    `headlessBase.flash`,
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
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
              animationId: variantTextureId(
                walking ? "headlessBase.flash" : "headlessBase.scan",
                isReflection,
                busyLickingDoughnutsOffFace,
                !activated,
                false,
              ),
              spritesheet,
            }
          : {
              textureId: variantTextureId(
                `headlessBase`,
                isReflection,
                busyLickingDoughnutsOffFace,
                !activated,
                false,
              ),
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
                    animationId: variantTextureId(
                      config.which === "dalek" ?
                        dalekAnimationId(room, spritesheet)
                      : "helicopterBug",
                      isReflection,
                      busyLickingDoughnutsOffFace,
                      !activated,
                      false,
                    ),
                    spritesheet,
                    paused,
                    startFramePhase: hash,
                  } satisfies AnimatedCreateSpriteOptions)
                : {
                    textureId: variantTextureId(
                      `${config.which}.1`,
                      isReflection,
                      busyLickingDoughnutsOffFace,
                      !activated,
                      false,
                    ),
                    spritesheet,
                  },
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
                      animationId: variantTextureId(
                        "bubbles.blueGreen",
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      startFramePhase: hash,
                      paused,
                      spritesheet,
                    }
                  : {
                      textureId: variantTextureId(
                        "bubbles.blueGreen.1",
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      spritesheet,
                    },
                bottom: {
                  textureId: variantTextureId(
                    "headlessBase",
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
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
                    {
                      // the guardian is doughnut-immune, so it never takes
                      // the doughnutted recolour:
                      animationId: variantTextureId(
                        `emperorsGuardian`,
                        isReflection,
                        false,
                        !activated,
                        false,
                      ),
                      spritesheet,
                    }
                  : {
                      textureId: variantTextureId(
                        `emperorsGuardian.1`,
                        isReflection,
                        false,
                        !activated,
                        false,
                      ),
                      spritesheet,
                    },
                bottom:
                  activated && !busyLickingDoughnutsOffFace ?
                    {
                      animationId: variantTextureId(
                        "bubbles.cold",
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      spritesheet,
                      paused,
                    }
                  : {
                      textureId: variantTextureId(
                        "bubbles.cold.1",
                        isReflection,
                        busyLickingDoughnutsOffFace,
                        !activated,
                        false,
                      ),
                      spritesheet,
                    },
              }),
              uncolourised,
            ),
            renderProps,
          };

        case "emperor":
          return {
            output: createSprite(
              activated && !busyLickingDoughnutsOffFace ?
                {
                  animationId: variantTextureId(
                    "bubbles.cold",
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
                  spritesheet,
                  paused,
                }
              : {
                  textureId: variantTextureId(
                    "bubbles.cold.1",
                    isReflection,
                    busyLickingDoughnutsOffFace,
                    !activated,
                    false,
                  ),
                  spritesheet,
                },
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
