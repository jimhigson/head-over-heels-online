import type { DirectionXy4, Xy } from "../../../utils/vectors/vectors";
import type { RoomJson } from "../../RoomJson";

import { iterateRoomJsonItems } from "../../RoomJson";
import { wallTimes } from "../../times";

export const roomJsonMatchers = {
  toHaveFloor<RoomId extends string, RoomItemId extends string>(
    received: RoomJson<RoomId, RoomItemId>,
    expected: {
      position: Xy & { z: number };
      times: Xy;
    },
  ) {
    // Find all floors in the room
    const floors = Array.from(iterateRoomJsonItems(received)).filter(
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
    } else {
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
    }
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
    const walls = Array.from(iterateRoomJsonItems(received))
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
    } else {
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
    }
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

    if (!subRooms) {
      return {
        pass: false,
        message: () =>
          `Expected room to have subRooms metadata, but meta.subRooms is undefined`,
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
    } else {
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
    }
  },
};
