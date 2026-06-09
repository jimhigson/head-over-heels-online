import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
  type Xy,
} from "../../../utils/vectors/vectors";
import {
  isWholeRoomSubRooms,
  type RoomJson,
  roomJsonItemsIterable,
} from "../../RoomJson";
import { wallTimes } from "../../times";

const doorWidth = 2;

const coversPosition = (
  item: {
    type: string;
    position: { x: number; y: number };
    config: { direction: DirectionXy4; times?: Partial<Xy> };
  },
  direction: DirectionXy4,
  coord: Xy,
): boolean => {
  if (item.config.direction !== direction) {
    return false;
  }
  const dirAxis = tangentAxis(direction);
  const alongAxis = perpendicularAxisXy(dirAxis);

  if (item.position[dirAxis] !== coord[dirAxis]) {
    return false;
  }

  const length =
    item.type === "door" ? doorWidth : (wallTimes(item.config)[alongAxis] ?? 1);
  const start = item.position[alongAxis];
  return coord[alongAxis] >= start && coord[alongAxis] < start + length;
};

export const roomJsonMatchers = {
  toHaveFloor<RoomId extends string, RoomItemId extends string>(
    received: RoomJson<RoomId, RoomItemId>,
    expected: {
      position: Xy & { z: number };
      times: Xy;
    },
  ) {
    // Find all floors in the room
    const floors = Array.from(roomJsonItemsIterable(received)).filter(
      (item) => item.type === "floor",
    );

    // Find all floors that match the expected position and times
    const matchingFloors = floors.filter((floor) => {
      const positionMatches =
        floor.position.x === expected.position.x &&
        floor.position.y === expected.position.y &&
        floor.position.z === expected.position.z;

      const timesMatches =
        floor.config.times?.x === expected.times.x &&
        floor.config.times?.y === expected.times.y;

      return positionMatches && timesMatches;
    });

    if (matchingFloors.length === 1) {
      return {
        pass: true,
        message: () =>
          `Expected room not to have floor at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y})`,
      };
    } else if (matchingFloors.length > 1) {
      return {
        pass: false,
        message: () =>
          `Expected exactly one floor at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y}), but found ${matchingFloors.length} matching floors`,
      };
    }
    const floorsDescription =
      floors.length > 0 ?
        floors
          .map((f) => {
            return `  - Position: (${f.position.x}, ${f.position.y}, ${f.position.z}), Times: (${f.config.times?.x ?? 1}, ${f.config.times?.y ?? 1})`;
          })
          .join("\n")
      : "  No floors found in the room";

    return {
      pass: false,
      message: () =>
        `Expected room to have floor at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y})\n\nFound floors:\n${floorsDescription}`,
    };
  },

  toHaveWall<RoomId extends string, RoomItemId extends string>(
    received: RoomJson<RoomId, RoomItemId>,
    expected: {
      direction: DirectionXy4;
      position: Xy & { z: number };
      times: Xy;
    },
  ) {
    // Find walls with the specified direction
    const walls = Array.from(roomJsonItemsIterable(received))
      .filter((item) => item.type === "wall")
      .filter((wall) => wall.config.direction === expected.direction);

    // Find all walls that match the expected position and times
    const matchingWalls = walls.filter((wall) => {
      const wallTimesValue = wallTimes(wall.config);
      const positionMatches =
        wall.position.x === expected.position.x &&
        wall.position.y === expected.position.y &&
        wall.position.z === expected.position.z;

      const timesMatches =
        (expected.times.x === 0 || wallTimesValue.x === expected.times.x) &&
        (expected.times.y === 0 || wallTimesValue.y === expected.times.y);

      return positionMatches && timesMatches;
    });

    if (matchingWalls.length === 1) {
      return {
        pass: true,
        message: () =>
          `Expected room not to have wall with direction "${expected.direction}" at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y})`,
      };
    } else if (matchingWalls.length > 1) {
      return {
        pass: false,
        message: () =>
          `Expected exactly one wall with direction "${expected.direction}" at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y}), but found ${matchingWalls.length} matching walls`,
      };
    }
    const wallsDescription =
      walls.length > 0 ?
        walls
          .map((w) => {
            const wallTimesValue = wallTimes(w.config);
            return `  - Position: (${w.position.x}, ${w.position.y}, ${w.position.z}), Times: (${wallTimesValue.x ?? 0}, ${wallTimesValue.y ?? 0})`;
          })
          .join("\n")
      : "  No walls found with this direction";

    return {
      pass: false,
      message: () =>
        `Expected room to have wall with direction "${expected.direction}" at position (${expected.position.x}, ${expected.position.y}, ${expected.position.z}) with times (${expected.times.x}, ${expected.times.y})\n\nFound ${expected.direction} walls:\n${wallsDescription}`,
    };
  },

  toHaveSubroom<RoomId extends string, RoomItemId extends string>(
    received: RoomJson<RoomId, RoomItemId>,
    expected: {
      gridPosition: Xy;
      physicalPosition: {
        from: Xy;
        to: Xy;
      };
    },
  ) {
    // Check if room has subRooms metadata
    const subRooms = received.meta?.subRooms;

    if (!subRooms || isWholeRoomSubRooms(subRooms)) {
      return {
        pass: false,
        message: () =>
          `Expected room to have divided subRooms metadata, but it is undefined or the whole-room form`,
      };
    }

    // Find any subroom that matches the expected values
    const matchingSubrooms = Object.entries(subRooms).filter(([, subroom]) => {
      const gridPositionMatches =
        subroom.gridPosition.x === expected.gridPosition.x &&
        subroom.gridPosition.y === expected.gridPosition.y;

      const physicalPositionMatches =
        subroom.physicalPosition.from.x === expected.physicalPosition.from.x &&
        subroom.physicalPosition.from.y === expected.physicalPosition.from.y &&
        subroom.physicalPosition.to.x === expected.physicalPosition.to.x &&
        subroom.physicalPosition.to.y === expected.physicalPosition.to.y;

      return gridPositionMatches && physicalPositionMatches;
    });

    if (matchingSubrooms.length === 1) {
      return {
        pass: true,
        message: () =>
          `Expected room not to have subroom with gridPosition (${expected.gridPosition.x}, ${expected.gridPosition.y}) and physicalPosition from (${expected.physicalPosition.from.x}, ${expected.physicalPosition.from.y}) to (${expected.physicalPosition.to.x}, ${expected.physicalPosition.to.y})`,
      };
    } else if (matchingSubrooms.length > 1) {
      return {
        pass: false,
        message: () =>
          `Expected exactly one subroom with gridPosition (${expected.gridPosition.x}, ${expected.gridPosition.y}) and physicalPosition from (${expected.physicalPosition.from.x}, ${expected.physicalPosition.from.y}) to (${expected.physicalPosition.to.x}, ${expected.physicalPosition.to.y}), but found ${matchingSubrooms.length} matching subrooms`,
      };
    }
    const subroomsDescription = Object.entries(subRooms)
      .map(([key, subroom]) => {
        return `  - "${key}": gridPosition: (${subroom.gridPosition.x}, ${subroom.gridPosition.y}), physicalPosition: from (${subroom.physicalPosition.from.x}, ${subroom.physicalPosition.from.y}) to (${subroom.physicalPosition.to.x}, ${subroom.physicalPosition.to.y})`;
      })
      .join("\n");

    return {
      pass: false,
      message: () =>
        `Expected room to have subroom with gridPosition (${expected.gridPosition.x}, ${expected.gridPosition.y}) and physicalPosition from (${expected.physicalPosition.from.x}, ${expected.physicalPosition.from.y}) to (${expected.physicalPosition.to.x}, ${expected.physicalPosition.to.y})\n\nFound subrooms:\n${subroomsDescription}`,
    };
  },

  toHaveCompletePerimeter<RoomId extends string, RoomItemId extends string>(
    received: RoomJson<RoomId, RoomItemId>,
  ) {
    const items = Array.from(roomJsonItemsIterable(received));
    const floors = items.filter((i) => i.type === "floor");
    const wallsAndDoors = items.filter(
      (i) => i.type === "wall" || i.type === "door",
    );

    const floorSet = new Set<string>();
    for (const floor of floors) {
      const timesX = floor.config.times?.x ?? 1;
      const timesY = floor.config.times?.y ?? 1;
      for (let dx = 0; dx < timesX; dx++) {
        for (let dy = 0; dy < timesY; dy++) {
          floorSet.add(`${floor.position.x + dx},${floor.position.y + dy}`);
        }
      }
    }

    const uncovered: Array<{ x: number; y: number; direction: DirectionXy4 }> =
      [];

    for (const key of floorSet) {
      const [x, y] = key.split(",").map(Number);

      const edges: Array<{ direction: DirectionXy4; nx: number; ny: number }> =
        [
          { direction: "towards", nx: x, ny: y - 1 },
          { direction: "away", nx: x, ny: y + 1 },
          { direction: "right", nx: x - 1, ny: y },
          { direction: "left", nx: x + 1, ny: y },
        ];

      for (const { direction, nx, ny } of edges) {
        if (floorSet.has(`${nx},${ny}`)) {
          continue;
        }

        const wallCoord: Xy =
          direction === "towards" ? { x, y }
          : direction === "away" ? { x, y: y + 1 }
          : direction === "right" ? { x, y }
          : { x: x + 1, y };

        const isCovered = wallsAndDoors.some((item) =>
          coversPosition(
            item as {
              type: string;
              position: { x: number; y: number };
              config: { direction: DirectionXy4; times?: Partial<Xy> };
            },
            direction,
            wallCoord,
          ),
        );

        if (!isCovered) {
          uncovered.push({ x, y, direction });
        }
      }
    }

    if (uncovered.length === 0) {
      return {
        pass: true,
        message: () => "Expected room not to have a complete perimeter",
      };
    }

    const uncoveredDescription = uncovered
      .map((u) => `  - (${u.x}, ${u.y}) ${u.direction} edge`)
      .join("\n");

    return {
      pass: false,
      message: () =>
        `Expected room to have a complete perimeter, but ${uncovered.length} edges are uncovered:\n${uncoveredDescription}`,
    };
  },
};
