import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { type Xy } from "../../../../utils/vectors/vectors";
import { isWholeRoomSubRooms, type SubRoom } from "../../../RoomJson";
import { roomJsonItemsIterable } from "../../../RoomJsonItemIterators";
import { type CampaignVerifier } from "../CampaignVerification";
import { floorSquares } from "../helpers/roomPerimeter";
import {
  cellCoversSquare,
  type DividedCellRef,
  dividedCells,
} from "../helpers/subRoomGeometry";
import {
  type VerificationRoomId,
  type VerificationRoomJson,
} from "../verificationTypes";

/** the most blocks a room can span on either axis and still be one map cell */
export const maxSingleCellRoomBlocks = 12;

type SubRoomsNotFittingFloor = {
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

/**
 * the map cells (x by y) a room's floor needs, and the floor's extent
 */
const floorCellGrid = (
  room: VerificationRoomJson,
): { cellCounts: Xy; rect: FloorRect } | undefined => {
  const rect = floorRect(room);
  if (rect === undefined) {
    return undefined;
  }
  return {
    cellCounts: {
      x: cellsForSpan(rect.to.x - rect.from.x),
      y: cellsForSpan(rect.to.y - rect.from.y),
    },
    rect,
  };
};

/**
 * whether a divided room's sub-rooms form a whole grid of the given size - so
 * the floor can be divided between them afresh
 */
const subRoomsFormGrid = (
  cells: DividedCellRef[],
  { x: columns, y: rows }: Xy,
): boolean => {
  const minX = Math.min(...cells.map(({ cell }) => cell.gridPosition.x));
  const minY = Math.min(...cells.map(({ cell }) => cell.gridPosition.y));
  const occupied = new Set(
    cells.map(
      ({ cell: { gridPosition } }) =>
        `${gridPosition.x - minX},${gridPosition.y - minY}`,
    ),
  );
  return (
    cells.length === columns * rows &&
    occupied.size === cells.length &&
    occupied.values().every((key) => {
      const [x, y] = key.split(",").map(Number);
      return x < columns && y < rows;
    })
  );
};

/**
 * the floor squares of a divided room that none of its sub-rooms cover
 */
const floorSquaresOutsideSubRooms = (
  room: VerificationRoomJson,
  cells: DividedCellRef[],
): Xy[] =>
  floorSquares(room)
    .values()
    .map((key) => {
      const [x, y] = key.split(",").map(Number);
      return { x, y };
    })
    .filter(
      ({ x, y }) => !cells.some(({ cell }) => cellCoversSquare(cell, x, y)),
    )
    .toArray();

/** `count + 1` near-equally spaced whole-block boundaries from `from` to `to` */
const cellBoundaries = (from: number, to: number, count: number): number[] =>
  Array.from(
    { length: count + 1 },
    (_, index) => from + Math.round((index * (to - from)) / count),
  );

/**
 * a room whose sub-rooms don't fit its floor, so the map draws it wrongly:
 * either it has none but its floor spans more than `maxSingleCellRoomBlocks` on
 * either axis, so the map squeezes it into a single cell; or some of its floor
 * is outside every sub-room, so the map shows the items there in the wrong
 * place (in game the nearest sub-room is used as a fallback, so it's only a
 * warning).
 *
 * The fix divides the floor into a grid of near-equal sub-rooms. An undivided
 * room's whole-room (`'*'`) links move onto the first sub-room, which is where
 * links into the room land; a divided room keeps its sub-rooms, and their
 * links, if they already form a grid of the size the floor needs.
 */
export const subRoomsFitFloorVerifier: CampaignVerifier<SubRoomsNotFittingFloor> =
  {
    name: "Sub-rooms don't fit the floor",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        const grid = floorCellGrid(room);
        if (grid === undefined) {
          continue;
        }
        const {
          cellCounts,
          rect: { from, to },
        } = grid;
        const cells = dividedCells(room).toArray();

        if (cells.length === 0) {
          if (cellCounts.x === 1 && cellCounts.y === 1) {
            continue;
          }
          yield {
            severity: "warning",
            roomId,
            msg: `‘${roomId}’ is ${to.x - from.x}×${to.y - from.y} blocks, too big for one map cell (max ${maxSingleCellRoomBlocks}×${maxSingleCellRoomBlocks}), but isn’t divided into sub-rooms`,
            fixable: true,
            fixText: `Divide ‘${roomId}’ into ${cellCounts.x}×${cellCounts.y} sub-rooms`,
            issueData: { roomId },
            verifier: subRoomsFitFloorVerifier,
          };
          continue;
        }

        const outside = floorSquaresOutsideSubRooms(room, cells);
        if (outside.length === 0) {
          continue;
        }
        const [{ x, y }] = outside;
        const fixable = subRoomsFormGrid(cells, cellCounts);
        yield {
          severity: "warning",
          roomId,
          msg: `${outside.length} floor square${outside.length === 1 ? "" : "s"} of ‘${roomId}’ ${outside.length === 1 ? "isn't" : "aren't"} inside any sub-room (eg (${x}, ${y}))`,
          fixable,
          fixText:
            fixable ?
              `Divide the floor of ‘${roomId}’ afresh between its ${cellCounts.x}×${cellCounts.y} sub-rooms`
            : `Extend the sub-rooms of ‘${roomId}’ to cover its whole floor`,
          issueData: { roomId },
          verifier: subRoomsFitFloorVerifier,
        };
      }
    },
    fix(campaign, { roomId }) {
      const room = campaign.rooms[roomId];
      const grid = floorCellGrid(room);
      const cells = dividedCells(room).toArray();
      if (
        grid === undefined ||
        (cells.length > 0 && !subRoomsFormGrid(cells, grid.cellCounts))
      ) {
        throw new Error(
          `cannot divide the floor of ‘${roomId}’ between sub-rooms: it has no floor, or its sub-rooms aren't a grid of the size it needs`,
        );
      }
      const {
        cellCounts,
        rect: { from, to },
      } = grid;
      const boundariesX = cellBoundaries(from.x, to.x, cellCounts.x);
      const boundariesY = cellBoundaries(from.y, to.y, cellCounts.y);
      const physicalPositionOfCell = (gridX: number, gridY: number) => ({
        from: { x: boundariesX[gridX], y: boundariesY[gridY] },
        to: { x: boundariesX[gridX + 1], y: boundariesY[gridY + 1] },
      });

      return produce(campaign, (draft) => {
        const draftRoom = draft.rooms[roomId];
        const draftSubRooms = draftRoom.meta?.subRooms;

        if (cells.length > 0) {
          // keep the sub-rooms, giving each its part of the floor:
          const minX = Math.min(
            ...cells.map(({ cell }) => cell.gridPosition.x),
          );
          const minY = Math.min(
            ...cells.map(({ cell }) => cell.gridPosition.y),
          );
          for (const { cell: draftCell } of dividedCells(draftRoom)) {
            draftCell.physicalPosition = physicalPositionOfCell(
              draftCell.gridPosition.x - minX,
              draftCell.gridPosition.y - minY,
            );
          }
          return;
        }

        const wholeRoomLinks =
          draftSubRooms !== undefined && isWholeRoomSubRooms(draftSubRooms) ?
            draftSubRooms["*"]
          : {};

        const subRooms: Record<string, SubRoom<VerificationRoomId>> = {};
        for (let gridY = 0; gridY < cellCounts.y; gridY++) {
          for (let gridX = 0; gridX < cellCounts.x; gridX++) {
            const cellIndex = gridY * cellCounts.x + gridX;
            subRooms[cellIndex.toString()] = {
              ...(cellIndex === 0 ? wholeRoomLinks : {}),
              gridPosition: { x: gridX, y: gridY },
              physicalPosition: physicalPositionOfCell(gridX, gridY),
            };
          }
        }
        draftRoom.meta = { ...draftRoom.meta, subRooms };
      });
    },
  };
