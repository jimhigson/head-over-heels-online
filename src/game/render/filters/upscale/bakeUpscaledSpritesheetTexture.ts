import {
  Mesh,
  MeshGeometry,
  type Renderer,
  RenderTexture,
  Shader,
  type Texture,
} from "pixi.js";

import despeckleFrag from "./despeckle.frag";
import upscaleQuadVert from "./upscaleQuad.vert";
import upscaleTwoPassFrag from "./upscaleTwoPass.frag";

/**
 * Create an upscaled version of the given Texture
 */
export const bakeUpscaledSpritesheetTexture = (
  pixiRenderer: Renderer,
  /**
   * the 1x sheet to upscale
   */
  sourceTexture: Texture,
  /**
   * factor to upscale by. Must be a whole number - fractional factors put the
   * baked texels off the pixel grid and look bad
   */
  spritesheetUpscale: number,
): RenderTexture => {
  const { width, height } = sourceTexture;
  // the shader samples exact texels to decide the edges it fits; a linear
  // sample would hand it blends of neighbouring pixels instead
  sourceTexture.source.scaleMode = "nearest";

  const geometry = new MeshGeometry({
    positions: new Float32Array([0, 0, width, 0, width, height, 0, height]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });

  const shader = Shader.from({
    gl: {
      vertex: upscaleQuadVert,
      fragment: upscaleTwoPassFrag,
      name: "upscale-two-pass",
    },
    resources: {
      uTexture: sourceTexture.source,
      uSampler: sourceTexture.source.style,
      upscaleUniforms: {
        uSheetSize: { type: "vec2<f32>", value: [width, height] },
      },
    },
  });

  const mesh = new Mesh({ geometry, shader, texture: sourceTexture });

  const upscaled = RenderTexture.create({
    width,
    height,
    resolution: spritesheetUpscale,
  });

  pixiRenderer.render({
    container: mesh,
    target: upscaled,
  });

  upscaled.source.scaleMode = "nearest";

  mesh.destroy();
  shader.destroy();

  const target = RenderTexture.create({
    width,
    height,
    resolution: spritesheetUpscale,
  });

  const despeckleShader = Shader.from({
    gl: {
      vertex: upscaleQuadVert,
      fragment: despeckleFrag,
      name: "upscale-despeckle",
    },
    resources: {
      uTexture: upscaled.source,
      uSampler: upscaled.source.style,
      despeckleUniforms: {
        uPixelSize: {
          type: "vec2<f32>",
          value: [
            1 / (width * spritesheetUpscale),
            1 / (height * spritesheetUpscale),
          ],
        },
      },
    },
  });
  const despeckleMesh = new Mesh({
    geometry,
    shader: despeckleShader,
    texture: upscaled,
  });

  pixiRenderer.render({
    container: despeckleMesh,
    target,
  });

  target.source.scaleMode = "nearest";

  despeckleMesh.destroy();
  despeckleShader.destroy();
  upscaled.destroy(true);
  geometry.destroy();

  return target;
};
