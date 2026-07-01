import { groupD8, Texture } from "pixi.js";

import { objectEntriesIter, valuesIter } from "../../utils/entries";
import { type AppSpritesheet } from "./variants/AppSpritesheet";

/**
 * Replaces every texture declared as a flipped copy (`copyFrom.flipX`) in the
 * spritesheet meta overrides with a horizontally-mirrored texture sampling the
 * same region. The mirror is baked into the texture's uvs (via groupD8) rather
 * than applied as a per-sprite scale, so it composes transparently with
 * AnimatedSprites and every draw site.
 *
 * Must be called after `parseSync()` and after `spritesheetMeta` is set on the
 * spritesheet.
 */
export const applySpritesheetFlips = (spritesheet: AppSpritesheet) => {
  const { overrides } = spritesheet.spritesheetMeta;
  if (overrides === undefined) {
    return;
  }

  for (const [textureId, override] of objectEntriesIter(overrides)) {
    if (override?.copyFrom?.flipX !== true) {
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
