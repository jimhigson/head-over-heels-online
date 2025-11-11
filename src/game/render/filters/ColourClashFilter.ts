import { Filter, GlProgram, GpuProgram, Texture } from "pixi.js";

import fragment from "./colourClash.frag";
import { vertex } from "./defaults";

// Minimal WGSL just for binding metadata - won't actually execute on WebGL.
// this is needed because of a bug in pixi.js - https://github.com/pixijs/pixijs/issues/11745
// TODO: can be removed once this PR makes it into a pixi release: https://github.com/pixijs/pixijs/pull/11754
const minimalWgsl = `
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;
@group(0) @binding(3) var uBackTexture: texture_2d<f32>;

@vertex
fn mainVertex(@location(0) aPosition : vec2<f32>) -> @builtin(position) vec4<f32> {
  return vec4<f32>(0.0, 0.0, 0.0, 1.0);
}

@fragment
fn mainFragment() -> @location(0) vec4<f32> {
  return vec4<f32>(0.0, 0.0, 0.0, 1.0);
}
`;

/**
 * Filter to use a colour from the backbuffer for non-black pixels
 */
export class ColourClashFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "colour-clash-filter",
    });

    const gpuProgram = GpuProgram.from({
      vertex: {
        source: minimalWgsl,
        entryPoint: "mainVertex",
      },
      fragment: {
        source: minimalWgsl,
        entryPoint: "mainFragment",
      },
    });

    super({
      glProgram,
      gpuProgram,
      resources: {
        colorReplaceUniforms: {},
        uBackTexture: Texture.EMPTY,
      },
      blendRequired: true,
    });
  }
}

// singleton instance since this has no params
export const colourClashFilter = new ColourClashFilter();
