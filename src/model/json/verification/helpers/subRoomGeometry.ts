import { entries } from "../../../../utils/entries";
import {
  isWholeRoomSubRooms,
  type SubRoom,
  type SubRooms,
} from "../../../RoomJson";
import { type VerificationRoomId } from "../verificationTypes";

export type DividedCellRef = {
  cellId: string;
  cell: SubRoom<VerificationRoomId>;
};

/** the named sub-room cells of a divided room (nothing for undivided rooms) */
export function* dividedCells(room: {
  meta?: { subRooms?: SubRooms<VerificationRoomId> };
}): Generator<DividedCellRef> {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    return;
  }
  for (const [cellId, cell] of entries(subRooms)) {
    yield { cellId, cell };
  }
}

/** a cell whose `physicalPosition` has a zero or negative width/depth */
export const cellHasInvertedExtent = (
  cell: SubRoom<VerificationRoomId>,
): boolean => {
  const { from, to } = cell.physicalPosition;
  return from.x >= to.x || from.y >= to.y;
};

/** whether a floor square (x, y) falls inside a cell's `physicalPosition` */
export const cellCoversSquare = (
  cell: SubRoom<VerificationRoomId>,
  x: number,
  y: number,
): boolean => {
  const { from, to } = cell.physicalPosition;
  return x >= from.x && x < to.x && y >= from.y && y < to.y;
};

/** two cells one grid step apart (orthogonally) on the map */
export const gridAdjacent = (
  a: SubRoom<VerificationRoomId>,
  b: SubRoom<VerificationRoomId>,
): boolean => {
  const dx = Math.abs(a.gridPosition.x - b.gridPosition.x);
  const dy = Math.abs(a.gridPosition.y - b.gridPosition.y);
  return dx + dy === 1;
};

/** ranges share a length of more than a single touching point */
const rangesOverlapStrict = (
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): boolean => start1 < end2 && start2 < end1;

/** two cells whose `physicalPosition` rectangles share an edge of positive length */
export const physicallyAdjacent = (
  a: SubRoom<VerificationRoomId>,
  b: SubRoom<VerificationRoomId>,
): boolean => {
  const { from: af, to: at } = a.physicalPosition;
  const { from: bf, to: bt } = b.physicalPosition;
  const touchOnX =
    (at.x === bf.x || bt.x === af.x) &&
    rangesOverlapStrict(af.y, at.y, bf.y, bt.y);
  const touchOnY =
    (at.y === bf.y || bt.y === af.y) &&
    rangesOverlapStrict(af.x, at.x, bf.x, bt.x);
  return touchOnX || touchOnY;
};
