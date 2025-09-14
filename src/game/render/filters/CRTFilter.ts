import type { FilterSystem, RenderTexture, Texture } from "pixi.js";

import { Filter, GlProgram } from "pixi.js";

import fragment from "./crt.frag?raw";
import { vertex } from "./defaults";

type CRTShaderDefines = {
  /**
   * Shadow mask type
   */
  maskType?: "none" | "green-magenta" | "trinitron";
  /**
   * Enable scanlines
   */
  scanlines?: boolean;
  /**
   * Enable screen curvature
   */
  curvature?: boolean;
  /**
   * Enable gamma correction
   */
  gamma?: boolean;
  /**
   * Use fast gamma approximation (requires gamma: true)
   */
  fakeGamma?: boolean;
  /**
   * Use 2D interpolation for sharper pixels (slower)
   */
  sharper?: boolean;
  /**
   * Enable multisampling for scanlines (reduces moiré)
   */
  multisample?: boolean;
};

type CRTFilterUniforms = {
  /**
   * Original emulated game resolution [width, height]
   */
  emulatedResolution?: [number, number];
  /**
   * Screen curvature - horizontal (0.0 to 1.0)
   */
  curvatureX?: number;
  /**
   * Screen curvature - vertical (0.0 to 1.0)
   */
  curvatureY?: number;
  /**
   * Shadow mask brightness (0.0 to 1.0)
   */
  maskBrightness?: number;
  /**
   * Scanline weight - higher = thinner lines (0.0 to 15.0)
   */
  scanlineWeight?: number;
  /**
   * Gap brightness between scanlines (0.0 to 1.0)
   */
  scanlineGapBrightness?: number;
  /**
   * Bloom factor for bright scanlines (0.0 to 5.0)
   */
  bloomFactor?: number;
  /**
   * Input gamma (0.0 to 5.0)
   */
  inputGamma?: number;
  /**
   * Output gamma (0.0 to 5.0)
   */
  outputGamma?: number;
};

const defaultCRTShaderDefines: Required<CRTShaderDefines> = {
  maskType: "trinitron",
  scanlines: true,
  curvature: true,
  gamma: false,
  fakeGamma: false,
  sharper: false,
  multisample: true,
};

const defaultCRTFilterUniforms: Required<CRTFilterUniforms> = {
  emulatedResolution: [320, 240],
  curvatureX: 0.1,
  curvatureY: 0.15,
  maskBrightness: 0.7,
  scanlineWeight: 6.0,
  scanlineGapBrightness: 0.12,
  bloomFactor: 1.5,
  inputGamma: 2.4,
  outputGamma: 2.2,
};

/**
 * CRT shader effect - simulates an old CRT monitor with scanlines, curvature, and shadow masks
 */
export class CRTFilter extends Filter {
  public uniforms: {
    uEmulatedResolution: Float32Array;
    uCurvatureX: number;
    uCurvatureY: number;
    uMaskBrightness: number;
    uScanlineWeight: number;
    uScanlineGapBrightness: number;
    uBloomFactor: number;
    uInputGamma: number;
    uOutputGamma: number;
    uResolution: Float32Array;
  };

  constructor(
    defines: CRTShaderDefines = {},
    uniforms: CRTFilterUniforms = {},
  ) {
    // Merge with defaults
    const finalDefines = { ...defaultCRTShaderDefines, ...defines };
    const finalUniforms = { ...defaultCRTFilterUniforms, ...uniforms };

    // Perform string substitution on the fragment shader
    let modifiedFragment = fragment;

    // Map for converting maskType strings to shader values
    const maskTypeMap = {
      none: 0,
      "green-magenta": 1,
      trinitron: 2,
    };

    // Replace all placeholders found in the shader
    const placeholderRegex = /\{\{(\w+)\}\}/g;
    modifiedFragment = modifiedFragment.replace(
      placeholderRegex,
      (match, key) => {
        if (key in finalDefines) {
          const value = finalDefines[key as keyof typeof finalDefines];

          // Special handling for maskType
          if (key === "maskType" && typeof value === "string") {
            return String(maskTypeMap[value as keyof typeof maskTypeMap]);
          }

          // Convert booleans to 0/1
          return (
            typeof value === "boolean" ?
              value ? "1"
              : "0"
            : String(value)
          );
        }
        // If placeholder not found in defines, leave it unchanged
        return match;
      },
    );

    const glProgram = GlProgram.from({
      vertex,
      fragment: modifiedFragment,
      name: "crt-filter",
    });

    super({
      glProgram,
      resources: {
        crtUniforms: {
          uEmulatedResolution: {
            value: new Float32Array(2),
            type: "vec2<f32>",
          },
          uCurvatureX: {
            value: finalUniforms.curvatureX,
            type: "f32",
          },
          uCurvatureY: {
            value: finalUniforms.curvatureY,
            type: "f32",
          },
          uMaskBrightness: {
            value: finalUniforms.maskBrightness,
            type: "f32",
          },
          uScanlineWeight: {
            value: finalUniforms.scanlineWeight,
            type: "f32",
          },
          uScanlineGapBrightness: {
            value: finalUniforms.scanlineGapBrightness,
            type: "f32",
          },
          uBloomFactor: {
            value: finalUniforms.bloomFactor,
            type: "f32",
          },
          uInputGamma: {
            value: finalUniforms.inputGamma,
            type: "f32",
          },
          uOutputGamma: {
            value: finalUniforms.outputGamma,
            type: "f32",
          },
          uResolution: { value: new Float32Array(2), type: "vec2<f32>" },
        },
      },
    });

    this.uniforms = this.resources.crtUniforms.uniforms;

    // Set emulated resolution
    [
      this.uniforms.uEmulatedResolution[0],
      this.uniforms.uEmulatedResolution[1],
    ] = finalUniforms.emulatedResolution;
  }

  /**
   * Called automatically by Pixi when filter is applied
   */
  override apply(
    filterSystem: FilterSystem,
    input: Texture,
    output: RenderTexture,
    clearMode: boolean,
  ): void {
    // Update resolution uniform with current render target size
    this.uniforms.uResolution[0] = input.frame.width;
    this.uniforms.uResolution[1] = input.frame.height;

    super.apply(filterSystem, input, output, clearMode);
  }
}
