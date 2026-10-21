import { expect, test } from "vitest";

import { nearestLadderZoom } from "./zoomLadder";

test.for([
  { zoom: 2.4, nearest: 2 },
  { zoom: 2.5, nearest: 3 },
  { zoom: 1.2, nearest: 1 },
  { zoom: 13, nearest: 11 },
  { zoom: 0.5, nearest: 1 },
  { zoom: 40, nearest: 16 },
])("$zoom settles on $nearest", ({ zoom, nearest }) => {
  expect<number>(nearestLadderZoom(zoom)).toBe(nearest);
});
