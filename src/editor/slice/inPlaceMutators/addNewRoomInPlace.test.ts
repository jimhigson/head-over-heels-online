import { describe, expect, it } from "vitest";

import type { EditorRoomId } from "../../editorTypes";

import { roomJsonMatchers } from "../../../model/json/__test__/roomJsonMatchers";
import { iterateRoomJsonItems } from "../../../model/RoomJson";
import { createNewRoom } from "./addNewRoomInPlace";

expect.extend(roomJsonMatchers);

describe("createNewRoom with gridPositions", () => {
  const roomId = "room_0" as EditorRoomId;
  const roomSize = { x: 8, y: 8 };
  const colour = { hue: "cyan" as const, shade: "basic" as const };
  const scenery = "blacktooth" as const;

  it("should create a single 8x8 room chunk when given one grid position", () => {
    const gridPositions = [{ x: 0, y: 0 }];
    const room = createNewRoom(
      roomId,
      roomSize,
      colour,
      scenery,
      gridPositions,
    );

    // Single room should not have subRooms metadata
    expect(room.meta?.subRooms).toBeUndefined();

    // Check floor configuration using toHaveFloor matcher
    expect(room).toHaveFloor({
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 8 },
    });

    // Check walls exist with correct dimensions
    const walls = iterateRoomJsonItems(room)
      .filter((item) => item.type === "wall")
      .toArray();

    const wallsByDirection = Object.groupBy(walls, (w) => w.config.direction);

    // Check towards wall - should span width
    expect(wallsByDirection.towards?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Check away wall- should span width
    expect(wallsByDirection.away?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 0, y: 8, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Check left wall - should span depth
    expect(wallsByDirection.left?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 8, y: 0, z: 0 },
      times: { x: 0, y: 8 },
    });

    // Check right wall - should span depth
    expect(wallsByDirection.right?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 0, y: 8 },
    });
  });

  it("should create two depth-adjacent chunks and remove the wall between them", () => {
    const gridPositions = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const room = createNewRoom(
      roomId,
      roomSize,
      colour,
      scenery,
      gridPositions,
    );

    // Check subRooms metadata
    expect(room).toHaveSubroom({
      gridPosition: { x: 0, y: 0 },
      physicalPosition: {
        from: { x: 0, y: 0 },
        to: { x: 7, y: 7 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 0, y: 1 },
      physicalPosition: {
        from: { x: 0, y: 8 },
        to: { x: 7, y: 15 },
      },
    });

    // Should have one consolidated floor spanning both chunks
    expect(room).toHaveFloor({
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 16 },
    });

    // Check walls
    const walls = iterateRoomJsonItems(room)
      .filter((item) => item.type === "wall")
      .toArray();

    const wallsByDirection = Object.groupBy(walls, (w) => w.config.direction);

    // Should have NO away wall at y=8 (the boundary between chunks)
    // The first chunk's away wall and second chunk's towards wall should be removed

    // Check towards wall - should be at front of first chunk only
    expect(wallsByDirection.towards?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Check away wall - should be at back of second chunk only
    expect(wallsByDirection.away?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 0, y: 16, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Check left wall - should span both chunks (16 units)
    expect(wallsByDirection.left?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 8, y: 0, z: 0 },
      times: { x: 0, y: 16 },
    });

    // Check right wall - should span both chunks (16 units)
    expect(wallsByDirection.right?.length).toBe(1);
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 0, y: 16 },
    });
  });

  it("should create a zig-zag room with four chunks", () => {
    const gridPositions = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    const room = createNewRoom(
      roomId,
      roomSize,
      colour,
      scenery,
      gridPositions,
    );

    // Check subRooms metadata
    expect(room).toHaveSubroom({
      gridPosition: { x: 0, y: 0 },
      physicalPosition: {
        from: { x: 0, y: 0 },
        to: { x: 7, y: 7 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 0, y: 1 },
      physicalPosition: {
        from: { x: 0, y: 8 },
        to: { x: 7, y: 15 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 1, y: 1 },
      physicalPosition: {
        from: { x: 8, y: 8 },
        to: { x: 15, y: 15 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 1, y: 2 },
      physicalPosition: {
        from: { x: 8, y: 16 },
        to: { x: 15, y: 23 },
      },
    });

    // Should have two consolidated floors (L-shaped room)
    // First L segment: (0,0) and (0,1) consolidated
    expect(room).toHaveFloor({
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 16 },
    });
    // Second L segment: (1,1) and (1,2) consolidated
    expect(room).toHaveFloor({
      position: { x: 8, y: 8, z: 0 },
      times: { x: 8, y: 16 },
    });

    // Check walls - should have exactly 8 walls forming the perimeter
    const walls = iterateRoomJsonItems(room)
      .filter((item) => item.type === "wall")
      .toArray();

    const wallsByDirection = Object.groupBy(walls, (w) => w.config.direction);

    // Towards walls (2) - at the front edges
    expect(wallsByDirection.towards?.length).toBe(2);
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 8, y: 8, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Away walls (2) - at the back edges
    expect(wallsByDirection.away?.length).toBe(2);
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 0, y: 16, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 8, y: 24, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Left walls (2) - at the right edges
    expect(wallsByDirection.left?.length).toBe(2);
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 8, y: 0, z: 0 },
      times: { x: 0, y: 8 },
    });
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 16, y: 8, z: 0 },
      times: { x: 0, y: 16 },
    });

    // Right walls (2) - at the left edges
    expect(wallsByDirection.right?.length).toBe(2);
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 0, y: 0, z: 0 },
      times: { x: 0, y: 16 },
    });
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 8, y: 16, z: 0 },
      times: { x: 0, y: 8 },
    });
  });

  it("should create a cross-shaped room with five chunks", () => {
    const gridPositions = [
      { x: 1, y: 1 }, // center
      { x: 1, y: 0 }, // near
      { x: 1, y: 2 }, // far
      { x: 0, y: 1 }, // left
      { x: 2, y: 1 }, // right
    ];
    const room = createNewRoom(
      roomId,
      roomSize,
      colour,
      scenery,
      gridPositions,
    );

    // Check subRooms metadata
    expect(room).toHaveSubroom({
      gridPosition: { x: 1, y: 1 },
      physicalPosition: {
        from: { x: 8, y: 8 },
        to: { x: 15, y: 15 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 1, y: 0 },
      physicalPosition: {
        from: { x: 8, y: 0 },
        to: { x: 15, y: 7 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 1, y: 2 },
      physicalPosition: {
        from: { x: 8, y: 16 },
        to: { x: 15, y: 23 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 0, y: 1 },
      physicalPosition: {
        from: { x: 0, y: 8 },
        to: { x: 7, y: 15 },
      },
    });
    expect(room).toHaveSubroom({
      gridPosition: { x: 2, y: 1 },
      physicalPosition: {
        from: { x: 16, y: 8 },
        to: { x: 23, y: 15 },
      },
    });

    // Should have three consolidated floors:
    // Horizontal bar: (0,1), (1,1), (2,1) consolidated
    expect(room).toHaveFloor({
      position: { x: 0, y: 8, z: 0 },
      times: { x: 24, y: 8 },
    });
    // Near arm: (1,0)
    expect(room).toHaveFloor({
      position: { x: 8, y: 0, z: 0 },
      times: { x: 8, y: 8 },
    });
    // Far arm: (1,2)
    expect(room).toHaveFloor({
      position: { x: 8, y: 16, z: 0 },
      times: { x: 8, y: 8 },
    });

    // Check walls - should have 12 walls forming the cross perimeter
    const walls = iterateRoomJsonItems(room)
      .filter((item) => item.type === "wall")
      .toArray();

    const wallsByDirection = Object.groupBy(walls, (w) => w.config.direction);

    // Towards walls (3) - at the front edges of each arm
    expect(wallsByDirection.towards?.length).toBe(3);
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 8, y: 0, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 0, y: 8, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "towards",
      position: { x: 16, y: 8, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Away walls (3) - at the back edges of each arm
    expect(wallsByDirection.away?.length).toBe(3);
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 8, y: 24, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 0, y: 16, z: 0 },
      times: { x: 8, y: 0 },
    });
    expect(room).toHaveWall({
      direction: "away",
      position: { x: 16, y: 16, z: 0 },
      times: { x: 8, y: 0 },
    });

    // Left walls (3) - at the right edges
    expect(wallsByDirection.left?.length).toBe(3);
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 16, y: 0, z: 0 },
      times: { x: 0, y: 8 },
    });
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 16, y: 16, z: 0 },
      times: { x: 0, y: 8 },
    });
    expect(room).toHaveWall({
      direction: "left",
      position: { x: 24, y: 8, z: 0 },
      times: { x: 0, y: 8 },
    });

    // Right walls (3) - at the left edges
    expect(wallsByDirection.right?.length).toBe(3);
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 0, y: 8, z: 0 },
      times: { x: 0, y: 8 },
    });
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 8, y: 0, z: 0 },
      times: { x: 0, y: 8 },
    });
    expect(room).toHaveWall({
      direction: "right",
      position: { x: 8, y: 16, z: 0 },
      times: { x: 0, y: 8 },
    });
  });
});
