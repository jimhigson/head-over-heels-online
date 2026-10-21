import { rotatingSceneryTiles } from "../../model/inPlaceMutators/rotatingSceneryTiles";
import {
  type PerimeterEdge,
  uncoveredPerimeterEdges,
} from "../../model/json/verification/helpers/roomPerimeter";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { keys } from "../../utils/entries";
import {
  addXy,
  type DirectionXy4,
  doorAlongAxis,
  tangentAxis,
  type Xy,
} from "../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomJsonItems,
} from "../editorTypes";
import { nextItemIdForItemTool } from "./inPlaceMutators/addItemInPlace";

/**
 * where, on the axis through it, a floor's edge in the given direction lies
 */
export const floorEdgeLineCoord = (
  direction: DirectionXy4,
  floorStart: Xy,
  floorEnd: Xy,
): number => {
  switch (direction) {
    case "towards":
      return floorStart.y;
    case "away":
      return floorEnd.y;
    case "right":
      return floorStart.x;
    case "left":
      return floorEnd.x;
    default:
      direction satisfies never;
      throw new Error(`unknown direction ${String(direction)}`);
  }
};

type PerimeterGap = {
  direction: DirectionXy4;
  /**
   * where the wall to close the gap would be, on the axis through it
   */
  through: number;
  /**
   * where the wall to close the gap would be, along its edge
   */
  along: number;
  /**
   * the floor square the gap is beside
   */
  square: Xy;
};

const perimeterGap = ({ x, y, direction }: PerimeterEdge): PerimeterGap => {
  const square = { x, y };
  switch (direction) {
    case "towards":
      return { direction, through: y, along: x, square };
    case "away":
      return { direction, through: y + 1, along: x, square };
    case "right":
      return { direction, through: x, along: y, square };
    case "left":
      return { direction, through: x + 1, along: y, square };
    default:
      direction satisfies never;
      throw new Error(`unknown direction ${String(direction)}`);
  }
};

const gapKey = ({ direction, through, along }: PerimeterGap) =>
  `${direction},${through},${along}`;

/**
 * where a gap that was in the room before the edit is now - it moves with its
 * floor's edge, if the edit moved that edge
 */
const gapAfterEdit = (
  gap: PerimeterGap,
  itemsBefore: EditorRoomJsonItems,
  editedItems: EditorRoomJsonItems,
): PerimeterGap => {
  const alongAxis = doorAlongAxis(gap.direction);
  for (const [id, floor] of iterateRoomJsonItemsWithIds(itemsBefore, "floor")) {
    const editedFloor = editedItems[id];
    if (editedFloor?.type !== "floor" || editedFloor === floor) {
      continue;
    }
    const floorEnd = addXy(floor.position, floor.config.times);
    const isOnFloorEdge =
      floorEdgeLineCoord(gap.direction, floor.position, floorEnd) ===
        gap.through &&
      gap.along >= floor.position[alongAxis] &&
      gap.along < floorEnd[alongAxis];
    if (isOnFloorEdge) {
      const editedFloorEnd = addXy(
        editedFloor.position,
        editedFloor.config.times,
      );
      const startShift =
        editedFloor.position[alongAxis] - floor.position[alongAxis];
      const endShift = editedFloorEnd[alongAxis] - floorEnd[alongAxis];
      return {
        ...gap,
        through: floorEdgeLineCoord(
          gap.direction,
          editedFloor.position,
          editedFloorEnd,
        ),
        // a move along the edge carries the gap with it, a resize doesn't:
        along: gap.along + (startShift === endShift ? startShift : 0),
      };
    }
  }
  return gap;
};

/**
 * a run of neighbouring gaps along one edge
 */
type PerimeterGapRun = PerimeterGap & { length: number };

