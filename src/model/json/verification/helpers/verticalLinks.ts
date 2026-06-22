import { entries } from "../../../../utils/entries";
import {
  type AllRoomSubRoom,
  isWholeRoomSubRooms,
  type SubRoom,
} from "../../../RoomJson";
import {
  type VerificationCampaign,
  type VerificationRoomId,
} from "../verificationTypes";

export type VerticalDirection = "above" | "below";

export const oppositeVerticalDirection = (
  direction: VerticalDirection,
): VerticalDirection => (direction === "above" ? "below" : "above");

export type SubRoomCellRef = {
  roomId: VerificationRoomId;
  /** the sub-room cell id ("*" for an undivided room) */
  cellId: string;
  cell: AllRoomSubRoom<VerificationRoomId> | SubRoom<VerificationRoomId>;
};

/** every sub-room cell of every room (the single "*" cell for undivided rooms) */
export function* subRoomCells(
  campaign: VerificationCampaign,
): Generator<SubRoomCellRef> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    const subRooms = room.meta?.subRooms;
    if (subRooms === undefined) {
      continue;
    }
    const cells =
      isWholeRoomSubRooms(subRooms) ?
        ([["*", subRooms["*"]]] as const)
      : entries(subRooms);
    for (const [cellId, cell] of cells) {
      yield { roomId, cellId, cell };
    }
  }
}

export type VerticalLinkRef = {
  roomId: VerificationRoomId;
  cellId: string;
  direction: VerticalDirection;
  link: { room: VerificationRoomId; subRoom?: string };
};

/** every above/below link held by any room's sub-rooms */
export function* verticalLinks(
  campaign: VerificationCampaign,
): Generator<VerticalLinkRef> {
  for (const { roomId, cellId, cell } of subRoomCells(campaign)) {
    for (const direction of ["above", "below"] as const) {
      const link = cell[direction];
      if (link !== undefined) {
        yield { roomId, cellId, direction, link };
      }
    }
  }
}
