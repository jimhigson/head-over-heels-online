import { fromAllEntries } from "../../../../../../utils/entries";
import type { RoomGridPositionSpec } from "./roomGridPositions";

export type SortedObjectOfRoomGridPositionSpecs<RoomId extends string> = Record<
  `${RoomId}/${string}`,
  RoomGridPositionSpec<RoomId>
>;

export const sortRoomGridPositions = <RoomId extends string>(
  roomGridPositions: Iterable<RoomGridPositionSpec<RoomId>>,
): SortedObjectOfRoomGridPositionSpecs<RoomId> => {
  const sortedGridPositions = [...roomGridPositions].sort(
    ({ gridPosition: gridPositionA }, { gridPosition: gridPositionB }) => {
      return gridPositionA.z !== gridPositionB.z ?
          gridPositionA.z - gridPositionB.z
        : gridPositionB.x +
            gridPositionB.y -
            (gridPositionA.x + gridPositionA.y);
    },
  );

  const entries = sortedGridPositions.map(
    (positionSpec) =>
      [`${positionSpec.roomId}/${positionSpec.subRoomId}`, positionSpec] as [
        `${RoomId}/${string}`,
        RoomGridPositionSpec<RoomId>,
      ],
  );
  return fromAllEntries(entries);
};
