import type { AnimatedSprite } from "pixi.js";
import type { Container } from "pixi.js";
import { isStoodOn } from "../../../model/StoodOnBy";
import { tangentAxis } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";
import { spritesheetData } from "../../../sprites/spriteSheetData";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";
import { neverTime } from "../../../utils/neverTime";

const slowdownTimeMs = 500;

type ConveyorRenderProps = {
  moving: boolean;
  roomTimeStoppedMoving?: number;
};

const conveyorAnimationSpeed =
  spritesheetData.animations["conveyor.x"].animationSpeed;
const frameCount = spritesheetData.animations["conveyor.x"].length;

const easeOut = (t: number): number => 1 - (1 - t) ** 2;

/**
 * staggering the animation frames of multiple-sprite conveyors
 * gives a 'wave' effect in the direction of motion
 */
const staggerAnimation = (
  rendering: Container<AnimatedSprite>,
  reverse: boolean,
) => {
  for (let i = 0; i < rendering.children.length; i++) {
    const c = rendering.children[i];
    const frame = i % frameCount;
    c.gotoAndStop(reverse ? frameCount - frame - 1 : frame);
  }

  return rendering;
};

const conveyorAppearanceImpl: ItemAppearance<
  "conveyor",
  ConveyorRenderProps,
  Container<AnimatedSprite>
> = ({
  renderContext: {
    item: {
      config: { direction, times },
      state: { stoodOnBy },
    },
    room: { roomTime },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const moving = isStoodOn(stoodOnBy);

  const roomTimeStoppedMoving =
    (!moving && currentlyRenderedProps?.moving ?
      roomTime
    : currentlyRenderedProps?.roomTimeStoppedMoving) ?? neverTime;

  const axis = tangentAxis(direction);
  const rendering =
    currentRendering?.output ??
    staggerAnimation(
      // createSprite given times, so will actually generate a container of AnimatedSprites
      createSprite({
        animationId: `conveyor.${axis}`,
        reverse: direction === "towards" || direction === "right",
        times,
      }),
      direction === "towards" || direction === "right",
    );

  const periodSinceStopped =
    moving ? 0 : Math.min(roomTime - roomTimeStoppedMoving, slowdownTimeMs);
  const playSpeedFrac = Math.max(0, 1 - periodSinceStopped / slowdownTimeMs);

  for (const c of rendering.children) {
    if (playSpeedFrac === 0) {
      c.stop();
    } else {
      const playSpeed = conveyorAnimationSpeed * easeOut(playSpeedFrac);
      c.play();
      c.animationSpeed = playSpeed;
    }
  }

  return {
    output: rendering,
    renderProps: { moving, roomTimeStoppedMoving },
  };
};

export const conveyorAppearance = itemAppearanceOutsideView(
  conveyorAppearanceImpl,
);
