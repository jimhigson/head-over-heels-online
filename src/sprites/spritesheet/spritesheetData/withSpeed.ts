import type { FramesWithSpeed } from "./spriteSheetData";

// add extra data into the spritesheet that pixi doesn't know about so we can keep the animation speed in
// the spritesheet too:

export const withSpeed = <TFrames extends string[]>(
  frames: TFrames,
  animationSpeed: number,
): FramesWithSpeed<TFrames> => {
  return Object.assign([...frames] as TFrames, {
    animationSpeed,
  });
};
