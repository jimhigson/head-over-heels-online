import { describe, expect, test } from "vitest";

import { blockSizePx } from "../../../../../physics/mechanicsConstants";
import { findSubRoomForItem, type MaybeDividedRoom } from "./itemIsInSubRoom";

const createFinePosition = (x: number, y: number) => ({
  x: x * blockSizePx.x,
  y: y * blockSizePx.y,
});

const createMockRoom = (): MaybeDividedRoom => ({
  id: "testRoom",
  meta: {
    subRooms: {
      subRoom1: {
        physicalPosition: {
          from: { x: 0, y: 0 },
          to: { x: 5, y: 5 },
        },
      },
      subRoom2: {
        physicalPosition: {
          from: { x: 10, y: 10 },
          to: { x: 15, y: 15 },
        },
      },
    },
  },
});

describe("fine mode", () => {
  test("returns subroom when item is inside it", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const position = createFinePosition(3, 3);

    const result = findSubRoomForItem(position, "fine", room);
    expect(result).toBe("subRoom1");
  });

  test("returns subroom when item is on the boundary", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const position = createFinePosition(5, 5);

    const result = findSubRoomForItem(position, "fine", room);
    expect(result).toBe("subRoom1");
  });

  test("returns closest subroom when item is outside all subrooms", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const position = createFinePosition(7, 7);

    const result = findSubRoomForItem(position, "fine", room);
    // Item at (7,7) is closer to subRoom1 (distance 2+2=4) than subRoom2 (distance 3+3=6)
    expect(result).toBe("subRoom1");
  });

  test("returns closest subroom when item is far from all subrooms", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const position = createFinePosition(20, 20);

    const result = findSubRoomForItem(position, "fine", room);
    // Item at (20,20) is closer to subRoom2 (distance 5+5=10) than subRoom1 (distance 15+15=30)
    expect(result).toBe("subRoom2");
  });

  test("returns '*' when room has no subrooms", () => {
    const roomWithoutSubRooms: MaybeDividedRoom = {
      id: "testRoom",
      meta: undefined,
    };

    const position = createFinePosition(5, 5);
    const result = findSubRoomForItem(position, "fine", roomWithoutSubRooms);
    expect(result).toBe("*");
  });

  test("returns '*' when room meta has no subrooms", () => {
    const roomWithoutSubRooms: MaybeDividedRoom = {
      id: "testRoom",
      meta: {},
    };

    const position = createFinePosition(5, 5);
    const result = findSubRoomForItem(position, "fine", roomWithoutSubRooms);
    expect(result).toBe("*");
  });

  test("handles items exactly between two equidistant subrooms", () => {
    const room: MaybeDividedRoom = {
      id: "testRoom",
      meta: {
        subRooms: {
          subRoom1: {
            physicalPosition: {
              from: { x: 0, y: 0 },
              to: { x: 5, y: 5 },
            },
          },
          subRoom2: {
            physicalPosition: {
              from: { x: 10, y: 0 },
              to: { x: 15, y: 5 },
            },
          },
        },
      },
    };

    // Item at (7.5, 2.5) is equidistant from both subrooms
    const position = createFinePosition(7.5, 2.5);
    const result = findSubRoomForItem(position, "fine", room);
    // Should return one of them (whichever comes first in iteration)
    expect(["subRoom1", "subRoom2"]).toContain(result);
  });
});

describe("block mode", () => {
  test("returns subroom when item is inside it", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const blockPosition = { x: 3, y: 3 };

    const result = findSubRoomForItem(blockPosition, "block", room);
    expect(result).toBe("subRoom1");
  });

  test("returns subroom when item is on the boundary", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const blockPosition = { x: 5, y: 5 };

    const result = findSubRoomForItem(blockPosition, "block", room);
    expect(result).toBe("subRoom1");
  });

  test("returns closest subroom when item is outside all subrooms", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const blockPosition = { x: 7, y: 7 };

    const result = findSubRoomForItem(blockPosition, "block", room);
    // Item at (7,7) is closer to subRoom1 (distance 2+2=4) than subRoom2 (distance 3+3=6)
    expect(result).toBe("subRoom1");
  });

  test("returns closest subroom when item is far from all subrooms", () => {
    const room: MaybeDividedRoom = createMockRoom();
    const blockPosition = { x: 20, y: 20 };

    const result = findSubRoomForItem(blockPosition, "block", room);
    // Item at (20,20) is closer to subRoom2 (distance 5+5=10) than subRoom1 (distance 15+15=30)
    expect(result).toBe("subRoom2");
  });

  test("returns '*' when room has no subrooms", () => {
    const roomWithoutSubRooms: MaybeDividedRoom = {
      id: "testRoom",
      meta: undefined,
    };

    const blockPosition = { x: 5, y: 5 };
    const result = findSubRoomForItem(
      blockPosition,
      "block",
      roomWithoutSubRooms,
    );
    expect(result).toBe("*");
  });
});

test("fine and block modes give same results", () => {
  const room: MaybeDividedRoom = createMockRoom();

  // Test a position inside subRoom1
  const blockPos1 = { x: 3, y: 3 };
  const finePos1 = {
    x: 3 * blockSizePx.x,
    y: 3 * blockSizePx.y,
  };
  expect(findSubRoomForItem(blockPos1, "block", room)).toBe(
    findSubRoomForItem(finePos1, "fine", room),
  );

  // Test a position between rooms
  const blockPos2 = { x: 7, y: 7 };
  const finePos2 = {
    x: 7 * blockSizePx.x,
    y: 7 * blockSizePx.y,
  };
  expect(findSubRoomForItem(blockPos2, "block", room)).toBe(
    findSubRoomForItem(finePos2, "fine", room),
  );

  // Test a position inside subRoom2
  const blockPos3 = { x: 12, y: 12 };
  const finePos3 = {
    x: 12 * blockSizePx.x,
    y: 12 * blockSizePx.y,
  };
  expect(findSubRoomForItem(blockPos3, "block", room)).toBe(
    findSubRoomForItem(finePos3, "fine", room),
  );
});

test("case that seems wrong in editor", () => {
  const room: MaybeDividedRoom = {
    id: "testRoom",
    meta: {
      subRooms: {
        "3": {
          physicalPosition: {
            from: { x: -99, y: -99 },
            to: { x: 17, y: 4 },
          },
        },
        "4": {
          physicalPosition: {
            from: { x: 17, y: -99 },
            to: { x: 99, y: 4 },
          },
        },
        left: {
          physicalPosition: {
            from: { x: 6, y: 0 },
            to: { x: 17, y: 8 },
          },
        },
        right: {
          physicalPosition: {
            from: { x: 0, y: 0 },
            to: { x: 8, y: 8 },
          },
        },
      },
    },
  };
  const result = findSubRoomForItem({ x: 19, y: 4 }, "block", room);
  // Position (19, 4) is outside all subrooms
  // Distance to "3": x=2 (19-17), y=0 (4 is at boundary) = 2
  // Distance to "4": x=0 (19>17, within bounds), y=4 (4-0) = 4
  // Distance to "left": x=2 (19-17), y=0 (within 0-8) = 2
  // Distance to "right": x=11 (19-8), y=0 (within 0-8) = 11
  // Should return "3" or "left" (both have distance 2)
  expect(["4"]).toContain(result);
});
