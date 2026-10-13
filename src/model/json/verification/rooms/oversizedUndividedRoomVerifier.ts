import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { type Xy } from "../../../../utils/vectors/vectors";
import { isWholeRoomSubRooms, type SubRoom } from "../../../RoomJson";
import { roomJsonItemsIterable } from "../../../RoomJsonItemIterators";
import { type CampaignVerifier } from "../CampaignVerification";
import {
  type VerificationRoomId,
  type VerificationRoomJson,
} from "../verificationTypes";

/** the most blocks a room can span on either axis and still be one map cell */
export const maxSingleCellRoomBlocks = 12;

type OversizedUndividedRoom = {
  roomId: VerificationRoomId;
};

type FloorRect = {
  from: Xy;
  to: Xy;
};

/** the rectangle bounding all of a room's floors; undefined if it has none */
const floorRect = (room: VerificationRoomJson): FloorRect | undefined => {
  let rect: FloorRect | undefined;
  for (const {
    position,
    config: { times },
  } of roomJsonItemsIterable(room, "floor")) {
    const floorTo = { x: position.x + times.x, y: position.y + times.y };
    rect =
      rect === undefined ?
        { from: { x: position.x, y: position.y }, to: floorTo }
      : {
          from: {
            x: Math.min(rect.from.x, position.x),
            y: Math.min(rect.from.y, position.y),
          },
          to: {
            x: Math.max(rect.to.x, floorTo.x),
            y: Math.max(rect.to.y, floorTo.y),
          },
        };
  }
  return rect;
};

/** how many map cells a span of blocks needs */
const cellsForSpan = (span: number): number =>
  Math.ceil(span / maxSingleCellRoomBlocks);

/** the map cells (x by y) an undivided room's floor needs, if more than one */
const cellCountsIfOversized = (
  room: VerificationRoomJson,
): { cellCounts: Xy; rect: FloorRect } | undefined => {
  const subRooms = room.meta?.subRooms;
  if (subRooms !== undefined && !isWholeRoomSubRooms(subRooms)) {
    return undefined;
  }
  const rect = floorRect(room);
  if (rect === undefined) {
    return undefined;
  }
  const cellCounts = {
    x: cellsForSpan(rect.to.x - rect.from.x),
    y: cellsForSpan(rect.to.y - rect.from.y),
  };
  return cellCounts.x === 1 && cellCounts.y === 1 ?
      undefined
    : { cellCounts, rect };
};

/** `count + 1` near-equally spaced whole-block boundaries from `from` to `to` */
const cellBoundaries = (from: number, to: number, count: number): number[] =>
  Array.from(
    { length: count + 1 },
    (_, index) => from + Math.round((index * (to - from)) / count),
  );

/**
 * a room whose floor spans more than `maxSingleCellRoomBlocks` on either axis
 * but has no sub-rooms, so the map squeezes it into a single cell. The fix
 * divides the floor into a grid of near-equal sub-rooms; any whole-room (`'*'`)
 * links move onto the first sub-room, which is where links into the room land.
 */
export const oversizedUndividedRoomVerifier: CampaignVerifier<OversizedUndividedRoom> =
  {
    name: "Room too big for one map cell",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        const oversized = cellCountsIfOversized(room);
        if (oversized === undefined) {
          continue;
        }
        const {
          cellCounts,
          rect: { from, to },
        } = oversized;
        yield {
          severity: "warning",
          roomId,
          msg: `‘${roomId}’ is ${to.x - from.x}×${to.y - from.y} blocks, too big for one map cell (max ${maxSingleCellRoomBlocks}×${maxSingleCellRoomBlocks}), but isn’t divided into sub-rooms`,
          fixable: true,
          fixText: `Divide ‘${roomId}’ into ${cellCounts.x}×${cellCounts.y} sub-rooms`,
          issueData: { roomId },
          verifier: oversizedUndividedRoomVerifier,
        };
      }
    },
    fix(campaign, { roomId }) {
      const oversized = cellCountsIfOversized(campaign.rooms[roomId]);
      if (oversized === undefined) {
        throw new Error(
          `cannot divide ‘${roomId}’ into sub-rooms: it already fits one map cell or is divided`,
        );
      }
      const {
        cellCounts,
        rect: { from, to },
      } = oversized;
      const boundariesX = cellBoundaries(from.x, to.x, cellCounts.x);
      const boundariesY = cellBoundaries(from.y, to.y, cellCounts.y);

      return produce(campaign, (draft) => {
        const draftRoom = draft.rooms[roomId];
        const wholeRoomSubRooms = draftRoom.meta?.subRooms;
        const wholeRoomLinks =
          (
            wholeRoomSubRooms !== undefined &&
            isWholeRoomSubRooms(wholeRoomSubRooms)
          ) ?
            wholeRoomSubRooms["*"]
          : {};

        const subRooms: Record<string, SubRoom<VerificationRoomId>> = {};
        for (let gridY = 0; gridY < cellCounts.y; gridY++) {
          for (let gridX = 0; gridX < cellCounts.x; gridX++) {
            const cellIndex = gridY * cellCounts.x + gridX;
            subRooms[cellIndex.toString()] = {
              ...(cellIndex === 0 ? wholeRoomLinks : {}),
              gridPosition: { x: gridX, y: gridY },
              physicalPosition: {
                from: { x: boundariesX[gridX], y: boundariesY[gridY] },
                to: { x: boundariesX[gridX + 1], y: boundariesY[gridY + 1] },
              },
            };
          }
        }
        draftRoom.meta = { ...draftRoom.meta, subRooms };
      });
    },
  };
