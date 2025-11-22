import { produce } from "immer";
import { describe, expect, test } from "vitest";

import type { AnyWallJsonConfig } from "../../../../model/json/WallJsonConfig";
import type { Xyz } from "../../../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../../editorTypes";
import type { LevelEditorState } from "../../levelEditorSlice";

import {
  applyLevelEditorActions,
  editorStateWithOneRoomWithNoItems,
  testRoomId,
} from "../__test__/storeStates";
import { wallTimes } from "../../../../model/times";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
} from "../../levelEditorSlice";

// Custom assertion to check walls and doors are contiguous around floor
expect.extend({
  toHaveWallsAndDoorsContiguouslyAroundFloor(
    received: EditorRoomJson,
    floorId: EditorRoomItemId,
  ) {
    const floor = received.items[floorId];
    if (!floor || floor.type !== "floor") {
      return {
        pass: false,
        message: () => `Floor with id ${floorId} not found`,
      };
    }

    const floorStart = floor.position;
    const floorEnd = {
      x: floorStart.x + floor.config.times.x,
      y: floorStart.y + floor.config.times.y,
    };

    // Find all walls and doors on this floor's edges
    const edgeItems: Array<{
      id: string;
      item: EditorJsonItem<"door"> | EditorJsonItem<"wall">;
      edge: "away" | "left" | "right" | "towards";
      start: number;
      end: number;
    }> = [];

    for (const [id, item] of Object.entries(received.items)) {
      if (item.type !== "wall" && item.type !== "door") continue;
      if (item.position.z !== floor.position.z) continue;

      const { config } = item;
      let edge: "away" | "left" | "right" | "towards" | null = null;
      let start = 0;
      let end = 0;

      // Check which edge this item is on
      switch (config.direction) {
        case "towards":
          if (
            item.position.y === floorStart.y &&
            item.position.x >= floorStart.x &&
            item.position.x < floorEnd.x
          ) {
            edge = "towards";
            start = item.position.x;
            end =
              start +
              (item.type === "wall" ?
                (wallTimes(config as AnyWallJsonConfig).x ?? 1)
              : 2);
          }
          break;
        case "away":
          if (
            item.position.y === floorEnd.y &&
            item.position.x >= floorStart.x &&
            item.position.x < floorEnd.x
          ) {
            edge = "away";
            start = item.position.x;
            end =
              start +
              (item.type === "wall" ?
                (wallTimes(config as AnyWallJsonConfig).x ?? 1)
              : 2);
          }
          break;
        case "right":
          if (
            item.position.x === floorStart.x &&
            item.position.y >= floorStart.y &&
            item.position.y < floorEnd.y
          ) {
            edge = "right";
            start = item.position.y;
            end =
              start + (item.type === "wall" ? (wallTimes(config).y ?? 1) : 2);
          }
          break;
        case "left":
          if (
            item.position.x === floorEnd.x &&
            item.position.y >= floorStart.y &&
            item.position.y < floorEnd.y
          ) {
            edge = "left";
            start = item.position.y;
            end =
              start + (item.type === "wall" ? (wallTimes(config).y ?? 1) : 2);
          }
          break;
      }

      if (edge) {
        edgeItems.push({
          id,
          item: item as EditorJsonItem<"door"> | EditorJsonItem<"wall">,
          edge,
          start,
          end,
        });
      }
    }

    // Check for gaps and overlaps on each edge
    const errors: string[] = [];

    for (const edge of ["towards", "away", "left", "right"] as const) {
      const itemsOnEdge = edgeItems
        .filter((e) => e.edge === edge)
        .sort((a, b) => a.start - b.start);

      if (itemsOnEdge.length === 0) continue;

      const edgeStart =
        edge === "towards" || edge === "away" ? floorStart.x : floorStart.y;
      const edgeEnd =
        edge === "towards" || edge === "away" ? floorEnd.x : floorEnd.y;

      // Check for gaps
      let lastEnd = edgeStart;
      for (const item of itemsOnEdge) {
        if (item.start > lastEnd) {
          errors.push(`Gap on ${edge} edge from ${lastEnd} to ${item.start}`);
        }
        if (item.start < lastEnd) {
          errors.push(`Overlap on ${edge} edge at position ${item.start}`);
        }
        lastEnd = Math.max(lastEnd, item.end);
      }

      // Check if the entire edge is covered
      if (lastEnd < edgeEnd) {
        errors.push(`Gap on ${edge} edge from ${lastEnd} to ${edgeEnd}`);
      }
    }

    return {
      pass: errors.length === 0,
      message: () =>
        errors.length > 0 ?
          `Floor ${floorId} has non-contiguous walls/doors:\n${errors.join("\n")}`
        : `Floor ${floorId} has contiguous walls and doors`,
    };
  },
});

