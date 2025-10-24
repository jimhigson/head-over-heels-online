import { Filter, GlProgram } from "pixi.js";

import fragment from "./attributeBlock.frag?raw";
import { vertex } from "./defaults";

/**
 * Filter that divides the screen into blocks where each block
 * can only display black plus one other colour, emulating
 * the ZX Spectrum's attribute block limitation.
 */
export class AttributeBlockFilter extends Filter {
  constructor(
    /** Size of each attribute block in pixels (e.g., 8 for 8x8 blocks) */
    blockSize = 8,
  ) {
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
        },
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
