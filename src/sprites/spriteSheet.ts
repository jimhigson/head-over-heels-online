import type { SpritesheetData } from "pixi.js";
import { Assets, Spritesheet, Texture } from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";
import {
  seriesOfAnimationFrameTextures,
  fourDirections,
} from "./spriteGenerators";
import {
  wallTileSize,
  floorTileSize,
  doorTextureSize,
  largeItemTextureSize,
  smallItemTextureSize,
} from "./textureSizes";
import { playableSpritesheetData } from "./playableSpritesheetData";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import { scenerySpritesheetData } from "./scenerySpritesheetData";

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
    frame: { x: 536, y: 392, w: 8, h: 9 },
  },
  "generic.edge.towards": {
    frame: { x: 527, y: 392, w: 8, h: 9 },
  },
  "generic.wall.overdraw": {
    frame: { x: 210, y: 37, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.wall.overdraw.debug": {
    frame: { x: 210, y: 4, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.floor.deadly": {
    frame: { x: 422, y: 407, ...floorTileSize },
  },
  // doors names after the axis they go along: x=towards/away, y=left/right
  "generic.door.legs.base": {
    frame: { x: 314, y: 60, w: wallTileSize.w, h: 9 },
  },
  "generic.door.legs.pillar": {
    frame: { x: 314, y: 48, w: wallTileSize.w, h: 12 },
  },
  "generic.door.front.y": {
    frame: { x: 227, y: 13, ...doorTextureSize },
  },
  "generic.door.back.y": {
    frame: { x: 243, y: 5, ...doorTextureSize },
  },
  "generic.door.legs.threshold.y": {
    frame: { x: 331, y: 30, w: wallTileSize.w, h: 18 },
  },
  "generic.door.threshold.x": {
    frame: { x: 270, y: 70, w: 26, h: 19 },
  },
  "generic.door.threshold.y": {
    frame: { x: 241, y: 70, w: 26, h: 19 },
  },
  "generic.door.platform.towards": {
    frame: { x: 270, y: 144, w: 32, h: 32 },
  },
  "generic.door.front.x": {
    frame: { x: 286, y: 13, ...doorTextureSize },
  },
  "generic.door.back.x": {
    frame: { x: 270, y: 5, ...doorTextureSize },
  },
  "generic.door.legs.threshold.x": {
    frame: { x: 314, y: 30, w: wallTileSize.w, h: 18 },
  },
  "generic.door.platform.left": {
    frame: { x: 235, y: 114, w: 32, h: 28 },
  },
  "moonbase.door.front.y": {
    frame: { x: 344, y: 161, ...doorTextureSize },
  },
  "moonbase.door.back.y": {
    frame: { x: 360, y: 153, ...doorTextureSize },
  },
  "moonbase.door.front.x": {
    frame: { x: 528, y: 161, ...doorTextureSize },
  },
  "moonbase.door.back.x": {
    frame: { x: 512, y: 153, ...doorTextureSize },
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
  "block.organic.weak": {
    frame: { x: 160, y: 420, ...largeItemTextureSize },
  },
  "block.artificial": {
    frame: { x: 127, y: 449, ...largeItemTextureSize },
  },
  "block.tower": {
    frame: { x: 27, y: 374, ...smallItemTextureSize },
  },
  volcano: {
    frame: { x: 193, y: 420, ...largeItemTextureSize },
  },
  toaster: {
    frame: { x: 111, y: 423, ...largeItemTextureSize },
  },
  spikes: {
    frame: { x: 379, y: 414, ...largeItemTextureSize },
  },
  "conveyor.x": {
    frame: { x: 35, y: 399, ...largeItemTextureSize },
  },
  "conveyor.y": {
    frame: { x: 68, y: 399, ...largeItemTextureSize },
  },
  bunny: {
    frame: { x: 263, y: 333, ...smallItemTextureSize },
  },
  donuts: {
    frame: { x: 313, y: 358, ...smallItemTextureSize },
  },
  crown: {
    frame: { x: 367, y: 358, ...smallItemTextureSize },
  },
  hooter: {
    frame: { x: 286, y: 358, ...smallItemTextureSize },
  },
  bag: {
    frame: { x: 263, y: 358, ...smallItemTextureSize },
  },
  ...seriesOfAnimationFrameTextures(
    "fish",
    2,
    { x: 238, y: 383 },
    smallItemTextureSize,
  ),
  "spring.compressed": {
    frame: { x: 2, y: 453, ...smallItemTextureSize },
  },
  "spring.released": {
    frame: { x: 27, y: 453, ...smallItemTextureSize },
  },

  // Head
  // ------------
  ...seriesOfAnimationFrameTextures(
    "lift",
    4,
    { x: 259, y: 474 },
    smallItemTextureSize,
  ),
  "lift.static": { frame: { x: 359, y: 474, ...smallItemTextureSize } },

  ...seriesOfAnimationFrameTextures(
    "dalek",
    2,
    { x: 4, y: 4 },
    smallItemTextureSize,
  ),

  "headless-base": {
    frame: { x: 57, y: 4, ...smallItemTextureSize },
  },
  joystick: {
    frame: { x: 2, y: 374, ...smallItemTextureSize },
  },
  anvil: {
    frame: { x: 134, y: 478, ...largeItemTextureSize },
  },
  "book.x": {
    frame: { x: 184, y: 450, ...largeItemTextureSize },
  },
  "book.y": {
    frame: { x: 222, y: 450, ...largeItemTextureSize },
  },
  sandwich: {
    frame: { x: 4, y: 356, ...largeItemTextureSize },
  },
  sticks: {
    frame: { x: 4, y: 391, ...smallItemTextureSize },
  },
  cube: {
    frame: { x: 27, y: 428, ...smallItemTextureSize },
  },
  drum: {
    frame: { x: 52, y: 428, ...smallItemTextureSize },
  },
  "switch.off": {
    frame: { x: 52, y: 453, ...smallItemTextureSize },
  },
  "switch.on": {
    frame: { x: 77, y: 453, ...smallItemTextureSize },
  },
  ...fourDirections(
    "american-football-head",
    { x: 4, y: 34 },
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
    { x: 109, y: 4 },
    smallItemTextureSize,
  ),
  ...seriesOfAnimationFrameTextures(
    "bubbles.pickup",
    3,
    { x: 288, y: 333 },
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

  "hush-puppy": {
    frame: { x: 163, y: 300, ...largeItemTextureSize },
  },
  ball: {
    frame: { x: 84, y: 4, ...smallItemTextureSize },
  },
  puck: {
    frame: { x: 111, y: 367, ...smallItemTextureSize },
  },
  "puck.deadly": {
    frame: { x: 111, y: 392, ...smallItemTextureSize },
  },
  ...playableSpritesheetData.frames,
  ...scenerySpritesheetData.frames,
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
    "bubbles.pickup": [
      "bubbles.pickup.1",
      "bubbles.pickup.2",
      "bubbles.pickup.3",
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
