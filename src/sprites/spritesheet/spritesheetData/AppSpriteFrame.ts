import { type SpritesheetFrameData } from "pixi.js";

import { type Xy } from "../../../utils/vectors/vectors";

/**
 * A spritesheet frame as the game actually uses it: pixi's `{ x, y, w, h }` plus
 * the two non-standard fields the game adds - the `pivot` read in createSprite,
 * and the `flipX` set on horizontally mirrored `copyFrom` copies.
 */
export type AppSpriteFrame = SpritesheetFrameData["frame"] & {
  pivot?: Xy;
  flipX?: boolean;
};
