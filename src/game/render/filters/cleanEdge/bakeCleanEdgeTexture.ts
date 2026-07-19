import {
  Mesh,
  MeshGeometry,
  type Renderer,
  RenderTexture,
  Shader,
  type Texture,
} from "pixi.js";

import cleanEdgeVert from "./cleanEdge.vert";
import cleanEdgeColourMixFrag from "./cleanEdgeColourMix.frag";

/**
 * cap on the cleanEdge bake factor: 4x is a 4096^2 backing store for the
 * 1024^2 sheet - within every GPU's guaranteed maximum texture size, and 16x
 * the video memory of the plain sheet per live variant
 */
export const maxCleanEdgeBakeFactor = 4;

/**
 * Upscale a (whole) spritesheet texture with the cleanEdge algorithm - each
 * output pixel is classified geometrically against the source pixel grid, so
 * edges and 2:1 isometric slopes are redrawn smoothly at the higher resolution
 * without ever blending new colours.
 *
 * The returned RenderTexture has the same logical size as the source but a
 * backing store `bakeFactor` times larger (via the texture source's
 * `resolution`), so spritesheet frame rects in 1x coordinates keep working
 * unchanged.
 */
export const bakeCleanEdgeTexture = (
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
  bakeFactor: number,
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
      vertex: cleanEdgeVert,
      // the art-aware variant: cleanEdge geometry on the
      // transparent/black/colour classes, with colour fills interpolated from
      // non-black neighbours (cleanEdge.frag is the faithful original)
      fragment: cleanEdgeColourMixFrag,
      name: "clean-edge-colour-mix",
    },
    resources: {
      uTexture: sourceTexture.source,
      uSampler: sourceTexture.source.style,
      cleanEdgeUniforms: {
        uSheetSize: { type: "vec2<f32>", value: [width, height] },
      },
    },
  });

  const mesh = new Mesh({ geometry, shader, texture: sourceTexture });

  const target = RenderTexture.create({
    width,
    height,
    resolution: bakeFactor,
  });

  pixiRenderer.render({
    container: mesh,
    target,
  });

  target.source.scaleMode = "nearest";

  mesh.destroy();
  geometry.destroy();
  shader.destroy();

  return target;
};
