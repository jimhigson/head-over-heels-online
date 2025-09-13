import { test } from "vitest";

import type { Xyz } from "../../../utils/vectors/vectors";
import type { Indexable } from "./GridSpatialIndex";

import { GridSpatialIndex } from "./GridSpatialIndex";

test("add and remove item with id=head", () => {
  const spatialIndex = new GridSpatialIndex<string, string, Indexable>();

  const headItem: Indexable = {
    id: "head",
    state: {
      position: { x: 41, y: 41, z: 0 } as Xyz,
    },
    aabb: { x: 12, y: 12, z: 12 } as Xyz,
    renderAabb: undefined,
    renderAabbOffset: undefined,
  };

  // Add the item
  spatialIndex.addItem(headItem);

  // Remove the item
  spatialIndex.removeItem(headItem);

  // If we get here without throwing, the test passes
});
