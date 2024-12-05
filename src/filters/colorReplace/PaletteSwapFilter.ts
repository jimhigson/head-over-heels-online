import type { ColorSource } from "pixi.js";
import { Color, Filter, GlProgram } from "pixi.js";
import { vertex } from "../defaults";
import fragment from "./paletteSwap.frag?raw";

/** Options for the PaletteSwapFilter constructor. */
export interface PaletteSwapFilterOptions {
  /**
   * The color that will be changed.
   * @example [1.0, 1.0, 1.0] = 0xffffff
   * @default 0xff0000
   */
  originalColor?: ColorSource;
  /**
   * The resulting color.
   * @example [1.0, 1.0, 1.0] = 0xffffff
   * @default 0x000000
   */
  targetColor?: ColorSource;
  /**
   * Tolerance/sensitivity of the floating-point comparison between colors (lower = more exact, higher = more inclusive)
   * @default 0.4
   */
  tolerance?: number;
}

/**
 * Filter to emulate palette swapping from the indexed graphics days
 */
export class PaletteSwapFilter extends Filter {
  /** Default values for options. */
  public static readonly DEFAULT_OPTIONS: PaletteSwapFilterOptions = {
    originalColor: 0xff0000,
    targetColor: 0x000000,
    tolerance: 0.4,
  };

  public uniforms: {
    uOriginalColor: Float32Array;
    uTargetColor: Float32Array;
    uTolerance: number;
  };

  private _originalColor: Color;
  private _targetColor: Color;

  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(options: PaletteSwapFilterOptions) {
    options = { ...PaletteSwapFilter.DEFAULT_OPTIONS, ...options };

    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "palette-swap-filter",
    });

    super({
      //gpuProgram, the (more modern!) gpuProgram has been removed for the simple palette swap effects in head-over-heels-online
      // - this could be ported back later if support is good enough, but our demands are extremely low and glsl is fine
      glProgram,
      resources: {
        colorReplaceUniforms: {
          uOriginalColor: { value: new Float32Array(3), type: "vec3<f32>" },
          uTargetColor: { value: new Float32Array(3), type: "vec3<f32>" },
          uTolerance: { value: options.tolerance, type: "f32" },
        },
      },
    });

    this.uniforms = this.resources.colorReplaceUniforms.uniforms;

    this._originalColor = new Color();
    this._targetColor = new Color();
    this.originalColor = options.originalColor ?? 0xff0000;
    this.targetColor = options.targetColor ?? 0x000000;

    Object.assign(this, options);
  }

  /**
   * The color that will be changed.
   * @example [1.0, 1.0, 1.0] = 0xffffff
   * @default 0xff0000
   */
  get originalColor(): ColorSource {
    return this._originalColor.value as ColorSource;
  }
  set originalColor(value: ColorSource) {
    this._originalColor.setValue(value);
    const [r, g, b] = this._originalColor.toArray();

    this.uniforms.uOriginalColor[0] = r;
    this.uniforms.uOriginalColor[1] = g;
    this.uniforms.uOriginalColor[2] = b;
  }

  /**
   * The resulting color.
   * @example [1.0, 1.0, 1.0] = 0xffffff
   * @default 0x000000
   */
  get targetColor(): ColorSource {
    return this._targetColor.value as ColorSource;
  }
  set targetColor(value: ColorSource) {
    this._targetColor.setValue(value);
    const [r, g, b] = this._targetColor.toArray();

    this.uniforms.uTargetColor[0] = r;
    this.uniforms.uTargetColor[1] = g;
    this.uniforms.uTargetColor[2] = b;
  }

  /**
   * Tolerance/sensitivity of the floating-point comparison between colors (lower = more exact, higher = more inclusive)
   * @default 0.4
   */
  get tolerance(): number {
    return this.uniforms.uTolerance;
  }
  set tolerance(value: number) {
    this.uniforms.uTolerance = value;
  }
}
