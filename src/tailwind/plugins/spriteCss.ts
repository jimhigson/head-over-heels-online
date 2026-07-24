import { zxSpectrumFrameRate } from "../../originalGame";
import { type AppSpritesheetData } from "../../sprites/spritesheet/AppSpritesheet";
import { type AppSpriteFrame } from "../../sprites/spritesheet/spritesheetData/AppSpriteFrame";
import {
  type BaseTextureId,
  type FramesWithSpeed,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

type Sanitise = (s: string) => string;

const atMost1dp = (n: number): number => parseFloat(n.toFixed(1));

const defaultTextureId: BaseTextureId = "thisIsABug";

/**
 * The defaultTextureId sprite's dims are set as `--w`/`--h` defaults on `.sprite`,
 * so a bare `.sprite` with no `.texture-*` renders the bug sprite as a visible
 * "something is broken" indicator. Per-texture rules omit these vars when
 * their size matches — sprites of the same size as the bug inherit from the
 * base class.
 */
const defaultSpriteDims = (
  spritesheetData: AppSpritesheetData,
): { w: number; h: number } => {
  const { w, h } = spritesheetData.frames[defaultTextureId].frame;
  return { w, h };
};

const dimVars = (
  w: number,
  h: number,
  { w: defaultW, h: defaultH }: { w: number; h: number },
) => ({
  ...(w !== defaultW && { "--w": `${w}` }),
  ...(h !== defaultH && { "--h": `${h}` }),
});

/**
 * Returns the CSS vars for a single sprite frame.
 *
 * When `spritesheetData` is provided (tailwind-plugin usage, compiling the
 * shared `.texture-*` stylesheet), `--w` / `--h` are elided if the sprite is
 * the same size as the bug-sprite default set on `.sprite` — shrinking the
 * generated CSS. When it's omitted (in-app inline-style usage in components
 * like SpriteTile / SpritesheetImage, which don't need to optimise for
 * bytes), `--w` / `--h` are always emitted so the caller doesn't have to
 * thread the spritesheet data down.
 */
export const spriteSpecificCssVars = (
  w: number,
  h: number,
  x: number,
  y: number,
  /** when true, horizontally mirrors the sprite (a copyFrom flipX copy) */
  flipX = false,
  spritesheetData?: AppSpritesheetData,
) => {
  const whVars =
    spritesheetData === undefined ?
      { "--w": `${w}`, "--h": `${h}` }
    : dimVars(w, h, defaultSpriteDims(spritesheetData));
  return {
    ...whVars,
    "--x": `${x}`,
    "--y": `${y}`,
    ...(flipX && { "--flip": "-1" }),
  };
};

const computeAnimationBase = (
  animationName: string,
  frames: FramesWithSpeed<BaseTextureId[]>,
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
  frames: FramesWithSpeed<BaseTextureId[]>,
  spritesheetData: AppSpritesheetData,
  reversed = false,
) => {
  const { fallbackFrame, maxW, maxH, animationDuration, frameCount } =
    computeAnimationBase(animationName, frames, spritesheetData, reversed);

  return {
    ...dimVars(maxW, maxH, defaultSpriteDims(spritesheetData)),
    "--x": `${fallbackFrame.frame.x}`,
    "--y": `${fallbackFrame.frame.y}`,
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
  frames: FramesWithSpeed<BaseTextureId[]>,
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
    ...dimVars(maxW, maxH, defaultSpriteDims(spritesheetData)),
    "--x": `${fallbackFrame.frame.x}`,
    "--y": `${fallbackFrame.frame.y}`,
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
  frames: FramesWithSpeed<BaseTextureId[]>,
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

/**
 * True when every frame of the animation is a horizontally flipped copy, so a
 * single element-level mirror (`.sprite-flip-x`) is enough. Mixed animations
 * instead carry per-frame `--flip` in their keyframes, and unflipped ones need
 * nothing.
 */
export const animationIsUniformlyFlipped = (
  frames: FramesWithSpeed<BaseTextureId[]>,
  spritesheetData: AppSpritesheetData,
) =>
  frames.every(
    (f) =>
      (spritesheetData.frames[f]?.frame as AppSpriteFrame | undefined)
        ?.flipX === true,
  );

export const keyframesForAnimatedSprite = (
  animationName: string,
  sanitise: Sanitise,
  frames: FramesWithSpeed<BaseTextureId[]>,
  spritesheetData: AppSpritesheetData,
  /** prefix for the @keyframes name, e.g. "blockstack-" */
  keyframePrefix = "",
  /**
   * When the caller knows `--x` / `--y` are safe to elide from every step
   * (e.g. all sheet variants agree on a single value), override the default
   * per-sheet check. Used for sheet-specific variants where the non-reversed
   * and reversed utility classes may have different fallback values.
   */
  elideOverride?: { x?: boolean; y?: boolean },
) => {
  // When an animation lives on one spritesheet row/column, --x or --y is
  // constant across all frames. That value is already set on the utility class
  // (matching the fallback frame), so the keyframes can omit it and the class's
  // value will apply during animation.
  const frameXYs = frames.map((f) => spritesheetData.frames[f].frame);
  const [firstFrame] = frameXYs;
  const isShared = keyframePrefix === "";
  const omitX =
    elideOverride?.x ??
    (isShared && frameXYs.every((f) => f.x === firstFrame.x));
  const omitY =
    elideOverride?.y ??
    (isShared && frameXYs.every((f) => f.y === firstFrame.y));

  // an animation that mixes flipped and unflipped copies can't be mirrored with
  // a single element-level transform, so it emits --flip per frame in its
  // keyframes. A uniformly flipped (or unflipped) animation emits nothing here -
  // the element-level --flip covers the uniform case without inflating the css
  const flips = frames.map(
    (f) => (spritesheetData.frames[f].frame as AppSpriteFrame).flipX === true,
  );
  const perFrameFlip = flips.some(Boolean) && !flips.every(Boolean);

  const step = (x: number, y: number, flip: boolean) => ({
    ...(omitX ? {} : { "--x": `${x}` }),
    ...(omitY ? {} : { "--y": `${y}` }),
    ...(perFrameFlip ? { "--flip": flip ? "-1" : "1" } : {}),
  });

  const entries: [string, ReturnType<typeof step>][] = [];
  const lastI = frames.length - 1;
  let prevX = -1;
  let prevY = -1;
  let prevFlip = false;
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
    const flip = flips[i];

    const changed = x !== prevX || y !== prevY || flip !== prevFlip;
    if (changed) {
      // emit the last frame of the previous run (if there was one)
      if (i > 0 && prevI < i - 1) {
        entries.push([pct(i - 1), step(prevX, prevY, prevFlip)]);
      }
      // emit the first frame of this new run
      entries.push([pct(i), step(x, y, flip)]);
      prevX = x;
      prevY = y;
      prevFlip = flip;
      prevI = i;
    }
  }

  // emit the end-of-run stop for the final run
  if (prevI < lastI) {
    entries.push([pct(lastI), step(prevX, prevY, prevFlip)]);
  }

  return {
    [`@keyframes sprite-animation-${keyframePrefix}${sanitise(animationName)}`]:
      Object.fromEntries(entries),
  };
};
