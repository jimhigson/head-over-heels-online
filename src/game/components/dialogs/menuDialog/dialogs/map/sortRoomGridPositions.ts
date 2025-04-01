import type { RoomGridPositionSpec } from "./roomGridPositions";

export const sortRoomGridPositions = <RoomId extends string>(
  roomGridPositions: Iterable<RoomGridPositionSpec<RoomId>>,
): Array<RoomGridPositionSpec<RoomId>> =>
  [...roomGridPositions].sort(
    ({ gridPosition: gridPositionA }, { gridPosition: gridPositionB }) => {
      return gridPositionA.z !== gridPositionB.z ?
          gridPositionA.z - gridPositionB.z
        : gridPositionB.x +
            gridPositionB.y -
            (gridPositionA.x + gridPositionA.y);
    },
  );
