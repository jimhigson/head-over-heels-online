import {
  Mesh,
  MeshGeometry,
  type Renderer,
  RenderTexture,
  type Texture,
} from "pixi.js";

import { objectEntriesIter } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { type AppSpritesheetDataWithVariants } from "./AppSpritesheet";
import { packAllFrames } from "./spritesheetData/packAllFrames";
import { apronWidth, tilingRepeatsOf } from "./spritesheetData/tilingRepeats";

/** a frame's place on the sheet */
export type FrameRect = { x: number; y: number; w: number; h: number };
type Rect = FrameRect;

export type UpscaleSheet = {
  /** the sheet to upscale in place of the authored one */
  texture: RenderTexture;
  /** where each frame's art now lives, by texture id */
  frameOverrides: ReadonlyMap<string, FrameRect>;
};

/**
 * the same frames at their places in the repacked sheet - every stage that
 * blits from it has to read the frame where it now is, not where the authored
 * image had it. Only the rect moves: a frame also carries its `pivot` and
 * `flipX`, which say how the art is drawn rather than where it is stored.
 */
export const withRepackedRects = (
  frames: AppSpritesheetDataWithVariants["frames"],
  overrides: ReadonlyMap<string, FrameRect>,
): AppSpritesheetDataWithVariants["frames"] => {
  const repacked = {} as AppSpritesheetDataWithVariants["frames"];
  for (const [id, entry] of objectEntriesIter(frames)) {
    const override = overrides.get(id);
    repacked[id] =
      override === undefined ? entry : (
        { ...entry, frame: { ...entry.frame, ...override } }
      );
  }
  return repacked;
};

const intersect = (a: Rect, b: Rect): Rect | undefined => {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const bottom = Math.min(a.y + a.h, b.y + b.h);
  return right > x && bottom > y ?
      { x, y, w: right - x, h: bottom - y }
    : undefined;
};

/**
 * the parts of `rect` lying outside `hole`, as up to four strips: one above it,
 * one below, and one either side between those.
 *
 * A neighbour's copy is cut to these so it can only ever land in the apron. A
 * floor's neighbours sit half a frame away - well inside its cell - so without
 * this they would paint over the frame's own art, and the tile would come out
 * as halves of two different ones.
 */
const outside = (rect: Rect, hole: Rect): ReadonlyArray<Rect> => {
  const overlap = intersect(rect, hole);
  if (overlap === undefined) {
    return [rect];
  }
  const strips: Array<Rect> = [];
  const push = (x: number, y: number, w: number, h: number) => {
    if (w > 0 && h > 0) {
      strips.push({ x, y, w, h });
    }
  };
  push(rect.x, rect.y, rect.w, overlap.y - rect.y);
  push(
    rect.x,
    overlap.y + overlap.h,
    rect.w,
    rect.y + rect.h - (overlap.y + overlap.h),
  );
  push(rect.x, overlap.y, overlap.x - rect.x, overlap.h);
  push(
    overlap.x + overlap.w,
    overlap.y,
    rect.x + rect.w - (overlap.x + overlap.w),
    overlap.h,
  );
  return strips;
};

/**
 * Repacks the authored image into the sheet the cleanEdge upscale runs on.
 *
 * Every frame is copied into a fresh layout, and the tiled ones - the walls and
 * floors - are given an apron holding the pixels their neighbouring instance
 * would show there. The upscale then sees a tile's real neighbours across its
 * edges rather than whatever the atlas packed alongside it, and smooths a seam
 * as continuously as it does the middle of a tile. The apron stays in the
 * sheet, so sampling a tile at draw time cannot bleed in from elsewhere either.
 *
 * Repacking rather than aproning the authored layout in place is what makes
 * room for the aprons: the authored image has no space free in usable blocks,
 * and pixels no frame names sitting in the space it does have. Here the layout
 * is ours, so an apron is only a wider gutter, and nothing is copied that no
 * frame names.
 *
 * The composition is one mesh: per frame a quad for its art, and one per strip
 * of apron reading the region of that same frame its neighbour would show. The
 * strips are cut by rectangle arithmetic - no masking, no blend modes, nothing
 * that could differ between renderers - so it stays a single draw of plain
 * quads.
 */
