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
 * Upscale a (whole) spritesheet texture - each output pixel is classified
 * geometrically against the source pixel grid, so edges and 2:1 isometric
 * slopes are redrawn smoothly at the higher resolution without ever blending
 * new colours. A second pass then takes out the specks the first leaves where
 * a fitted line grazes a corner or two neighbouring fits fail to meet. The
 * shader sources describe the algorithm they implement.
 *
 * The returned RenderTexture has the same logical size as the source but a
 * backing store `bakedUpscaleFactor` times larger (via the texture source's
 * `resolution`), so spritesheet frame rects in 1x coordinates keep working
 * unchanged.
 */
export const bakeUpscaledTexture = (
  pixiRenderer: Renderer,
  /**
   * the 1x sheet to upscale; its scaleMode is forced to nearest since the
   * shader samples at texel centres
   */
  sourceTexture: Texture,
  /**
   * how much larger the baked backing store is than the source. Need not be
   * an integer, but integer factors give the crispest result
   */
  bakedUpscaleFactor: number,
): RenderTexture => {
  const { width, height } = sourceTexture;
  sourceTexture.source.scaleMode = "nearest";

  const geometry = new MeshGeometry({
    positions: new Float32Array([0, 0, width, 0, width, height, 0, height]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });

  const shader = Shader.from({
    gl: {
      vertex: upscaleQuadVert,
      // the two-pass art-aware variant, which is the one the game draws
      // with; the other two sources in this directory are a faithful port of
      // the original algorithm and an earlier fill-interpolating experiment,
      // kept to compare against
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
    resolution: bakedUpscaleFactor,
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
    resolution: bakedUpscaleFactor,
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
            1 / (width * bakedUpscaleFactor),
            1 / (height * bakedUpscaleFactor),
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
