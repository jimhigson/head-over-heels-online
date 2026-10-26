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

import { type FrameRect } from "../../../../sprites/spritesheet/composeSpritesheetForUpscale";
import { type Xy } from "../../../../utils/vectors/vectors";
import despeckleFrag from "./despeckle.frag";
import despeckleShadingFrag from "./despeckleShading.frag";
import { renderFrameRectsMask } from "./renderFrameRectsMask";
import upscaleArcAnchorsFrag from "./upscaleArcAnchors.frag";
import upscaleArcEllipseFrag from "./upscaleArcEllipse.frag";
import upscaleArcPeaksFrag from "./upscaleArcPeaks.frag";
import upscaleArcsFrag from "./upscaleArcs.frag";
import upscaleArcSpreadFrag from "./upscaleArcSpread.frag";
import upscaleDealiasFrag from "./upscaleDealias.frag";
import upscaleGraphFrag from "./upscaleGraph.frag";
import upscaleGraphRoundFrag from "./upscaleGraphRound.frag";
import upscaleOutlineWidthFrag from "./upscaleOutlineWidth.frag";
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
   * baked pixels per source pixel, each axis at its own factor. x must be a
   * whole number - a fractional one puts the baked texels off the pixel grid
   * and looks bad. y may be fractional, for non-square pixels; it is
   * realised to a whole number of baked pixels over the sheet's height
   */
  spritesheetUpscale: Xy,
  /**
   * where the frames lie on the sheet: the outlines are only ever widened
   * inside them, and never from one frame into another
   */
  frameRects: Iterable<FrameRect>,
): RenderTexture => {
  const { width, height } = sourceTexture;
  const { x: upscaleX } = spritesheetUpscale;
  const bakedPixelHeight = Math.round(height * spritesheetUpscale.y);
  const upscaleY = bakedPixelHeight / height;
  // the baked textures are at x's resolution, so their height in logical
  // units carries whatever y differs from it by
  const bakedHeight = bakedPixelHeight / upscaleX;
  // the shaders sample exact texels to decide the edges they fit; a linear
  // sample would hand them blends of neighbouring pixels instead
  sourceTexture.source.scaleMode = "nearest";

  const geometry = new MeshGeometry({
    positions: new Float32Array([0, 0, width, 0, width, height, 0, height]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });
  // the quad over a baked texture, whose logical height is not the sheet's
  const bakedGeometry = new MeshGeometry({
    positions: new Float32Array([
      0,
      0,
      width,
      0,
      width,
      bakedHeight,
      0,
      bakedHeight,
    ]),
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

  // the arcs in the outlines, and which pixels are drawn to their ellipses:
  // quarter arcs and over-the-top ones found at their anchors, then told to
  // the arcs' own pixels, then to the pixels beside them; and each arc's
  // ellipse, kept at its anchor
  const findArcs = (
    /**
     * 0 for the black outlines most items have, 1 for the coloured ones of
     * dark items
     */
    lineClass: number,
  ) => {
    const arcUniforms: PassUniforms = {
      ...sheetSizeUniform,
      uLineClass: { type: "f32", value: lineClass },
    };
    const arcPass = (
      fragment: string,
      name: string,
      otherTextures: Record<string, TextureSource>,
      uniforms: PassUniforms,
    ) => {
      const target = RenderTexture.create({ width, height, resolution: 1 });
      renderPass(
        pixiRenderer,
        geometry,
        fragment,
        name,
        dealiased,
        otherTextures,
        uniforms,
        target,
      );
      return target;
    };
    const anchors = arcPass(
      upscaleArcAnchorsFrag,
      "upscaleArcAnchors",
      {},
      arcUniforms,
    );
    const peaks = arcPass(
      upscaleArcPeaksFrag,
      "upscaleArcPeaks",
      {},
      arcUniforms,
    );
    const [centres, axes] = [0, 1].map((part) =>
      arcPass(
        upscaleArcEllipseFrag,
        "upscaleArcEllipse",
        { uAnchors: anchors.source, uPeaks: peaks.source },
        { ...arcUniforms, uPart: { type: "f32", value: part } },
      ),
    );
    const ellipses = { uArcCentres: centres.source, uArcAxes: axes.source };
    const arcPixels = arcPass(
      upscaleArcsFrag,
      "upscaleArcs",
      { uAnchors: anchors.source, uPeaks: peaks.source, ...ellipses },
      arcUniforms,
    );
    const spreadPass = (from: RenderTexture, ring: number) =>
      arcPass(
        upscaleArcSpreadFrag,
        "upscaleArcSpread",
        { uArcPixels: from.source, ...ellipses },
        { ...arcUniforms, uRing: { type: "f32", value: ring } },
      );
    const firstRing = spreadPass(arcPixels, 0);
    arcPixels.destroy(true);
    // only coloured lines' arcs can be layered, and need the second ring
    const pixels = lineClass === 0 ? firstRing : spreadPass(firstRing, 1);
    if (pixels !== firstRing) {
      firstRing.destroy(true);
    }
    anchors.destroy(true);
    peaks.destroy(true);
    return { pixels, centres, axes };
  };
  const blackArcs = findArcs(0);
  const colourArcs = findArcs(1);

  const bakedTexture = () => {
    const texture = RenderTexture.create({
      width,
      height: bakedHeight,
      resolution: upscaleX,
    });
    // sized again, to whole pixels: with a fractional y, the logical height
    // times the resolution can come out a hair under the whole number
    texture.resize(width, bakedHeight, upscaleX);
    return texture;
  };

  const upscaled = bakedTexture();
  renderPass(
    pixiRenderer,
    bakedGeometry,
    upscaleTwoPassFrag,
    "upscale",
    dealiased,
    {
      uGraph: graph.source,
      uStandIn: standIn.source,
      uArcs: blackArcs.pixels.source,
      uArcCentres: blackArcs.centres.source,
      uArcAxes: blackArcs.axes.source,
      uColourArcs: colourArcs.pixels.source,
      uColourArcCentres: colourArcs.centres.source,
      uColourArcAxes: colourArcs.axes.source,
    },
    sheetSizeUniform,
    upscaled,
  );
  for (const graphTexture of graphTextures) {
    graphTexture.destroy(true);
  }
  standIn.destroy(true);
  for (const arcTexture of [
    ...Object.values(blackArcs),
    ...Object.values(colourArcs),
  ]) {
    arcTexture.destroy(true);
  }
  dealiased.destroy(true);

  const pixelSizeUniform: PassUniforms = {
    uPixelSize: {
      type: "vec2<f32>",
      value: [1 / (width * upscaleX), 1 / bakedPixelHeight],
    },
  };
  // the outlines held to at least a source pixel wide, grown a baked pixel
  // a pass, and only within the frames
  const frameMask = renderFrameRectsMask(
    pixiRenderer,
    frameRects,
    width,
    height,
  );
  const outlineWidthUniforms: PassUniforms = {
    ...pixelSizeUniform,
    uScale: { type: "vec2<f32>", value: [upscaleX, upscaleY] },
  };
  // grown a baked pixel a pass, to a source pixel on the axis that takes most
  const outlineWidthPasses = Math.ceil(Math.max(upscaleX, upscaleY)) - 1;
  let widened = upscaled;
  for (let pass = 0; pass < outlineWidthPasses; pass++) {
    const target = bakedTexture();
    renderPass(
      pixiRenderer,
      bakedGeometry,
      upscaleOutlineWidthFrag,
      "upscaleOutlineWidth",
      widened,
      { uFrames: frameMask.source },
      outlineWidthUniforms,
      target,
    );
    widened.destroy(true);
    widened = target;
  }
  frameMask.destroy(true);

  // despeckled in two stages, as the upscale decides them: the linework
  // and silhouette first, then the shading within the fills
  const despeckled = bakedTexture();
  renderPass(
    pixiRenderer,
    bakedGeometry,
    despeckleFrag,
    "despeckle",
    widened,
    {},
    pixelSizeUniform,
    despeckled,
  );
  widened.destroy(true);
  const target = bakedTexture();
  renderPass(
    pixiRenderer,
    bakedGeometry,
    despeckleShadingFrag,
    "despeckleShading",
    despeckled,
    {},
    pixelSizeUniform,
    target,
  );
  despeckled.destroy(true);
  geometry.destroy();
  bakedGeometry.destroy();

  return target;
};
