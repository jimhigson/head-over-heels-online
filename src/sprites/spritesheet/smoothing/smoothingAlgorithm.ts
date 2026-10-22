import {
  Graphics,
  ImageSource,
  Mesh,
  MeshGeometry,
  RenderTexture,
  Shader,
  Texture,
  type TextureSource,
  type UniformData,
  WebGLRenderer,
} from "pixi.js";

import { installAppTickerAsPixiShared } from "../../../game/mainLoop/installAppTickerAsPixiShared";
import { valuesIter } from "../../../utils/entries";
import { type Xy } from "../../../utils/vectors/vectors";
import { awaitGpuCompletion } from "../../../utils/webgl/awaitGpuCompletion";
import {
  type FrameRect,
  repackSpritesheetForSmoothUpscale,
} from "../repackSpritesheetForSmoothUpscale";
import {
  makeSpritesheetData,
  type TextureId,
} from "../spritesheetData/makeSpritesheetData";
import {
  spritesheetMetas,
  type SpritesheetName,
} from "../spritesheetData/spritesheetMetaData";
import despeckleFrag from "./despeckle.frag";
import despeckleShadingFrag from "./despeckleShading.frag";
import upscaleArcAnchorsFrag from "./upscaleArcAnchors.frag";
import upscaleArcEllipseFrag from "./upscaleArcEllipse.frag";
import upscaleArcPeaksFrag from "./upscaleArcPeaks.frag";
import upscaleArcRingsFrag from "./upscaleArcRings.frag";
import upscaleArcsFrag from "./upscaleArcs.frag";
import upscaleArcSidesFrag from "./upscaleArcSides.frag";
import upscaleArcSpreadFrag from "./upscaleArcSpread.frag";
import upscaleDealiasFrag from "./upscaleDealias.frag";
import upscaleGraphFrag from "./upscaleGraph.frag";
import upscaleGraphRoundFrag from "./upscaleGraphRound.frag";
import upscaleOutlineWidthFrag from "./upscaleOutlineWidth.frag";
import upscaleQuadVert from "./upscaleQuad.vert";
import upscaleStandInFrag from "./upscaleStandIn.frag";
import upscaleTwoPassFrag from "./upscaleTwoPass.frag";

/**
 * an upscaled sheet held cpu-side, so any renderer (or a css blob) can take it
 */
export type SmoothedSpritesheetPixels = {
  /**
   * premultiplied rgba8, in the texel order of the smoothed texture
   */
  pixels: Uint8ClampedArray<ArrayBuffer>;
  pixelWidth: number;
  pixelHeight: number;
  /**
   * smoothed pixels per logical unit, horizontally
   */
  resolution: number;
  /**
   * smoothed pixels per source pixel, each axis: y realised to a whole number
   * of pixels over the sheet's height
   */
  smoothUpscale: Xy;
  /**
   * where each frame's art lies on the repacked sheet, by texture id, in
   * logical units
   */
  repackedFrameRects: ReadonlyMap<TextureId, FrameRect>;
};

/**
 * a smoothing as it goes: its progress, then its pixels
 */
export type SmoothedSpritesheetPixelsGenerator = AsyncGenerator<
  /**
   * yield a number [0..1) to represent progress in the smoothing,
   * since this can take some time
   */
  number,
  /**
   * the smoothed pixels, or undefined if the smoothing was stopped
   */
  SmoothedSpritesheetPixels | undefined
>;

/**
 * the uniforms the passes declare: each pass is given those it reads
 */
type PassUniforms = {
  uSheetSize?: UniformData;
  uLineClass?: UniformData;
  uFrame?: UniformData;
  uPart?: UniformData;
  uRing?: UniformData;
  uFinalStage?: UniformData;
  uPixelSize?: UniformData;
  uScale?: UniformData;
};

/**
 * the textures the passes read beyond uTexture: each pass is given those it
 * reads
 */
type PassTextures = {
  uGraph?: TextureSource;
  uStandIn?: TextureSource;
  uAnchors?: TextureSource;
  uPeaks?: TextureSource;
  uMasterPeaks?: TextureSource;
  uRings?: TextureSource;
  uSides0?: TextureSource;
  uSides1?: TextureSource;
  uSides2?: TextureSource;
  uSides3?: TextureSource;
  uSides4?: TextureSource;
  uSides5?: TextureSource;
  uSides6?: TextureSource;
  uSides7?: TextureSource;
  uArcPixels?: TextureSource;
  uArcs?: TextureSource;
  uArcCentres?: TextureSource;
  uArcAxes?: TextureSource;
  uArcExponents?: TextureSource;
  uColourArcs?: TextureSource;
  uColourArcCentres?: TextureSource;
  uColourArcAxes?: TextureSource;
  uColourArcExponents?: TextureSource;
  uFrames?: TextureSource;
};

