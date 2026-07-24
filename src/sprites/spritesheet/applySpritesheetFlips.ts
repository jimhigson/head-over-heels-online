import { groupD8, Texture } from "pixi.js";

import { objectEntriesIter, valuesIter } from "../../utils/entries";
import { type AppSpritesheet } from "./AppSpritesheet";

/**
 * Replaces every texture whose frame data is flagged `flipX` (declared as a
 * flipped copy via `copyFrom.flipX` in the spritesheet meta overrides, or a
 * variant id derived from one) with a horizontally-mirrored texture sampling
 * the same region. The mirror is baked into the texture's uvs (via groupD8)
 * rather than applied as a per-sprite scale, so it composes transparently with
 * AnimatedSprites and every draw site.
 *
 * Must be called after `parseSync()`.
 */
export const applySpritesheetFlips = (spritesheet: AppSpritesheet) => {
  for (const [textureId, frameData] of objectEntriesIter(
    spritesheet.data.frames,
  )) {
    if (frameData.frame.flipX !== true) {
      continue;
    }
    const original = spritesheet.textures[textureId];
    if (original === undefined) {
      continue;
    }

    // rotate is read-only after construction, so build a new mirrored texture
    // over the same source region
    const flipped = new Texture({
      source: original.source,
      frame: original.frame,
      orig: original.orig,
      trim: original.trim,
      rotate: groupD8.MIRROR_HORIZONTAL,
      defaultAnchor: original.defaultAnchor,
      label: original.label,
    });

    spritesheet.textures[textureId] = flipped;

    // the animations arrays hold their own references to the pre-flip textures,
    // so swap those occurrences too
    for (const animationFrames of valuesIter(spritesheet.animations)) {
      for (let i = 0; i < animationFrames.length; i++) {
        if (animationFrames[i] === original) {
          animationFrames[i] = flipped;
        }
      }
    }
  }
};
