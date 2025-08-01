import { describe, it, expect } from "vitest";
import { latentMovement } from "./latentMovement";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { FreeItemTypes } from "../itemPredicates";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import type { PartialDeep } from "type-fest";

type TestItem = ItemInPlay<FreeItemTypes, string, string>;
type TestRoomState = RoomState<string, string>;

// Helper to create a test item with latent movement frames
const createTestItemWithLatentMovement = (
  latentMovementFrames: Array<{
    startAtRoomTime: number;
    endAtRoomTime: number;
    velocity: { x: number; y: number; z: number };
  }>,
): TestItem => {
  return {
    state: {
      latentMovement: latentMovementFrames,
    },
  } satisfies PartialDeep<TestItem> as TestItem;
};

// Helper to create a test room state
const createTestRoomAtTime = (roomTime: number): RoomState<string, string> => {
  return {
    roomTime,
  } satisfies PartialDeep<TestRoomState> as TestRoomState;
};

describe("latentMovement", () => {
  it("should apply no movement when there are no latent movement frames", () => {
    const item = createTestItemWithLatentMovement([]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 16)];

    expect(results).toEqual([]);
    expect(item.state.latentMovement).toEqual([]);
  });

  it("should apply full movement for a frame that spans the entire tick", () => {
    // Frame active from time 50-150, current tick is 84-100 (16ms)
    // Frame fully covers tick, so active time = full tick duration = 16ms
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 50,
        endAtRoomTime: 150,
        velocity: { x: 2, y: 0, z: 0 }, // 2 pixels per ms
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 16)];

    // Movement: velocity 2 px/ms × 16ms full tick = 32 pixels
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 32, y: 0, z: 0 }, // 2 px/ms × 16ms = 32 pixels
      },
    ]);
    // Frame should not be removed as it ends at 150 (after current time 100)
    expect(item.state.latentMovement).toHaveLength(1);
  });

  it("should apply partial movement when frame starts mid-tick", () => {
    // Current tick: 80-100 (20ms duration)
    // Frame starts at 90, ends at 200
    // Active time: from 90 to 100 = 10ms (half the tick)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 90,
        endAtRoomTime: 200,
        velocity: { x: 3, y: 0, z: 0 }, // 3 pixels per ms
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 20)];

    // Movement: velocity 3 px/ms × 10ms active time = 30 pixels
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 30, y: 0, z: 0 }, // 3 px/ms × 10ms = 30 pixels
      },
    ]);
    expect(item.state.latentMovement).toHaveLength(1);
  });

  it("should apply partial movement when frame ends mid-tick", () => {
    // Current tick: 85-100 (15ms duration)
    // Frame starts at 50, ends at 95
    // Active time: from 85 to 95 = 10ms (partial tick)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 50,
        endAtRoomTime: 95,
        velocity: { x: 0, y: 4, z: 0 }, // 4 pixels per ms
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 15)];

    // Movement: velocity 4 px/ms × 10ms active time = 40 pixels
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 0, y: 40, z: 0 }, // 4 px/ms × 10ms = 40 pixels
      },
    ]);
    // Frame should be removed as it ended at 95 (before current time 100)
    expect(item.state.latentMovement).toHaveLength(0);
  });

  it("should handle multiple overlapping frames correctly", () => {
    // Two frames active during the same tick
    // Current tick: 90-100 (10ms duration)
    // Frame 1: active 50-150 (fully covers tick)
    // Frame 2: active 75-125 (fully covers tick)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 50,
        endAtRoomTime: 150,
        velocity: { x: 1, y: 0, z: 0 },
      },
      {
        startAtRoomTime: 75,
        endAtRoomTime: 125,
        velocity: { x: 0, y: 2, z: 0 },
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 10)]; // 90-100

    // Both frames active for full 10ms (from 90 to 100)
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 10, y: 0, z: 0 }, // velocity 1 px/ms × 10ms active time = 10 pixels
      },
      {
        movementType: "position",
        posDelta: { x: 0, y: 20, z: 0 }, // velocity 2 px/ms × 10ms active time = 20 pixels
      },
    ]);
    expect(item.state.latentMovement).toHaveLength(2);
  });

  it("should remove frames that have ended", () => {
    // Current tick: 84-100 (16ms duration)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 50,
        endAtRoomTime: 100, // Ends exactly at current time
        velocity: { x: 5, y: 0, z: 0 },
      },
      {
        startAtRoomTime: 150,
        endAtRoomTime: 200, // Future frame
        velocity: { x: 0, y: 3, z: 0 },
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 16)]; // 84-100

    // First frame active from 84 to 100 = full 16ms
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 80, y: 0, z: 0 }, // velocity 5 px/ms × 16ms = 80 pixels
      },
    ]);
    // First frame should be removed, second frame kept
    expect(item.state.latentMovement).toHaveLength(1);
    expect(item.state.latentMovement[0]).toEqual({
      startAtRoomTime: 150,
      endAtRoomTime: 200,
      velocity: { x: 0, y: 3, z: 0 },
    });
  });

  it("should skip frames that haven't started yet", () => {
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 150, // Starts in the future
        endAtRoomTime: 200,
        velocity: { x: 10, y: 0, z: 0 },
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 16)];

    expect(results).toEqual([]);
    expect(item.state.latentMovement).toHaveLength(1);
  });

  it("should remove frames that ended before this tick", () => {
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 10,
        endAtRoomTime: 50, // Ended before tick started
        velocity: { x: 10, y: 0, z: 0 },
      },
      {
        startAtRoomTime: 120,
        endAtRoomTime: 150, // Future frame to ensure array isn't emptied
        velocity: { x: 5, y: 0, z: 0 },
      },
    ]);
    const room = createTestRoomAtTime(100); // Previous time would be 84
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 16)];

    expect(results).toEqual([]);
    // Old frame should be removed, only future frame remains
    expect(item.state.latentMovement).toHaveLength(1);
    expect(item.state.latentMovement[0].startAtRoomTime).toBe(120);
  });

  it("should handle movement in all three dimensions", () => {
    // Current tick: 80-100 (20ms duration)
    // Frame active 50-150 (fully covers tick)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 50,
        endAtRoomTime: 150,
        velocity: { x: 1.5, y: -2, z: 0.5 }, // Mixed positive/negative velocities
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 20)]; // 80-100

    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 30, y: -40, z: 10 }, // (1.5, -2, 0.5) px/ms × 20ms = (30, -40, 10) pixels
      },
    ]);
  });

  it("should handle a frame that starts and ends within a single tick", () => {
    // Current tick: 90-100 (10ms duration)
    // Frame starts at 92, ends at 96
    // Active time: from 92 to 96 = 4ms (entirely within tick)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 92,
        endAtRoomTime: 96,
        velocity: { x: 5, y: 0, z: 0 },
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 10)]; // 90-100

    // Movement: velocity 5 px/ms × 4ms active time = 20 pixels
    expect(results).toEqual([
      {
        movementType: "position",
        posDelta: { x: 20, y: 0, z: 0 }, // 5 px/ms × 4ms = 20 pixels
      },
    ]);
    // Frame should be removed as it ended
    expect(item.state.latentMovement).toHaveLength(0);
  });

  it("should correctly remove multiple ended frames", () => {
    // Current tick: 80-100 (20ms duration)
    const item = createTestItemWithLatentMovement([
      {
        startAtRoomTime: 10,
        endAtRoomTime: 90, // Ends during tick
        velocity: { x: 1, y: 0, z: 0 },
      },
      {
        startAtRoomTime: 20,
        endAtRoomTime: 95, // Also ends during tick
        velocity: { x: 0, y: 1, z: 0 },
      },
      {
        startAtRoomTime: 30,
        endAtRoomTime: 150, // Continues after tick
        velocity: { x: 0, y: 0, z: 1 },
      },
    ]);
    const room = createTestRoomAtTime(100);
    const gameState = {} as GameState<string>;

    const results = [...latentMovement(item, room, gameState, 20)]; // 80-100

    // Frame 1: active from 80 to 90 = 10ms × 1 px/ms = 10 pixels in x
    // Frame 2: active from 80 to 95 = 15ms × 1 px/ms = 15 pixels in y
    // Frame 3: active from 80 to 100 = 20ms × 1 px/ms = 20 pixels in z
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({
      movementType: "position",
      posDelta: { x: 10, y: 0, z: 0 },
    });
    expect(results[1]).toEqual({
      movementType: "position",
      posDelta: { x: 0, y: 15, z: 0 },
    });
    expect(results[2]).toEqual({
      movementType: "position",
      posDelta: { x: 0, y: 0, z: 20 },
    });
    // Only the third frame should remain (first two ended during tick)
    expect(item.state.latentMovement).toHaveLength(1);
    expect(item.state.latentMovement[0].endAtRoomTime).toBe(150);
  });
});