const gapRuns = (gaps: PerimeterGap[]): PerimeterGapRun[] => {
  const sortedGaps = gaps.toSorted(
    (a, b) =>
      a.direction.localeCompare(b.direction) ||
      a.through - b.through ||
      a.along - b.along,
  );
  const runs: PerimeterGapRun[] = [];
  for (const gap of sortedGaps) {
    const lastRun = runs.at(-1);
    if (
      lastRun !== undefined &&
      lastRun.direction === gap.direction &&
      lastRun.through === gap.through &&
      lastRun.along + lastRun.length === gap.along
    ) {
      lastRun.length++;
    } else {
      runs.push({ ...gap, length: 1 });
    }
  }
  return runs;
};

/**
 * the walls that close every gap an edit opens in a room's perimeter, so that
 * no edit ever leaves the player a way to walk out of the room. A gap is closed
 * by growing a wall it is the end of, or failing that by a new wall. Gaps the
 * room already had before the edit are left open.
 */
export const perimeterGapFillingEdits = (
  roomBefore: EditorRoomJson,
  editedItems: EditorRoomJsonItems,
): Record<EditorRoomItemId, EditorJsonItem<"wall">> => {
  const gapsBefore = new Set(
    uncoveredPerimeterEdges(roomBefore).map((edge) =>
      gapKey(gapAfterEdit(perimeterGap(edge), roomBefore.items, editedItems)),
    ),
  );
  const openedGaps = uncoveredPerimeterEdges({ items: editedItems })
    .map(perimeterGap)
    .filter((gap) => !gapsBefore.has(gapKey(gap)));

  const fillingWalls: Record<EditorRoomItemId, EditorJsonItem<"wall">> = {};
  const usedIds = new Set<EditorRoomItemId>(keys(editedItems));

  for (const run of gapRuns(openedGaps)) {
    const { direction, through, along, length } = run;
    const alongAxis = doorAlongAxis(direction);
    const throughAxis = tangentAxis(direction);
    const floorZ =
      iterateRoomJsonItemsWithIds(editedItems, "floor")
        .map(([, floor]) => floor)
        .find(
          ({ position, config: { times } }) =>
            run.square.x >= position.x &&
            run.square.x < position.x + times.x &&
            run.square.y >= position.y &&
            run.square.y < position.y + times.y,
        )?.position.z ?? 0;

    const lineWalls = iterateRoomJsonItemsWithIds(
      { ...editedItems, ...fillingWalls },
      "wall",
    )
      .filter(
        ([, wall]) =>
          wall.config.direction === direction &&
          wall.position[throughAxis] === through &&
          wall.position.z === floorZ,
      )
      .toArray();
    const wallEndingAtGap = lineWalls.find(
      ([, wall]) =>
        wall.position[alongAxis] + wall.config.tiles.length === along,
    );
    const wallStartingAfterGap = lineWalls.find(
      ([, wall]) => wall.position[alongAxis] === along + length,
    );

    if (wallEndingAtGap !== undefined) {
      const [id, wall] = wallEndingAtGap;
      fillingWalls[id] = {
        ...wall,
        config: {
          ...wall.config,
          tiles: [
            ...wall.config.tiles,
            ...rotatingSceneryTiles(
              roomBefore.planet,
              length,
              wall.config.tiles.length,
            ),
          ],
        },
      };
    } else if (wallStartingAfterGap !== undefined) {
      const [id, wall] = wallStartingAfterGap;
      fillingWalls[id] = {
        ...wall,
        position: { ...wall.position, [alongAxis]: along },
        config: {
          ...wall.config,
          tiles: [
            ...rotatingSceneryTiles(roomBefore.planet, length, along),
            ...wall.config.tiles,
          ],
        },
      };
    } else {
      const newWall: EditorJsonItem<"wall"> = {
        type: "wall",
        position:
          throughAxis === "x" ?
            { x: through, y: along, z: floorZ }
          : { x: along, y: through, z: floorZ },
        config: {
          direction,
          tiles: [...rotatingSceneryTiles(roomBefore.planet, length, along)],
        },
      };
      const newWallId = nextItemIdForItemTool(usedIds, newWall, false);
      usedIds.add(newWallId);
      fillingWalls[newWallId] = newWall;
    }
  }

  return fillingWalls;
};
