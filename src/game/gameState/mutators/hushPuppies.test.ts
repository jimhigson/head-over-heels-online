import { beforeEach, describe, expect, test } from "vitest";

import { resetStore } from "../../../_testUtils/initStoreForTests";
import { mutatorsTestHarness } from "../../../_testUtils/mutatorsTestHarness";

beforeEach(() => {
  resetStore();
});

describe("hush puppies integration", () => {
  test("vanish when head enters", () => {
    const h = mutatorsTestHarness();
    h.playableWalksToRoom("head", "thirdRoom");
    expect(h.selectRoomOfPlayable("head")?.items.hushPuppy).toBeUndefined();
    h.teardown();
  });
  test("remain when heels enters", () => {
    const h = mutatorsTestHarness();
    h.playableWalksToRoom("heels", "thirdRoom");
    expect(h.selectRoomOfPlayable("heels")?.items.hushPuppy).toBeDefined();
    h.teardown();
  });
  test("vanish again when head loses life and room is reloaded", () => {
    const h = mutatorsTestHarness();
    h.playableWalksToRoom("head", "thirdRoom");
    h.playableLosesLives("head");
    expect(h.selectRoomOfPlayable("head")?.items.hushPuppy).toBeUndefined();
    h.teardown();
  });
});
