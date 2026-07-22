import { defaultFilterVert, Filter, GlProgram, type Texture } from "pixi.js";

import binariseAlphaFrag from "./binariseAlpha.frag";
import hardenAlphaFrag from "./hardenAlpha.frag";
import invertRedToAlphaFrag from "./preprocessShadowTextures.frag";

export type ShadowPreprocessMode =
  // "binariseAlpha" snaps any non-zero alpha to fully opaque - the binary
  // (ZX-style) rendering of alpha-encoded shadow strength.
  | "binariseAlpha"
  // "hardenChannels" snaps all channels to binary 0 or 1.
  | "hardenChannels"
  // "invertRedToAlpha" converts opaque black-on-white shadows to alpha-based.
  | "invertRedToAlpha";

const fragmentSources: Record<ShadowPreprocessMode, string> = {
  invertRedToAlpha: invertRedToAlphaFrag,
  hardenChannels: hardenAlphaFrag,
  binariseAlpha: binariseAlphaFrag,
};

/**
 * Masked filter for shadow/shadowMask sprite preprocessing.
 */
export class ShadowPreprocessFilter extends Filter {
  #mask: Texture;

  constructor(
    /** which fragment shader transformation to apply */
    mode: ShadowPreprocessMode,
    /** white = apply preprocessing, black = pass through */
    mask: Texture,
  ) {
    super({
      glProgram: GlProgram.from({
        vertex: defaultFilterVert,
        fragment: fragmentSources[mode],
        name: `shadow-preprocess-${mode}`,
      }),
      resources: {
        uMask: mask.source,
      },
      // this filter is only ever used to bake spritesheet textures off-screen,
      // never on the screen render target. clipping the filter to the screen
      // viewport would crop the spritesheet to whatever size the canvas happens
      // to be (eg before it has been sized), blanking the parts of the sheet
      // outside it — which is what stops text and shadows rendering on first load
      clipToViewport: false,
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
