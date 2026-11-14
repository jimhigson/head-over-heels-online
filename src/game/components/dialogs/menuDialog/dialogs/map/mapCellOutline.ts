import { type RoomNode } from "../../../../../../model/map/roomGridPositions";
import {
  isWholeRoomSubRooms,
  type RoomJson,
  roomVerticalLink,
  subRoomById,
} from "../../../../../../model/RoomJson";
import { roomJsonItemsIterable } from "../../../../../../model/RoomJsonItemIterators";
import { keys } from "../../../../../../utils/entries";
import { unitVectors } from "../../../../../../utils/vectors/unitVectors";
import {
  addXy,
  type DirectionXy4,
  xyEqual,
} from "../../../../../../utils/vectors/vectors";

/**
 * a wall at the back of a cell drawn tall: none where the side opens onto
 * more of the same room
 */
type MapCellWall = "doorway" | "none" | "wall";

/**
 * a corner of a cell, named for the two sides that meet there
 */
type MapCellCorner = "leftAway" | "leftTowards" | "rightAway" | "rightTowards";

const cornerSides = {
  rightTowards: ["right", "towards"],
  rightAway: ["right", "away"],
  leftAway: ["left", "away"],
  leftTowards: ["left", "towards"],
} as const satisfies Record<MapCellCorner, [DirectionXy4, DirectionXy4]>;

/**
 * what the map draws for one cell (a sub-room, or a whole undivided room)
 */
export type MapCellOutline = {
  /**
   * a solid floor, or only an outline around a hole when every floor in the
   * cell is `none`
   */
  floor: "hole" | "solid";
  deadlyFloor: boolean;
  /**
   * drawn as a tall box, with walls, because there is a room above it
   */
  high: boolean;
  awayWall: MapCellWall;
  leftWall: MapCellWall;
  /**
   * the vertical edge at the back corner, where the away and left walls meet
   */
  backCornerPost: boolean;
  /**
   * the vertical edge at the front end of the left wall
   */
  leftWallFrontPost: boolean;
  /**
   * the vertical edge at the right end of the away wall
   */
  awayWallRightPost: boolean;
  /**
   * the vertical edge at the front corner
   */
  frontPost: boolean;
  /**
   * corners inside the room's floor: both sides open onto more of the room,
   * and so does the cell diagonally across, so the floor carries on through
   */
  openCorners: Record<MapCellCorner, boolean>;
};

/**
 * the room's floors that lie (at least partly) in the cell
 */
const floorsInCell = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  subRoomId: string,
) => {
  const cellArea = subRoomById(roomJson, subRoomId)?.physicalPosition;
  return roomJsonItemsIterable(roomJson)
    .filter((item) => item.type === "floor")
    .filter(
      ({ position, config: { times } }) =>
        cellArea === undefined ||
        (position.x < cellArea.to.x &&
          position.x + times.x > cellArea.from.x &&
          position.y < cellArea.to.y &&
          position.y + times.y > cellArea.from.y),
    )
    .toArray();
};

/**
 * the sub-room of the same room in the grid cell across one side (or, given
 * two, diagonally across a corner), if any
 */
const subRoomIdBeside = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  subRoomId: string,
  ...sides: DirectionXy4[]
): string | undefined => {
  const subRooms = roomJson.meta?.subRooms;
  const subRoom = subRoomById(roomJson, subRoomId);
  if (
    subRooms === undefined ||
    isWholeRoomSubRooms(subRooms) ||
    subRoom === undefined
  ) {
    return undefined;
  }
  const across = addXy(
    subRoom.gridPosition,
    ...sides.map((side) => unitVectors[side]),
  );
  return keys(subRooms).find((otherSubRoomId) =>
    xyEqual(subRooms[otherSubRoomId].gridPosition, across),
  );
};

/**
 * what the map draws for one of its cells - its floor, and whether it is a
 * tall box with walls and edges because a room is above it
 */
export const mapCellOutline = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  { subRoomId, boundaries }: RoomNode<RoomId>,
): MapCellOutline => {
  const floors = floorsInCell(roomJson, subRoomId);
  const isHigh = (cellSubRoomId: string) =>
    roomVerticalLink(roomJson, "above", cellSubRoomId) !== undefined;
  const high = isHigh(subRoomId);

  // a side opening onto a cell that is tall too is inside the tall box, so
  // has no edges of its own:
  const isExposed = (side: DirectionXy4) => {
    if (!high) {
      return false;
    }
    if (boundaries[side] !== "open") {
      return true;
    }
    const subRoomIdAcross = subRoomIdBeside(roomJson, subRoomId, side);
    return subRoomIdAcross === undefined || !isHigh(subRoomIdAcross);
  };

  const isOpenCorner = (corner: MapCellCorner) => {
    const [sideA, sideB] = cornerSides[corner];
    return (
      boundaries[sideA] === "open" &&
      boundaries[sideB] === "open" &&
      subRoomIdBeside(roomJson, subRoomId, sideA, sideB) !== undefined
    );
  };

  // walls only on sides that close the room, never where it opens onto more
  // of itself:
  const wallOn = (side: "away" | "left"): MapCellWall =>
    !high || boundaries[side] === "open" ? "none" : boundaries[side];

  return {
    floor:
      floors.every(({ config }) => config.floorType === "none") ? "hole" : (
        "solid"
      ),
    deadlyFloor: floors.some(({ config }) => config.floorType === "deadly"),
    high,
    awayWall: wallOn("away"),
    leftWall: wallOn("left"),
    // edges where the tall box is exposed, whether or not a wall is drawn
    // there, so none rise inside it between its own cells:
    backCornerPost: isExposed("away") || isExposed("left"),
    leftWallFrontPost: isExposed("left"),
    awayWallRightPost: isExposed("away"),
    frontPost: isExposed("right") || isExposed("towards"),
    openCorners: {
      rightTowards: isOpenCorner("rightTowards"),
      rightAway: isOpenCorner("rightAway"),
      leftAway: isOpenCorner("leftAway"),
      leftTowards: isOpenCorner("leftTowards"),
    },
  };
};
