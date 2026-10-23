import {
  Mesh,
  MeshGeometry,
  type Renderer,
  RenderTexture,
  Shader,
  type Texture,
  type TextureSource,
  type UniformData,
} from "pixi.js";

import despeckleFrag from "./despeckle.frag";
import despeckleShadingFrag from "./despeckleShading.frag";
import upscaleDealiasFrag from "./upscaleDealias.frag";
import upscaleGraphFrag from "./upscaleGraph.frag";
import upscaleGraphRoundFrag from "./upscaleGraphRound.frag";
import upscaleQuadVert from "./upscaleQuad.vert";
import upscaleStandInFrag from "./upscaleStandIn.frag";
import upscaleTwoPassFrag from "./upscaleTwoPass.frag";

type PassUniforms = Record<string, UniformData>;

/**
 * how many rounds the graph's crossings are settled over, the last two of
 * them the voting rounds. Each round settles the cells one step further from
 * what is already certain, so this bounds how deep into a lattice of strokes
 * the settlement reaches: eight settles every cell of the BlockStack sheet
 * exactly as more would
 */
const graphRounds = 8;

/**
 * one full-sheet pass: draws the geometry's quad through the fragment shader
 * into the target, then frees the shader
 */
const renderPass = (
  pixiRenderer: Renderer,
  geometry: MeshGeometry,
  fragment: string,
  name: string,
  /**
   * the texture the pass reads as uTexture
   */
  source: Texture,
  /**
   * any further textures the pass reads, by uniform name
   */
  otherTextures: Record<string, TextureSource>,
  uniforms: PassUniforms,
  target: RenderTexture,
) => {
  const shader = Shader.from({
    gl: {
      vertex: upscaleQuadVert,
      fragment,
      name,
    },
    resources: {
      uTexture: source.source,
      uSampler: source.source.style,
      ...otherTextures,
      [`${name}Uniforms`]: uniforms,
    },
  });
  const mesh = new Mesh({ geometry, shader, texture: source });
  pixiRenderer.render({ container: mesh, target });
  target.source.scaleMode = "nearest";
  mesh.destroy();
  shader.destroy();
};

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
  // the shaders sample exact texels to decide the edges they fit; a linear
  // sample would hand them blends of neighbouring pixels instead
  sourceTexture.source.scaleMode = "nearest";

  const geometry = new MeshGeometry({
    positions: new Float32Array([0, 0, width, 0, width, height, 0, height]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });

  const sheetSizeUniform: PassUniforms = {
    uSheetSize: { type: "vec2<f32>", value: [width, height] },
  };

  // the sheet every later pass reads: the source with the anti-aliasing at
  // its outline's corners taken out, since the upscale rounds them itself
  const dealiased = RenderTexture.create({ width, height, resolution: 1 });
  renderPass(
    pixiRenderer,
    geometry,
    upscaleDealiasFrag,
    "upscaleDealias",
    sourceTexture,
    {},
    sheetSizeUniform,
    dealiased,
  );

  // which diagonal of each 2x2 cell connects, decided once at 1x so every
  // fragment the upscale draws sees the same answer: found by one pass, then
  // settled over rounds that each read the last round's cells
  const graphTextures = [0, 1].map(() =>
    RenderTexture.create({ width, height, resolution: 1 }),
  );
  let [graph, previousGraph] = graphTextures;
  renderPass(
    pixiRenderer,
    geometry,
    upscaleGraphFrag,
    "upscaleGraph",
    dealiased,
    {},
    sheetSizeUniform,
    graph,
  );
  for (let round = 0; round < graphRounds; round++) {
    [graph, previousGraph] = [previousGraph, graph];
    renderPass(
      pixiRenderer,
      geometry,
      upscaleGraphRoundFrag,
      "upscaleGraphRound",
      dealiased,
      { uGraph: previousGraph.source },
      {
        ...sheetSizeUniform,
        uFinalStage: {
          type: "f32",
          value: Math.max(0, round - (graphRounds - 3)),
        },
      },
      graph,
    );
  }

  // every pixel's stand-in colour for the colour pass: a black pixel of the
  // linework reads as the fill nearest it, so the shading resolves as regions
  // that run on beneath the lines
  const standIn = RenderTexture.create({ width, height, resolution: 1 });
  renderPass(
    pixiRenderer,
    geometry,
    upscaleStandInFrag,
    "upscaleStandIn",
    dealiased,
    {},
    sheetSizeUniform,
    standIn,
  );

  const upscaled = RenderTexture.create({
    width,
    height,
    resolution: spritesheetUpscale,
  });
  renderPass(
    pixiRenderer,
    geometry,
    upscaleTwoPassFrag,
    "upscale",
    dealiased,
    { uGraph: graph.source, uStandIn: standIn.source },
    sheetSizeUniform,
    upscaled,
  );
  for (const graphTexture of graphTextures) {
    graphTexture.destroy(true);
  }
  standIn.destroy(true);
  dealiased.destroy(true);

  const pixelSizeUniform: PassUniforms = {
    uPixelSize: {
      type: "vec2<f32>",
      value: [
        1 / (width * spritesheetUpscale),
        1 / (height * spritesheetUpscale),
      ],
    },
  };
  // despeckled in two stages, as the upscale decides them: the linework
  // and silhouette first, then the shading within the fills
  const despeckled = RenderTexture.create({
    width,
    height,
    resolution: spritesheetUpscale,
  });
  renderPass(
    pixiRenderer,
    geometry,
    despeckleFrag,
    "despeckle",
    upscaled,
    {},
    pixelSizeUniform,
    despeckled,
  );
  upscaled.destroy(true);
  const target = RenderTexture.create({
    width,
    height,
    resolution: spritesheetUpscale,
  });
  renderPass(
    pixiRenderer,
    geometry,
    despeckleShadingFrag,
    "despeckleShading",
    despeckled,
    {},
    pixelSizeUniform,
    target,
  );
  despeckled.destroy(true);
  geometry.destroy();

  return target;
};