/**
 * how many rounds the graph's crossings are settled over, the last two of
 * them the voting rounds. Each round settles the cells one step further from
 * what is already certain, so this bounds how deep into a lattice of strokes
 * the settlement reaches: eight settles every cell of the BlockStack sheet
 * exactly as more would
 */
const graphRounds = 8;

/**
 * the frames the arc passes read the outline in: each quarter's, and each
 * mirrored
 */
const arcFrames = 8;

/**
 * a quad over a texture of the given logical size, sampling the whole source
 */
const makeQuad = (width: number, height: number) =>
  new MeshGeometry({
    positions: new Float32Array([0, 0, width, 0, width, height, 0, height]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
  });

/**
 * y's upscale as smoothed: whatever makes a whole number of pixels over the
 * sheet's height
 */
const realisedSmoothUpscaleY = (height: number, { y }: Xy) =>
  Math.round(height * y) / height;

/**
 * outlines are grown a smoothed pixel a pass, to a source pixel on the axis that
 * takes most
 */
const outlineWidthPassCount = (
  smoothUpscaleX: number,
  smoothUpscaleY: number,
) => Math.ceil(Math.max(smoothUpscaleX, smoothUpscaleY)) - 1;

/**
 * a run of the smoothing's passes, yielding as each is done and returning what
 * they made
 */
type SmoothingPasses<Made> = AsyncGenerator<void, Made>;

/**
 * one full-sheet pass: draws the geometry's quad through the fragment shader
 * into the target and lets the GPU finish it, then frees the shader, and
 * yields once it is done. Each pass's shader is compiled at its draw, so the
 * smoothing's compiles are spread over tasks of their own rather than holding the
 * main thread all at once
 */
async function* renderPass(
  pixiRenderer: WebGLRenderer,
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
  otherTextures: PassTextures,
  uniforms: PassUniforms,
  target: RenderTexture,
): SmoothingPasses<void> {
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
  await awaitGpuCompletion(pixiRenderer.gl);
  target.source.scaleMode = "nearest";
  mesh.destroy();
  shader.destroy();
  yield;
}

/**
 * a mask of a sheet at 1x: each frame's rect in a colour of its own, and
 * transparent in the space between them, so a pass can tell one frame
 * from the next even where they lie flush
 */
const renderFrameRectsMask = (
  pixiRenderer: WebGLRenderer,
  frameRects: Iterable<FrameRect>,
  /**
   * the sheet's size, in 1x pixels
   */
  width: number,
  height: number,
): RenderTexture => {
  const rects = new Graphics();
  let frameIndex = 0;
  for (const { x, y, w, h } of frameRects) {
    frameIndex++;
    // the index itself as the colour: never zero, and distinct per frame
    rects.rect(x, y, w, h).fill(frameIndex);
  }
  const mask = RenderTexture.create({ width, height, resolution: 1 });
  pixiRenderer.render({ container: rects, target: mask });
  rects.destroy();
  mask.source.scaleMode = "nearest";
  return mask;
};

/**
 * the smoothing's passes, yielding as each one is done
 */
async function* smoothingPasses(
  pixiRenderer: WebGLRenderer,
  /**
   * the 1x sheet to upscale
   */
  sourceTexture: Texture,
  /**
   * smoothed pixels per source pixel, each axis at its own factor. x must be a
   * whole number - a fractional one puts the smoothed texels off the pixel grid
   * and looks bad. y may be fractional, for non-square pixels; it is
   * realised to a whole number of smoothed pixels over the sheet's height
   */
  spritesheetSmoothUpscale: Xy,
  /**
   * where the frames lie on the sheet: the outlines are only ever widened
   * inside them, and never from one frame into another
   */
  frameRects: Iterable<FrameRect>,
): SmoothingPasses<RenderTexture> {
  const { width, height } = sourceTexture;
  const { x: smoothUpscaleX } = spritesheetSmoothUpscale;
  const smoothedPixelHeight = Math.round(height * spritesheetSmoothUpscale.y);
  const smoothUpscaleY = smoothedPixelHeight / height;
  // the smoothed textures are at x's resolution, so their height in logical
  // units carries whatever y differs from it by
  const smoothedHeight = smoothedPixelHeight / smoothUpscaleX;
  // the shaders sample exact texels to decide the edges they fit; a linear
  // sample would hand them blends of neighbouring pixels instead
  sourceTexture.source.scaleMode = "nearest";

  const geometry = makeQuad(width, height);
  // the quad over a smoothed texture, whose logical height is not the sheet's
  const smoothedGeometry = makeQuad(width, smoothedHeight);

  const sheetSizeUniform: PassUniforms = {
    uSheetSize: { type: "vec2<f32>", value: [width, height] },
  };

  // the sheet every later pass reads: the source with the anti-aliasing at
  // its outline's corners taken out, since the upscale rounds them itself
  const dealiased = RenderTexture.create({ width, height, resolution: 1 });
  yield* renderPass(
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
  yield* renderPass(
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
    yield* renderPass(
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
  yield* renderPass(
    pixiRenderer,
    geometry,
    upscaleStandInFrag,
    "upscaleStandIn",
    dealiased,
    {},
    sheetSizeUniform,
    standIn,
  );

  // the arcs in the outlines, and which pixels are drawn to their curves:
  // quarter arcs and over-the-top ones found at their anchors, then told to
  // the arcs' own pixels, then to the pixels beside them; and each arc's
  // curve, kept at its anchor
  async function* findArcs(
    /**
     * 0 for the black outlines most items have, 1 for the coloured ones of
     * dark items
     */
    lineClass: number,
    /**
     * the black outlines' peaks, which coloured strokes may be stacked with;
     * absent for the black outlines' own pass, which looks to its own
     */
    masterPeaks: RenderTexture | undefined,
  ) {
    const arcUniforms: PassUniforms = {
      ...sheetSizeUniform,
      uLineClass: { type: "f32", value: lineClass },
    };
    async function* arcPass(
      fragment: string,
      name: string,
      otherTextures: PassTextures,
      uniforms: PassUniforms,
    ): SmoothingPasses<RenderTexture> {
      const target = RenderTexture.create({ width, height, resolution: 1 });
      yield* renderPass(
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
    }
    const anchors = yield* arcPass(
      upscaleArcAnchorsFrag,
      "upscaleArcAnchors",
      {},
      arcUniforms,
    );
    // the outline's sides in each frame, then from them whether each peak's
    // ring closes: passes of their own, as the peaks pass doing all of
    // this itself is too slow for some drivers to compile
    const sides: RenderTexture[] = [];
    for (let frame = 0; frame < arcFrames; frame++) {
      sides.push(
        yield* arcPass(
          upscaleArcSidesFrag,
          "upscaleArcSides",
          {},
          {
            ...arcUniforms,
            uFrame: { type: "f32", value: frame },
          },
        ),
      );
    }
    const [
      uSides0,
      uSides1,
      uSides2,
      uSides3,
      uSides4,
      uSides5,
      uSides6,
      uSides7,
    ] = sides.map(({ source }) => source);
    const rings = yield* arcPass(
      upscaleArcRingsFrag,
      "upscaleArcRings",
      {
        uSides0,
        uSides1,
        uSides2,
        uSides3,
        uSides4,
        uSides5,
        uSides6,
        uSides7,
      },
      arcUniforms,
    );
    for (const sidesOfFrame of sides) {
      sidesOfFrame.destroy(true);
    }
    const peaks = yield* arcPass(
      upscaleArcPeaksFrag,
      "upscaleArcPeaks",
      { uRings: rings.source },
      arcUniforms,
    );
    rings.destroy(true);
    const ellipsePass = (part: number) =>
      arcPass(
        upscaleArcEllipseFrag,
        "upscaleArcEllipse",
        {
          uAnchors: anchors.source,
          uPeaks: peaks.source,
          uMasterPeaks: (masterPeaks ?? peaks).source,
        },
        { ...arcUniforms, uPart: { type: "f32", value: part } },
      );
    // one at a time, so only one pass's strip is ever on the GPU
    const centres = yield* ellipsePass(0);
    const axes = yield* ellipsePass(1);
    const exponents = yield* ellipsePass(2);
    const ellipses = {
      uArcCentres: centres.source,
      uArcAxes: axes.source,
      uArcExponents: exponents.source,
    };
    const arcPixels = yield* arcPass(
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
    const firstRing = yield* spreadPass(arcPixels, 0);
    arcPixels.destroy(true);
    // only coloured lines' arcs can be layered, and need the second ring
    const pixels =
      lineClass === 0 ? firstRing : yield* spreadPass(firstRing, 1);
    if (pixels !== firstRing) {
      firstRing.destroy(true);
    }
    anchors.destroy(true);
    return { pixels, centres, axes, exponents, peaks };
  }
  const blackArcs = yield* findArcs(0, undefined);
  const colourArcs = yield* findArcs(1, blackArcs.peaks);

  const smoothedTexture = () => {
    const texture = RenderTexture.create({
      width,
      height: smoothedHeight,
      resolution: smoothUpscaleX,
    });
    // sized again, to whole pixels: with a fractional y, the logical height
    // times the resolution can come out a hair under the whole number
    texture.resize(width, smoothedHeight, smoothUpscaleX);
    return texture;
  };

  const upscaled = smoothedTexture();
  yield* renderPass(
    pixiRenderer,
    smoothedGeometry,
    upscaleTwoPassFrag,
    "upscale",
    dealiased,
    {
      uGraph: graph.source,
      uStandIn: standIn.source,
      uArcs: blackArcs.pixels.source,
      uArcCentres: blackArcs.centres.source,
      uArcAxes: blackArcs.axes.source,
      uArcExponents: blackArcs.exponents.source,
      uColourArcs: colourArcs.pixels.source,
      uColourArcCentres: colourArcs.centres.source,
      uColourArcAxes: colourArcs.axes.source,
      uColourArcExponents: colourArcs.exponents.source,
    },
    sheetSizeUniform,
    upscaled,
  );
  for (const graphTexture of graphTextures) {
    graphTexture.destroy(true);
  }
  standIn.destroy(true);
  for (const blackArcTexture of valuesIter(blackArcs)) {
    blackArcTexture.destroy(true);
  }
  for (const colourArcTexture of valuesIter(colourArcs)) {
    colourArcTexture.destroy(true);
  }
  dealiased.destroy(true);

  const pixelSizeUniform: PassUniforms = {
    uPixelSize: {
      type: "vec2<f32>",
      value: [1 / (width * smoothUpscaleX), 1 / smoothedPixelHeight],
    },
  };
  // the outlines held to at least a source pixel wide, grown a smoothed pixel
  // a pass, and only within the frames
  const frameMask = renderFrameRectsMask(
    pixiRenderer,
    frameRects,
    width,
    height,
  );
  const outlineWidthUniforms: PassUniforms = {
    ...pixelSizeUniform,
    uScale: { type: "vec2<f32>", value: [smoothUpscaleX, smoothUpscaleY] },
  };
  const outlineWidthPasses = outlineWidthPassCount(
    smoothUpscaleX,
    smoothUpscaleY,
  );
  let widened = upscaled;
  for (let pass = 0; pass < outlineWidthPasses; pass++) {
    const target = smoothedTexture();
    yield* renderPass(
      pixiRenderer,
      smoothedGeometry,
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
  const despeckled = smoothedTexture();
  yield* renderPass(
    pixiRenderer,
    smoothedGeometry,
    despeckleFrag,
    "despeckle",
    widened,
    {},
    pixelSizeUniform,
    despeckled,
  );
  widened.destroy(true);
  const target = smoothedTexture();
  yield* renderPass(
    pixiRenderer,
    smoothedGeometry,
    despeckleShadingFrag,
    "despeckleShading",
    despeckled,
    {},
    pixelSizeUniform,
    target,
  );
  despeckled.destroy(true);
  geometry.destroy();
  smoothedGeometry.destroy();

  return target;
}

/**
 * how many passes {@link smoothingPasses} renders at this upscale
 */
const passCount = (
  /**
   * the 1x sheet's height
   */
  height: number,
  spritesheetSmoothUpscale: Xy,
): number => {
  // anchors, the sides in each frame, rings, peaks, the ellipse's three
  // parts and the arcs' pixels, then their spread: one ring for the black
  // outlines, two for the coloured
  const arcPasses = 1 + arcFrames + 1 + 1 + 3 + 1;
  const blackArcPasses = arcPasses + 1;
  const colourArcPasses = arcPasses + 2;
  const outlineWidthPasses = outlineWidthPassCount(
    spritesheetSmoothUpscale.x,
    realisedSmoothUpscaleY(height, spritesheetSmoothUpscale),
  );
  return (
    // dealias, graph and its rounds, stand-ins
    1 +
    1 +
    graphRounds +
    1 +
    blackArcPasses +
    colourArcPasses +
    // the upscale itself
    1 +
    outlineWidthPasses +
    // the two despeckle stages
    2
  );
};

/**
 * Create an upscaled version of the given Texture, a pass at a time across
 * many tasks so the main thread is not held for the whole smoothing. Yields how
 * far through the smoothing it is, from 0 to 1, as each pass is done; returns the
 * upscaled texture
 */
async function* renderSmoothingPasses(
  pixiRenderer: WebGLRenderer,
  /**
   * the 1x sheet to upscale
   */
  sourceTexture: Texture,
  /**
   * smoothed pixels per source pixel, each axis - see {@link smoothingPasses}
   */
  spritesheetSmoothUpscale: Xy,
  /**
   * where the frames lie on the sheet - see {@link smoothingPasses}
   */
  frameRects: Iterable<FrameRect>,
  /**
   * stops the smoothing after the pass it is on, returning undefined. What it
   * leaves on the GPU goes with the renderer it was smoothing in
   */
  signal: AbortSignal,
): AsyncGenerator<
  /**
   * yield a number [0..1) to represent progress in the smoothing,
   * since this can take some time
   */
  number,
  RenderTexture | undefined
> {
  const totalPasses = passCount(sourceTexture.height, spritesheetSmoothUpscale);
  const passes = smoothingPasses(
    pixiRenderer,
    sourceTexture,
    spritesheetSmoothUpscale,
    frameRects,
  );
  let passesDone = 0;
  for (;;) {
    const next = await passes.next();
    if (next.done) {
      if (import.meta.env.DEV && passesDone !== totalPasses) {
        throw new Error(
          `the smoothing rendered ${passesDone} passes, but ${totalPasses} were counted`,
        );
      }
      return next.value;
    }
    if (signal.aborted) {
      return undefined;
    }
    passesDone++;
    yield passesDone / totalPasses;
  }
}

/**
 * smooth a sheet's art in a renderer of its own, yielding progress from 0 to
 * 1 - undefined if `signal` stops it part way
 */
export async function* smoothingAlgorithm(
  image: ImageBitmap,
  spritesheetName: SpritesheetName,
  smoothUpscale: Xy,
  signal: AbortSignal,
): SmoothedSpritesheetPixelsGenerator {
  // this can be the first renderer in the session - eg on the menus, with no
  // game yet - and initialising one reads pixi's scheduler ticker:
  installAppTickerAsPixiShared();
  const pixiRenderer = new WebGLRenderer();
  await pixiRenderer.init({ width: 1, height: 1, antialias: false });
  const { gl } = pixiRenderer;
  try {
    const rawTexture = new Texture({
      source: new ImageSource({ resource: image }),
    });
    const repacked = repackSpritesheetForSmoothUpscale(
      pixiRenderer,
      rawTexture,
      makeSpritesheetData(spritesheetMetas[spritesheetName]).frames,
    );
    rawTexture.destroy(true);
    const smoothedRenderTexture = yield* renderSmoothingPasses(
      pixiRenderer,
      repacked.texture,
      smoothUpscale,
      repacked.repackedCellRects.values(),
      signal,
    );
    const { height: repackedHeight } = repacked.texture;
    repacked.texture.destroy(true);
    if (smoothedRenderTexture === undefined) {
      return undefined;
    }
    try {
      if (gl.isContextLost()) {
        // whatever the smoothing drew went nowhere
        throw new Error("webgl context lost while smoothing the spritesheet");
      }
      const { pixels, width, height } = pixiRenderer.texture.getPixels(
        smoothedRenderTexture,
      );
      return {
        // pixi types its readback as over any buffer, but it reads into a
        // plain ArrayBuffer
        pixels: pixels as Uint8ClampedArray<ArrayBuffer>,
        pixelWidth: width,
        pixelHeight: height,
        resolution: smoothedRenderTexture.source.resolution,
        smoothUpscale: { x: smoothUpscale.x, y: height / repackedHeight },
        repackedFrameRects: repacked.repackedFrameRects,
      };
    } finally {
      smoothedRenderTexture.destroy(true);
    }
  } finally {
    // holding it would keep a second webgl context alive for the session
    pixiRenderer.destroy();
    // and losing the context frees everything on the GPU at once, including
    // whatever a smoothing stopped part way left behind
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
