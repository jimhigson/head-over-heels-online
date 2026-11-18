import { expect, test } from "vitest";

import { isXyRectInFootprints } from "./roomFootprints";

/**
 * a U shape: a bar along y=0..2, with arms up from each end, and no floor
 * between the arms
 */
const uShapedFootprints = [
  { from: { x: 0, y: 0 }, to: { x: 6, y: 2 } },
  { from: { x: 0, y: 2 }, to: { x: 2, y: 6 } },
  { from: { x: 4, y: 2 }, to: { x: 6, y: 6 } },
];

test.for([
  {
    rect: "within one footprint",
    from: { x: 0, y: 3 },
    to: { x: 1, y: 4 },
    inside: true,
  },
  {
    rect: "straddling two footprints",
    from: { x: 0, y: 1 },
    to: { x: 1, y: 3 },
    inside: true,
  },
  {
    rect: "partly outside every footprint",
    from: { x: 5, y: 5 },
    to: { x: 7, y: 6 },
    inside: false,
  },
  {
    rect: "spanning the gap between the arms, though its corners are all on floor",
    from: { x: 1, y: 1 },
    to: { x: 5, y: 5 },
    inside: false,
  },
])(
  "a rectangle $rect is in the footprints: $inside",
  ({ from, to, inside }) => {
    expect(isXyRectInFootprints(uShapedFootprints, from, to)).toBe(inside);
  },
);
