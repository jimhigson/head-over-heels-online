import type { SpritesheetData } from "pixi.js";
import {
  seriesOfNumberedTextures,
  fourDirections,
  seriesOfAnimationFrameTextureIds,
} from "./spriteGenerators";
import {
  wallTileSize,
  floorTileSize,
  largeItemTextureSize,
  smallItemTextureSize,
} from "./textureSizes";
import { playableSpritesheetData } from "./playableSpritesheetData";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { scenerySpritesheetData } from "./scenerySpritesheetData";
import { hudSpritesheetData } from "./hudSritesheetData";
import { shadowSpritesheetData } from "./shadowSpritesheetData";
import { doorSpritesheetData } from "./doorSpritesheetData";
import { withSpeed } from "./withSpeed";

const frames = {
  "floorEdge.right": {
    frame: { x: 400, y: 502, w: 8, h: 9 },
  },
  "floorEdge.towards": {
    frame: { x: 391, y: 502, w: 8, h: 9 },
  },
  "floorOverdraw.right": {
    frame: { x: 400, y: 492, w: 8, h: 9 },
  },
  "floorOverdraw.towards": {
    frame: { x: 391, y: 492, w: 8, h: 9 },
  },
  "generic.floor.overdraw": {
    frame: { x: 180, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.wall.overdraw": {
    frame: { x: 197, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "shadow.wall.y": {
    frame: { x: 410, y: 129, w: 36, h: 16 },
  },
  "generic.floor.deadly": {
    frame: { x: 376, y: 454, ...floorTileSize },
  },
  "generic.dark.floor.deadly": {
    frame: { x: 376, y: 471, ...floorTileSize },
  },

  // doors names after the axis they go along: x=towards/away, y=left/right
  "generic.door.legs.pillar": {
    frame: { x: 237, y: 92, w: wallTileSize.w, h: 12 },
  },
  "generic.door.legs.base": {
    frame: { x: 237, y: 104, w: wallTileSize.w, h: 9 },
  },
  "generic.door.legs.threshold.double.x": {
    frame: { x: 221, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "generic.door.legs.threshold.double.y": {
    frame: { x: 186, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "shadowMask.door.legs.threshold.double.y": {
    frame: {
      x: 254,
      y: 68,
      w: wallTileSize.w * 2,
      h: 21,
      pivot: { x: 0, y: 21 },
    },
  },
  "generic.door.floatingThreshold.x": {
    frame: { x: 209, y: 93, w: 26, h: 19 },
  },
  "generic.door.floatingThreshold.y": {
    frame: { x: 180, y: 93, w: 26, h: 19 },
  },
  "shadowMask.door.floatingThreshold.double.y": {
    frame: {
      x: 254,
      y: 90,
      w: 42,
      h: 21,
      pivot: { x: 8, y: 20 },
    },
  },
  "shadow.door.floatingThreshold.double.y": {
    frame: {
      x: 297,
      y: 90,
      w: 42,
      h: 21,
      pivot: { x: 8, y: 20 },
    },
  },
  teleporter: {
    frame: { x: 2, y: 478, ...largeItemTextureSize },
  },
  ...seriesOfNumberedTextures(
    "teleporter.flashing",
    2,
    { x: 35, y: 478 },
    largeItemTextureSize,
  ),
  "shadowMask.teleporter": {
    frame: { x: 101, y: 478, ...largeItemTextureSize },
  },

  "barrier.x": {
    frame: { x: 335, y: 241, ...smallItemTextureSize, pivot: { x: 18, y: 23 } },
  },
  "barrier.y": {
    frame: { x: 310, y: 241, ...smallItemTextureSize, pivot: { x: 6, y: 23 } },
  },
  "shadowMask.barrier.y": {
    frame: { x: 310, y: 216, ...smallItemTextureSize, pivot: { x: 6, y: 22 } },
  },
  "shadow.barrier.y": {
    frame: { x: 310, y: 266, ...smallItemTextureSize, pivot: { x: 6, y: 22 } },
  },
  "block.organic": {
    frame: { x: 160, y: 449, ...largeItemTextureSize },
  },
  "block.organic.dark": {
    frame: { x: 160, y: 391, ...largeItemTextureSize },
  },
  "block.organic.disappearing": {
    frame: { x: 160, y: 420, ...largeItemTextureSize },
  },
  "block.organic.dark.disappearing": {
    frame: { x: 127, y: 391, ...largeItemTextureSize },
  },
  "block.artificial": {
    frame: { x: 127, y: 449, ...largeItemTextureSize },
  },
  "block.artificial.disappearing": {
    frame: { x: 127, y: 449, ...largeItemTextureSize },
  },
  "block.tower": {
    frame: { x: 27, y: 374, ...smallItemTextureSize },
  },
  "block.tower.disappearing": {
    frame: { x: 27, y: 374, ...smallItemTextureSize },
  },
  volcano: {
    frame: { x: 193, y: 420, ...largeItemTextureSize },
  },
  "shadowMask.volcano": {
    frame: { x: 193, y: 449, ...largeItemTextureSize },
  },
  toaster: {
    frame: { x: 226, y: 449, ...largeItemTextureSize },
  },
  spikes: {
    frame: { x: 333, y: 427, ...largeItemTextureSize },
  },
  "shadowMask.spikes": {
    frame: { x: 333, y: 397, ...largeItemTextureSize },
  },
  ...seriesOfNumberedTextures(
    "conveyor.x",
    7,
    { x: 409, y: 454 },
    largeItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "conveyor.y",
    7,
    { x: 409, y: 483 },
    largeItemTextureSize,
  ),
  bunny: {
    frame: { x: 77, y: 349, ...smallItemTextureSize },
  },
  scroll: {
    frame: { x: 52, y: 324, ...smallItemTextureSize, pivot: { x: 19, y: 24 } },
  },
  "shadowMask.scroll": {
    frame: { x: 27, y: 324, ...smallItemTextureSize, pivot: { x: 19, y: 24 } },
  },
  "shadow.scroll": {
    frame: { x: 2, y: 324, ...smallItemTextureSize, pivot: { x: 19, y: 24 } },
  },
  doughnuts: {
    frame: { x: 77, y: 324, ...smallItemTextureSize },
  },
  "crown.blacktooth": {
    frame: { x: 186, y: 40, ...smallItemTextureSize },
  },
  "crown.safari": {
    frame: { x: 211, y: 40, ...smallItemTextureSize },
  },
  "crown.egyptus": {
    frame: { x: 236, y: 40, ...smallItemTextureSize },
  },
  "crown.penitentiary": {
    frame: { x: 261, y: 40, ...smallItemTextureSize },
  },
  "crown.bookworld": {
    frame: { x: 286, y: 40, ...smallItemTextureSize },
  },
  "crown.dark": {
    frame: { x: 311, y: 40, ...smallItemTextureSize },
  },
  hooter: {
    frame: { x: 202, y: 349, ...smallItemTextureSize },
  },
  bag: {
    frame: { x: 227, y: 349, ...smallItemTextureSize },
  },
  ...seriesOfNumberedTextures(
    "fish",
    2,
    { x: 177, y: 324 },
    smallItemTextureSize,
  ),
  "spring.compressed": {
    frame: { x: 2, y: 453, ...smallItemTextureSize },
  },
  "spring.released": {
    frame: { x: 27, y: 453, ...smallItemTextureSize },
  },

  ...seriesOfNumberedTextures(
    "lift",
    4,
    { x: 233, y: 481 },
    smallItemTextureSize,
  ),
  "lift.static": { frame: { x: 333, y: 481, ...smallItemTextureSize } },

  ...seriesOfNumberedTextures("dalek", 2, { x: 4, y: 4 }, smallItemTextureSize),
  "shadowMask.dalek": {
    frame: { x: 4, y: 29, ...smallItemTextureSize },
  },

  homingBot: {
    frame: { x: 93, y: 102, ...smallItemTextureSize },
  },
  joystick: {
    frame: { x: 2, y: 374, ...smallItemTextureSize },
  },
  "shadowMask.joystick": {
    frame: { x: 2, y: 349, ...smallItemTextureSize },
  },
  stepStool: {
    frame: { x: 252, y: 366, ...largeItemTextureSize },
  },
  "shadowMask.stepStool": {
    frame: { x: 285, y: 366, ...largeItemTextureSize },
  },
  "book.x": {
    frame: { x: 167, y: 478, ...largeItemTextureSize },
  },
  "book.y": {
    frame: { x: 200, y: 478, ...largeItemTextureSize },
  },
  sandwich: {
    frame: { x: 2, y: 399, ...largeItemTextureSize },
  },
  sticks: {
    frame: { x: 2, y: 428, ...smallItemTextureSize },
  },
  cube: {
    frame: { x: 27, y: 428, ...smallItemTextureSize },
  },
  drum: {
    frame: { x: 52, y: 428, ...smallItemTextureSize },
  },
  "switch.left": {
    frame: { x: 52, y: 453, ...smallItemTextureSize },
  },
  "switch.right": {
    frame: { x: 77, y: 453, ...smallItemTextureSize },
  },
  "shadowMask.switch": {
    frame: { x: 77, y: 428, ...smallItemTextureSize },
  },
  ...fourDirections(
    "skiHead.starsAndStripes",
    { x: 274, y: 131 },
    { w: 24, h: 32 },
  ),
  ...fourDirections(
    "skiHead.greenAndPink",
    { x: 224, y: 131 },
    { w: 24, h: 32 },
  ),
  ...fourDirections("charles", { x: 118, y: 34 }, smallItemTextureSize),
  /*
  charles doesn't work because can't (yet) have direction-specific (changing) maps
  "shadowMask.charles.x": {
    frame: { x: 93, y: 34, ...smallItemTextureSize },
  },
  "shadowMask.charles.y": {
    frame: { x: 93, y: 59, ...smallItemTextureSize },
  },
  */
  ...fourDirections("cyberman", { x: 29, y: 29 }, smallItemTextureSize),
  ...fourDirections("monkey", { x: 118, y: 90 }, smallItemTextureSize),
  ...fourDirections("elephant", { x: 118, y: 146 }, smallItemTextureSize),
  ...fourDirections("computerBot", { x: 173, y: 146 }, smallItemTextureSize),

  ...seriesOfNumberedTextures(
    "bubbles.cold",
    2,
    { x: 79, y: 4 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.taupe",
    3,
    { x: 102, y: 324 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.white",
    3,
    { x: 102, y: 349 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "bubbles.fish",
    3,
    { x: 227, y: 324 },
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "turtle.left",
    2,
    { x: 4, y: 137 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "turtle.away",
    2,
    { x: 55, y: 137 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "turtle.towards",
    2,
    { x: 4, y: 163 },
    smallItemTextureSize,
  ),
  ...seriesOfNumberedTextures(
    "turtle.right",
    2,
    { x: 55, y: 163 },
    smallItemTextureSize,
  ),

  ...seriesOfNumberedTextures(
    "helicopterBug",
    4,
    { x: 4, y: 188 },
    smallItemTextureSize,
  ),

  hushPuppy: {
    frame: { x: 209, y: 291, ...largeItemTextureSize },
  },
  "shadowMask.hushPuppy": {
    frame: { x: 242, y: 291, ...largeItemTextureSize },
  },
  ball: {
    frame: { x: 54, y: 4, ...smallItemTextureSize },
  },
  puck: {
    frame: { x: 102, y: 428, ...smallItemTextureSize },
  },
  "puck.deadly": {
    frame: { x: 102, y: 453, ...smallItemTextureSize },
  },

  ...playableSpritesheetData.frames,
  ...scenerySpritesheetData.frames,
  ...hudSpritesheetData.frames,
  ...shadowSpritesheetData.frames,
  ...doorSpritesheetData.frames,
};

export type TextureId = keyof typeof frames;

export type FramesWithSpeed<TFrames extends string[] = TextureId[]> =
  TFrames & {
    animationSpeed: number;
  };

export const spritesheetData = {
  frames,
  animations: {
    "teleporter.flashing": withSpeed(
      ["teleporter.flashing.1", "teleporter.flashing.2"] as const,
      0.5,
    ),
    fish: withSpeed(["fish.1", "fish.2"] as const, 0.25),
    lift: withSpeed(["lift.1", "lift.2", "lift.3", "lift.4"] as const, 0.5),
    dalek: withSpeed(["dalek.1", "dalek.2"] as const, 0.5),
    "turtle.left": withSpeed(["turtle.left.1", "turtle.left.2"] as const, 0.25),
    "turtle.away": withSpeed(["turtle.away.1", "turtle.away.2"] as const, 0.25),
    "turtle.towards": withSpeed(
      ["turtle.towards.1", "turtle.towards.2"] as const,
      0.25,
    ),
    "turtle.right": withSpeed(
      ["turtle.right.1", "turtle.right.2"] as const,
      0.25,
    ),
    helicopterBug: withSpeed(
      [
        "helicopterBug.1",
        "helicopterBug.2",
        "helicopterBug.3",
        "helicopterBug.4",
      ] as const,
      0.5,
    ),
    "bubbles.cold": withSpeed(
      ["bubbles.cold.1", "bubbles.cold.2" /*, "bubbles.3"*/] as const,
      0.25,
    ),
    "bubbles.white": withSpeed(
      ["bubbles.white.1", "bubbles.white.2", "bubbles.white.3"] as const,
      0.5,
    ),
    //"bubbles.taupe": ["bubbles.taupe.1", "bubbles.taupe.2", "bubbles.taupe.3"] as const,
    "bubbles.doughnut": withSpeed(
      ["bubbles.taupe.1", "bubbles.taupe.2"] as const,
      0.5,
    ),
    /*"bubbles.fish": withSpeed(
      ["bubbles.fish.1", "bubbles.fish.2", "bubbles.fish.3"] as const,
      0.25,
    ),*/
    "conveyor.x": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.x", 7),
      0.5,
    ),
    "conveyor.y": withSpeed(
      seriesOfAnimationFrameTextureIds("conveyor.y", 7),
      0.5,
    ),
    "spring.bounce": withSpeed(
      [
        "spring.released",
        "spring.compressed",
        "spring.released",
        "spring.compressed",
        "spring.released",
      ] as const,
      0.5,
    ),
    // never actually used in the game(!) - for the manual only
    switch: withSpeed(["switch.left", "switch.right"] as const, 0.02),
    ...playableSpritesheetData.animations,
  },
  meta: { scale: 1 },
} as const satisfies SpritesheetData satisfies AnimationsOfFrames<
  keyof typeof frames
>;

export type AnimationId = keyof (typeof spritesheetData)["animations"];
