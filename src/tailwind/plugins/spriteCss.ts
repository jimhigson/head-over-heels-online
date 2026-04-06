import type { AppSpritesheetData } from "../../sprites/spritesheet/loadedSpriteSheet";
import type {
  FramesWithSpeed,
  TextureId,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

import { zxSpectrumFrameRate } from "../../originalGame";

type Sanitise = (s: string) => string;

const atMost1dp = (n: number): number => parseFloat(n.toFixed(1));

export const spriteSpecificCssVars = (
  w: number,
  h: number,
  x: number,
  y: number,
) => {
  return {
    "--w": `${w}`,
    "--h": `${h}`,
    "--x": `${x}`,
    "--y": `${y}`,
  };
};

const computeAnimationBase = (
  animationName: string,
  frames: FramesWithSpeed<TextureId[]>,
  spritesheetData: AppSpritesheetData,
  reversed: boolean,
) => {
  for (const f of frames) {
    if (!(f in spritesheetData.frames)) {
      throw new Error(
        `Animation "${animationName}" references non-existent frame "${f}"`,
      );
    }
  }

  const pixiJsAnimationSpeed = frames.animationSpeed;
  const animationDuration = atMost1dp(
    (frames.length * (1 / zxSpectrumFrameRate)) / pixiJsAnimationSpeed,
  );

  const fallbackFrame =
    spritesheetData.frames[reversed ? frames.at(-1)! : frames[0]];
  const maxW = Math.max(
    ...frames.map((f) => spritesheetData.frames[f].frame.w),
  );
  const maxH = Math.max(
    ...frames.map((f) => spritesheetData.frames[f].frame.h),
  );

  return {
    fallbackFrame,
    maxW,
    maxH,
    animationDuration,
    frameCount: frames.length,
  };
};

/**
 * Returns CSS vars with a direct `animation` shorthand referencing the keyframe name inline.
 * Used by SpritesPage (inline styles) and by the tailwind plugin for shared animations.
 */
export const animatedSpriteSpecificCssVars = (
  animationName: string,
  sanitise: Sanitise,
  frames: FramesWithSpeed<TextureId[]>,
  spritesheetData: AppSpritesheetData,
  reversed = false,
) => {
  const { fallbackFrame, maxW, maxH, animationDuration, frameCount } =
    computeAnimationBase(animationName, frames, spritesheetData, reversed);

  return {
    "--x": `${fallbackFrame.frame.x}`,
    "--y": `${fallbackFrame.frame.y}`,
    "--w": `${maxW}`,
    "--h": `${maxH}`,
    animation: `sprite-animation-${sanitise(animationName)} ${animationDuration}s steps(${frameCount}, end) infinite`,
    ...(reversed && { animationDirection: "reverse" }),
  };
};

/**
 * Returns CSS vars with a single `animation` shorthand referencing a CSS custom property.
 * Used by the tailwind plugin for differing/exclusive animations where the full animation
 * value varies by spritesheet.
 */
export const animatedSpriteIndirectCssVars = (
  animationName: string,
  sanitise: Sanitise,
  frames: FramesWithSpeed<TextureId[]>,
  spritesheetData: AppSpritesheetData,
  reversed = false,
) => {
  const { fallbackFrame, maxW, maxH } = computeAnimationBase(
    animationName,
    frames,
    spritesheetData,
    reversed,
  );

  const varSuffix = sanitise(animationName);

  return {
    "--x": `${fallbackFrame.frame.x}`,
    "--y": `${fallbackFrame.frame.y}`,
    "--w": `${maxW}`,
    "--h": `${maxH}`,
    animation: `var(--anim-${varSuffix})`,
    ...(reversed && { animationDirection: "reverse" }),
  };
};

/**
 * Returns the CSS variable assignments for a specific spritesheet's animation.
 * These are set on ancestor classes like `.blockstack-spritesheet` or `.toppy-spritesheet`.
 */
export const animationCssVarValues = (
  animationName: string,
  sanitise: Sanitise,
  frames: FramesWithSpeed<TextureId[]>,
  spritesheetData: AppSpritesheetData,
  /** prefix for the @keyframes name, e.g. "blockstack-" */
  keyframePrefix = "",
) => {
  const { animationDuration, frameCount } = computeAnimationBase(
    animationName,
    frames,
    spritesheetData,
    false,
  );

  const varSuffix = sanitise(animationName);
  const keyframeName = `sprite-animation-${keyframePrefix}${sanitise(animationName)}`;

  return {
    [`--anim-${varSuffix}`]: `${keyframeName} ${animationDuration}s steps(${frameCount}, end) infinite`,
  };
};

export const keyframesForAnimatedSprite = (
  animationName: string,
  sanitise: Sanitise,
  frames: FramesWithSpeed<TextureId[]>,
  spritesheetData: AppSpritesheetData,
  /** prefix for the @keyframes name, e.g. "blockstack-" */
  keyframePrefix = "",
) => {
  const entries: [string, { "--x": string; "--y": string }][] = [];
  const lastI = frames.length - 1;
  let prevX = -1;
  let prevY = -1;
  let prevI = 0;

  const pct = (i: number) =>
    i === lastI ? "to" : `${atMost1dp((i * 100) / lastI)}%`;

  for (const [i, textureId] of frames.entries()) {
    const frame = spritesheetData.frames[textureId];
    if (frame === undefined) {
      throw new Error(
        `Animation ${animationName} has invalid frame ${textureId}`,
      );
    }
    const { x, y } = frame.frame;

    const changed = x !== prevX || y !== prevY;
    if (changed) {
      // emit the last frame of the previous run (if there was one)
      if (i > 0 && prevI < i - 1) {
        entries.push([pct(i - 1), { "--x": `${prevX}`, "--y": `${prevY}` }]);
      }
      // emit the first frame of this new run
      entries.push([pct(i), { "--x": `${x}`, "--y": `${y}` }]);
      prevX = x;
      prevY = y;
      prevI = i;
    }
  }

  // emit the end-of-run stop for the final run
  if (prevI < lastI) {
    entries.push([pct(lastI), { "--x": `${prevX}`, "--y": `${prevY}` }]);
  }

  return {
    [`@keyframes sprite-animation-${keyframePrefix}${sanitise(animationName)}`]:
      Object.fromEntries(entries),
  };
};
