import { describe, expect, it } from "vitest";

import type { EditorRoomId } from "../../editorTypes";

import { createNewRoom } from "../../../model/inPlaceMutators/createNewRoom";
import { roomJsonMatchers } from "../../../model/json/__test__/roomJsonMatchers";
import { roomJsonItemsIterable } from "../../../model/RoomJson";

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
    const walls = roomJsonItemsIterable(room)
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
});
