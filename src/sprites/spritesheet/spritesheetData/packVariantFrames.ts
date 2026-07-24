import { objectEntriesIter } from "../../../utils/entries";
import { type AppSpriteFrame } from "./AppSpriteFrame";
import {
  variantIdSuffix,
  type VariantSuffix,
  type VariantTextureId,
} from "./variantSpritesheetData";

type FrameEntry = { frame: AppSpriteFrame };

/** an on-atlas rectangle for a packed variant frame */
type PackedRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type PackedVariantFrames = {
  /**
   * the atlas rect each suffixed id's re-baked pixels live at. Ids that share
   * a source rect within a variant (copyFrom aliases, flipped copies) share
   * one packed rect - the flip lives in the texture uvs, not the pixels
   */
  rects: Record<VariantTextureId, PackedRect>;
  /**
   * one entry per unique packed cell: where to copy the source pixels from,
   * which variant's swops to bake onto them, and the suffixed ids sharing
   * the cell (so bakes can group cells by texture-specific swop rules)
   */
  cells: Array<{
    source: PackedRect;
    dest: PackedRect;
    suffix: VariantSuffix;
    ids: VariantTextureId[];
  }>;
  /** total height of the strip below `startY` */
  stripHeight: number;
};

/**
 * deterministically shelf-pack the variant frames into a strip of the atlas
 * below the base sheet layout: entries sorted by height (descending, id as
 * tie-break) fill rows left-to-right, opening a new shelf when a frame does
 * not fit - near-optimal for the mostly-uniform frame heights, and stable
 * across runs so the layout can be snapshot-tested
 */
export const packVariantFrames = (
  variantFrames: Partial<Record<VariantTextureId, FrameEntry>>,
  /** the atlas width to pack within */
  width: number,
  /** the atlas y at which the strip begins (below the base sheet layout) */
  startY: number,
): PackedVariantFrames => {
  // one packed cell per unique (variant, source rect); every id mapping to
  // that pair shares the cell
  const cellKeyToIds = new Map<string, VariantTextureId[]>();
  const cellKeyToSource = new Map<
    string,
    { source: PackedRect; suffix: VariantSuffix }
  >();

  for (const [id, entry] of objectEntriesIter(variantFrames)) {
    if (entry === undefined) {
      continue;
    }
    const { x, y, w, h } = entry.frame;
    const suffix = variantIdSuffix(id);
    const key = `${suffix}:${x},${y},${w},${h}`;
    const ids = cellKeyToIds.get(key);
    if (ids === undefined) {
      cellKeyToIds.set(key, [id]);
      cellKeyToSource.set(key, { source: { x, y, w, h }, suffix });
    } else {
      ids.push(id);
    }
  }

  const sortedKeys = [...cellKeyToSource.keys()].sort((a, b) => {
    const heightDifference =
      cellKeyToSource.get(b)!.source.h - cellKeyToSource.get(a)!.source.h;
    return (
      heightDifference !== 0 ? heightDifference
      : a < b ? -1
      : 1
    );
  });

  const rects = {} as Record<VariantTextureId, PackedRect>;
  const cells: PackedVariantFrames["cells"] = [];

  // transparent spacing between cells: mid-camera-turn the warp mesh samples a
  // whisker beyond a frame's edge, so cells packed flush would bleed their
  // neighbour's pixels into the fringe
  const gutter = 2;

  let cursorX = gutter;
  let shelfY = startY + gutter;
  let shelfHeight = 0;

  for (const key of sortedKeys) {
    const { source, suffix } = cellKeyToSource.get(key)!;

    if (cursorX + source.w > width) {
      // start a new shelf below the current one:
      shelfY += shelfHeight + gutter;
      cursorX = gutter;
      shelfHeight = 0;
    }
    if (shelfHeight === 0) {
      shelfHeight = source.h;
    }

    const dest: PackedRect = {
      x: cursorX,
      y: shelfY,
      w: source.w,
      h: source.h,
    };
    cursorX += source.w + gutter;

    const ids = cellKeyToIds.get(key)!;
    cells.push({ source, dest, suffix, ids });
    for (const id of ids) {
      rects[id] = dest;
    }
  }

  return {
    rects,
    cells,
    stripHeight: shelfY + shelfHeight - startY,
  };
};
