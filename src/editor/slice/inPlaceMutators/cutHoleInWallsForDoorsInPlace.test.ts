import { describe, test, expect } from "vitest";
import { generateHoleInWallsForDoor } from "./cutHoleInWallsForDoorsInPlace";
import type { EditorJsonItem, EditorRoomItemId } from "../../editorTypes";
import type { PreviewedRoomItemEdits } from "../levelEditorSlice";
import type {
  AwayWallConfig,
  TowardsWallConfig,
} from "../../../model/json/WallJsonConfig";
import type { SceneryName } from "../../../sprites/planets";

describe("generateHoleInWallsForDoor", () => {
  // Helper to create a wall
  const createWall = (
    id: string,
    direction: "towards" | "away" | "left" | "right",
    position: { x: number; y: number; z: number },
    length: number = 8,
  ): [EditorRoomItemId, EditorJsonItem<"wall">] => {
    const wall = {
      type: "wall",
      position,
      config: {
        direction,
        ...(direction === "towards" || direction === "right" ?
          { times: { [direction === "towards" ? "x" : "y"]: length } }
        : {
            tiles: Array(length).fill("plain"),
          }),
      },
    } as EditorJsonItem<"wall">;
    return [id as EditorRoomItemId, wall];
  };

  test("door adjacent at start (touching but not overlapping)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: -2, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(0); // No modifications needed
  });

  test("door adjacent at end (touching but not overlapping)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 8, y: 0, z: 0 }),
    ];

    // Door at position 8 is adjacent to the end of the wall (which goes from 0 to 8)
    // This should not modify the wall (like the adjacent at start case)
    expect(results).toHaveLength(0); // No modifications needed
  });

  test("door in the middle of the wall (cuts wall into two)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 3, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(3);

    const [before, after, removal] = results;

    // Wall before door
    const [beforeId, beforeWall] = before;
    expect(beforeId).toBe("wall1/beforeDoor");
    if (beforeWall === null) {
      expect.fail();
    }
    expect(beforeWall.position).toEqual({ x: 0, y: 0, z: 0 });
    expect((beforeWall.config as TowardsWallConfig).times).toEqual({ x: 3 });

    // Wall after door
    const [afterId, afterWall] = after;
    expect(afterId).toBe("wall1/afterDoor");
    if (afterWall === null) {
      expect.fail();
    }
    expect(afterWall.position).toEqual({ x: 5, y: 0, z: 0 });
    expect((afterWall.config as TowardsWallConfig).times).toEqual({ x: 3 });

    // Original wall removed
    const [removedId, removedWall] = removal;
    expect(removedId).toBe("wall1");
    expect(removedWall).toBeNull();
  });

  test("door at the start of the wall (cuts off 2 at the start)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 0, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    expect(wall.position).toEqual({ x: 2, y: 0, z: 0 });
    expect((wall.config as TowardsWallConfig).times).toEqual({ x: 6 });
  });

  test("door overlapping the start of the wall (cuts off 1)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: -1, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    expect(wall.position).toEqual({ x: 1, y: 0, z: 0 });
    expect((wall.config as TowardsWallConfig).times).toEqual({ x: 7 });
  });

  test("door at the end of the wall (cuts off 2 at the end)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 6, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    expect(wall.position).toEqual({ x: 0, y: 0, z: 0 });
    expect((wall.config as TowardsWallConfig).times).toEqual({ x: 6 });
  });

  test("door overlapping the end of the wall (cuts off 1)", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 7, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    expect(wall.position).toEqual({ x: 0, y: 0, z: 0 });
    expect((wall.config as TowardsWallConfig).times).toEqual({ x: 7 });
  });

  test("door before the start of the wall", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: -3, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(0); // No modifications needed
  });

  test("door after the end of the wall", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 9, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(0); // No modifications needed
  });

  test("door completely replaces 2-length wall", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "towards",
        { x: 0, y: 0, z: 0 },
        2,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "towards", { x: 0, y: 0, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    expect(wall).toBeNull(); // Wall completely removed
  });

  test("works with away walls using tiles", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "away",
        { x: 0, y: 5, z: 0 },
        8,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "away", { x: 3, y: 5, z: 0 }),
    ];

    expect(results).toHaveLength(3);

    const [before, after, removal] = results;

    // Wall before door
    const [beforeId, beforeWall] = before;
    expect(beforeId).toBe("wall1/beforeDoor");
    if (beforeWall === null) {
      expect.fail();
    }
    expect(beforeWall.position).toEqual({ x: 0, y: 5, z: 0 });
    expect(
      (beforeWall.config as AwayWallConfig<SceneryName>).tiles,
    ).toHaveLength(3);

    // Wall after door
    const [afterId, afterWall] = after;
    expect(afterId).toBe("wall1/afterDoor");
    if (afterWall === null) {
      expect.fail();
    }
    expect(afterWall.position).toEqual({ x: 5, y: 5, z: 0 });
    expect(
      (afterWall.config as AwayWallConfig<SceneryName>).tiles,
    ).toHaveLength(3);

    // Original wall removed
    const [removedId, removedWall] = removal;
    expect(removedId).toBe("wall1");
    expect(removedWall).toBeNull();
  });

  test("away wall with door overlapping start - cuts off 1 tile", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "away",
        { x: 3, y: 8, z: 0 },
        2,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "away", { x: 2, y: 8, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    // Wall should be cut down to 1 tile at position 4
    expect(wall.position).toEqual({ x: 4, y: 8, z: 0 });
    expect((wall.config as AwayWallConfig<SceneryName>).tiles).toHaveLength(1);
  });

  test("away wall with door overlapping end - cuts off 1 tile", () => {
    const items: PreviewedRoomItemEdits = {
      ["wall1" as EditorRoomItemId]: createWall(
        "wall1",
        "away",
        { x: 3, y: 8, z: 0 },
        2,
      )[1],
    };

    const results = [
      ...generateHoleInWallsForDoor(items, "away", { x: 4, y: 8, z: 0 }),
    ];

    expect(results).toHaveLength(1);

    const [[id, wall]] = results;
    expect(id).toBe("wall1");
    if (wall === null) {
      expect.fail();
    }
    // Wall should be cut down to 1 tile at position 3
    expect(wall.position).toEqual({ x: 3, y: 8, z: 0 });
    expect((wall.config as AwayWallConfig<SceneryName>).tiles).toHaveLength(1);
  });
});
