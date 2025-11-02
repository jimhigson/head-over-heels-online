import { Filter, GlProgram } from "pixi.js";

import fragment from "./attributeBlock.frag";
import { vertex } from "./defaults";
import { spectrumisePaletteSwopLut } from "./lutTexture/spectrumisePaletteSwopLut";

/**
 * Filter that divides the screen into blocks where each block
 * can only display black plus one other colour, emulating
 * the ZX Spectrum's attribute block limitation.
 */
export class AttributeBlockFilter extends Filter {
  constructor({
    blockSize = 8,
    blackPoint = 0.1,
  }: {
    /**
     * Size of each attribute block in pixels (e.g., 8 for spectacular 8x8 blocks)
     */
    blockSize?: number;

    /**
     * Threshold below which a color is considered black. 0-1 range where 0 means only pure black is
     * considered black, and 1 means nothing is considered black
     */
    blackPoint?: number;
  } = {}) {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "attribute-block-filter",
    });

    super({
      glProgram,
      resources: {
        attributeBlockUniforms: {
          uBlockSize: {
            value: blockSize,
            type: "f32",
          },
          uBlackPoint: {
            value: blackPoint,
            type: "f32",
          },
        },
        uLut: spectrumisePaletteSwopLut.source,
      },
    });
  }

  /**
   * Gets the current block size
   */
  get blockSize(): number {
    return this.resources.attributeBlockUniforms.uniforms.uBlockSize;
  }

  /**
   * Sets the block size
   */
  set blockSize(value: number) {
    this.resources.attributeBlockUniforms.uniforms.uBlockSize = value;
  }
}
