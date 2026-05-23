import type { SortedObjectOfRoomGridPositionSpecs } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";

import { type RoomGridPositionSpec } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { valuesIter } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { type EditorRoomId } from "../editorTypes";

export const areRoomsCoalesceable = (
  selectedRoomIds: ReadonlyArray<EditorRoomId>,
  gridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
):
  | { coalesceable: false }
  | { coalesceable: true; gridPositionLookup: Record<EditorRoomId, Xy> } => {
  if (selectedRoomIds.length < 2) {
    return { coalesceable: false };
  }

  const selectedSet = new Set(selectedRoomIds);

  const cellsByRoom = new Map<EditorRoomId, Xy[]>();
  for (const spec of valuesIter<RoomGridPositionSpec<EditorRoomId>>(
    gridPositions,
  )) {
    const roomId = spec.roomId as EditorRoomId;
    if (!selectedSet.has(roomId)) {
      continue;
    }
    let cells = cellsByRoom.get(roomId);
    if (!cells) {
      cells = [];
      cellsByRoom.set(roomId, cells);
    }
    cells.push({ x: spec.gridPosition.x, y: spec.gridPosition.y });
  }

  if (cellsByRoom.size !== selectedRoomIds.length) {
    return { coalesceable: false };
  }

  const allCells = [...cellsByRoom.values()].flat();
  const [
    {
      gridPosition: { z: firstZ },
    },
  ] = [...valuesIter(gridPositions)];
  if (
    allCells.length === 0 ||
    ![...valuesIter(gridPositions)]
      .filter((s) => selectedSet.has(s.roomId as EditorRoomId))
      .every((s) => s.gridPosition.z === firstZ)
  ) {
    return { coalesceable: false };
  }

  const visited = new Set<EditorRoomId>();
  const [firstRoomId] = selectedRoomIds;
  visited.add(firstRoomId);
  const queue: EditorRoomId[] = [firstRoomId];

  while (queue.length > 0) {
    const current = queue.pop()!;
    const currentCells = cellsByRoom.get(current)!;

    for (const [candidateId, candidateCells] of cellsByRoom) {
      if (visited.has(candidateId)) {
        continue;
      }

      const isAdjacent = currentCells.some((cc) =>
        candidateCells.some((tc) => {
          const dx = Math.abs(cc.x - tc.x);
          const dy = Math.abs(cc.y - tc.y);
          return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
        }),
      );

      if (isAdjacent) {
        visited.add(candidateId);
        queue.push(candidateId);
      }
    }
  }

  if (visited.size !== cellsByRoom.size) {
    return { coalesceable: false };
  }

  const gridPositionLookup = Object.fromEntries(
    [...cellsByRoom].map(([roomId, cells]) => [roomId, cells[0]]),
  ) as Record<EditorRoomId, Xy>;

  return { coalesceable: true, gridPositionLookup };
};
