// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  loadSoundsForTest,
  makeSoundStartCounter,
  resetSoundsForTest,
} from "../../../_testUtils/sounds/soundTestUtils";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(async () => {
  resetStore();
  await loadSoundsForTest();
});

afterEach(() => {
  resetSoundsForTest();
});

test("an emitter makes its sound only for items it emits, not when one would collide and is skipped", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 7, y: 7, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        // half a block up, so its first (half-block-high) block, emitted centred
        // on that height, sits on the floor where every later one would appear:
        position: { x: 2, y: 2, z: 0.5 },
        config: {
          emits: { type: "portableBlock", config: { style: "cube" } },
          period: 500,
          maximum: null,
        },
      },
    },
  });
  const renderState = makeTestRenderState();
  const emitSounds = makeSoundStartCounter(renderState, "emit");

  playGameThrough(gameState, renderState, {
    until: (gameState) =>
      roomItemsIterable(selectCurrentRoomState(gameState)!.items).some(
        (item) => item.state.createdByEmitter === "emitter",
      ),
    failAfter: 2_000,
    frameCallbacks: emitSounds.frameCallback,
  });

  expect(emitSounds.count).toBe(1);

  // several more periods, each emitting a block where the first still is:
  playGameThrough(gameState, renderState, {
    forTime: 2_000,
    frameCallbacks: emitSounds.frameCallback,
  });

  expect({
    emittedItems: roomItemsIterable(selectCurrentRoomState(gameState)!.items)
      .filter((item) => item.state.createdByEmitter === "emitter")
      .toArray().length,
    emitSounds: emitSounds.count,
  }).toEqual({ emittedItems: 1, emitSounds: 1 });
});