export const composeUpscaleSheet = (
  pixiRenderer: Renderer,
  sourceTexture: Texture,
  frames: AppSpritesheetDataWithVariants["frames"],
): UpscaleSheet => {
  const { width: sheetWidth, height: sheetHeight } = sourceTexture;

  const repeatsOf = new Map<string, ReadonlyArray<Xy>>();
  // the packer lays out whatever rects it is handed, so a tiled frame is
  // handed its cell - the art plus the apron it needs around it
  const cellFrames = {} as AppSpritesheetDataWithVariants["frames"];
  for (const [id, entry] of objectEntriesIter(frames)) {
    const repeats = tilingRepeatsOf(id, entry.frame);
    repeatsOf.set(id, repeats);
    cellFrames[id] =
      repeats.length === 0 ?
        entry
      : {
          ...entry,
          frame: {
            ...entry.frame,
            x: entry.frame.x - apronWidth,
            y: entry.frame.y - apronWidth,
            w: entry.frame.w + apronWidth * 2,
            h: entry.frame.h + apronWidth * 2,
          },
        };
  }

  const pack = packAllFrames(cellFrames, () => "upscale", sheetWidth);

  const vertices: Array<number> = [];
  const uvs: Array<number> = [];
  const indices: Array<number> = [];
  const quad = (dest: Rect, src: Rect) => {
    const i = vertices.length / 2;
    vertices.push(
      dest.x,
      dest.y,
      dest.x + dest.w,
      dest.y,
      dest.x + dest.w,
      dest.y + dest.h,
      dest.x,
      dest.y + dest.h,
    );
    uvs.push(
      src.x / sheetWidth,
      src.y / sheetHeight,
      (src.x + src.w) / sheetWidth,
      src.y / sheetHeight,
      (src.x + src.w) / sheetWidth,
      (src.y + src.h) / sheetHeight,
      src.x / sheetWidth,
      (src.y + src.h) / sheetHeight,
    );
    indices.push(i, i + 1, i + 2, i, i + 2, i + 3);
  };

  const frameOverrides = new Map<string, FrameRect>();
  for (const { source, dest, ids } of pack.cells) {
    const repeats = repeatsOf.get(ids[0]) ?? [];
    const tiled = repeats.length > 0;
    // the cell handed to the packer was inflated by the apron; the art is the
    // rect inside it
    const inset = tiled ? apronWidth : 0;
    const art = {
      x: dest.x + inset,
      y: dest.y + inset,
      w: source.w - inset * 2,
      h: source.h - inset * 2,
    };
    const from = {
      x: source.x + inset,
      y: source.y + inset,
      w: art.w,
      h: art.h,
    };
    for (const id of ids) {
      frameOverrides.set(id, art);
    }

    quad(art, from);

    if (!tiled) {
      continue;
    }
    const [first, second] = repeats;
    const span = second === undefined ? [0] : [-1, 0, 1];
    for (const a of [-1, 0, 1]) {
      for (const b of span) {
        if (a === 0 && b === 0) {
          continue;
        }
        const placed = {
          x: art.x + a * first.x + b * (second?.x ?? 0),
          y: art.y + a * first.y + b * (second?.y ?? 0),
          w: art.w,
          h: art.h,
        };
        const reaching = intersect(placed, dest);
        if (reaching === undefined) {
          continue;
        }
        for (const strip of outside(reaching, art)) {
          quad(strip, {
            x: from.x + (strip.x - placed.x),
            y: from.y + (strip.y - placed.y),
            w: strip.w,
            h: strip.h,
          });
        }
      }
    }
  }

  const geometry = new MeshGeometry({
    positions: new Float32Array(vertices),
    uvs: new Float32Array(uvs),
    indices: new Uint32Array(indices),
  });
  // every quad copies whole texels to whole texels, so nearest keeps the
  // composition an exact copy rather than a resample
  sourceTexture.source.scaleMode = "nearest";
  const mesh = new Mesh({ geometry, texture: sourceTexture });
  const texture = RenderTexture.create({
    width: sheetWidth,
    height: pack.height,
    resolution: sourceTexture.source.resolution,
  });
  texture.source.scaleMode = "nearest";
  pixiRenderer.render({ container: mesh, target: texture });
  mesh.destroy();
  geometry.destroy();

  return { texture, frameOverrides };
};
