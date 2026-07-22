import { expect, test } from "vitest";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { objectEntriesIter } from "../../../utils/entries";
import { makeSpritesheetData, spritesheetSize } from "./makeSpritesheetData";
import { packVariantFrames } from "./packVariantFrames";
import { variantSpritesheetData } from "./variantSpritesheetData";

const blockStackVariantPack = () => {
  const data = makeSpritesheetData(blockStackSpritesheetMeta);
  const { frames } = variantSpritesheetData(data.frames, data.animations);
  return packVariantFrames(frames, spritesheetSize.w, spritesheetSize.h);
};

test("packs deterministically", () => {
  expect(blockStackVariantPack()).toEqual(blockStackVariantPack());
});

test("packs within the atlas width", () => {
  const { rects } = blockStackVariantPack();
  const inWidth = Object.values(rects).every(
    ({ x, w }) => x >= 0 && x + w <= spritesheetSize.w,
  );
  expect(inWidth).toBe(true);
});

test("packs only below the base sheet", () => {
  const { rects } = blockStackVariantPack();
  const belowBase = Object.values(rects).every(
    ({ y }) => y >= spritesheetSize.h,
  );
  expect(belowBase).toBe(true);
});

test("packed cells do not overlap", () => {
  const { cells } = blockStackVariantPack();
  const overlapping = cells.some(({ dest: a }, i) =>
    cells.some(
      ({ dest: b }, j) =>
        i < j &&
        a.x < b.x + b.w &&
        b.x < a.x + a.w &&
        a.y < b.y + b.h &&
        b.y < a.y + a.h,
    ),
  );
  expect(overlapping).toBe(false);
});

test("every variant id gets a rect", () => {
  const data = makeSpritesheetData(blockStackSpritesheetMeta);
  const { frames } = variantSpritesheetData(data.frames, data.animations);
  const { rects } = blockStackVariantPack();
  const missing = [...objectEntriesIter(frames)].filter(
    ([id]) => rects[id] === undefined,
  );
  expect(missing).toEqual([]);
});

test("strip height fits the expected budget", () => {
  const { stripHeight } = blockStackVariantPack();
  // the variant recolours (~33% of the sheet's area) plus the five
  // door-destination-hue recolours of the door frames shelf-pack into roughly
  // 500-560 rows; this pins against accidental blow-up (eg dedupe regressing,
  // or eligibility widening to whole-sheet). The atlas has room to spare:
  // 1024 + this must stay within the 2048 power-of-two height
  expect(stripHeight).toBeLessThan(640);
});

test("layout snapshot", () => {
  const { cells, stripHeight } = blockStackVariantPack();
  expect({ stripHeight, cellCount: cells.length }).toMatchSnapshot();
});
