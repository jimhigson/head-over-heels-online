import type { SpritesheetData } from "pixi.js";
import { Assets, Spritesheet, Texture } from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";
import {
  seriesOfAnimationFrameTextures,
  fourDirections,
  seriesOfAnimationFrameTextureIds,
} from "./spriteGenerators";
import {
  wallTileSize,
  floorTileSize,
  doorTextureSize,
  largeItemTextureSize,
  smallItemTextureSize,
  smallItemOutlineTextureSize,
} from "./textureSizes";
import { playableSpritesheetData } from "./playableSpritesheetData";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { scenerySpritesheetData } from "./scenerySpritesheetData";
import { hudSpritesheetData } from "./hudSritesheetData";
import { shadowSpritesheetData } from "./shadowSpritesheetData";

let spritesTexture: Texture;
try {
  spritesTexture = await Assets.load<Texture>(spritesheetUrl);
} catch (_e) {
  // allows the game to run in vitest without using @pixi/node to load the
  // sprites in node. This could be dangerous in an actual browser where
  // we want an error if the sprites don't load
  spritesTexture = Texture.EMPTY;
}

const frames = {
  "generic.edge.right": {
    frame: { x: 400, y: 502, w: 8, h: 9 },
  },
  "generic.edge.towards": {
    frame: { x: 391, y: 502, w: 8, h: 9 },
  },
  "generic.floor.overdraw": {
    frame: { x: 180, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.wall.overdraw": {
    frame: { x: 197, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
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
  "generic.door.front.y": {
    frame: { x: 178, y: 9, ...doorTextureSize },
  },
  "generic.door.back.y": {
    frame: { x: 195, y: 2, ...doorTextureSize },
  },
  "generic.door.legs.threshold.double.x": {
    frame: { x: 221, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "generic.door.legs.threshold.double.y": {
    frame: { x: 186, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "generic.door.floatingThreshold.x": {
    frame: { x: 209, y: 93, w: 26, h: 19 },
  },
  "generic.door.floatingThreshold.y": {
    frame: { x: 180, y: 93, w: 26, h: 19 },
  },
  "generic.door.platform.towards": {
    frame: { x: 317, y: 219, w: 32, h: 32 },
  },
  "generic.door.front.x": {
    frame: { x: 238, y: 9, ...doorTextureSize },
  },
  "generic.door.back.x": {
    frame: { x: 221, y: 2, ...doorTextureSize },
  },

  "generic.door.platform.left": {
    frame: { x: 282, y: 189, w: 32, h: 28 },
  },

  "moonbase.door.front.y": {
    frame: { x: 433 - 1, y: 248, ...doorTextureSize },
  },
  "moonbase.door.back.y": {
    frame: { x: 450 - 1, y: 241, ...doorTextureSize },
  },
  "moonbase.door.front.x": {
    frame: { x: 618 - 1, y: 248, ...doorTextureSize },
  },
  "moonbase.door.back.x": {
    frame: { x: 601 - 1, y: 241, ...doorTextureSize },
  },
  "moonbase.dark.door.front.y": {
    frame: { x: 433 - 1, y: 320, ...doorTextureSize },
  },
  "moonbase.dark.door.back.y": {
    frame: { x: 450 - 1, y: 313, ...doorTextureSize },
  },
  "moonbase.dark.door.front.x": {
    frame: { x: 618 - 1, y: 320, ...doorTextureSize },
  },
  "moonbase.dark.door.back.x": {
    frame: { x: 601 - 1, y: 313, ...doorTextureSize },
  },
  teleporter: {
    frame: { x: 2, y: 478, ...largeItemTextureSize },
  },
  ...seriesOfAnimationFrameTextures(
    "teleporter.flashing",
    2,
    { x: 35, y: 478 },
    largeItemTextureSize,
  ),

  "barrier.x": {
    frame: { x: 27, y: 349, w: 24, h: 24 },
  },
  "barrier.y": {
    frame: { x: 2, y: 349, w: 24, h: 24 },
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
  toaster: {
    frame: { x: 101, y: 478, ...largeItemTextureSize },
  },
  spikes: {
    frame: { x: 127, y: 420, ...largeItemTextureSize },
  },
  ...seriesOfAnimationFrameTextures(
    "conveyor.x",
    7,
    { x: 409, y: 454 },
    largeItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "conveyor.y",
    7,
    { x: 409, y: 483 },
    largeItemTextureSize,
  ),
  bunny: {
    frame: { x: 77, y: 349, ...smallItemTextureSize },
  },
  scroll: {
    frame: { x: 52, y: 324, ...smallItemTextureSize },
  },
  donuts: {
    frame: { x: 77, y: 324, ...smallItemTextureSize },
  },
  crown: {
    frame: { x: 202, y: 374, ...smallItemTextureSize },
  },
  hooter: {
    frame: { x: 202, y: 349, ...smallItemTextureSize },
  },
  bag: {
    frame: { x: 202, y: 299, ...smallItemTextureSize },
  },
  ...seriesOfAnimationFrameTextures(
    "fish",
    2,
    { x: 177, y: 324 },
    smallItemTextureSize,
  ),
  "spring.compressed": {
    frame: { x: 2, y: 453, ...smallItemTextureSize },
  },
  "spring.compressed.outline": {
    frame: { x: 226, y: 451, ...smallItemOutlineTextureSize },
  },
  "spring.released": {
    frame: { x: 27, y: 453, ...smallItemTextureSize },
  },
  "spring.released.outline": {
    frame: { x: 253, y: 451, ...smallItemTextureSize },
  },

  // Head
  // ------------
  ...seriesOfAnimationFrameTextures(
    "lift",
    4,
    { x: 233, y: 481 },
    smallItemTextureSize,
  ),
  "lift.static": { frame: { x: 333, y: 481, ...smallItemTextureSize } },

  ...seriesOfAnimationFrameTextures(
    "dalek",
    2,
    { x: 4, y: 4 },
    smallItemTextureSize,
  ),

  "headless-base": {
    frame: { x: 93, y: 102, ...smallItemTextureSize },
  },
  joystick: {
    frame: { x: 2, y: 374, ...smallItemTextureSize },
  },
  anvil: {
    frame: { x: 134, y: 478, ...largeItemTextureSize },
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
  "sticks.outline": {
    frame: { x: 226, y: 424, ...smallItemOutlineTextureSize },
  },
  cube: {
    frame: { x: 27, y: 428, ...smallItemTextureSize },
  },
  "cube.outline": {
    frame: { x: 253, y: 424, ...smallItemOutlineTextureSize },
  },
  drum: {
    frame: { x: 52, y: 428, ...smallItemTextureSize },
  },
  "drum.outline": {
    frame: { x: 280, y: 424, ...smallItemOutlineTextureSize },
  },
  "switch.left": {
    frame: { x: 52, y: 453, ...smallItemTextureSize },
  },
  "switch.right": {
    frame: { x: 77, y: 453, ...smallItemTextureSize },
  },
  ...fourDirections(
    "american-football-head.starsAndStripes",
    { x: 274, y: 131 },
    { w: 24, h: 32 },
  ),
  ...fourDirections(
    "american-football-head.greenAndPink",
    { x: 224, y: 131 },
    { w: 24, h: 32 },
  ),
  ...fourDirections("charles", { x: 118, y: 34 }, smallItemTextureSize),
  ...fourDirections("cyberman", { x: 61, y: 34 }, smallItemTextureSize),
  ...fourDirections("monkey", { x: 118, y: 90 }, smallItemTextureSize),
  ...fourDirections("elephant", { x: 118, y: 146 }, smallItemTextureSize),
  ...fourDirections("computer-bot", { x: 173, y: 146 }, smallItemTextureSize),

  ...seriesOfAnimationFrameTextures(
    "bubbles",
    3,
    { x: 4, y: 107 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "bubbles.cold",
    2,
    { x: 79, y: 4 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "bubbles.taupe",
    3,
    { x: 102, y: 324 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "bubbles.white",
    3,
    { x: 102, y: 349 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "bubbles.fish",
    3,
    { x: 227, y: 324 },
    smallItemTextureSize,
  ),

  ...seriesOfAnimationFrameTextures(
    "turtle.left",
    2,
    { x: 4, y: 137 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "turtle.away",
    2,
    { x: 55, y: 137 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "turtle.towards",
    2,
    { x: 4, y: 163 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "turtle.right",
    2,
    { x: 55, y: 163 },
    smallItemTextureSize,
  ),

  ...seriesOfAnimationFrameTextures(
    "helicopter-bug",
    4,
    { x: 4, y: 188 },
    smallItemTextureSize,
  ),

  hushPuppy: {
    frame: { x: 193, y: 449, ...largeItemTextureSize },
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
};

const spritesheetData = {
  frames,
  animations: {
    "teleporter.flashing": ["teleporter.flashing.1", "teleporter.flashing.2"],
    fish: ["fish.1", "fish.2"],
    lift: ["lift.1", "lift.2", "lift.3", "lift.4"],
    dalek: ["dalek.1", "dalek.2"],
    "turtle.left": ["turtle.left.1", "turtle.left.2"],
    "turtle.away": ["turtle.away.1", "turtle.away.2"],
    "turtle.towards": ["turtle.towards.1", "turtle.towards.2"],
    "turtle.right": ["turtle.right.1", "turtle.right.2"],
    "helicopter-bug": [
      "helicopter-bug.1",
      "helicopter-bug.2",
      "helicopter-bug.3",
      "helicopter-bug.4",
    ],
    bubbles: ["bubbles.1", "bubbles.2" /*, "bubbles.3"*/],
    "bubbles.cold": ["bubbles.cold.1", "bubbles.cold.2" /*, "bubbles.3"*/],
    "bubbles.white": ["bubbles.white.1", "bubbles.white.2", "bubbles.white.3"],
    "bubbles.taupe": ["bubbles.taupe.1", "bubbles.taupe.2", "bubbles.taupe.3"],
    "bubbles.fish": ["bubbles.fish.1", "bubbles.fish.2", "bubbles.fish.3"],
    "conveyor.x": seriesOfAnimationFrameTextureIds("conveyor.x", 7),
    "conveyor.y": seriesOfAnimationFrameTextureIds("conveyor.y", 7),
    "spring.bounce": [
      "spring.released",
      "spring.compressed",
      "spring.released",
      "spring.compressed",
      "spring.released",
    ],
    ...playableSpritesheetData.animations,
  },
  meta: { scale: 1 },
} as const satisfies SpritesheetData satisfies AnimationsOfFrames<
  keyof typeof frames
>;

export const spriteSheet = new Spritesheet(spritesTexture, spritesheetData);

await spriteSheet.parse();
spriteSheet.textureSource.scaleMode = "nearest";

export type TextureId = keyof (typeof spriteSheet)["textures"];
export type AnimationId = keyof (typeof spriteSheet)["animations"];