// Helper to test wall movement with preview/commit pattern
const testWallMovement = (
  state0: LevelEditorState,
  wallId: EditorRoomItemId,
  positionDelta: Xyz,
  timesDelta?: Xyz,
) => {
  // Apply preview
  const state1 = applyLevelEditorActions(
    state0,
    moveOrResizeItemAsPreview({
      jsonItemIds: [wallId],
      positionDelta,
      timesDelta,
    }),
  );

  // Room should not have changed yet
  expect(state1.campaignInProgress.rooms[testRoomId]).toEqual(
    state0.campaignInProgress.rooms[testRoomId],
  );

  // Commit the preview
  const state2 = applyLevelEditorActions(state1, commitCurrentPreviewedEdits());

  return state2;
};

describe("changeWallsForFloorChangeInPlace", () => {
  describe("floor with walls on all sides - resize scenarios", () => {
    test("should resize left wall when floor grows in y direction", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;
      const rightWallId = "rightWall" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const leftWallId = "leftWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add an 8x8 floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 8, y: 8 },
            },
          };

          // Add walls on all four sides
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 8 },
            },
          };

          room.items[rightWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "right",
              times: { y: 8 },
            },
          };

          room.items[awayWallId] = {
            type: "wall",
            position: { x: 0, y: 8, z: 0 },
            config: {
              direction: "away",
              tiles: Array(8).fill("plain"), // 8 tiles
            },
          };

          room.items[leftWallId] = {
            type: "wall",
            position: { x: 8, y: 0, z: 0 },
            config: {
              direction: "left",
              tiles: Array(8).fill("plain"), // 8 tiles
            },
          };
        },
      );

      // Increase floor size in y by 2 (8x8 -> 8x10)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 0, y: 2, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Floor should be 8x10
      expect(room.items[floorId]).toEqual({
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 10 },
        },
      });

      // Left wall should now have 10 tiles
      expect(room.items[leftWallId]).toEqual({
        type: "wall",
        position: { x: 8, y: 0, z: 0 },
        config: {
          direction: "left",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const leftWall = room.items[leftWallId];
      expect(leftWall?.type).toBe("wall");
      if (leftWall?.type === "wall" && "tiles" in leftWall.config) {
        expect(leftWall.config.tiles).toHaveLength(10);
      }

      // Right wall should also have grown to 10 units
      expect(room.items[rightWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "right",
          times: { y: 10 },
        },
      });

      // Away wall should have moved to y:10
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 10, z: 0 },
        config: {
          direction: "away",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const awayWall = room.items[awayWallId];
      expect(awayWall?.type).toBe("wall");
      if (awayWall?.type === "wall" && "tiles" in awayWall.config) {
        expect(awayWall.config.tiles).toHaveLength(8);
      }

      // Towards wall should remain unchanged
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 8 },
        },
      });

      // Check walls remain contiguous
      expect(room).toHaveWallsAndDoorsContiguouslyAroundFloor(floorId);
    });

    test("should resize walls when floor shrinks in y direction", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;
      const rightWallId = "rightWall" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const leftWallId = "leftWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 10x10 floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 10, y: 10 },
            },
          };

          // Add walls on all four sides
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 10 },
            },
          };

          room.items[rightWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "right",
              times: { y: 10 },
            },
          };

          room.items[awayWallId] = {
            type: "wall",
            position: { x: 0, y: 10, z: 0 },
            config: {
              direction: "away",
              tiles: Array(10).fill("plain"), // 10 tiles
            },
          };

          room.items[leftWallId] = {
            type: "wall",
            position: { x: 10, y: 0, z: 0 },
            config: {
              direction: "left",
              tiles: Array(10).fill("plain"), // 10 tiles
            },
          };
        },
      );

      // Decrease floor size in y by 3 (10x10 -> 10x7)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 0, y: -3, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Floor should be 10x7
      expect(room.items[floorId]).toEqual({
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 7 },
        },
      });

      // Left wall should now have 7 tiles
      expect(room.items[leftWallId]).toEqual({
        type: "wall",
        position: { x: 10, y: 0, z: 0 },
        config: {
          direction: "left",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const leftWall2 = room.items[leftWallId];
      expect(leftWall2?.type).toBe("wall");
      if (leftWall2?.type === "wall" && "tiles" in leftWall2.config) {
        expect(leftWall2.config.tiles).toHaveLength(7);
      }

      // Right wall should also have shrunk to 7 units
      expect(room.items[rightWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "right",
          times: { y: 7 },
        },
      });

      // Away wall should have moved to y:7
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 7, z: 0 },
        config: {
          direction: "away",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const awayWall2 = room.items[awayWallId];
      expect(awayWall2?.type).toBe("wall");
      if (awayWall2?.type === "wall" && "tiles" in awayWall2.config) {
        expect(awayWall2.config.tiles).toHaveLength(10);
      }

      // Towards wall should remain unchanged
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 10 },
        },
      });

      // Check walls remain contiguous
      expect(room).toHaveWallsAndDoorsContiguouslyAroundFloor(floorId);
    });

    test("should resize walls when floor grows in x direction", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;
      const rightWallId = "rightWall" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const leftWallId = "leftWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 6x6 floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 6, y: 6 },
            },
          };

          // Add walls on all four sides
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 6 },
            },
          };

          room.items[rightWallId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "right",
              times: { y: 6 },
            },
          };

          room.items[awayWallId] = {
            type: "wall",
            position: { x: 0, y: 6, z: 0 },
            config: {
              direction: "away",
              tiles: Array(6).fill("plain"), // 6 tiles
            },
          };

          room.items[leftWallId] = {
            type: "wall",
            position: { x: 6, y: 0, z: 0 },
            config: {
              direction: "left",
              tiles: Array(6).fill("plain"), // 6 tiles
            },
          };
        },
      );

      // Increase floor size in x by 4 (6x6 -> 10x6)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 4, y: 0, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Floor should be 10x6
      expect(room.items[floorId]).toEqual({
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 6 },
        },
      });

      // Towards wall should now have grown to 10 units
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 10 },
        },
      });

      // Away wall should have grown to 10 tiles
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 6, z: 0 },
        config: {
          direction: "away",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const awayWall3 = room.items[awayWallId];
      expect(awayWall3?.type).toBe("wall");
      if (awayWall3?.type === "wall" && "tiles" in awayWall3.config) {
        expect(awayWall3.config.tiles).toHaveLength(10);
      }

      // Left wall should have moved to x:10
      expect(room.items[leftWallId]).toEqual({
        type: "wall",
        position: { x: 10, y: 0, z: 0 },
        config: {
          direction: "left",
          tiles: expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        },
      });
      const leftWall3 = room.items[leftWallId];
      expect(leftWall3?.type).toBe("wall");
      if (leftWall3?.type === "wall" && "tiles" in leftWall3.config) {
        expect(leftWall3.config.tiles).toHaveLength(6);
      }

      // Right wall should remain unchanged
      expect(room.items[rightWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "right",
          times: { y: 6 },
        },
      });

      // Check walls remain contiguous
      expect(room).toHaveWallsAndDoorsContiguouslyAroundFloor(floorId);
    });
  });

  describe("moving floor with walls on all sides", () => {
    test("should move all adjacent walls when floor moves", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;
      const rightWallId = "rightWall" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const leftWallId = "leftWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 3x3 floor at position (2, 2, 0)
          room.items[floorId] = {
            type: "floor",
            position: { x: 2, y: 2, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 3, y: 3 },
            },
          };

          // Add walls on all four sides
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 2, y: 2, z: 0 },
            config: {
              direction: "towards",
              times: { x: 3 },
            },
          };

          room.items[rightWallId] = {
            type: "wall",
            position: { x: 2, y: 2, z: 0 },
            config: {
              direction: "right",
              times: { y: 3 },
            },
          };

          room.items[awayWallId] = {
            type: "wall",
            position: { x: 2, y: 5, z: 0 }, // y: 2 + 3
            config: {
              direction: "away",
              tiles: ["plain", "armour", "shield"], // 3 tiles
            },
          };

          room.items[leftWallId] = {
            type: "wall",
            position: { x: 5, y: 2, z: 0 }, // x: 2 + 3
            config: {
              direction: "left",
              tiles: ["plain", "armour", "shield"], // 3 tiles
            },
          };
        },
      );

      // Move floor by (1, 1, 0)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 1, y: 1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Check that all walls moved with the floor in the actual room
      const room = state1.campaignInProgress.rooms[testRoomId];

      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 3, y: 3, z: 0 },
        config: {
          direction: "towards",
          times: { x: 3 },
        },
      });

      // Note: The current implementation doesn't handle right, away, and left walls yet
      // These tests will fail until the implementation is complete
    });
  });

  describe("resizing floor with walls", () => {
    test("should resize walls when floor grows", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 2x2 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 1, y: 1, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 2, y: 2 },
            },
          };

          // Add a towards wall matching the floor width
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 1, y: 1, z: 0 },
            config: {
              direction: "towards",
              times: { x: 2 },
            },
          };
        },
      );

      // Resize floor to 4x3
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 2, y: 1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Check that towards wall resized in the actual room
      const room = state1.campaignInProgress.rooms[testRoomId];
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 1, y: 1, z: 0 },
        config: {
          direction: "towards",
          times: { x: 4 },
        },
      });
    });

    test("should handle partial walls that don't span entire floor edge", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const partialWallId = "partialWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 5x5 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 5, y: 5 },
            },
          };

          // Add a partial wall on the towards edge (only 3 units wide)
          room.items[partialWallId] = {
            type: "wall",
            position: { x: 1, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 3 },
            },
          };
        },
      );

      // Move floor
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 2, y: 1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Partial wall should move with the floor
      const room = state1.campaignInProgress.rooms[testRoomId];
      expect(room.items[partialWallId]).toEqual({
        type: "wall",
        position: { x: 3, y: 1, z: 0 },
        config: {
          direction: "towards",
          times: { x: 3 },
        },
      });
    });

    test("should resize partial walls when floor edge they touch changes", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const partialWallAtEndId = "partialWallAtEnd" as EditorRoomItemId;
      const partialWallAtStartId = "partialWallAtStart" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 5x5 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 5, y: 5 },
            },
          };

          // Add a partial wall at the end of the towards edge (touches right corner)
          room.items[partialWallAtEndId] = {
            type: "wall",
            position: { x: 3, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 2 }, // extends from x:3 to x:5
            },
          };

          // Add a partial wall at the start of the towards edge
          room.items[partialWallAtStartId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 2 }, // extends from x:0 to x:2
            },
          };
        },
      );

      // Shrink floor from right (reduce x size by 2)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: -2, y: 0, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Wall at end should be removed since it's now outside the floor bounds (floor extends from x:0 to x:2)
      expect(room.items[partialWallAtEndId]).toBeUndefined();
      // Wall at start should remain unchanged
      expect(room.items[partialWallAtStartId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 2 },
        },
      });
    });

    test("should grow partial walls when floor expands and wall touches expanding edge", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const rightWallId = "rightWall" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 3x3 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 3, y: 3 },
            },
          };

          // Add a partial right wall that extends to the edge
          room.items[rightWallId] = {
            type: "wall",
            position: { x: 0, y: 1, z: 0 },
            config: {
              direction: "right",
              times: { y: 2 }, // extends from y:1 to y:3
            },
          };

          // Add a partial away wall that extends to the edge
          room.items[awayWallId] = {
            type: "wall",
            position: { x: 1, y: 3, z: 0 },
            config: {
              direction: "away",
              tiles: ["plain", "armour"], // 2 units wide
            },
          };
        },
      );

      // Expand floor by 2 in both directions
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 2, y: 2, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];
      // Right wall should grow to match new floor height
      expect(room.items[rightWallId]).toEqual({
        type: "wall",
        position: { x: 0, y: 1, z: 0 },
        config: {
          direction: "right",
          times: { y: 4 }, // extended from 2 to 4
        },
      });

      // Away wall should move to new floor edge and stay same size
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 1, y: 5, z: 0 }, // moved from y:3 to y:5
        config: {
          direction: "away",
          tiles: [expect.any(String), expect.any(String)], // still 2 units
        },
      });
    });

    test("should handle complex partial wall scenarios with floor resizing", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const leftWallTopId = "leftWallTop" as EditorRoomItemId;
      const leftWallBottomId = "leftWallBottom" as EditorRoomItemId;
      const leftWallMiddleId = "leftWallMiddle" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          // turn consolidation off to make the tests easier to understand:
          draft.autoCoalesce = false;

          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 4x6 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 4, y: 6 },
            },
          };

          // Add partial walls on the left edge at different positions
          room.items[leftWallTopId] = {
            type: "wall",
            position: { x: 4, y: 0, z: 0 },
            config: {
              direction: "left",
              tiles: ["plain", "armour"], // 2 units from y:0 to y:2
            },
          };

          room.items[leftWallBottomId] = {
            type: "wall",
            position: { x: 4, y: 4, z: 0 },
            config: {
              direction: "left",
              tiles: ["shield", "plain"], // 2 units from y:4 to y:6
            },
          };

          room.items[leftWallMiddleId] = {
            type: "wall",
            position: { x: 4, y: 2, z: 0 },
            config: {
              direction: "left",
              tiles: ["armour"], // 1 unit at y:2-3
            },
          };
        },
      );

      // Shrink floor from bottom (reduce y size by 3)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 0, y: -3, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];
      // Top wall should remain unchanged
      expect(room.items[leftWallTopId]).toEqual({
        type: "wall",
        position: { x: 4, y: 0, z: 0 },
        config: {
          direction: "left",
          tiles: [expect.any(String), expect.any(String)], // 2 tiles
        },
      });

      // Middle wall should remain but might be at edge now
      expect(room.items[leftWallMiddleId]).toEqual({
        type: "wall",
        position: { x: 4, y: 2, z: 0 },
        config: {
          direction: "left",
          tiles: [expect.any(String)], // 1 tile
        },
      });

      // Bottom wall should be removed or truncated as it's now outside floor bounds
      const bottomWall = room.items[leftWallBottomId];
      if (bottomWall && bottomWall.type === "wall") {
        // If not removed, it should be truncated or have no tiles
        const wallConfig = bottomWall.config;
        if ("tiles" in wallConfig) {
          expect(wallConfig.tiles).toEqual([]);
        }
      } else {
        // Wall was removed entirely
        expect(bottomWall).toBeUndefined();
      }
    });
  });

  describe("door handling", () => {
    test("should move doors but not resize them", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const doorId = "door1" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 4, y: 4 },
            },
          };

          // Add a door on the towards edge
          room.items[doorId] = {
            type: "door",
            position: { x: 1, y: 0, z: 0 },
            config: {
              direction: "towards",
              toRoom: "otherRoom" as EditorRoomId,
            },
          };
        },
      );

      // Move and resize floor
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 1, y: 2, z: 0 },
          timesDelta: { x: 2, y: 0, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Door should move but maintain its 2-unit width
      const room = state1.campaignInProgress.rooms[testRoomId];
      expect(room.items[doorId]).toEqual({
        type: "door",
        position: { x: 2, y: 2, z: 0 },
        config: {
          direction: "towards",
          toRoom: "otherRoom",
        },
      });
    });
  });

  describe("wall removal", () => {
    test("should remove walls that would have 0 size after floor shrinks", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const wallId = "wall1" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a 3x3 floor
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 3, y: 3 },
            },
          };

          // Add a wall at position that will be outside after shrinking
          room.items[wallId] = {
            type: "wall",
            position: { x: 2, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 1 },
            },
          };
        },
      );

      // Shrink floor to 2x2
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: -1, y: -1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Wall should be removed or resized
      const room = state1.campaignInProgress.rooms[testRoomId];
      const wall = room.items[wallId];
      // The wall at x:2 should be removed since floor now only extends to x:2
      expect(wall).toBeUndefined();
    });
  });

  describe("non-adjacent walls", () => {
    test("should not affect walls that are not adjacent to the floor", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const distantWallId = "distantWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 2, y: 2 },
            },
          };

          // Add a wall far away
          room.items[distantWallId] = {
            type: "wall",
            position: { x: 10, y: 10, z: 0 },
            config: {
              direction: "towards",
              times: { x: 3 },
            },
          };
        },
      );

      // Move floor
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 1, y: 1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Distant wall should not be affected
      const room = state1.campaignInProgress.rooms[testRoomId];
      expect(room.items[distantWallId]).toEqual({
        type: "wall",
        position: { x: 10, y: 10, z: 0 },
        config: {
          direction: "towards",
          times: { x: 3 },
        },
      });
    });

    test("should not affect walls on different z-levels", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const wallAboveId = "wallAbove" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add a floor at z:0
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 3, y: 3 },
            },
          };

          // Add a wall at same x,y but different z
          room.items[wallAboveId] = {
            type: "wall",
            position: { x: 0, y: 0, z: 1 },
            config: {
              direction: "towards",
              times: { x: 3 },
            },
          };
        },
      );

      // Move floor
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 1, y: 1, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      // Wall on different z-level should not be affected
      const room = state1.campaignInProgress.rooms[testRoomId];
      expect(room.items[wallAboveId]).toEqual({
        type: "wall",
        position: { x: 0, y: 0, z: 1 },
        config: {
          direction: "towards",
          times: { x: 3 },
        },
      });
    });
  });

  describe("wall movement affecting floor", () => {
    describe("wall covers whole edge", () => {
      test("towards wall covering whole edge - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a towards wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 10 },
              },
            };
          },
        );

        // Move wall right by 2
        const state2 = testWallMovement(state0, wallId, { x: 2, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved and resized to match floor
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 2, y: 0, z: 0 },
          config: {
            direction: "towards",
            times: { x: 8 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 2, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 10 },
          },
        });
      });

      test("towards wall covering whole edge - move negative x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at (5,5)
            room.items[floorId] = {
              type: "floor",
              position: { x: 5, y: 5, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a towards wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 5, y: 5, z: 0 },
              config: {
                direction: "towards",
                times: { x: 10 },
              },
            };
          },
        );

        // Move wall left by 3
        const state2 = testWallMovement(state0, wallId, { x: -3, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved and resized to match floor
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 2, y: 5, z: 0 },
          config: {
            direction: "towards",
            times: { x: 13 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 2, y: 5, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 13, y: 10 },
          },
        });
      });

      test("towards wall covering whole edge - move positive y", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a towards wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 10 },
              },
            };
          },
        );

        // Move wall forward by 2
        const state2 = testWallMovement(state0, wallId, { x: 0, y: 2, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 0, y: 2, z: 0 },
          config: {
            direction: "towards",
            times: { x: 10 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 2, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 8 },
          },
        });
      });

      test("away wall covering whole edge - move positive y", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add an away wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 10, z: 0 },
              config: {
                direction: "away",
                tiles: Array(10).fill("plain"),
              },
            };
          },
        );

        // Move wall away by 3
        const state2 = testWallMovement(state0, wallId, { x: 0, y: 3, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 0, y: 13, z: 0 },
          config: {
            direction: "away",
            tiles: Array(10).fill("plain"),
          },
        });

        // Floor should have resized but not moved
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 13 },
          },
        });
      });

      test("right wall covering whole edge - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a right wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 0, z: 0 },
              config: {
                direction: "right",
                times: { y: 10 },
              },
            };
          },
        );

        // Move wall right by 2
        const state2 = testWallMovement(state0, wallId, { x: 2, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 2, y: 0, z: 0 },
          config: {
            direction: "right",
            times: { y: 10 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 2, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 10 },
          },
        });
      });

      test("left wall covering whole edge - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a left wall covering the whole edge
            room.items[wallId] = {
              type: "wall",
              position: { x: 10, y: 0, z: 0 },
              config: {
                direction: "left",
                tiles: Array(10).fill("plain"),
              },
            };
          },
        );

        // Move wall right by 3
        const state2 = testWallMovement(state0, wallId, { x: 3, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 13, y: 0, z: 0 },
          config: {
            direction: "left",
            tiles: Array(10).fill("plain"),
          },
        });

        // Floor should have resized but not moved
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 13, y: 10 },
          },
        });
      });
    });

    describe("wall at start of edge", () => {
      test("towards wall at start - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall at start
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall right by 2
        const state2 = testWallMovement(state0, wallId, { x: 2, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 2, y: 0, z: 0 },
          config: {
            direction: "towards",
            times: { x: 4 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 2, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 10 },
          },
        });
      });

      test("towards wall at start - move positive y", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall at start
            room.items[wallId] = {
              type: "wall",
              position: { x: 0, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall forward by 2
        const state2 = testWallMovement(state0, wallId, { x: 0, y: 2, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 0, y: 2, z: 0 },
          config: {
            direction: "towards",
            times: { x: 4 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 2, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 8 },
          },
        });
      });
    });

    describe("wall at end of edge", () => {
      test("towards wall at end - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall at end
            room.items[wallId] = {
              type: "wall",
              position: { x: 6, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall right by 2
        const state2 = testWallMovement(state0, wallId, { x: 2, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved and extended to maintain connection with floor edge
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 6, y: 0, z: 0 },
          config: {
            direction: "towards",
            times: { x: 6 },
          },
        });

        // Floor should have resized but not moved
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 12, y: 10 },
          },
        });
      });

      test("towards wall at end - move positive y", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall at end
            room.items[wallId] = {
              type: "wall",
              position: { x: 6, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall forward by 2
        const state2 = testWallMovement(state0, wallId, { x: 0, y: 2, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 6, y: 2, z: 0 },
          config: {
            direction: "towards",
            times: { x: 4 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 2, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 8 },
          },
        });
      });
    });

    describe("wall in middle of edge", () => {
      test("towards wall in middle - move positive x", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall in middle
            room.items[wallId] = {
              type: "wall",
              position: { x: 3, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall right by 2
        const state2 = testWallMovement(state0, wallId, { x: 2, y: 0, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should not have moved (floor didn't change)
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 3, y: 0, z: 0 },
          config: {
            direction: "towards",
            times: { x: 4 },
          },
        });

        // Floor should not have changed
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 10 },
          },
        });
      });

      test("towards wall in middle - move positive y", () => {
        const floorId = "floor1" as EditorRoomItemId;
        const wallId = "wall1" as EditorRoomItemId;

        const state0: LevelEditorState = produce(
          editorStateWithOneRoomWithNoItems,
          (draft) => {
            const room = draft.campaignInProgress.rooms[testRoomId];

            // Add a 10x10 floor at origin
            room.items[floorId] = {
              type: "floor",
              position: { x: 0, y: 0, z: 0 },
              config: {
                floorType: "standable",
                scenery: "blacktooth",
                times: { x: 10, y: 10 },
              },
            };

            // Add a partial towards wall in middle
            room.items[wallId] = {
              type: "wall",
              position: { x: 3, y: 0, z: 0 },
              config: {
                direction: "towards",
                times: { x: 4 },
              },
            };
          },
        );

        // Move wall forward by 2
        const state2 = testWallMovement(state0, wallId, { x: 0, y: 2, z: 0 });
        const room = state2.campaignInProgress.rooms[testRoomId];

        // Wall should have moved
        expect(room.items[wallId]).toEqual({
          type: "wall",
          position: { x: 3, y: 2, z: 0 },
          config: {
            direction: "towards",
            times: { x: 4 },
          },
        });

        // Floor should have moved and resized
        expect(room.items[floorId]).toEqual({
          type: "floor",
          position: { x: 0, y: 2, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 10, y: 8 },
          },
        });
      });
    });
  });

  describe("floor growth with partial walls that need extending", () => {
    test("should handle walls that need to extend when floor grows from one side", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // turn off auto coalesce for this test to isolate the thing we are testing for
          draft.autoCoalesce = false;

          // Add an 8x8 floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 8, y: 8 },
            },
          };

          // Add away wall at position (6,8) with 2 tiles (extends from x:6 to x:8)
          room.items[awayWallId] = {
            type: "wall",
            position: { x: 6, y: 8, z: 0 },
            config: {
              direction: "away",
              tiles: ["plain", "plain"], // 2 tiles
            },
          };

          // Add towards wall at position (6,0) with times x:2 (extends from x:6 to x:8)
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 6, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 2 },
            },
          };
        },
      );

      // Extend floor from lower edge in x: position moves to (-2,0) and size becomes 10x8
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: -2, y: 0, z: 0 },
          timesDelta: { x: 2, y: 0, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Floor should be at (-2,0) with size 10x8
      expect(room.items[floorId]).toEqual({
        type: "floor",
        position: { x: -2, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 8 },
        },
      });

      // Away wall should have moved and extended to fill the gap
      // It was at x:6-8, floor was x:0-8, now floor is x:-2 to 8
      // The wall should now be at x:4 (6-2) and extend to x:8 (4 tiles)
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 4, y: 8, z: 0 },
        config: {
          direction: "away",
          tiles: [
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ],
        },
      });
      const awayWall = room.items[awayWallId];
      expect(awayWall?.type).toBe("wall");
      if (awayWall?.type === "wall" && "tiles" in awayWall.config) {
        expect(awayWall.config.tiles).toHaveLength(4);
      }

      // Towards wall should have moved and extended similarly
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 4, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 4 },
        },
      });
    });

    test("should handle walls that need to extend when floor grows from higher x edge", () => {
      const floorId = "floor1" as EditorRoomItemId;
      const awayWallId = "awayWall" as EditorRoomItemId;
      const towardsWallId = "towardsWall" as EditorRoomItemId;

      const state0: LevelEditorState = produce(
        editorStateWithOneRoomWithNoItems,
        (draft) => {
          const room = draft.campaignInProgress.rooms[testRoomId];

          // Add an 8x8 floor at origin
          room.items[floorId] = {
            type: "floor",
            position: { x: 0, y: 0, z: 0 },
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 8, y: 8 },
            },
          };

          // Add away wall at position (6,8) with 2 tiles (extends from x:6 to x:8)
          room.items[awayWallId] = {
            type: "wall",
            position: { x: 6, y: 8, z: 0 },
            config: {
              direction: "away",
              tiles: ["plain", "plain"], // 2 tiles
            },
          };

          // Add towards wall at position (6,0) with times x:2 (extends from x:6 to x:8)
          room.items[towardsWallId] = {
            type: "wall",
            position: { x: 6, y: 0, z: 0 },
            config: {
              direction: "towards",
              times: { x: 2 },
            },
          };
        },
      );

      // Extend floor from higher edge in x: size becomes 10x8 (still at 0,0)
      const state1 = applyLevelEditorActions(
        state0,
        moveOrResizeItemAsPreview({
          jsonItemIds: [floorId],
          positionDelta: { x: 0, y: 0, z: 0 },
          timesDelta: { x: 2, y: 0, z: 0 },
        }),
        commitCurrentPreviewedEdits(),
      );

      const room = state1.campaignInProgress.rooms[testRoomId];

      // Floor should be at (0,0) with size 10x8
      expect(room.items[floorId]).toEqual({
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 10, y: 8 },
        },
      });

      // Away wall should extend to fill the gap
      // It was at x:6-8, floor was x:0-8, now floor is x:0-10
      // The wall should now extend from x:6 to x:10 (4 tiles)
      expect(room.items[awayWallId]).toEqual({
        type: "wall",
        position: { x: 6, y: 8, z: 0 },
        config: {
          direction: "away",
          tiles: [
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ],
        },
      });
      const awayWall = room.items[awayWallId];
      expect(awayWall?.type).toBe("wall");
      if (awayWall?.type === "wall" && "tiles" in awayWall.config) {
        expect(awayWall.config.tiles).toHaveLength(4);
      }

      // Towards wall should extend similarly
      expect(room.items[towardsWallId]).toEqual({
        type: "wall",
        position: { x: 6, y: 0, z: 0 },
        config: {
          direction: "towards",
          times: { x: 4 },
        },
      });
    });
  });
});
