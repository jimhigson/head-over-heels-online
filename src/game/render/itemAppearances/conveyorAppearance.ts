import { AnimatedSprite, Container } from "pixi.js";

import { isStoodOn } from "../../../model/StoodOnBy";
import { type AppSpritesheetWithVariants } from "../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { neverTime } from "../../../utils/neverTime";
import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/renderContainerToSprite";
import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { nearestQuarterAngle, rotateXy } from "../../../utils/vectors/rotateXy";
import {
  axisIndexXy8,
  isNegativeSideXy,
  type Xy,
  xyEqual,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";

const slowdownTimeMs = 250;

type ConveyorRenderProps = {
  moving: boolean;
  disabled: boolean;
  roomTimeStoppedMoving?: number;
  // normally won't change, but then there are switches...
  direction: Xyz;
  /** the belt art and tiling resolve per camera angle */
  cameraQuarterAngle: Xy;
};

const easeOut = (t: number): number => 1 - (1 - t) ** 2;

const framesAheadPerBlock = 3;

/**
 * staggering the animation frames of multiple-sprite conveyors
 * gives a 'wave' effect in the direction of motion
 */
const staggerAnimation = (
  rendering: Container<AnimatedSprite>,
  reverse: boolean,
  frameCount: number,
) => {
  for (let i = 0; i < rendering.children.length; i++) {
    const c = rendering.children[i];
    const frame = (i * framesAheadPerBlock) % frameCount;
    c.gotoAndStop(reverse ? frameCount - frame - 1 : frame);
  }
};

const createRendering = (
  direction: Xyz,
  times: Partial<Xy> | undefined,
  spritesheet: AppSpritesheetWithVariants,
  frameCount: number,
  cameraQuarterAngle: Xy,
  disabled: boolean,
  isReflection: boolean,
): Container<AnimatedSprite> => {
  // pick the directional sprite + animation sense for how the conveyor
  // appears once the camera has apparentDirection - the direction stays a vector
  // throughout, with the axis and belt sense read straight off it:
  const apparentDirection = rotateXy(direction, cameraQuarterAngle);
  const axis =
    Math.abs(apparentDirection.y) > Math.abs(apparentDirection.x) ? "y" : "x";
  const reverse = isNegativeSideXy(apparentDirection);
  const sprites = createSprite({
    animationId: variantTextureId(
      `conveyor.d${axisIndexXy8[axis]}`,
      isReflection,
      false,
      disabled,
      false,
    ),
    reverse,
    times,
    cameraQuarterAngle,
    spritesheet,
  });
  // createSprite will return a single AnimatedSprite for a single conveyor,
  // which is generally fine to avoid creating unnecessary containers. However,
  // for this appearance it makes things awkward going into the children to
  // stagger/start/stop
  const animatedSpritesContainer =
    sprites instanceof AnimatedSprite ?
      new Container<AnimatedSprite>({ children: [sprites] })
    : sprites;

  staggerAnimation(
    // createSprite given times, so will actually generate a container of AnimatedSprites
    animatedSpritesContainer,
    reverse,
    frameCount,
  );

  return animatedSpritesContainer;
};

const conveyorAppearanceImpl: ItemAppearance<
  "conveyor",
  ConveyorRenderProps,
  AnimatedSprite
> = ({
  renderContext: {
    isReflection,
    item: {
      config: { times },
      state: { stoodOnBy, direction, disabled },
    },
    room: { roomTime },
    general: { spritesheets, pixiRenderer, paused, cameraAngle },
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const currentlyRenderedProps = currentRendering?.renderProps;
  const moving = !disabled && isStoodOn(stoodOnBy);

  const justStopped = !moving && (currentlyRenderedProps?.moving ?? false);

  // the time when it stopped moving, if ever:
  const roomTimeStoppedMoving =
    justStopped ?
      // record the time when it stopped:
      roomTime
      // keep whatever value we had before:
    : (currentlyRenderedProps?.roomTimeStoppedMoving ?? neverTime);

  const periodSinceStopped =
    moving ? 0 : Math.min(roomTime - roomTimeStoppedMoving, slowdownTimeMs);

  const currentOutput = currentRendering?.output;
  const disabledChanged = !!disabled !== !!currentlyRenderedProps?.disabled;
  const rerender =
    !currentOutput ||
    currentlyRenderedProps === undefined ||
    !xyEqual(direction, currentlyRenderedProps.direction) ||
    !xyEqual(cameraQuarterAngle, currentlyRenderedProps.cameraQuarterAngle) ||
    disabledChanged;

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  const conveyorAnimationId =
    `conveyor.d${octantIndexOfDirection("left")}` as const;
  const conveyorAnimationSpeed: number =
    spritesheet.data.animations[conveyorAnimationId].animationSpeed;
  const frameCount = spritesheet.data.animations[conveyorAnimationId].length;

  const rendering: AnimatedSprite =
    rerender ?
      maybeRenderContainerToAnimatedSprite(
        pixiRenderer,
        createRendering(
          direction,
          times,
          spritesheet,
          frameCount,
          cameraQuarterAngle,
          !!disabled,
          isReflection,
        ),
        conveyorAnimationId,
        spritesheet,
      )
    : currentOutput;

  // how fast to play the animation, with slowdown for how long since it stopped moving
  const playSpeedFrac =
    disabled || paused ? 0 : (
      Math.max(0, 1 - periodSinceStopped / slowdownTimeMs)
    );

  if (playSpeedFrac === 0) {
    rendering.stop();
  } else {
    const playSpeed = conveyorAnimationSpeed * easeOut(playSpeedFrac);
    rendering.play();
    rendering.animationSpeed = playSpeed;
  }

  return rerender || justStopped || moving !== currentlyRenderedProps?.moving ?
      {
        output: rendering,
        renderProps: {
          moving,
          disabled: !!disabled,
          roomTimeStoppedMoving,
          direction,
          cameraQuarterAngle,
        },
      }
    : "no-update";
};

export const conveyorAppearance = itemAppearanceOutsideView(
  conveyorAppearanceImpl,
);
