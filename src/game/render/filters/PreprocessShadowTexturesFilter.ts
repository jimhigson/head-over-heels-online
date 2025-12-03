import type { Texture } from "pixi.js";

import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import fragment from "./preprocessShadowTextures.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "preprocess-shadow-textures-filter",
});

/**
 * Filter to preprocess textures for shadow rendering.
 * Adds alpha to the spritesheet
 */
export class PreprocessShadowTexturesFilter extends Filter {
  #mask: Texture;

  constructor(
    /**
     * where to apply the shadow preprocessing - white is on, black is off
     */
    mask: Texture,
  ) {
    super({
      glProgram,
      resources: {
        uMask: mask.source,
      },
    });

    this.#mask = mask;
  }

  destroy(
    destroyOptions?:
      | {
          destroyPrograms?: boolean;
          destroyMask?: boolean;
        }
      | boolean,
  ): void {
    const destroyPrograms =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyPrograms);

    const destroyMask =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyMask);

    if (destroyMask) {
      this.#mask?.destroy(true);
    }
    this.#mask = null as unknown as Texture;

    super.destroy(destroyPrograms);
  }
}
