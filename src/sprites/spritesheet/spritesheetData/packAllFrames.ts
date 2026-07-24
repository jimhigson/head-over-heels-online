import { objectEntriesIter } from "../../../utils/entries";
import { type AppSpriteFrame } from "./AppSpriteFrame";

export type PackRect = { x: number; y: number; w: number; h: number };

/** one packed cell: source pixels, destination, its bake group and the ids sharing it */
export type PackedCell = {
  source: PackRect;
  dest: PackRect;
  groupKey: string;
  ids: string[];
};

export type PackedFrames = {
  /** the destination rect every packed (non-aliased) id lives at */
  rects: Record<string, PackRect>;
  /** one entry per unique cell, so a bake can group cells by their bake recipe */
  cells: PackedCell[];
  /** total rows used from y=0 (for the sheet-fits check) */
  height: number;
};

// transparent spacing between cells: mid-camera-turn the warp mesh samples a
// whisker beyond a frame's edge, so cells packed flush would bleed a
// neighbour's pixels into the fringe
const gutter = 2;

/**
 * deterministically shelf-pack every frame into a fresh layout from y=0. Frames
 * are grouped by (bake group, source rect): ids that share a group and source
 * rect (copyFrom aliases, flipped copies) share one packed cell - the flip
 * lives in the texture uvs, not the pixels. Sorted by height (descending, key
 * as tie-break) so the layout is stable across runs and snapshot-testable.
 */
export const packAllFrames = (
  frames: Record<string, { frame: AppSpriteFrame }>,
  /**
   * the bake-group key for an id, or null to leave it out of the pack (an
   * aliased frame whose pixels come from another id's cell)
   */
  groupKeyOf: (id: string) => null | string,
  /** the sheet width to pack within */
  width: number,
): PackedFrames => {
  const cellKeyToIds = new Map<string, string[]>();
  const cellKeyToInfo = new Map<
    string,
    { source: PackRect; groupKey: string }
  >();

  for (const [id, { frame }] of objectEntriesIter(frames)) {
    const groupKey = groupKeyOf(id);
    if (groupKey === null) {
      continue;
    }
    const { x, y, w, h } = frame;
    const key = `${groupKey}:${x},${y},${w},${h}`;
    const ids = cellKeyToIds.get(key);
    if (ids === undefined) {
      cellKeyToIds.set(key, [id]);
      cellKeyToInfo.set(key, { source: { x, y, w, h }, groupKey });
    } else {
      ids.push(id);
    }
  }

  const sortedKeys = cellKeyToInfo
    .keys()
    .toArray()
    .sort((a, b) => {
      const heightDifference =
        cellKeyToInfo.get(b)!.source.h - cellKeyToInfo.get(a)!.source.h;
      return (
        heightDifference !== 0 ? heightDifference
        : a < b ? -1
        : 1
      );
    });

  const rects: Record<string, PackRect> = {};
  const cells: PackedCell[] = [];

  let cursorX = gutter;
  let shelfY = gutter;
  let shelfHeight = 0;

  for (const key of sortedKeys) {
    const { source, groupKey } = cellKeyToInfo.get(key)!;

    if (cursorX + source.w > width) {
      shelfY += shelfHeight + gutter;
      cursorX = gutter;
      shelfHeight = 0;
    }
    if (shelfHeight === 0) {
      shelfHeight = source.h;
    }

    const dest: PackRect = { x: cursorX, y: shelfY, w: source.w, h: source.h };
    cursorX += source.w + gutter;

    const ids = cellKeyToIds.get(key)!;
    cells.push({ source, dest, groupKey, ids });
    for (const id of ids) {
      rects[id] = dest;
    }
  }

  return { rects, cells, height: shelfY + shelfHeight + gutter };
};
