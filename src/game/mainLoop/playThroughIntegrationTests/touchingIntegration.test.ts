import { beforeEach, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { resetStore } from "../../../_testUtils/initStoreForTests";

beforeEach(() => {
  resetStore();
});

test("standing overlapping the edge of a block, a monster on the floor doesn't kill the player", () => {});
