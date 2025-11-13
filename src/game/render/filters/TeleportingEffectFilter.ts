import { Filter, GlProgram } from "pixi.js";

import { vertex } from "./defaults";
import { spectrumLut } from "./lutTexture/stdLuts/spectrumLut";
import fragment from "./teleportingEffect.frag";

type TeleportingEffectOptions = {
  /**
   * Size of each attribute block in pixels (e.g., 8 for spectacular 8x8 blocks)
   */
  blockSize?: number;
  /**
   * Threshold below which a color is considered black. 0-1 range where 0 means only pure black is
   * considered black, and 1 means nothing is considered black
   */
  blackPoint?: number;

  centreX?: number;
  centreY?: number;
};

export class TeleportingEffectFilter extends Filter {
  public uniforms: {
    uProgress: number;
    centreX: number;
    centreY: number;
  };

  constructor({
    blockSize = 8,
    blackPoint = 0.1,
    centreX = 0.5,
    centreY = 0.5,
  }: TeleportingEffectOptions = {}) {
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
          /** progress uniform 0 for just starting, 1 for finished */
          uProgress: {
            value: 0,
            type: "f32",
          },
          uCentreX: {
            value: centreX,
            type: "f32",
          },
          uCentreY: {
            value: centreY,
            type: "f32",
          },
        },
        uLut: spectrumLut.source,
      },
    });

    this.uniforms = this.resources.attributeBlockUniforms.uniforms;
  }

  set progress(value: number) {
    this.resources.attributeBlockUniforms.uniforms.uProgress = value;
  }
  set centreX(value: number) {
    this.resources.attributeBlockUniforms.uniforms.uCentreX = value;
  }
  set centreY(value: number) {
    this.resources.attributeBlockUniforms.uniforms.uCentreY = value;
  }
}
